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

    [RoutePrefix("api/News")]
    public class NewsController : ApiController
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/News
        public IQueryable<News> GetNews()
        {
            return db.News.OrderByDescending(p => p.Date);
        }

        // GET api/News/5
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> GetNews(Guid id)
        {
            News news = await db.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            return Ok(news);
        }

        // PUT api/News/5
        [Authorize]
        public async Task<IHttpActionResult> PutNews(Guid id, News news)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != news.Id)
            {
                return BadRequest();
            }

            db.Entry(news).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
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

        // POST api/News
        [ResponseType(typeof(News))]
        [Authorize]
        public async Task<IHttpActionResult> PostNews(News news)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.News.Add(news);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (NewsExists(news.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = news.Id }, news);
        }

        // DELETE api/News/5
        [ResponseType(typeof(News))]
        [Authorize]
        public async Task<IHttpActionResult> DeleteNews(Guid id)
        {
            News news = await db.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            db.News.Remove(news);
            await db.SaveChangesAsync();

            return Ok(news);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NewsExists(Guid id)
        {
            return db.News.Count(e => e.Id == id) > 0;
        }
    }
}