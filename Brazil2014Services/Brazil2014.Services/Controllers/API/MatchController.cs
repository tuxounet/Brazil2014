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
using C2S.Brazil2014.Services.Models.API;
using C2S.Brazil2014.Services.BOM.Entities.ViewModels;

namespace C2S.Brazil2014.Services.Controllers.API
{

    [RoutePrefix("api/Match")]
    public class MatchController : ApiController
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/Match

        public IEnumerable<GroupedMatches<CalendarMatch>> Get()
        {
            return (from m in db.Match.ToList()
                    group m by m.Date into g
                    select new GroupedMatches<CalendarMatch>
                    {
                        Date = g.Key,
                        Matchs = g.Select(p => p.ToCalendarMatch()).OrderBy(p => p.Time)

                    }).OrderBy(p => p.Date).ToList();
        }

        // GET api/Match/5
        [ResponseType(typeof(Match))]
        public async Task<IHttpActionResult> GetMatch(int id)
        {
            Match match = await db.Match.FindAsync(id);
            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }


        // GET api/Match/group
        public IEnumerable<CalendarMatch> Get(string kind)
        {
            var list = (from m in db.Match
                        where m.MatchType.Libelle == kind
                        orderby m.Date
                        select m).ToArray().Select(p=>p.ToCalendarMatch());

            return list; 
        }

        // PUT api/Match/5
        [Authorize]
        public async Task<IHttpActionResult> PutMatch(int id, Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != match.ID)
            {
                return BadRequest();
            }

            db.Entry(match).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
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

        // POST api/Match
        [ResponseType(typeof(Match))]
        [Authorize]
        public async Task<IHttpActionResult> PostMatch(Match match)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Match.Add(match);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MatchExists(match.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = match.ID }, match);
        }

        // DELETE api/Match/5
        [ResponseType(typeof(Match))]
        [Authorize]
        public async Task<IHttpActionResult> DeleteMatch(int id)
        {
            Match match = await db.Match.FindAsync(id);
            if (match == null)
            {
                return NotFound();
            }

            db.Match.Remove(match);
            await db.SaveChangesAsync();

            return Ok(match);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MatchExists(int id)
        {
            return db.Match.Count(e => e.ID == id) > 0;
        }
    }
}