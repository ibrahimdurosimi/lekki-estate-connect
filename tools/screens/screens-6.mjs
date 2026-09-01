// Madrasa Admin dashboard and Madrasa Admin analytics.
import { adminHeader, navBar, NAV_MAD, sheet, scrim, kpi, chart, rangeBar, cfgAttr } from "./lib.mjs";

/* --------------------------------------------- 30. Madrasa Admin dashboard */
export const madrasaDashboard = {
  slug: "madrasa-dashboard.html",
  title: "Madrasa Admin dashboard",
  desc: "Student registry, check-in/out, pending enrolments from both sources, Teacher/Minder and External Guardian account creation, class schedule and Madrasa notices.",
  body: `
  ${adminHeader({
    role: "Madrasa Admin",
    title: "Madrasa",
    sub: "Madrasa records only — separate from estate dues, gate logs and estate approvals",
    unread: 5,
  })}
  <main class="sheet-body">
    <div class="note">This account sees Madrasa data only. Dues, estate-wide gate logs and non-Madrasa approvals are not part of this view. The Estate Imam holds the same permissions under a different title.</div>

    <div class="grid-2" style="margin-top:14px">
      ${kpi("Students enrolled", "84", "", "6 this term", "up")}
      ${kpi("Checked in today", "71", "/ 84", "9 absent, 4 not arrived", "flat")}
      ${kpi("Pending enrolments", "5", "", "2 resident, 3 external", "flat")}
      ${kpi("Teachers &amp; minders", "6", "", "4 teachers, 2 minders", "flat")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Pending enrolments</h2><span class="pill pill-gold">2 sources</span></div>
      <div class="note note-gold" style="text-align:left">One queue, two sources. A resident ticking <b>Madrasa enrolment</b> during household registration arrives here as a resident-linked application. An <b>External Guardian</b> application is taken in person and reviewed before the account is created — that review is the approval, so the guardian account goes live immediately and the child's enrolment still lands in this queue.</div>

      <div class="chips" style="margin-top:12px" data-group="enrolsrc" data-filter-group="enrolsrc">
        <button type="button" class="chip" data-value="all" aria-pressed="true">All</button>
        <button type="button" class="chip" data-value="resident">From resident registration</button>
        <button type="button" class="chip" data-value="external">External Guardian</button>
      </div>

      <div style="margin-top:12px" data-filter-scope="enrolsrc">
        <div class="card" data-tags="resident,all">
          <div class="card-head"><div class="grow"><h3>Maryam Danladi</h3><p class="tiny muted" style="margin-top:3px">Submitted 31 Aug · via household registration</p></div><span class="pill pill-warn">Pending</span></div>
          <div class="divider"></div>
          <table class="table">
            <tbody>
              <tr><td class="t-strong">Linked to</td><td>House 17 · Unit A — Yakubu Danladi (Primary Resident)</td></tr>
              <tr><td class="t-strong">Next of kin</td><td>Halima Danladi (Mother) · 0803 000 0118</td></tr>
              <tr><td class="t-strong">Emergency contact</td><td>Musa Danladi (Uncle) · 0802 000 0441</td></tr>
              <tr><td class="t-strong">Class / level requested</td><td>Level 2</td></tr>
            </tbody>
          </table>
          <div class="pair" style="margin-top:12px"><button class="btn btn-ghost">Query</button><button class="btn" data-open-sheet="sheet-enrol">Approve &amp; place</button></div>
        </div>

        <div class="card" style="margin-top:12px" data-tags="external,all">
          <div class="card-head"><div class="grow"><h3>Aisha Balogun</h3><p class="tiny muted" style="margin-top:3px">Submitted 30 Aug · External Guardian application, reviewed in person</p></div><span class="pill pill-warn">Pending</span></div>
          <div class="divider"></div>
          <table class="table">
            <tbody>
              <tr><td class="t-strong">Linked to</td><td>House 104 — Sekinat Balogun (External Guardian)</td></tr>
              <tr><td class="t-strong">Next of kin</td><td>Sekinat Balogun (Mother) · 0805 000 2210</td></tr>
              <tr><td class="t-strong">Emergency contact</td><td>Taiwo Balogun (Father) · 0805 000 2211</td></tr>
              <tr><td class="t-strong">Class / level requested</td><td>Level 1</td></tr>
            </tbody>
          </table>
          <div class="pair" style="margin-top:12px"><button class="btn btn-ghost">Query</button><button class="btn" data-open-sheet="sheet-enrol">Approve &amp; place</button></div>
        </div>

        <div class="card flush" style="margin-top:12px">
          <div class="row row-static" data-tags="external,all"><span class="row-icon">IB</span><span class="grow"><span class="row-title">Ibrahim Balogun · House 104</span><span class="row-sub">External Guardian · sibling application · submitted 30 Aug</span></span><span class="pill pill-warn">Pending</span></div>
          <div class="row row-static" data-tags="resident,all"><span class="row-icon">FO</span><span class="grow"><span class="row-title">Fatima Ogunleye · House 63 · Unit B</span><span class="row-sub">From household registration · submitted 29 Aug</span></span><span class="pill pill-warn">Pending</span></div>
          <div class="row row-static" data-tags="external,all"><span class="row-icon">SA</span><span class="grow"><span class="row-title">Suleiman Adeyemi · House 107</span><span class="row-sub">External Guardian · submitted 27 Aug · emergency contact missing</span></span><span class="pill pill-mute">Query</span></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Check-in / out</h2><span class="pill pill-mute">Today</span></div>
      <div class="seg" data-group="madclass" role="group" aria-label="Class">
        <button type="button" aria-pressed="true">All classes</button><button type="button">Level 1</button><button type="button">Level 2</button><button type="button">Level 3</button><button type="button">Level 4</button>
      </div>
      <div class="card flush" style="margin-top:12px">
        <div class="row row-static"><span class="row-icon">MY</span><span class="grow"><span class="row-title">Maryam Yusuf · Level 2</span><span class="row-sub">House 42 · Unit B · in 15:38 by Zainab Idris</span></span><span class="pill pill-ok">In</span></div>
        <div class="row row-static"><span class="row-icon">IY</span><span class="grow"><span class="row-title">Ibrahim Yusuf · Level 1</span><span class="row-sub">House 42 · Unit B · in 15:36 by Zainab Idris</span></span><span class="pill pill-ok">In</span></div>
        <div class="row row-static"><span class="row-icon">AB</span><span class="grow"><span class="row-title">Amina Balogun · Level 3</span><span class="row-sub">House 104 · External Guardian · picked up 17:44 by Sekinat Balogun</span></span><span class="pill pill-mute">Out</span></div>
        <div class="row row-static"><span class="row-icon">HO</span><span class="grow"><span class="row-title">Halima Obi · Level 2</span><span class="row-sub">House 8 · Unit A · marked absent 15:45 by Musa Garba</span></span><span class="pill pill-warn">Absent</span></div>
        <div class="row row-static"><span class="row-icon">KA</span><span class="grow"><span class="row-title">Kabir Adisa · Level 4</span><span class="row-sub">House 91 · Unit C · not arrived</span></span><span class="pill pill-mute">Expected</span></div>
      </div>
      <p class="tiny muted" style="margin-top:10px">Whoever performs the action — Teacher or Minder — triggers the check-in, absence or pickup notification to the linked parent directly.</p>
    </div>

    <div class="section">
      <div class="section-head"><h2>Student registry</h2><button class="btn btn-sm" data-open-sheet="sheet-student">Add student</button></div>
      <div class="chips" data-group="regfilter" data-filter-group="regfilter">
        <button type="button" class="chip" data-value="all" aria-pressed="true">All 84</button>
        <button type="button" class="chip" data-value="res">Resident-linked 61</button>
        <button type="button" class="chip" data-value="ext">Guardian-linked 23</button>
      </div>
      <div class="card flush" style="margin-top:12px" data-filter-scope="regfilter">
        <button class="row" data-open-sheet="sheet-student" data-tags="res,all"><span class="row-icon">MY</span><span class="grow"><span class="row-title">Maryam Yusuf</span><span class="row-sub">Level 2 · House 42 · Unit B · enrolled 12 Jan</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-student" data-tags="res,all"><span class="row-icon">IY</span><span class="grow"><span class="row-title">Ibrahim Yusuf</span><span class="row-sub">Level 1 · House 42 · Unit B · enrolled 12 Jan</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-student" data-tags="ext,all"><span class="row-icon">AB</span><span class="grow"><span class="row-title">Amina Balogun</span><span class="row-sub">Level 3 · House 104 · External Guardian · enrolled 04 May</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-student" data-tags="res,all"><span class="row-icon">HO</span><span class="grow"><span class="row-title">Halima Obi</span><span class="row-sub">Level 2 · House 8 · Unit A · enrolled 19 Feb</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-student" data-tags="ext,all"><span class="row-icon">SA</span><span class="grow"><span class="row-title">Sadiq Adeyemi</span><span class="row-sub">Level 1 · House 107 · External Guardian · enrolled 21 Jun</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-student" data-tags="res,all"><span class="row-icon">KA</span><span class="grow"><span class="row-title">Kabir Adisa</span><span class="row-sub">Level 4 · House 91 · Unit C · enrolled 08 Mar</span></span><span class="chev">›</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Accounts</h2><span class="pill pill-mute">Madrasa only</span></div>
      <div class="card flush">
        <button class="row" data-open-sheet="sheet-staff-new"><span class="row-icon">＋</span><span class="grow"><span class="row-title">Create Teacher / Minder account</span><span class="row-sub">Own login · Teacher scoped to one class, Minder across all</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-guardian-new"><span class="row-icon">＋</span><span class="grow"><span class="row-title">Create External Guardian account</span><span class="row-sub">House number auto-assigned from 101 up · active immediately</span></span><span class="chev">›</span></button>
      </div>
      <div class="card flush" style="margin-top:12px">
        <button class="row"><span class="row-icon">ZI</span><span class="grow"><span class="row-title">Zainab Idris</span><span class="row-sub">Teacher · Level 2 · 96 check-ins this month</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">AY</span><span class="grow"><span class="row-title">Abdullahi Yakubu</span><span class="row-sub">Teacher · Level 1 · 88 check-ins this month</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">RS</span><span class="grow"><span class="row-title">Rukayat Sanni</span><span class="row-sub">Teacher · Level 3 · 74 check-ins this month</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">TU</span><span class="grow"><span class="row-title">Tijani Umar</span><span class="row-sub">Teacher · Level 4 · 69 check-ins this month</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">MG</span><span class="grow"><span class="row-title">Musa Garba</span><span class="row-sub">Minder · all classes · pickup, playground, lunch</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">HB</span><span class="grow"><span class="row-title">Hafsat Bello</span><span class="row-sub">Minder · all classes · pickup, playground, lunch</span></span><span class="pill pill-ok">Active</span></button>
      </div>
      <div class="card flush" style="margin-top:12px">
        <button class="row"><span class="row-icon">SB</span><span class="grow"><span class="row-title">Sekinat Balogun · House 104</span><span class="row-sub">External Guardian · 2 children · created 04 May</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">TA</span><span class="grow"><span class="row-title">Tolu Adeyemi · House 107</span><span class="row-sub">External Guardian · 1 child · created 21 Jun</span></span><span class="pill pill-ok">Active</span></button>
      </div>
      <div class="pair" style="margin-top:12px">
        <a class="btn btn-ghost" href="teacher-dashboard.html">Teacher view</a>
        <a class="btn btn-ghost" href="minder-dashboard.html">Minder view</a>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Class schedule</h2><button class="btn btn-sm btn-ghost" data-open-sheet="sheet-schedule">Edit</button></div>
      <div class="card">
        <div class="card-head"><div class="grow"><h3>Term schedule</h3><p class="tiny muted" style="margin-top:3px">Monday to Thursday, plus Saturday</p></div><span class="pill pill-mute">Current term</span></div>
        <div class="table-scroll" style="margin-top:12px">
          <table class="table">
            <thead><tr><th>Class</th><th>Days</th><th>Time</th><th>Teacher</th><th>Students</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Level 1</td><td>Mon–Thu</td><td>16:00 – 17:30</td><td>Abdullahi Yakubu</td><td>22</td></tr>
              <tr><td class="t-strong">Level 2</td><td>Mon–Thu</td><td>16:00 – 17:30</td><td>Zainab Idris</td><td>24</td></tr>
              <tr><td class="t-strong">Level 3</td><td>Mon–Thu</td><td>17:30 – 19:00</td><td>Rukayat Sanni</td><td>21</td></tr>
              <tr><td class="t-strong">Level 4</td><td>Mon–Thu</td><td>17:30 – 19:00</td><td>Tijani Umar</td><td>17</td></tr>
              <tr><td class="t-strong">All levels</td><td>Sat</td><td>09:00 – 12:00</td><td>Rotating</td><td>84</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Madrasa notices</h2><button class="btn btn-sm" data-open-sheet="sheet-notice">Post</button></div>
      <div class="card">
        <div class="card-head"><div class="grow"><h3>New term begins 14 September</h3><p class="tiny muted" style="margin-top:3px">Posted 28 Aug · to parents and guardians</p></div><span class="pill pill-info">Info</span></div>
        <p class="tiny" style="margin-top:10px">Class lists are published on the Madrasa noticeboard. Guardians collecting children must hold a valid pickup pass.</p>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Saturday session moved to 09:00</h3><p class="tiny muted" style="margin-top:3px">Posted 24 Aug · to parents and guardians</p></div><span class="pill pill-mute">Schedule</span></div>
        <p class="tiny" style="margin-top:10px">The Saturday all-levels session now starts at 09:00 and ends at 12:00.</p>
      </div>
      <p class="tiny muted" style="margin-top:10px">Madrasa notices reach linked residents and External Guardians. They do not post to the estate-wide notice board.</p>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-student",
    title: "Student record",
    sub: "Create or edit — students never have a login",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" value="Maryam Yusuf"></label>
    <div class="pair">
      <label class="field"><span class="label">Class / level</span><select class="select"><option>Level 1</option><option selected>Level 2</option><option>Level 3</option><option>Level 4</option></select></label>
      <label class="field"><span class="label">Enrolment status</span><select class="select"><option>Active</option><option>Pending</option><option>Withdrawn</option></select></label>
    </div>
    <label class="field"><span class="label">Linked to</span><select class="select"><option>Resident household</option><option>External Guardian</option></select></label>
    <div class="pair">
      <label class="field"><span class="label">House</span><input class="input" value="42"></label>
      <label class="field"><span class="label">Unit</span><input class="input" value="B"></label>
    </div>
    <label class="field"><span class="label">Next of kin</span><input class="input" value="Ahmed Yusuf (Father)"></label>
    <div class="pair">
      <label class="field"><span class="label">Next-of-kin phone</span><input class="input" inputmode="tel" value="0803 000 0142"></label>
      <label class="field"><span class="label">Emergency contact</span><input class="input" inputmode="tel" value="0803 000 0143"></label>
    </div>
    <div class="note">Record fields are fixed: name, next of kin, emergency contact, class/level, and the resident house or External Guardian the child is linked to.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save record</button>`,
  })}
  ${sheet({
    id: "sheet-enrol",
    title: "Approve enrolment",
    sub: "Places the child in a class and notifies the linked parent",
    bodyHtml: `<label class="field"><span class="label">Place in class</span><select class="select"><option>Level 1</option><option selected>Level 2</option><option>Level 3</option><option>Level 4</option></select></label>
    <label class="field"><span class="label">Start date</span><input class="input" type="date" value="2026-09-14"></label>
    <div class="note">Approval moves the application out of this queue and adds the child to the registry. The linked resident or External Guardian receives push and email confirmation.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Approve</button>`,
  })}
  ${sheet({
    id: "sheet-staff-new",
    title: "Create Teacher / Minder account",
    sub: "Own login, created by the Madrasa Admin",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <label class="field"><span class="label">Email</span><input class="input" inputmode="email" placeholder="name@example.com"></label>
    <label class="field"><span class="label">Role</span><select class="select"><option>Teacher — scoped to one class</option><option>Minder — all classes, no progress notes</option></select></label>
    <label class="field"><span class="label">Assigned class (Teacher only)</span><select class="select"><option>Level 1</option><option>Level 2</option><option>Level 3</option><option>Level 4</option></select></label>
    <div class="note">A Teacher only sees and acts on their own class. A Minder acts across every class for supervision duties — pickup, playground and lunch — and never records progress notes.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Create account</button>`,
  })}
  ${sheet({
    id: "sheet-guardian-new",
    title: "Create External Guardian account",
    sub: "After the in-person application and review",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <div class="pair">
      <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
      <label class="field"><span class="label">Email</span><input class="input" inputmode="email" placeholder="name@example.com"></label>
    </div>
    <div class="card">
      <div class="tiny muted">Auto-assigned house number and PIN</div>
      <div class="code-display" style="margin-top:6px">108 · 5 1 3 6 K T</div>
      <div class="note note-gold" style="margin-top:12px;text-align:left">House numbers for External Guardians start at 101 and never overlap the 1–100 resident range. Shown once. The in-person review is the approval, so the account is active straight away.</div>
    </div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Create account</button>`,
  })}
  ${sheet({
    id: "sheet-schedule",
    title: "Edit class schedule",
    bodyHtml: `<label class="field"><span class="label">Class</span><select class="select"><option>Level 1</option><option>Level 2</option><option>Level 3</option><option>Level 4</option><option>Saturday, all levels</option></select></label>
    <div class="pair">
      <label class="field"><span class="label">Start</span><input class="input" type="time" value="16:00"></label>
      <label class="field"><span class="label">End</span><input class="input" type="time" value="17:30"></label>
    </div>
    <label class="field"><span class="label">Teacher</span><select class="select"><option>Zainab Idris</option><option>Abdullahi Yakubu</option><option>Rukayat Sanni</option><option>Tijani Umar</option></select></label>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save schedule</button>`,
  })}
  ${sheet({
    id: "sheet-notice",
    title: "Post Madrasa notice",
    sub: "Sent to linked residents and External Guardians",
    bodyHtml: `<label class="field"><span class="label">Title</span><input class="input" placeholder="Short and factual"></label>
    <label class="field"><span class="label">Category</span><select class="select"><option>Info</option><option>Schedule</option><option>Emergency</option></select></label>
    <label class="field"><span class="label">Notice</span><textarea class="textarea" rows="4" placeholder="What parents and guardians need to know"></textarea></label>
    <div class="note">Madrasa notices do not appear on the estate-wide notice board.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Post notice</button>`,
  })}
  ${navBar(NAV_MAD, "Home")}`,
};

/* --------------------------------------------- 31. Madrasa Admin analytics */
export const madrasaAnalytics = {
  slug: "madrasa-analytics.html",
  title: "Madrasa analytics",
  desc: "Enrolment trend, resident vs. external mix, attendance by class, absence patterns, staff activity, enrolment turnaround, class sizes and pickup-time heatmap.",
  body: `
  ${adminHeader({
    role: "Madrasa Admin",
    title: "Madrasa analytics",
    sub: "Scope: Madrasa data only",
    back: "madrasa-dashboard.html",
    unread: 5,
  })}
  <main class="sheet-body">
    ${rangeBar("Month")}
    <div class="chips" style="margin-top:10px" data-group="madclassfilter">
      <button type="button" class="chip" aria-pressed="true">All classes</button>
      <button type="button" class="chip">Level 1</button>
      <button type="button" class="chip">Level 2</button>
      <button type="button" class="chip">Level 3</button>
      <button type="button" class="chip">Level 4</button>
    </div>

    <div class="grid-2" style="margin-top:14px">
      ${kpi("Students enrolled", "84", "", "6 this term", "up")}
      ${kpi("Overall attendance", "88", "%", "1 pt vs. Aug", "up")}
      ${kpi("Enrolment turnaround", "2.4", "days", "0.6 days faster", "up")}
      ${kpi("Pending enrolments", "5", "", "2 resident, 3 external", "flat")}
    </div>

    <div class="section">
      ${chart({
        title: "Enrolment trend",
        kind: "line",
        note: "Total students on the registry at month end.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [{ name: "Students", color: "#3FAE7A", values: [68, 71, 74, 76, 78, 84] }],
        },
      })}
      ${chart({
        title: "Resident vs. External Guardian mix",
        kind: "donut",
        note: "Who each student is linked to.",
        cfg: {
          centerValue: "84",
          centerLabel: "students",
          items: [
            { label: "Resident-linked", value: 61, color: "#3FAE7A" },
            { label: "External Guardian", value: 23, color: "#123528" },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Attendance rate by class",
        kind: "bar",
        note: "Percentage present, this month.",
        cfg: { labels: ["Level 1", "Level 2", "Level 3", "Level 4"], values: [91, 89, 86, 84] },
      })}
      ${chart({
        title: "Overall attendance trend",
        kind: "line",
        note: "Percentage present across all classes, month by month.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [{ name: "Present %", color: "#3FAE7A", values: [85, 86, 84, 87, 87, 88] }],
        },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Absence patterns</h3><span class="tiny muted">this month</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Student</th><th>Class</th><th>Linked to</th><th>Sessions</th><th>Absent</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Kabir Adisa</td><td>Level 4</td><td>House 91 · C</td><td>18</td><td>6</td></tr>
              <tr><td class="t-strong">Halima Obi</td><td>Level 2</td><td>House 8 · A</td><td>18</td><td>5</td></tr>
              <tr><td class="t-strong">Sadiq Adeyemi</td><td>Level 1</td><td>House 107 · Guardian</td><td>18</td><td>4</td></tr>
              <tr><td class="t-strong">Amina Balogun</td><td>Level 3</td><td>House 104 · Guardian</td><td>18</td><td>3</td></tr>
              <tr><td class="t-strong">Ibrahim Yusuf</td><td>Level 1</td><td>House 42 · B</td><td>18</td><td>2</td></tr>
            </tbody>
          </table>
        </div>
        <p class="chart-note">Highest-absence students first. Each absence marked fires a notification to the linked parent or guardian.</p>
      </div>
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Teacher / Minder activity</h3><span class="tiny muted">check-ins performed</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Staff</th><th>Role</th><th>Scope</th><th>Check-ins</th><th>Absences marked</th><th>Pickups</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Zainab Idris</td><td>Teacher</td><td>Level 2</td><td>96</td><td>11</td><td>0</td></tr>
              <tr><td class="t-strong">Abdullahi Yakubu</td><td>Teacher</td><td>Level 1</td><td>88</td><td>9</td><td>0</td></tr>
              <tr><td class="t-strong">Rukayat Sanni</td><td>Teacher</td><td>Level 3</td><td>74</td><td>14</td><td>0</td></tr>
              <tr><td class="t-strong">Tijani Umar</td><td>Teacher</td><td>Level 4</td><td>69</td><td>17</td><td>0</td></tr>
              <tr><td class="t-strong">Musa Garba</td><td>Minder</td><td>All classes</td><td>112</td><td>8</td><td>141</td></tr>
              <tr><td class="t-strong">Hafsat Bello</td><td>Minder</td><td>All classes</td><td>97</td><td>6</td><td>128</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      ${chart({
        title: "Pending-enrolment turnaround",
        kind: "line",
        note: "Average days from application to approval, both sources combined.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [{ name: "Days", color: "#E8C547", values: [4.2, 3.8, 3.5, 3.1, 3.0, 2.4] }],
        },
      })}
      ${chart({
        title: "Class size distribution",
        kind: "bar",
        note: "Students per class, current term.",
        cfg: { labels: ["Level 1", "Level 2", "Level 3", "Level 4"], values: [22, 24, 21, 17], colors: ["#3FAE7A", "#123528", "#3FAE7A", "#123528"] },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Pickup time patterns</h3><span class="tiny muted">day × hour</span></div>
        <div data-chart="heat" data-cfg='${cfgAttr({
          rows: ["Mon", "Tue", "Wed", "Thu", "Sat"],
          cols: ["12", "13", "17", "18", "19", "20"],
          values: [
            [0, 0, 8, 11, 9, 3],
            [0, 0, 7, 12, 9, 2],
            [0, 0, 8, 11, 10, 3],
            [0, 0, 7, 12, 8, 2],
            [9, 11, 1, 0, 0, 0],
          ],
        })}'></div>
        <p class="chart-note">Weekday pickups cluster at the 18:00 class change. Saturday sessions end at midday.</p>
      </div>
    </div>

    <button class="btn btn-quiet btn-block" style="margin-top:20px">Export report (PDF / CSV)</button>
    <div class="spacer-nav"></div>
  </main>
  ${navBar(NAV_MAD, "Insights")}`,
};
