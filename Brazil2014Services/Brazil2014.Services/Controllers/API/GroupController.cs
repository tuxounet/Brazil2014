using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using C2S.Brazil2014.Services.BOM.Entities;
using C2S.Brazil2014.Services.BOM.Entities.ViewModels;

namespace C2S.Brazil2014.Services.Controllers.API
{
    public class GroupController : ApiController
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/Group
        public IEnumerable<GroupWithTeam> GetGroup()
        {
            return (from g in db.Group.ToList()
                    select new GroupWithTeam
                    {
                        Id = g.ID,
                        Name = g.Libelle,
                        Teams = db.Team.Where(p => p.Group == g.Libelle).OrderBy(p => p.ID).ToList().Select(p => p.ToTeamInGroup())

                    }).OrderBy(p => p.Name);
        }

        // GET api/Group/5
        [ResponseType(typeof(Group))]
     
        public async Task<IHttpActionResult> GetGroup(int id)
        {
            Group group = await db.Group.FindAsync(id);
            if (group == null)
            {
                return NotFound();
            }

            return Ok(group);
        }

        // PUT api/Group/5
        [Authorize]
        public async Task<IHttpActionResult> PutGroup(int id, Group group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != group.ID)
            {
                return BadRequest();
            }

            db.Entry(group).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Group
        [ResponseType(typeof(Group))]
        [Authorize]
        public async Task<IHttpActionResult> PostGroup(Group group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Group.Add(group);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GroupExists(group.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = group.ID }, group);
        }

        // DELETE api/Group/5
        [ResponseType(typeof(Group))]
        [Authorize]
        public async Task<IHttpActionResult> DeleteGroup(int id)
        {
            Group group = await db.Group.FindAsync(id);
            if (group == null)
            {
                return NotFound();
            }

            db.Group.Remove(group);
            await db.SaveChangesAsync();

            return Ok(group);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GroupExists(int id)
        {
            return db.Group.Count(e => e.ID == id) > 0;
        }
    }
}