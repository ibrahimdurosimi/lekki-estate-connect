// Teacher, Minder and External Guardian dashboards.
import { adminHeader, navBar, NAV_TEACH, NAV_MINDER, NAV_GUARDIAN, sheet, scrim, kpi } from "./lib.mjs";

/* ---------------------------------------------------- 32. Teacher dashboard */
export const teacherDashboard = {
  slug: "teacher-dashboard.html",
  title: "Teacher dashboard",
  desc: "Scoped to one assigned class: roster, check-in/out and academic progress notes per student.",
  body: `
  ${adminHeader({
    role: "Madrasa Teacher",
    title: "Level 2",
    sub: "Zainab Idris · Mon–Thu 16:00 – 17:30 · 24 students",
    unread: 3,
  })}
  <main class="sheet-body">
    <div class="note">You are scoped to Level 2 only. Other classes, their rosters and their records are not part of this view.</div>

    <div class="grid-2" style="margin-top:14px">
      ${kpi("Checked in", "21", "/ 24", "today's session", "flat")}
      ${kpi("Absent", "2", "", "marked by you", "flat")}
      ${kpi("Not arrived", "1", "", "session started 16:00", "flat")}
      ${kpi("Progress notes", "18", "", "this term", "up")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Today's roster</h2><span class="pill pill-mute">Level 2</span></div>
      <div class="chips" data-group="tfilter" data-filter-group="tfilter">
        <button type="button" class="chip" data-value="all" aria-pressed="true">All</button>
        <button type="button" class="chip" data-value="in">Checked in</button>
        <button type="button" class="chip" data-value="absent">Absent</button>
        <button type="button" class="chip" data-value="expected">Not arrived</button>
      </div>
      <div class="card flush" style="margin-top:12px" data-filter-scope="tfilter">
        <button class="row" data-open-sheet="sheet-student-t" data-tags="in,all"><span class="row-icon">MY</span><span class="grow"><span class="row-title">Maryam Yusuf</span><span class="row-sub">House 42 · Unit B · in 15:38</span></span><span class="pill pill-ok">In</span></button>
        <button class="row" data-open-sheet="sheet-student-t" data-tags="in,all"><span class="row-icon">FO</span><span class="grow"><span class="row-title">Fatima Ogunleye</span><span class="row-sub">House 63 · Unit B · in 15:41</span></span><span class="pill pill-ok">In</span></button>
        <button class="row" data-open-sheet="sheet-student-t" data-tags="absent,all"><span class="row-icon">HO</span><span class="grow"><span class="row-title">Halima Obi</span><span class="row-sub">House 8 · Unit A · marked absent 15:45</span></span><span class="pill pill-warn">Absent</span></button>
        <button class="row" data-open-sheet="sheet-student-t" data-tags="in,all"><span class="row-icon">AD</span><span class="grow"><span class="row-title">Aisha Danladi</span><span class="row-sub">House 17 · Unit A · in 15:52</span></span><span class="pill pill-ok">In</span></button>
        <button class="row" data-open-sheet="sheet-student-t" data-tags="in,all"><span class="row-icon">YB</span><span class="grow"><span class="row-title">Yusuf Balogun</span><span class="row-sub">House 104 · External Guardian · in 15:55</span></span><span class="pill pill-ok">In</span></button>
        <button class="row" data-open-sheet="sheet-student-t" data-tags="expected,all"><span class="row-icon">NE</span><span class="grow"><span class="row-title">Ngozi Eze</span><span class="row-sub">House 27 · Unit A · not arrived</span></span><span class="pill pill-mute">Expected</span></button>
        <button class="row" data-open-sheet="sheet-student-t" data-tags="absent,all"><span class="row-icon">SM</span><span class="grow"><span class="row-title">Sadiq Musa</span><span class="row-sub">House 12 · Unit A · marked absent 15:44</span></span><span class="pill pill-warn">Absent</span></button>
      </div>
      <div class="pair" style="margin-top:12px">
        <button class="btn btn-ghost" data-open-sheet="sheet-checkin-t">Mark absent</button>
        <button class="btn" data-open-sheet="sheet-checkin-t">Check in / out</button>
      </div>
      <p class="tiny muted" style="margin-top:10px">Checking a student in, marking them absent or checking them out sends push and email to the linked resident or External Guardian directly from you.</p>
    </div>

    <div class="section">
      <div class="section-head"><h2>Progress notes</h2><button class="btn btn-sm" data-open-sheet="sheet-note-t">Add note</button></div>
      <div class="card">
        <div class="card-head"><div class="grow"><h3>Maryam Yusuf</h3><p class="tiny muted" style="margin-top:3px">Level 2 · last note 29 Aug</p></div><span class="pill pill-ok">On track</span></div>
        <p class="tiny" style="margin-top:10px">Memorisation steady, reading fluency improving. Continue current pace this term.</p>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Sadiq Musa</h3><p class="tiny muted" style="margin-top:3px">Level 2 · last note 27 Aug</p></div><span class="pill pill-warn">Needs support</span></div>
        <p class="tiny" style="margin-top:10px">Attendance affecting progress. Follow up with the household at the next session.</p>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Yusuf Balogun</h3><p class="tiny muted" style="margin-top:3px">Level 2 · last note 26 Aug</p></div><span class="pill pill-ok">On track</span></div>
        <p class="tiny" style="margin-top:10px">Settled well since joining in May. Confident in recitation.</p>
      </div>
      <p class="tiny muted" style="margin-top:10px">Progress notes belong to the Teacher role only — Minders do not record them.</p>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-checkin-t",
    title: "Check in / out",
    sub: "Level 2 · today's session",
    bodyHtml: `<label class="field"><span class="label">Student</span><select class="select"><option>Maryam Yusuf</option><option>Fatima Ogunleye</option><option>Halima Obi</option><option>Aisha Danladi</option><option>Yusuf Balogun</option><option>Ngozi Eze</option><option>Sadiq Musa</option></select></label>
    <label class="field"><span class="label">Action</span><select class="select"><option>Check in</option><option>Mark absent</option><option>Check out / picked up</option></select></label>
    <label class="field"><span class="label">Collected by (check-out only)</span><input class="input" placeholder="Name of the person collecting"></label>
    <div class="note">The linked parent or guardian is notified as soon as this is saved — push and email together.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save</button>`,
  })}
  ${sheet({
    id: "sheet-note-t",
    title: "Progress note",
    sub: "Level 2 only",
    bodyHtml: `<label class="field"><span class="label">Student</span><select class="select"><option>Maryam Yusuf</option><option>Fatima Ogunleye</option><option>Halima Obi</option><option>Aisha Danladi</option><option>Yusuf Balogun</option><option>Ngozi Eze</option><option>Sadiq Musa</option></select></label>
    <label class="field"><span class="label">Status</span><select class="select"><option>On track</option><option>Needs support</option></select></label>
    <label class="field"><span class="label">Note</span><textarea class="textarea" rows="3" placeholder="Short factual observation"></textarea></label>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save note</button>`,
  })}
  ${sheet({
    id: "sheet-student-t",
    title: "Maryam Yusuf",
    sub: "Level 2 · House 42 · Unit B",
    bodyHtml: `<table class="table">
      <tbody>
        <tr><td class="t-strong">Class / level</td><td>Level 2</td></tr>
        <tr><td class="t-strong">Linked to</td><td>House 42 · Unit B — Ahmed Yusuf</td></tr>
        <tr><td class="t-strong">Next of kin</td><td>Ahmed Yusuf (Father) · 0803 000 0142</td></tr>
        <tr><td class="t-strong">Emergency contact</td><td>Fatima Yusuf (Mother) · 0803 000 0143</td></tr>
        <tr><td class="t-strong">Today</td><td><span class="pill pill-ok">Checked in 15:38</span></td></tr>
      </tbody>
    </table>
    <div class="note" style="margin-top:12px">Record edits beyond check-in, absence and progress notes are made by the Madrasa Admin.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Close</button><button class="btn" data-close-sheet>Add progress note</button>`,
  })}
  ${navBar(NAV_TEACH, "Class")}`,
};

/* ----------------------------------------------------- 33. Minder dashboard */
export const minderDashboard = {
  slug: "minder-dashboard.html",
  title: "Minder dashboard",
  desc: "Supervision across all classes — roster and check-in/out only, no progress notes.",
  body: `
  ${adminHeader({
    role: "Madrasa Minder",
    title: "All classes",
    sub: "Musa Garba · pickup, playground and lunch supervision · 84 students",
    unread: 3,
  })}
  <main class="sheet-body">
    <div class="note">Minders act across every class. Check-in, absence and pickup only — progress notes are the Teacher's.</div>

    <div class="grid-2" style="margin-top:14px">
      ${kpi("Checked in", "71", "/ 84", "all classes", "flat")}
      ${kpi("Absent", "9", "", "marked today", "flat")}
      ${kpi("Not arrived", "4", "", "Level 3 and 4 start 17:30", "flat")}
      ${kpi("Pickups done", "18", "", "so far today", "up")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Roster — all classes</h2><button class="btn btn-sm" data-open-sheet="sheet-checkin-m">Check in / out</button></div>
      <div class="seg" data-group="mclass" role="group" aria-label="Class">
        <button type="button" aria-pressed="true">All</button><button type="button">Level 1</button><button type="button">Level 2</button><button type="button">Level 3</button><button type="button">Level 4</button>
      </div>
      <div class="card flush" style="margin-top:12px">
        <button class="row" data-open-sheet="sheet-checkin-m"><span class="row-icon">MY</span><span class="grow"><span class="row-title">Maryam Yusuf · Level 2</span><span class="row-sub">House 42 · Unit B · in 15:38</span></span><span class="pill pill-ok">In</span></button>
        <button class="row" data-open-sheet="sheet-checkin-m"><span class="row-icon">IY</span><span class="grow"><span class="row-title">Ibrahim Yusuf · Level 1</span><span class="row-sub">House 42 · Unit B · in 15:36</span></span><span class="pill pill-ok">In</span></button>
        <button class="row" data-open-sheet="sheet-checkin-m"><span class="row-icon">AB</span><span class="grow"><span class="row-title">Amina Balogun · Level 3</span><span class="row-sub">House 104 · External Guardian · picked up 17:44</span></span><span class="pill pill-mute">Out</span></button>
        <button class="row" data-open-sheet="sheet-checkin-m"><span class="row-icon">HO</span><span class="grow"><span class="row-title">Halima Obi · Level 2</span><span class="row-sub">House 8 · Unit A · absent</span></span><span class="pill pill-warn">Absent</span></button>
        <button class="row" data-open-sheet="sheet-checkin-m"><span class="row-icon">SA</span><span class="grow"><span class="row-title">Sadiq Adeyemi · Level 1</span><span class="row-sub">House 107 · External Guardian · in 15:49</span></span><span class="pill pill-ok">In</span></button>
        <button class="row" data-open-sheet="sheet-checkin-m"><span class="row-icon">KA</span><span class="grow"><span class="row-title">Kabir Adisa · Level 4</span><span class="row-sub">House 91 · Unit C · not arrived</span></span><span class="pill pill-mute">Expected</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Pickups</h2><span class="pill pill-mute">Today</span></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">AB</span><span class="grow"><span class="row-title">Amina Balogun · Level 3</span><span class="row-sub">17:44 · collected by Sekinat Balogun (External Guardian, House 104)</span></span><span class="pill pill-ok">Done</span></div>
        <div class="row row-static"><span class="row-icon">FO</span><span class="grow"><span class="row-title">Fatima Ogunleye · Level 2</span><span class="row-sub">17:38 · collected by Folasade Ogunleye (House 63 · Unit B)</span></span><span class="pill pill-ok">Done</span></div>
        <div class="row row-static"><span class="row-icon">SA</span><span class="grow"><span class="row-title">Sadiq Adeyemi · Level 1</span><span class="row-sub">17:31 · collected by a pass holder sent by the guardian</span></span><span class="pill pill-ok">Done</span></div>
        <div class="row row-static"><span class="row-icon">MY</span><span class="grow"><span class="row-title">Maryam Yusuf · Level 2</span><span class="row-sub">Awaiting collection · session ends 17:30</span></span><span class="pill pill-mute">Waiting</span></div>
      </div>
      <p class="tiny muted" style="margin-top:10px">Each pickup you record notifies the linked parent or guardian directly.</p>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-checkin-m",
    title: "Check in / out",
    sub: "Any class",
    bodyHtml: `<label class="field"><span class="label">Class</span><select class="select"><option>Level 1</option><option selected>Level 2</option><option>Level 3</option><option>Level 4</option></select></label>
    <label class="field"><span class="label">Student</span><select class="select"><option>Maryam Yusuf</option><option>Ibrahim Yusuf</option><option>Amina Balogun</option><option>Halima Obi</option><option>Sadiq Adeyemi</option><option>Kabir Adisa</option></select></label>
    <label class="field"><span class="label">Action</span><select class="select"><option>Check in</option><option>Mark absent</option><option>Check out / picked up</option></select></label>
    <label class="field"><span class="label">Collected by (check-out only)</span><input class="input" placeholder="Name of the person collecting"></label>
    <div class="note">Minders do not record progress notes. The linked parent or guardian is notified as soon as this is saved.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save</button>`,
  })}
  ${navBar(NAV_MINDER, "Roster")}`,
};

/* ------------------------------------------ 34. External Guardian dashboard */
export const guardianDashboard = {
  slug: "guardian-dashboard.html",
  title: "External Guardian dashboard",
  desc: "Madrasa records for their own children, adding another child, the recurring Madrasa-access pass and check-in/absence/pickup notifications.",
  body: `
  ${adminHeader({
    role: "External Guardian",
    title: "Assalamu alaikum, Sekinat",
    sub: "House 104 · Madrasa access only",
    unread: 2,
  })}
  <main class="sheet-body">
    <div class="section" style="margin-top:0">
      <div class="section-head"><h2>My children</h2><span class="pill pill-mute">2</span></div>
      <div class="card">
        <div class="card-head"><div class="grow"><h3>Amina Balogun</h3><p class="tiny muted" style="margin-top:3px">Level 3 · Mon–Thu 17:30 – 19:00</p></div><span class="pill pill-ok">Enrolled</span></div>
        <div class="divider"></div>
        <table class="table">
          <tbody>
            <tr><td class="t-strong">Today</td><td>Checked in 17:26 · picked up 17:44</td></tr>
            <tr><td class="t-strong">Attendance</td><td>15 of 18 sessions this month</td></tr>
            <tr><td class="t-strong">Class</td><td>Level 3 · Rukayat Sanni</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Yusuf Balogun</h3><p class="tiny muted" style="margin-top:3px">Level 2 · Mon–Thu 16:00 – 17:30</p></div><span class="pill pill-ok">Enrolled</span></div>
        <div class="divider"></div>
        <table class="table">
          <tbody>
            <tr><td class="t-strong">Today</td><td>Checked in 15:55 · awaiting collection</td></tr>
            <tr><td class="t-strong">Attendance</td><td>17 of 18 sessions this month</td></tr>
            <tr><td class="t-strong">Class</td><td>Level 2 · Zainab Idris</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Ibrahim Balogun</h3><p class="tiny muted" style="margin-top:3px">Application submitted 30 Aug</p></div><span class="pill pill-warn">Pending</span></div>
        <p class="tiny" style="margin-top:10px">With the Madrasa Admin for placement. You will be notified once a class is assigned.</p>
      </div>
      <button class="btn btn-block" style="margin-top:12px" data-open-sheet="sheet-add-child">Register another child</button>
    </div>

    <div class="section">
      <div class="section-head"><h2>Madrasa access pass</h2><span class="pill pill-gold">Term-length</span></div>
      <div class="card gold">
        <div class="card-head"><div class="grow"><h3>Recurring Madrasa access</h3><p class="tiny muted" style="margin-top:3px">Multi-entry · valid for the term</p></div><span class="pill pill-ok">Active</span></div>
        <div class="code-display" style="margin-top:12px">7 3 1 4 R M</div>
        <table class="table" style="margin-top:12px">
          <tbody>
            <tr><td class="t-strong">Valid</td><td>14 Sep 2026 – 18 Dec 2026</td></tr>
            <tr><td class="t-strong">Entries</td><td>Unlimited within the date range</td></tr>
            <tr><td class="t-strong">Holder</td><td>Sekinat Balogun · House 104</td></tr>
            <tr><td class="t-strong">Purpose</td><td>Madrasa drop-off and collection</td></tr>
          </tbody>
        </table>
        <div class="pair" style="margin-top:12px">
          <button class="btn btn-ghost" data-open-sheet="sheet-delegate">Send someone else</button>
          <button class="btn" data-open-sheet="sheet-pass">Renew pass</button>
        </div>
      </div>
      <p class="tiny muted" style="margin-top:10px">This is the only pass on your account. It auto-expires at the end of the term date range.</p>
    </div>

    <div class="section" id="g-notifications">
      <div class="section-head"><h2>Notifications</h2><span class="pill pill-danger">2 new</span></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">✅</span><span class="grow"><span class="row-title">Yusuf checked in</span><span class="row-sub">15:55 today · by Zainab Idris, Level 2</span></span><span class="pill pill-ok">New</span></div>
        <div class="row row-static"><span class="row-icon">🚸</span><span class="grow"><span class="row-title">Amina picked up</span><span class="row-sub">17:44 today · collected by you · recorded by Musa Garba</span></span><span class="pill pill-ok">New</span></div>
        <div class="row row-static"><span class="row-icon">⚠️</span><span class="grow"><span class="row-title">Amina marked absent</span><span class="row-sub">28 Aug · by Rukayat Sanni, Level 3</span></span><span class="pill pill-mute">Seen</span></div>
        <div class="row row-static"><span class="row-icon">📣</span><span class="grow"><span class="row-title">New term begins 14 September</span><span class="row-sub">28 Aug · Madrasa notice</span></span><span class="pill pill-mute">Seen</span></div>
      </div>
      <p class="tiny muted" style="margin-top:10px">Check-in, absence and pickup are sent as push and email together.</p>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-add-child",
    title: "Register another child",
    sub: "Goes to the Madrasa Admin as a pending enrolment",
    bodyHtml: `<label class="field"><span class="label">Child's full name</span><input class="input" placeholder="Surname first"></label>
    <label class="field"><span class="label">Class / level requested</span><select class="select"><option>Level 1</option><option>Level 2</option><option>Level 3</option><option>Level 4</option></select></label>
    <label class="field"><span class="label">Next of kin</span><input class="input" value="Sekinat Balogun (Mother)"></label>
    <div class="pair">
      <label class="field"><span class="label">Next-of-kin phone</span><input class="input" inputmode="tel" value="0805 000 2210"></label>
      <label class="field"><span class="label">Emergency contact</span><input class="input" inputmode="tel" value="0805 000 2211"></label>
    </div>
    <div class="note">The Madrasa Admin places the child in a class. Your account already covers the family, so no new house number is issued.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Submit</button>`,
  })}
  ${sheet({
    id: "sheet-pass",
    title: "Renew Madrasa access pass",
    sub: "Multi-entry, term-length date range",
    bodyHtml: `<div class="pair">
      <label class="field"><span class="label">Start</span><input class="input" type="date" value="2026-09-14"></label>
      <label class="field"><span class="label">End</span><input class="input" type="date" value="2026-12-18"></label>
    </div>
    <div class="note">Unlimited entries between those dates. The pass expires automatically after the end date.</div>
    <p class="tiny muted" style="margin-top:14px">Confirm with your PIN</p>
    <div data-keypad data-length="6" data-mask="true" data-cta="#g-confirm" style="margin-top:10px"></div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" id="g-confirm" disabled data-close-sheet>Generate pass</button>`,
  })}
  ${sheet({
    id: "sheet-delegate",
    title: "Send someone to collect",
    sub: "A single pass issued to someone who is not you",
    bodyHtml: `<label class="field"><span class="label">Name of the person collecting</span><input class="input" placeholder="Full name"></label>
    <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
    <label class="field"><span class="label">Collecting</span><select class="select"><option>Amina Balogun</option><option>Yusuf Balogun</option><option>Both children</option></select></label>
    <label class="field"><span class="label">Date</span><input class="input" type="date" value="2026-09-01"></label>
    <div class="note">The code is sent to you to pass on. The Madrasa records who collected the child at pickup and notifies you.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Generate code</button>`,
  })}
  ${navBar(NAV_GUARDIAN, "Home")}`,
};
