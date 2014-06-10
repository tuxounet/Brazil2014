using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using C2S.Brazil2014.Services.BOM.Entities;

namespace C2S.Brazil2014.Services.Areas.Admin.Controllers
{
    public class StadesController : Controller
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET: Admin/Stades
        public ActionResult Index()
        {
            return View(db.Stade.ToList());
        }

        // GET: Admin/Stades/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Stade stade = db.Stade.Find(id);
            if (stade == null)
            {
                return HttpNotFound();
            }
            return View(stade);
        }

        // GET: Admin/Stades/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Stades/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Libelle,City,Capacity")] Stade stade)
        {
            if (ModelState.IsValid)
            {
                db.Stade.Add(stade);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(stade);
        }

        // GET: Admin/Stades/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Stade stade = db.Stade.Find(id);
            if (stade == null)
            {
                return HttpNotFound();
            }
            return View(stade);
        }

        // POST: Admin/Stades/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Libelle,City,Capacity")] Stade stade)
        {
            if (ModelState.IsValid)
            {
                db.Entry(stade).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(stade);
        }

        // GET: Admin/Stades/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Stade stade = db.Stade.Find(id);
            if (stade == null)
            {
                return HttpNotFound();
            }
            return View(stade);
        }

        // POST: Admin/Stades/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Stade stade = db.Stade.Find(id);
            db.Stade.Remove(stade);
            db.SaveChanges();
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
