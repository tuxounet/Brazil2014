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
    public class StadiumController : ApiController
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/Stadium
        public IEnumerable<Stadium> GetStades()
        {
            return db.Stade.OrderBy(p=>p.ID).ToList().Select(p=>p.ToStadium());
        }

        // GET api/Stadium/5
        [ResponseType(typeof(Stade))]
        public async Task<IHttpActionResult> GetStade(int id)
        {
            Stade stade = await db.Stade.FindAsync(id);
            if (stade == null)
            {
                return NotFound();
            }

            return Ok(stade);
        }

        // PUT api/Stadium/5
        [Authorize]
        public async Task<IHttpActionResult> PutStade(int id, Stade stade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stade.ID)
            {
                return BadRequest();
            }

            db.Entry(stade).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StadeExists(id))
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

        // POST api/Stadium
        [ResponseType(typeof(Stade))]
        [Authorize]
        public async Task<IHttpActionResult> PostStade(Stade stade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Stade.Add(stade);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StadeExists(stade.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = stade.ID }, stade);
        }

        // DELETE api/Stadium/5
        [ResponseType(typeof(Stade))]
        [Authorize]
        public async Task<IHttpActionResult> DeleteStade(int id)
        {
            Stade stade = await db.Stade.FindAsync(id);
            if (stade == null)
            {
                return NotFound();
            }

            db.Stade.Remove(stade);
            await db.SaveChangesAsync();

            return Ok(stade);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StadeExists(int id)
        {
            return db.Stade.Count(e => e.ID == id) > 0;
        }
    }
}