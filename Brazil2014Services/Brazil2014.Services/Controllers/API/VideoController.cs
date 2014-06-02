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

namespace C2S.Brazil2014.Services.Controllers.API
{
    public class VideoController : ApiController
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/Videos
        public IQueryable<Videos> GetVideos()
        {
            return db.Videos.OrderByDescending(p => p.Date);
        }

        // GET api/Videos/5
        [ResponseType(typeof(Videos))]
        public async Task<IHttpActionResult> GetVideos(int id)
        {
            Videos videos = await db.Videos.FindAsync(id);
            if (videos == null)
            {
                return NotFound();
            }

            return Ok(videos);
        }

        // PUT api/Videos/5
        [Authorize]
        public async Task<IHttpActionResult> PutVideos(int id, Videos videos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != videos.Id)
            {
                return BadRequest();
            }

            db.Entry(videos).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideosExists(id))
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

        // POST api/Videos
        [Authorize]
        [ResponseType(typeof(Videos))]
        public async Task<IHttpActionResult> PostVideos(Videos videos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Videos.Add(videos);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VideosExists(videos.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = videos.Id }, videos);
        }

        // DELETE api/Videos/5
        [Authorize]
        [ResponseType(typeof(Videos))]
        public async Task<IHttpActionResult> DeleteVideos(int id)
        {
            Videos videos = await db.Videos.FindAsync(id);
            if (videos == null)
            {
                return NotFound();
            }

            db.Videos.Remove(videos);
            await db.SaveChangesAsync();

            return Ok(videos);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VideosExists(int id)
        {
            return db.Videos.Count(e => e.Id == id) > 0;
        }
    }
}