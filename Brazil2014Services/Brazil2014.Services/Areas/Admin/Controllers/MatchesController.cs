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
    public class MatchesController : Controller
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET: Admin/Matches
        public async Task<ActionResult> Index()
        {
            var match = db.Match.Include(m => m.Team).Include(m => m.Team3).Include(m => m.MatchType).Include(m => m.Stade);
            return View(await match.ToListAsync());
        }

        // GET: Admin/Matches/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Match match = await db.Match.FindAsync(id);
            if (match == null)
            {
                return HttpNotFound();
            }
            return View(match);
        }

        // GET: Admin/Matches/Create
        public ActionResult Create()
        {
            ViewBag.Team1 = new SelectList(db.Team, "ID", "Libelle");
            ViewBag.Team2 = new SelectList(db.Team, "ID", "Libelle");
            ViewBag.MatchTypeId = new SelectList(db.MatchType, "ID", "Libelle");
            ViewBag.StadeId = new SelectList(db.Stade, "ID", "Libelle");
            return View();
        }

        // POST: Admin/Matches/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "ID,Team1,Team2,Team1Goal,Team2Goal,IsExtraTime,Team1Penalty,Team2Penalty,Date,MatchTypeId,StadeId,Rank,Hour,MatchTime,IdFIFA,Team1GoalsBy,Team2GoalsBy,Broadcaster")] Match match)
        {
            if (ModelState.IsValid)
            {
                db.Match.Add(match);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.Team1 = new SelectList(db.Team, "ID", "Libelle", match.Team1);
            ViewBag.Team2 = new SelectList(db.Team, "ID", "Libelle", match.Team2);
            ViewBag.MatchTypeId = new SelectList(db.MatchType, "ID", "Libelle", match.MatchTypeId);
            ViewBag.StadeId = new SelectList(db.Stade, "ID", "Libelle", match.StadeId);
            return View(match);
        }

        // GET: Admin/Matches/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Match match = await db.Match.FindAsync(id);
            if (match == null)
            {
                return HttpNotFound();
            }
            ViewBag.Team1 = new SelectList(db.Team, "ID", "Libelle", match.Team1);
            ViewBag.Team2 = new SelectList(db.Team, "ID", "Libelle", match.Team2);
            ViewBag.MatchTypeId = new SelectList(db.MatchType, "ID", "Libelle", match.MatchTypeId);
            ViewBag.StadeId = new SelectList(db.Stade, "ID", "Libelle", match.StadeId);
            return View(match);
        }

        // POST: Admin/Matches/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "ID,Team1,Team2,Team1Goal,Team2Goal,IsExtraTime,Team1Penalty,Team2Penalty,Date,MatchTypeId,StadeId,Rank,Hour,MatchTime,IdFIFA,Team1GoalsBy,Team2GoalsBy,Broadcaster")] Match match)
        {
            if (ModelState.IsValid)
            {
                db.Entry(match).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.Team1 = new SelectList(db.Team, "ID", "Libelle", match.Team1);
            ViewBag.Team2 = new SelectList(db.Team, "ID", "Libelle", match.Team2);
            ViewBag.MatchTypeId = new SelectList(db.MatchType, "ID", "Libelle", match.MatchTypeId);
            ViewBag.StadeId = new SelectList(db.Stade, "ID", "Libelle", match.StadeId);
            return View(match);
        }

        // GET: Admin/Matches/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Match match = await db.Match.FindAsync(id);
            if (match == null)
            {
                return HttpNotFound();
            }
            return View(match);
        }

        // POST: Admin/Matches/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Match match = await db.Match.FindAsync(id);
            db.Match.Remove(match);
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
