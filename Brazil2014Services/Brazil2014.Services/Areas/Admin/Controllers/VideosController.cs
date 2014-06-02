using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using C2S.Brazil2014.Services.BOM.Entities;

namespace C2S.Brazil2014.Services.Areas.Admin.Controllers
{
    [Authorize]
    public class VideosController : Controller
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET: /Admin/Videos/
        public async Task<ActionResult> Index()
        {
            return View(await db.Videos.ToListAsync());
        }

        // GET: /Admin/Videos/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Videos videos = await db.Videos.FindAsync(id);
            if (videos == null)
            {
                return HttpNotFound();
            }
            return View(videos);
        }

        // GET: /Admin/Videos/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Admin/Videos/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Date,Title,VideoLink")] Videos videos)
        {
            if (ModelState.IsValid)
            {
                db.Videos.Add(videos);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(videos);
        }

        // GET: /Admin/Videos/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Videos videos = await db.Videos.FindAsync(id);
            if (videos == null)
            {
                return HttpNotFound();
            }
            return View(videos);
        }

        // POST: /Admin/Videos/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Date,Title,VideoLink")] Videos videos)
        {
            if (ModelState.IsValid)
            {
                db.Entry(videos).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(videos);
        }

        // GET: /Admin/Videos/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Videos videos = await db.Videos.FindAsync(id);
            if (videos == null)
            {
                return HttpNotFound();
            }
            return View(videos);
        }

        // POST: /Admin/Videos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Videos videos = await db.Videos.FindAsync(id);
            db.Videos.Remove(videos);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
