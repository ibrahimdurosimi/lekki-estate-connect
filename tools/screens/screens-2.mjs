// Household management, community features, analytics, notifications
import { bell, bottomNav, sheet, scrim, sosFab, sosSheet, kpi, chart, rangeBar, subHeader, backLink } from "./lib.mjs";

/* ------------------------------------------------- 7. sub-account manager */
export const subAccounts = {
  slug: "sub-accounts.html",
  title: "Sub-accounts",
  desc: "Create and manage household sub-accounts. Primary residents only.",
  body: `
  ${subHeader({ title: "Sub-accounts", sub: "House 42 · Unit B — created instantly, no approval step" })}
  <main class="sheet-body">
    <div class="note">Sub-accounts share your house and unit and are told apart by their own PIN. They can issue any pass type but see only the passes they issued themselves.</div>

    <div class="section">
      <div class="section-head"><h2>Active · 3</h2></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">ZY</span><span class="grow"><span class="row-title">Zainab Yusuf</span><span class="row-sub">Spouse · 2 passes issued this month</span></span><button class="btn btn-ghost btn-sm" data-open-sheet="sheet-manage">Manage</button></div>
        <div class="row row-static"><span class="row-icon">TY</span><span class="grow"><span class="row-title">Tunde Yusuf</span><span class="row-sub">Son · 4 passes issued this month</span></span><button class="btn btn-ghost btn-sm" data-open-sheet="sheet-manage">Manage</button></div>
        <div class="row row-static"><span class="row-icon">FA</span><span class="grow"><span class="row-title">Fatima Adeleke</span><span class="row-sub">Mother-in-law · no passes yet</span></span><button class="btn btn-ghost btn-sm" data-open-sheet="sheet-manage">Manage</button></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Deactivated · 1</h2></div>
      <div class="card flush">
        <div class="row row-static" style="opacity:.65"><span class="row-icon" style="background:#EEF1F0">SO</span><span class="grow"><span class="row-title">Segun Okon</span><span class="row-sub">Former tenant · deactivated 12 July 2026</span></span><span class="pill pill-mute">Inactive</span></div>
      </div>
    </div>

    <button class="btn btn-block" style="margin-top:20px" data-open-sheet="sheet-add">Add a sub-account</button>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-add",
    title: "Add a sub-account",
    sub: "Created instantly — no Estate Manager approval needed",
    bodyHtml: `<div id="add-form">
      <label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
      <label class="field"><span class="label">Relationship to you</span>
        <select class="select"><option>Spouse</option><option>Child</option><option>Parent</option><option>Sibling</option><option>Other relative</option><option>Tenant in the same unit</option></select>
      </label>
      <div class="pair">
        <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
        <label class="field"><span class="label">Email</span><input class="input" type="email" placeholder="name@example.com"></label>
      </div>
      <div class="note">A 6-character PIN is generated automatically and shown once. Every pass this sub-account issues also notifies you.</div>
    </div>
    <div id="add-done" hidden>
      <div class="card center">
        <div style="font-size:32px">✅</div>
        <h3 style="margin-top:8px">Sub-account created</h3>
        <p class="tiny muted" style="margin-top:6px">House 42 · Unit B</p>
        <div class="divider"></div>
        <div class="tiny muted">System-generated PIN</div>
        <div class="code-display" style="margin-top:6px">7 4 2 9 K M</div>
        <div class="note note-gold" style="margin-top:14px;text-align:left">Shown once only. Write it down and hand it over in person — it cannot be displayed again. You can regenerate it from the Manage screen.</div>
      </div>
    </div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" id="create-sub">Create sub-account</button>`,
  })}
  ${sheet({
    id: "sheet-manage",
    title: "Manage sub-account",
    sub: "Zainab Yusuf · Spouse",
    bodyHtml: `<div class="card flush">
      <button class="row"><span class="row-icon">✏️</span><span class="grow"><span class="row-title">Edit details</span><span class="row-sub">Name, relationship, phone, email</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon">🔑</span><span class="grow"><span class="row-title">Regenerate PIN</span><span class="row-sub">Old PIN stops working immediately</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon">🎟️</span><span class="grow"><span class="row-title">Passes issued</span><span class="row-sub">2 this month</span></span><span class="chev">›</span></button>
    </div>
    <div class="card flush" style="margin-top:12px">
      <button class="row"><span class="row-icon" style="background:#FDF0D9">⏸</span><span class="grow"><span class="row-title">Deactivate</span><span class="row-sub">Keeps history, blocks sign-in and new passes</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon" style="background:#FBE6E5">🗑</span><span class="grow"><span class="row-title" style="color:var(--danger)">Remove sub-account</span><span class="row-sub">Active passes they issued are revoked</span></span><span class="chev">›</span></button>
    </div>`,
    footHtml: `<button class="btn btn-ghost btn-block" data-close-sheet>Close</button>`,
  })}
  ${bottomNav("Home")}`,
  script: `
  document.getElementById('create-sub').addEventListener('click', function(){
    document.getElementById('add-form').hidden = true;
    document.getElementById('add-done').hidden = false;
    this.textContent = 'Done';
    this.setAttribute('data-close-sheet','');
  });`,
};

/* ------------------------------------------------ 8. staff onboarding flow */
export const staffOnboarding = {
  slug: "staff-onboarding.html",
  title: "Household staff onboarding",
  desc: "Invite code, live-in or visiting selection, KYC and gate PIN setup for household staff.",
  body: `
  <header class="hero hero-sm">
    <div class="topbar">${backLink("welcome.html")}<div class="grow"></div><span class="pill" style="background:rgba(255,255,255,.14);color:#fff" id="step-pill">Step 1 of 4</span></div>
    <div style="margin-top:16px">
      <h1 style="font-size:25px" id="step-title">Household staff onboarding</h1>
      <p class="muted" style="margin-top:6px;font-size:13.5px" id="step-sub">You need the invite code from the resident who hired you.</p>
    </div>
    <div class="progress" style="margin-top:16px;background:rgba(255,255,255,.18)"><i id="step-bar" style="width:25%;background:var(--gold)"></i></div>
  </header>

  <main class="sheet-body">
    <!-- Step 1 — invite code -->
    <section data-step="1">
      <div class="card">
        <div class="card-head"><h3>Invite code</h3><span class="pill pill-mute">6 characters</span></div>
        <p class="tiny muted" style="margin-bottom:6px">Enter the code exactly as the household gave it to you. Codes expire 72 hours after they are generated.</p>
        <div data-keypad data-length="6" data-cta="#go1"></div>
      </div>
      <button class="btn btn-block" id="go1" style="margin-top:16px" disabled>Continue</button>
    </section>

    <!-- Step 2 — live-in vs visiting -->
    <section data-step="2" hidden>
      <div class="note">This choice sets your gate access rules and cannot be changed by you afterwards — only the household Primary can change it.</div>
      <div class="stack" style="margin-top:14px">
        <button class="card" style="text-align:left;width:100%;cursor:pointer" data-arrangement>
          <div class="card-head"><h3>Live-in</h3><span class="pill pill-ok">Always-on access</span></div>
          <p class="tiny muted">You reside at the household. No time window, no overstay concept — your PIN works at any hour, at either gate.</p>
        </button>
        <button class="card" style="text-align:left;width:100%;cursor:pointer" data-arrangement>
          <div class="card-head"><h3>Visiting</h3><span class="pill pill-warn">Scheduled hours</span></div>
          <p class="tiny muted">You come in on a schedule set by the household, structured like an Artisan pass. Arriving outside your window, or staying past it, raises an alert to the household, the Estate Manager and the Security Manager.</p>
        </button>
      </div>
      <div id="schedule-block" hidden style="margin-top:14px">
        <div class="card">
          <h3 style="margin-bottom:12px">Your schedule</h3>
          <div class="chips" data-group="days" data-multi style="padding-left:0;padding-right:0;margin:0">
            ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => `<button type="button" class="chip" aria-pressed="${i < 5}">${d}</button>`).join("")}
          </div>
          <div class="pair" style="margin-top:12px">
            <label class="field" style="margin-bottom:0"><span class="label">Start</span><input class="input" type="time" value="08:00"></label>
            <label class="field" style="margin-bottom:0"><span class="label">End</span><input class="input" type="time" value="17:00"></label>
          </div>
        </div>
      </div>
      <button class="btn btn-block" id="go2" style="margin-top:16px" disabled>Continue to identity check</button>
    </section>

    <!-- Step 3 — KYC -->
    <section data-step="3" hidden>
      <div class="card">
        <h3 style="margin-bottom:12px">Your identity</h3>
        <label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
        <label class="field"><span class="label">Phone number</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
        <div class="pair">
          <label class="field"><span class="label">ID type</span><select class="select"><option>National ID (NIN)</option><option>Driver's licence</option><option>Voter's card</option><option>International passport</option></select></label>
          <label class="field"><span class="label">ID number</span><input class="input" placeholder="Number on the document"></label>
        </div>
        <div class="field">
          <span class="label">Photo of the ID</span>
          <div class="card" style="border-style:dashed;text-align:center;padding:22px 14px;background:var(--mint-050)">
            <div style="font-size:26px">📷</div>
            <p class="tiny muted" style="margin-top:6px">Tap to photograph the front of your ID</p>
            <button class="btn btn-quiet btn-sm" style="margin-top:10px">Take photo</button>
          </div>
          <span class="hint">Stored with the estate office. Reviewed by the Estate Manager during gate audits.</span>
        </div>
      </div>

      <div class="card" style="margin-top:12px">
        <h3 style="margin-bottom:4px">Guarantor</h3>
        <p class="tiny muted" style="margin-bottom:12px">Someone who can vouch for you and is not a member of the hiring household.</p>
        <label class="field"><span class="label">Guarantor full name</span><input class="input" placeholder="Surname first"></label>
        <div class="pair">
          <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
          <label class="field"><span class="label">Relationship</span><input class="input" placeholder="e.g. Former employer"></label>
        </div>
        <label class="field" style="margin-bottom:0"><span class="label">Guarantor address</span><textarea class="textarea" style="min-height:76px" placeholder="Street, area, city"></textarea></label>
      </div>

      <button class="btn btn-block" id="go3" style="margin-top:16px">Continue to gate PIN</button>
    </section>

    <!-- Step 4 — gate PIN -->
    <section data-step="4" hidden>
      <div class="card">
        <div class="card-head"><h3>Set your gate PIN</h3><span class="pill pill-mute">4 digits · 2 letters</span></div>
        <p class="tiny muted" style="margin-bottom:6px">This is the only credential you will use. Household staff do not get a dashboard — after this screen the PIN works at the gate kiosk.</p>
        <div data-keypad data-length="6" data-strength data-cta="#go4"></div>
      </div>
      <div class="note" style="margin-top:14px">Never share your PIN. Every entry and exit is logged and notified to the household.</div>
      <button class="btn btn-block" id="go4" style="margin-top:16px" disabled>Finish onboarding</button>
    </section>

    <!-- Done -->
    <section data-step="5" hidden>
      <div class="card center">
        <div style="font-size:38px">🔑</div>
        <h2 style="margin-top:10px">Onboarding complete</h2>
        <p class="tiny muted" style="margin-top:8px">Your PIN is active at Gate 1 and Gate 2. House 42 · Unit B has been notified.</p>
        <div class="divider"></div>
        <div class="row row-static" style="border-radius:12px"><span class="row-icon">🏠</span><span class="grow"><span class="row-title">Visiting staff</span><span class="row-sub">Mon–Fri · 08:00–17:00</span></span><span class="pill pill-warn">Scheduled</span></div>
      </div>
      <a class="btn btn-ghost btn-block" style="margin-top:16px" href="welcome.html">Close</a>
    </section>

    <div class="spacer-nav"></div>
  </main>`,
  script: `
  var steps = { titles: ['','Invite code','Live-in or visiting?','Identity &amp; guarantor','Your gate PIN','All set'],
    subs: ['','You need the invite code from the resident who hired you.','This determines your access rules, so it comes first.','Know-your-customer details kept by the estate office.','Six characters — four digits and two letters.','Your gate access is live.'] };
  function show(n){
    document.querySelectorAll('[data-step]').forEach(function(s){ s.hidden = s.getAttribute('data-step') !== String(n); });
    document.getElementById('step-pill').textContent = n >= 5 ? 'Complete' : 'Step ' + n + ' of 4';
    document.getElementById('step-title').innerHTML = steps.titles[n];
    document.getElementById('step-sub').innerHTML = steps.subs[n];
    document.getElementById('step-bar').style.width = Math.min(100, n * 25) + '%';
    window.scrollTo(0,0);
  }
  document.getElementById('go1').addEventListener('click', function(){ show(2); });
  document.querySelectorAll('[data-arrangement]').forEach(function(b, i){
    b.addEventListener('click', function(){
      document.querySelectorAll('[data-arrangement]').forEach(function(x){ x.style.borderColor='var(--line)'; x.style.background='var(--surface)'; });
      b.style.borderColor = 'var(--mint)'; b.style.background = 'var(--mint-050)';
      document.getElementById('schedule-block').hidden = (i === 0);
      document.getElementById('go2').removeAttribute('disabled');
    });
  });
  document.getElementById('go2').addEventListener('click', function(){ show(3); });
  document.getElementById('go3').addEventListener('click', function(){ show(4); });
  document.getElementById('go4').addEventListener('click', function(){ show(5); });`,
};

/* ------------------------------------------------- 9. staff management */
export const staffManagement = {
  slug: "staff-management.html",
  title: "Household staff",
  desc: "Manage live-in and visiting household staff, their gate activity and invite codes.",
  body: `
  ${subHeader({ title: "Household staff", sub: "House 42 · Unit B — 2 active, 1 inactive" })}
  <main class="sheet-body">
    <div class="grid-2">
      ${kpi("Live-in", "1", "", "Always-on access", "flat")}
      ${kpi("Visiting", "1", "", "Mon–Sat · 07:30–16:00", "flat")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Active staff</h2></div>
      <div class="stack">
        <div class="card">
          <div class="card-head">
            <div><h3 style="font-size:15.5px">Amina Sule</h3><p class="tiny muted" style="margin-top:3px">Housekeeper · onboarded 4 March 2026</p></div>
            <span class="pill pill-ok">Active</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="pill">Live-in</span><span class="pill pill-mute">No time window</span></div>
          <div class="divider" style="margin:12px 0"></div>
          <div class="row row-static" style="padding:0"><span class="grow"><span class="row-sub">Last gate activity</span><span class="row-title" style="font-size:13px">Checked out · Gate 1 · yesterday 19:05</span></span><button class="btn btn-ghost btn-sm" data-open-sheet="sheet-staff">Manage</button></div>
        </div>

        <div class="card">
          <div class="card-head">
            <div><h3 style="font-size:15.5px">Emeka Nwosu</h3><p class="tiny muted" style="margin-top:3px">Driver · onboarded 19 June 2026</p></div>
            <span class="pill pill-ok">Active</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="pill pill-warn">Visiting</span><span class="pill pill-mute">Mon–Sat · 07:30–16:00</span></div>
          <div class="divider" style="margin:12px 0"></div>
          <div class="row row-static" style="padding:0"><span class="grow"><span class="row-sub">Last gate activity</span><span class="row-title" style="font-size:13px">Checked in · Gate 2 · today 07:41</span></span><button class="btn btn-ghost btn-sm" data-open-sheet="sheet-staff">Manage</button></div>
          <div class="note note-gold" style="margin-top:12px">1 overstay in the last 30 days — left at 17:22 on 21 August, 52 minutes past the window.</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Inactive</h2></div>
      <div class="card flush">
        <div class="row row-static" style="opacity:.65"><span class="row-icon" style="background:#EEF1F0">GB</span><span class="grow"><span class="row-title">Grace Bassey</span><span class="row-sub">Visiting · gate PIN revoked 2 May 2026</span></span><span class="pill pill-mute">Inactive</span></div>
      </div>
    </div>

    <button class="btn btn-block" style="margin-top:20px" data-open-sheet="sheet-invite">Generate a new invite code</button>
    <p class="tiny muted center" style="margin-top:10px">The person you hire uses this code to complete KYC and set their own gate PIN.</p>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-invite",
    title: "New staff invite code",
    sub: "Valid for 72 hours, single use",
    bodyHtml: `<div class="card center">
      <div class="tiny muted">Give this code to your new staff member</div>
      <div class="code-display" style="margin-top:8px">5 8 3 1 R P</div>
      <p class="tiny muted" style="margin-top:10px">Expires Friday 4 September, 10:46</p>
      <div class="divider"></div>
      <p class="tiny muted" style="text-align:left">They open the portal, choose <b>Household staff onboarding</b>, enter this code, choose live-in or visiting, complete KYC with ID and guarantor details, then set their own gate PIN.</p>
    </div>
    <div class="card" style="margin-top:12px">
      <label class="field" style="margin-bottom:0"><span class="label">Expected role (optional)</span><input class="input" placeholder="e.g. Gardener"></label>
    </div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Close</button><button class="btn" data-close-sheet>Share code</button>`,
  })}
  ${sheet({
    id: "sheet-staff",
    title: "Manage staff member",
    sub: "Emeka Nwosu · Visiting",
    bodyHtml: `<div class="card flush">
      <button class="row"><span class="row-icon">🕒</span><span class="grow"><span class="row-title">Change schedule</span><span class="row-sub">Days and hours of the access window</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon">🔁</span><span class="grow"><span class="row-title">Switch to live-in</span><span class="row-sub">Removes the time window and overstay rules</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon">📄</span><span class="grow"><span class="row-title">View KYC record</span><span class="row-sub">ID, photo and guarantor details</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon">📊</span><span class="grow"><span class="row-title">Attendance pattern</span><span class="row-sub">Hours and punctuality</span></span><span class="chev">›</span></button>
    </div>
    <div class="card flush" style="margin-top:12px">
      <button class="row"><span class="row-icon" style="background:#FBE6E5">🚫</span><span class="grow"><span class="row-title" style="color:var(--danger)">Revoke gate PIN</span><span class="row-sub">Takes effect at both gates immediately</span></span><span class="chev">›</span></button>
    </div>`,
    footHtml: `<button class="btn btn-ghost btn-block" data-close-sheet>Close</button>`,
  })}
  ${bottomNav("Home")}`,
};

/* ------------------------------------------------------ 10. facilities */
const FACILITIES = [
  ["Football Pitch", "⚽", "Floodlit · 5-a-side", "₦15,000 / 2 hrs", "₦20,000 deposit"],
  ["Mosque Hall", "🕌", "Seats 120 · events only", "No fee", "₦10,000 deposit"],
  ["Community Kitchen", "🍲", "Industrial cookers", "₦8,000 / session", "₦15,000 deposit"],
  ["Clubhouse", "🎉", "Seats 60 · AC", "₦25,000 / 4 hrs", "₦30,000 deposit"],
];

export const facilities = {
  slug: "facilities.html",
  title: "Facility booking",
  desc: "Book the pitch, mosque hall, community kitchen or clubhouse.",
  body: `
  ${subHeader({ title: "Book a facility", sub: "Bookings are reviewed by the Estate Manager" })}
  <main class="sheet-body">
    <div class="section" style="margin-top:0">
      <div class="section-head"><h2>Choose a facility</h2></div>
      <div class="carousel" data-group="facility">
        ${FACILITIES.map(([n, ico, sub, fee, dep], i) => `<button type="button" class="tile carousel-card" style="width:172px;align-items:flex-start;text-align:left;padding:14px" aria-pressed="${i === 0}">
          <span class="tile-ico">${ico}</span>
          <span class="tile-label" style="font-size:14px">${n}</span>
          <span class="tiny muted">${sub}</span>
          <span class="pill pill-mute" style="margin-top:4px">${fee}</span>
        </button>`).join("")}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h3>Pick a date</h3><span class="tiny muted">September 2026</span></div>
      <div class="chips" data-group="date">
        ${[["Tue", 1], ["Wed", 2], ["Thu", 3], ["Fri", 4], ["Sat", 5], ["Sun", 6], ["Mon", 7], ["Tue", 8]].map(([d, n], i) => `<button type="button" class="day" aria-pressed="${i === 4}"><span class="d-dow">${d}</span><span class="d-num">${n}</span></button>`).join("")}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h3>Available slots</h3><span class="pill pill-mute">Sat 5 Sept</span></div>
      <div class="grid-2" data-group="slot">
        <button type="button" class="slot">07:00 – 09:00</button>
        <button type="button" class="slot" disabled>09:00 – 11:00<br><small>Booked</small></button>
        <button type="button" class="slot" aria-pressed="true">11:00 – 13:00</button>
        <button type="button" class="slot" disabled>13:00 – 15:00<br><small>Booked</small></button>
        <button type="button" class="slot">15:00 – 17:00</button>
        <button type="button" class="slot" disabled>17:00 – 19:00<br><small>Estate event</small></button>
      </div>
      <div class="note" style="margin-top:12px"><b>Football Pitch</b> — ₦15,000 for a 2-hour slot, plus a ₦20,000 refundable deposit. The deposit is returned within 3 working days of the Estate Manager's post-use inspection.</div>
      <button class="btn btn-block" style="margin-top:14px" data-open-sheet="sheet-confirm">Request this slot</button>
    </div>

    <div class="section">
      <div class="section-head"><h2>My bookings</h2></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">⚽</span><span class="grow"><span class="row-title">Football Pitch</span><span class="row-sub">Sat 12 Sept · 15:00–17:00</span></span><span class="pill pill-ok">Confirmed</span></div>
        <div class="row row-static"><span class="row-icon">🎉</span><span class="grow"><span class="row-title">Clubhouse</span><span class="row-sub">Sun 20 Sept · 12:00–16:00</span></span><span class="pill pill-warn">Awaiting review</span></div>
        <div class="row row-static"><span class="row-icon">🍲</span><span class="grow"><span class="row-title">Community Kitchen</span><span class="row-sub">Sat 15 Aug · 08:00–12:00</span></span><span class="pill pill-mute">Completed</span></div>
        <div class="row row-static"><span class="row-icon">🕌</span><span class="grow"><span class="row-title">Mosque Hall</span><span class="row-sub">Fri 1 Aug · 16:00–18:00</span></span><span class="pill pill-danger">Declined</span></div>
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-confirm",
    title: "Confirm booking request",
    sub: "Football Pitch · Sat 5 Sept · 11:00–13:00",
    bodyHtml: `<div class="card">
      <div class="row row-static" style="padding:8px 0"><span class="grow"><span class="row-sub">Slot fee</span></span><b style="color:var(--ink)">₦15,000</b></div>
      <div class="row row-static" style="padding:8px 0"><span class="grow"><span class="row-sub">Refundable deposit</span></span><b style="color:var(--ink)">₦20,000</b></div>
      <div class="divider" style="margin:8px 0"></div>
      <div class="row row-static" style="padding:8px 0"><span class="grow"><span class="row-title">Total payable now</span></span><b style="color:var(--ink);font-size:16px">₦35,000</b></div>
    </div>
    <label class="field" style="margin-top:12px"><span class="label">Purpose</span><input class="input" placeholder="e.g. Boys' inter-street match"></label>
    <label class="field"><span class="label">Expected attendance</span><input class="input" inputmode="numeric" placeholder="e.g. 24"></label>
    <div class="note">Sending a request does not reserve the slot. The Estate Manager confirms or declines, and you are notified either way.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Back</button><button class="btn" data-close-sheet>Send request</button>`,
  })}
  ${bottomNav("Facilities")}`,
};

/* --------------------------------------------------------- 11. fix-it */
export const tickets = {
  slug: "tickets.html",
  title: "Fix-it tickets",
  desc: "Report estate maintenance issues and track them through to resolution.",
  body: `
  ${subHeader({ title: "Fix-it", sub: "Reported to the Estate Manager, assigned by job category" })}
  <main class="sheet-body">
    <div class="section" style="margin-top:0">
      <div class="section-head"><h2>Report an issue</h2></div>
      <div class="grid-4" data-group="cat">
        <button type="button" class="tile" aria-pressed="true"><span class="tile-ico">💡</span><span class="tile-label">Electrical</span></button>
        <button type="button" class="tile"><span class="tile-ico">🚰</span><span class="tile-label">Plumbing</span></button>
        <button type="button" class="tile"><span class="tile-ico">🛡️</span><span class="tile-label">Security</span></button>
        <button type="button" class="tile"><span class="tile-ico">🌿</span><span class="tile-label">Grounds</span></button>
        <button type="button" class="tile"><span class="tile-ico">🛣️</span><span class="tile-label">Roads</span></button>
        <button type="button" class="tile"><span class="tile-ico">🗑️</span><span class="tile-label">Waste</span></button>
        <button type="button" class="tile"><span class="tile-ico">🏗️</span><span class="tile-label">Structural</span></button>
        <button type="button" class="tile"><span class="tile-ico">📦</span><span class="tile-label">Other</span></button>
      </div>
      <div class="card" style="margin-top:12px">
        <label class="field"><span class="label">Where is it?</span><input class="input" value="House 42, Unit B" ></label>
        <label class="field"><span class="label">Describe the problem</span><textarea class="textarea" placeholder="What is wrong, since when, and anything the estate team should know before they arrive."></textarea></label>
        <div class="field" style="margin-bottom:0">
          <span class="label">Urgency</span>
          <div class="seg" data-group="urgency">
            <button type="button" aria-pressed="true">Low</button>
            <button type="button">Normal</button>
            <button type="button">High</button>
            <button type="button">Emergency</button>
          </div>
          <span class="hint">Emergency tickets also alert the Security Manager. Use SOS instead if there is immediate danger.</span>
        </div>
      </div>
      <button class="btn btn-block" style="margin-top:14px" data-open-sheet="sheet-ticket">Submit ticket</button>
    </div>

    <div class="section">
      <div class="section-head"><h2>My tickets</h2><span class="pill pill-mute">4</span></div>
      <div class="stack">
        <div class="card">
          <div class="card-head"><div><h3 style="font-size:15px">Street light out at the corner</h3><p class="tiny muted" style="margin-top:3px">#FX-1042 · Electrical · reported 29 Aug</p></div><span class="pill pill-warn">High</span></div>
          <div class="stepper">
            <div class="st done"><span class="bead">✓</span><span class="st-label">Reported</span></div>
            <div class="st done"><span class="bead">✓</span><span class="st-label">Assigned</span></div>
            <div class="st current"><span class="bead">•</span><span class="st-label">In Progress</span></div>
            <div class="st"><span class="bead"></span><span class="st-label">Resolved</span></div>
          </div>
          <p class="tiny muted" style="margin-top:12px">Assigned to the maintenance category. Estate Manager last updated this 2 days ago.</p>
        </div>

        <div class="card">
          <div class="card-head"><div><h3 style="font-size:15px">Water pressure low in the mornings</h3><p class="tiny muted" style="margin-top:3px">#FX-1038 · Plumbing · reported 24 Aug</p></div><span class="pill pill-mute">Normal</span></div>
          <div class="stepper">
            <div class="st done"><span class="bead">✓</span><span class="st-label">Reported</span></div>
            <div class="st current"><span class="bead">•</span><span class="st-label">Assigned</span></div>
            <div class="st"><span class="bead"></span><span class="st-label">In Progress</span></div>
            <div class="st"><span class="bead"></span><span class="st-label">Resolved</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><div><h3 style="font-size:15px">Gate 2 intercom crackling</h3><p class="tiny muted" style="margin-top:3px">#FX-1031 · Security · reported 11 Aug</p></div><span class="pill pill-ok">Resolved</span></div>
          <div class="stepper">
            <div class="st done"><span class="bead">✓</span><span class="st-label">Reported</span></div>
            <div class="st done"><span class="bead">✓</span><span class="st-label">Assigned</span></div>
            <div class="st done"><span class="bead">✓</span><span class="st-label">In Progress</span></div>
            <div class="st done"><span class="bead">✓</span><span class="st-label">Resolved</span></div>
          </div>
          <p class="tiny muted" style="margin-top:12px">Closed 18 Aug · 7 days to resolution.</p>
        </div>

        <div class="card">
          <div class="card-head"><div><h3 style="font-size:15px">Refuse not collected on Tuesday</h3><p class="tiny muted" style="margin-top:3px">#FX-1049 · Waste · reported today</p></div><span class="pill pill-mute">Low</span></div>
          <div class="stepper">
            <div class="st current"><span class="bead">•</span><span class="st-label">Reported</span></div>
            <div class="st"><span class="bead"></span><span class="st-label">Assigned</span></div>
            <div class="st"><span class="bead"></span><span class="st-label">In Progress</span></div>
            <div class="st"><span class="bead"></span><span class="st-label">Resolved</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-ticket",
    title: "Ticket submitted",
    sub: "#FX-1050 · Electrical · Low",
    bodyHtml: `<div class="card center">
      <div style="font-size:32px">🔧</div>
      <h3 style="margin-top:8px">Sent to the Estate Manager</h3>
      <p class="tiny muted" style="margin-top:8px">Tickets are assigned by job category rather than to a named person. You will be notified at each status change.</p>
    </div>`,
    footHtml: `<button class="btn btn-block" data-close-sheet>Done</button>`,
  })}
  ${bottomNav("Home")}`,
};

/* --------------------------------------------------------- 12. notices */
export const notices = {
  slug: "notices.html",
  title: "Notice board",
  desc: "Estate notices filtered by emergency, information and maintenance.",
  body: `
  ${subHeader({ title: "Notice board", sub: "Posted by the Estate Manager and the Madrasa" })}
  <main class="sheet-body">
    <div class="chips" data-group="notice" data-filter-group="notice">
      <button type="button" class="chip" data-value="all" aria-pressed="true">All</button>
      <button type="button" class="chip" data-value="emergency">Emergency</button>
      <button type="button" class="chip" data-value="info">Info</button>
      <button type="button" class="chip" data-value="maintenance">Maintenance</button>
    </div>

    <div class="stack" data-filter-scope="notice">
      <article class="card" data-tags="emergency">
        <div class="card-head"><span class="pill pill-danger">Emergency</span><span class="tiny muted">Today · 06:20</span></div>
        <h3>Burst main on Lighthouse Close</h3>
        <p class="tiny" style="margin-top:6px">Water to houses 30–48 is shut off while the main is repaired. Tankers are stationed at the clubhouse car park. Expected restoration this evening.</p>
        <p class="tiny muted" style="margin-top:8px">Estate Manager · Ifeoma Duru</p>
      </article>

      <article class="card" data-tags="maintenance">
        <div class="card-head"><span class="pill pill-warn">Maintenance</span><span class="tiny muted">Yesterday</span></div>
        <h3>Generator servicing, Thursday 07:00–10:00</h3>
        <p class="tiny" style="margin-top:6px">Estate power switches to grid supply only during the service window. Please plan around possible interruptions.</p>
        <p class="tiny muted" style="margin-top:8px">Estate Manager · Ifeoma Duru</p>
      </article>

      <article class="card" data-tags="info">
        <div class="card-head"><span class="pill pill-info">Info</span><span class="tiny muted">30 Aug</span></div>
        <h3>Jumu'ah timing moves to 13:15</h3>
        <p class="tiny" style="margin-top:6px">From this Friday the khutbah begins at 13:15. Jumu'ah passes for guests remain valid across the fixed 12:00–14:30 window.</p>
        <p class="tiny muted" style="margin-top:8px">Estate Imam</p>
      </article>

      <article class="card" data-tags="info">
        <div class="card-head"><span class="pill pill-info">Info</span><span class="tiny muted">28 Aug</span></div>
        <h3>Madrasa new term begins 14 September</h3>
        <p class="tiny" style="margin-top:6px">Class lists are published on the Madrasa noticeboard. Guardians collecting children must hold a valid pickup pass.</p>
        <p class="tiny muted" style="margin-top:8px">Madrasa Admin</p>
      </article>

      <article class="card" data-tags="maintenance">
        <div class="card-head"><span class="pill pill-warn">Maintenance</span><span class="tiny muted">21 Aug</span></div>
        <h3>Gate 2 barrier replacement</h3>
        <p class="tiny" style="margin-top:6px">Gate 2 will operate as pedestrian-only for three days. Please route vehicles through Gate 1.</p>
        <p class="tiny muted" style="margin-top:8px">Estate Security Manager</p>
      </article>

      <article class="card" data-tags="info">
        <div class="card-head"><span class="pill pill-info">Info</span><span class="tiny muted">15 Aug</span></div>
        <h3>2026 service charge second instalment</h3>
        <p class="tiny" style="margin-top:6px">The second instalment falls due on 30 September. Statements are available in your dues history.</p>
        <p class="tiny muted" style="margin-top:8px">Estate Manager · Ifeoma Duru</p>
      </article>
    </div>
    <div class="spacer-nav"></div>
  </main>
  ${bottomNav("Notices")}`,
};

/* ----------------------------------------------------------- 13. polls */
export const polls = {
  slug: "polls.html",
  title: "Townhall polls",
  desc: "Vote in estate townhall polls and review closed poll results.",
  body: `
  ${subHeader({ title: "Townhall", sub: "One vote per resident account" })}
  <main class="sheet-body">
    <div class="section" style="margin-top:0">
      <div class="section-head"><h2>Open polls</h2><span class="pill pill-ok">2 open</span></div>
      <div class="stack">
        <article class="card" data-poll>
          <div class="card-head"><span class="pill pill-gold">Closes in 3 days</span><span class="tiny muted">64 of 118 households voted</span></div>
          <h3>Should the estate fund a second borehole?</h3>
          <p class="tiny muted" style="margin-top:6px">A one-off levy of ₦45,000 per household would cover drilling and the storage tank.</p>
          <div data-options>
            <button class="opt-btn" data-vote>Yes — fund it this year</button>
            <button class="opt-btn" data-vote>Yes, but phase it over two years</button>
            <button class="opt-btn" data-vote>No — repair the existing borehole first</button>
          </div>
          <div data-results hidden style="margin-top:12px">
            <div class="result-bar"><div class="rb-top"><span>Yes — fund it this year</span><b>48%</b></div><div class="rb-track"><div class="rb-fill" data-pct="48"></div></div></div>
            <div class="result-bar"><div class="rb-top"><span>Yes, but phase it over two years</span><b>31%</b></div><div class="rb-track"><div class="rb-fill alt" data-pct="31"></div></div></div>
            <div class="result-bar"><div class="rb-top"><span>No — repair the existing one first</span><b>21%</b></div><div class="rb-track"><div class="rb-fill gold" data-pct="21"></div></div></div>
            <p class="tiny muted" style="margin-top:10px">✓ Your vote has been recorded. Results update live until the poll closes.</p>
          </div>
        </article>

        <article class="card" data-poll>
          <div class="card-head"><span class="pill pill-gold">Closes in 9 days</span><span class="tiny muted">22 of 118 households voted</span></div>
          <h3>Preferred day for the estate clean-up</h3>
          <div data-options>
            <button class="opt-btn" data-vote>Last Saturday of the month</button>
            <button class="opt-btn" data-vote>First Sunday of the month</button>
            <button class="opt-btn" data-vote>Quarterly instead of monthly</button>
          </div>
          <div data-results hidden style="margin-top:12px">
            <div class="result-bar"><div class="rb-top"><span>Last Saturday of the month</span><b>59%</b></div><div class="rb-track"><div class="rb-fill" data-pct="59"></div></div></div>
            <div class="result-bar"><div class="rb-top"><span>First Sunday of the month</span><b>27%</b></div><div class="rb-track"><div class="rb-fill alt" data-pct="27"></div></div></div>
            <div class="result-bar"><div class="rb-top"><span>Quarterly instead of monthly</span><b>14%</b></div><div class="rb-track"><div class="rb-fill gold" data-pct="14"></div></div></div>
          </div>
        </article>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Closed polls</h2></div>
      <div class="stack">
        <article class="card">
          <div class="card-head"><span class="pill pill-mute">Closed 12 Aug</span><span class="tiny muted">101 of 118 households · 86% turnout</span></div>
          <h3 style="font-size:16px">Extend visitor parking to the north verge?</h3>
          <div style="margin-top:10px">
            <div class="result-bar"><div class="rb-top"><span>Yes</span><b>72%</b></div><div class="rb-track"><div class="rb-fill" style="width:72%"></div></div></div>
            <div class="result-bar"><div class="rb-top"><span>No</span><b>28%</b></div><div class="rb-track"><div class="rb-fill alt" style="width:28%"></div></div></div>
          </div>
          <p class="tiny muted" style="margin-top:10px">Carried. Implemented by the Estate Manager on 25 August.</p>
        </article>

        <article class="card">
          <div class="card-head"><span class="pill pill-mute">Closed 3 Jul</span><span class="tiny muted">78 of 116 households · 67% turnout</span></div>
          <h3 style="font-size:16px">Night-time gate closing hour</h3>
          <div style="margin-top:10px">
            <div class="result-bar"><div class="rb-top"><span>Keep both gates open 24 hours</span><b>54%</b></div><div class="rb-track"><div class="rb-fill" style="width:54%"></div></div></div>
            <div class="result-bar"><div class="rb-top"><span>Close Gate 2 from 10pm</span><b>46%</b></div><div class="rb-track"><div class="rb-fill alt" style="width:46%"></div></div></div>
          </div>
        </article>
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>
  ${bottomNav("Notices")}`,
};

/* ------------------------------------------------------ 14. marketplace */
export const marketplace = {
  slug: "marketplace.html",
  title: "Marketplace",
  desc: "Resident marketplace — buy, sell and give away within the estate.",
  body: `
  ${subHeader({ title: "Marketplace", sub: "Residents only. Contact happens in-app — phone numbers stay private." })}
  <main class="sheet-body">
    <div class="chips" data-group="mk" data-filter-group="mk">
      <button type="button" class="chip" data-value="all" aria-pressed="true">All</button>
      <button type="button" class="chip" data-value="home">Home</button>
      <button type="button" class="chip" data-value="food">Food</button>
      <button type="button" class="chip" data-value="services">Services</button>
      <button type="button" class="chip" data-value="kids">Kids</button>
      <button type="button" class="chip" data-value="giveaway">Giveaway</button>
    </div>

    <div class="grid-2" data-filter-scope="mk">
      <article class="mk-card" data-tags="home">
        <div class="mk-thumb">🛋️</div>
        <div class="mk-body"><div class="mk-title">Three-seater sofa, grey fabric</div><div class="mk-price">₦120,000</div><div class="tiny muted" style="margin-top:4px">House 17 · Unit A</div>
        <button class="btn btn-quiet btn-sm btn-block" style="margin-top:8px" data-open-sheet="sheet-msg">Message seller</button></div>
      </article>
      <article class="mk-card" data-tags="food">
        <div class="mk-thumb">🍞</div>
        <div class="mk-body"><div class="mk-title">Home-baked bread, Friday batch</div><div class="mk-price">₦3,500</div><div class="tiny muted" style="margin-top:4px">House 8 · Unit C</div>
        <button class="btn btn-quiet btn-sm btn-block" style="margin-top:8px" data-open-sheet="sheet-msg">Message seller</button></div>
      </article>
      <article class="mk-card" data-tags="kids,giveaway">
        <div class="mk-thumb" style="background:linear-gradient(135deg,var(--gold-100),#F7E9B8)">🧸</div>
        <div class="mk-body"><div class="mk-title">Toddler toys, bag of 12</div><div class="mk-price free">Free — giveaway</div><div class="tiny muted" style="margin-top:4px">House 63 · Unit B</div>
        <button class="btn btn-quiet btn-sm btn-block" style="margin-top:8px" data-open-sheet="sheet-msg">Message owner</button></div>
      </article>
      <article class="mk-card" data-tags="services">
        <div class="mk-thumb">✂️</div>
        <div class="mk-body"><div class="mk-title">Tailoring &amp; alterations</div><div class="mk-price">From ₦5,000</div><div class="tiny muted" style="margin-top:4px">House 29 · Unit D</div>
        <button class="btn btn-quiet btn-sm btn-block" style="margin-top:8px" data-open-sheet="sheet-msg">Message seller</button></div>
      </article>
      <article class="mk-card" data-tags="home,giveaway">
        <div class="mk-thumb" style="background:linear-gradient(135deg,var(--gold-100),#F7E9B8)">📚</div>
        <div class="mk-body"><div class="mk-title">Bookshelf, needs a repaint</div><div class="mk-price free">Free — collection only</div><div class="tiny muted" style="margin-top:4px">House 42 · Unit B</div>
        <button class="btn btn-quiet btn-sm btn-block" style="margin-top:8px" data-open-sheet="sheet-msg">Message owner</button></div>
      </article>
      <article class="mk-card" data-tags="services,kids">
        <div class="mk-thumb">📖</div>
        <div class="mk-body"><div class="mk-title">After-school maths tutoring</div><div class="mk-price">₦8,000 / week</div><div class="tiny muted" style="margin-top:4px">House 51 · Unit A</div>
        <button class="btn btn-quiet btn-sm btn-block" style="margin-top:8px" data-open-sheet="sheet-msg">Message seller</button></div>
      </article>
    </div>

    <button class="btn btn-block" style="margin-top:18px">Post a listing</button>
    <p class="tiny muted center" style="margin-top:10px">Trade at your own discretion. The estate does not mediate marketplace disputes.</p>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-msg",
    title: "Message seller",
    sub: "House 17 · Unit A — identity shown, number withheld",
    bodyHtml: `<div class="card">
      <div class="row row-static" style="padding:0"><span class="row-icon">🛋️</span><span class="grow"><span class="row-title">Three-seater sofa, grey fabric</span><span class="row-sub">₦120,000</span></span></div>
    </div>
    <label class="field" style="margin-top:12px"><span class="label">Your message</span><textarea class="textarea" placeholder="Is this still available? I can collect this weekend."></textarea></label>
    <div class="note">Replies arrive in your notification centre. Neither side sees the other's phone number unless you choose to share it in the conversation.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Send message</button>`,
  })}
  ${bottomNav("Home")}`,
};

/* -------------------------------------------------------- 15. settings */
export const settings = {
  slug: "settings.html",
  title: "Settings & profile",
  desc: "Edit personal details, next-of-kin, PIN and notification preferences.",
  body: `
  ${subHeader({ title: "Settings", sub: "Adebayo Yusuf · House 42 · Unit B · Primary" })}
  <main class="sheet-body">
    <div class="card">
      <h3 style="margin-bottom:12px">Personal details</h3>
      <label class="field"><span class="label">Full name</span><input class="input" value="Adebayo Yusuf"></label>
      <div class="pair">
        <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" value="080 4412 9087"></label>
        <label class="field"><span class="label">Email</span><input class="input" type="email" value="a.yusuf@example.com"></label>
      </div>
      <label class="field" style="margin-bottom:0"><span class="label">Relationship to the property</span>
        <select class="select"><option selected>Owner-occupier</option><option>Tenant</option><option>Landlord (non-resident)</option><option>Family of owner</option></select>
        <span class="hint">Changing this requires Estate Manager confirmation.</span>
      </label>
    </div>

    <div class="card" style="margin-top:12px">
      <h3 style="margin-bottom:12px">Next of kin</h3>
      <label class="field"><span class="label">Full name</span><input class="input" value="Kikelomo Adeleke"></label>
      <div class="pair">
        <label class="field" style="margin-bottom:0"><span class="label">Phone</span><input class="input" inputmode="tel" value="080 3355 1120"></label>
        <label class="field" style="margin-bottom:0"><span class="label">Relationship</span><input class="input" value="Aunt"></label>
      </div>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="card-head"><h3>Change your PIN</h3><span class="pill pill-mute">4 digits · 2 letters</span></div>
      <p class="tiny muted" style="margin-bottom:10px">Enter your current PIN, then the new one. Your PIN is how the gate knows it is you and not another member of the household.</p>
      <div class="seg" data-group="pinstep" style="margin-bottom:12px">
        <button type="button" data-target="cur" aria-pressed="true">Current PIN</button>
        <button type="button" data-target="new">New PIN</button>
      </div>
      <div data-panel="cur" data-owner="pinstep"><div data-keypad data-length="6" data-mask></div></div>
      <div data-panel="new" data-owner="pinstep" hidden><div data-keypad data-length="6" data-strength data-cta="#save-pin"></div></div>
      <button class="btn btn-block" id="save-pin" style="margin-top:14px" disabled>Save new PIN</button>
    </div>

    <div class="card flush" style="margin-top:12px">
      <div class="row row-static"><span class="grow"><span class="row-title">Notification preferences</span><span class="row-sub">Push and email are sent together by default</span></span></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Pass generated</span><span class="row-sub">Every pass from your household</span></span><button class="switch" role="switch" aria-checked="true" aria-label="Pass generated"></button></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Check-in and check-out</span><span class="row-sub">Guests, artisans and household staff</span></span><button class="switch" role="switch" aria-checked="true" aria-label="Check in and out"></button></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Overstay and wrong-time alerts</span><span class="row-sub">Artisan and visiting staff · cannot be disabled</span></span><button class="switch" role="switch" aria-checked="true" aria-label="Overstay alerts" disabled style="opacity:.6"></button></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Sub-account activity</span><span class="row-sub">Copies of passes your sub-accounts issue</span></span><button class="switch" role="switch" aria-checked="true" aria-label="Sub-account activity"></button></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Madrasa updates</span><span class="row-sub">Check-in, absence and pickup for your children</span></span><button class="switch" role="switch" aria-checked="true" aria-label="Madrasa updates"></button></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Dues and levy reminders</span><span class="row-sub">Statements and instalment dates</span></span><button class="switch" role="switch" aria-checked="true" aria-label="Dues reminders"></button></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Notices and polls</span><span class="row-sub">Emergency notices always come through</span></span><button class="switch" role="switch" aria-checked="false" aria-label="Notices and polls"></button></div>
      <div class="row row-static"><span class="grow"><span class="row-title" style="font-weight:500">Marketplace replies</span><span class="row-sub">Messages about your listings</span></span><button class="switch" role="switch" aria-checked="true" aria-label="Marketplace replies"></button></div>
    </div>

    <button class="btn btn-block" style="margin-top:16px">Save changes</button>
    <button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="location.href='welcome.html'">Sign out</button>
    <div class="spacer-nav"></div>
  </main>
  ${bottomNav("Settings")}`,
};

/* ------------------------------------------------------- 16. analytics */
export const analytics = {
  slug: "analytics.html",
  title: "My insights",
  desc: "Household analytics — guests, passes, visit duration, overstays, staff, facilities, dues and Madrasa attendance.",
  body: `
  ${subHeader({ title: "My insights", sub: "Scoped to House 42 · Unit B — your household only" })}
  <main class="sheet-body">
    ${rangeBar("Month")}
    <div class="chips" style="margin-top:10px" data-group="passfilter">
      <button type="button" class="chip" aria-pressed="true">All pass types</button>
      <button type="button" class="chip">Guest</button>
      <button type="button" class="chip">Delivery</button>
      <button type="button" class="chip">Artisan</button>
      <button type="button" class="chip">Long-stay</button>
      <button type="button" class="chip">Group</button>
    </div>
    <div class="chips" data-group="gatefilter">
      <button type="button" class="chip" aria-pressed="true">Both gates</button>
      <button type="button" class="chip">Gate 1</button>
      <button type="button" class="chip">Gate 2</button>
    </div>

    <div class="grid-2" style="margin-top:6px">
      ${kpi("Guests hosted", "34", "", "18% vs. last month", "up")}
      ${kpi("Avg. visit duration", "2h 14m", "", "9m shorter", "down")}
      ${kpi("Codes per day", "1.4", "avg", "0.2 more", "up")}
      ${kpi("Overstay incidents", "2", "", "1 more than last month", "down")}
    </div>

    <div class="section">
      ${chart({
        title: "Guests hosted over time",
        id: "c-guests",
        kind: "line",
        compare: true,
        note: "Solid line is this month. Turn on “vs. prev” to overlay August as a dashed line.",
        cfg: {
          labels: ["W1", "W2", "W3", "W4"],
          series: [
            { name: "This month", color: "#3FAE7A", values: [6, 11, 9, 8] },
            { name: "Previous", color: "#A9B5AF", isCompare: true, values: [7, 8, 7, 7] },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Pass type breakdown",
        kind: "donut",
        note: "Composition of the 34 passes issued by the household this month.",
        cfg: {
          centerValue: "34",
          centerLabel: "passes",
          items: [
            { label: "Guest", value: 14, color: "#3FAE7A" },
            { label: "Delivery", value: 9, color: "#123528" },
            { label: "Artisan", value: 5, color: "#E8C547" },
            { label: "Long-stay", value: 3, color: "#2C6E9B" },
            { label: "Jumu'ah", value: 2, color: "#4A6E5E" },
            { label: "Group", value: 1, color: "#C6413B" },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Average visit duration by guest type",
        kind: "bar",
        note: "Check-in to check-out, in minutes.",
        cfg: { labels: ["Guest", "Deliv.", "Artisan", "Long-stay", "Group"], values: [134, 12, 218, 480, 195], unit: "m" },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Peak visiting times</h3><span class="tiny muted">day × hour</span></div>
        <div data-chart="heat" data-cfg='${JSON.stringify({
          rows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          cols: ["6", "8", "10", "12", "14", "16", "18", "20", "22"],
          values: [
            [0, 2, 1, 0, 1, 3, 4, 1, 0],
            [1, 1, 2, 1, 0, 2, 3, 1, 0],
            [0, 3, 2, 1, 1, 2, 5, 2, 0],
            [0, 1, 1, 0, 2, 3, 4, 2, 1],
            [1, 2, 1, 6, 3, 2, 5, 3, 1],
            [2, 4, 6, 5, 4, 6, 8, 4, 1],
            [1, 2, 3, 4, 3, 4, 5, 2, 0],
          ],
        })}'></div>
      </div>
    </div>

    <div class="section">
      ${chart({
        title: "Household gate activity trend",
        id: "c-gate",
        kind: "line",
        compare: true,
        note: "All entries and exits attached to House 42 · Unit B, including staff.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "Movements", color: "#123528", values: [48, 55, 61, 52, 68, 74] },
            { name: "Previous year", color: "#A9B5AF", isCompare: true, values: [40, 44, 49, 47, 52, 58] },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Overstay incidents",
        kind: "line",
        note: "Artisan and visiting-staff passes that ran past their window plus grace period.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "Overstays", color: "#C6413B", values: [0, 1, 0, 2, 1, 2] }] },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Staff attendance pattern</h3><span class="pill pill-mute">This month</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Staff</th><th>Type</th><th>Days</th><th>Hours</th><th>Late</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Amina Sule</td><td><span class="pill">Live-in</span></td><td>30</td><td>—</td><td>—</td></tr>
              <tr><td class="t-strong">Emeka Nwosu</td><td><span class="pill pill-warn">Visiting</span></td><td>24</td><td>198</td><td>3</td></tr>
              <tr><td class="t-strong">Grace Bassey</td><td><span class="pill pill-mute">Ended</span></td><td>0</td><td>0</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
        <p class="chart-note">Live-in staff have no time window, so hours and lateness do not apply to them.</p>
      </div>
    </div>

    <div class="section">
      ${chart({
        title: "Facility booking frequency",
        kind: "bar",
        note: "Bookings your household made this year, by facility.",
        cfg: {
          labels: ["Pitch", "Hall", "Kitchen", "Club"],
          values: [7, 2, 4, 3],
          colors: ["#3FAE7A", "#123528", "#E8C547", "#2C6E9B"],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Dues payment history",
        id: "c-dues",
        kind: "line",
        compare: true,
        note: "Amount paid per month, in thousands of naira. Your household only.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "Paid", color: "#3FAE7A", values: [50, 0, 25, 40, 0, 115] },
            { name: "Previous year", color: "#A9B5AF", isCompare: true, values: [40, 20, 20, 30, 20, 90] },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Madrasa attendance — Maryam Yusuf",
        kind: "line",
        note: "Percentage of sessions present, Level 3.",
        cfg: { labels: ["May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "% present", color: "#3FAE7A", values: [88, 92, 96, 91, 94] }] },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Madrasa attendance — Ibrahim Yusuf",
        kind: "line",
        note: "Percentage of sessions present, Level 1.",
        cfg: { labels: ["May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "% present", color: "#E8C547", values: [76, 80, 74, 83, 81] }] },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">SOS usage history</h3><span class="pill pill-ok">Empty is good</span></div>
        <div class="empty"><div class="e-ico">🛡️</div>No SOS alerts raised by this household in the selected period.</div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>This month vs. last month</h2></div>
      <div class="grid-2">
        ${kpi("Guests hosted", "34", "", "was 29", "up")}
        ${kpi("Gate movements", "74", "", "was 68", "up")}
        ${kpi("Overstays", "2", "", "was 1", "down")}
        ${kpi("Facility bookings", "2", "", "was 2", "flat")}
        ${kpi("Dues paid", "₦115k", "", "was ₦0", "up")}
        ${kpi("Madrasa attendance", "88", "%", "was 87%", "up")}
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>
  ${bottomNav("Insights")}`,
};

/* --------------------------------------------------- 17. notifications */
export const notifications = {
  slug: "notifications.html",
  title: "Notifications",
  desc: "Notification history — pass activity, alerts, Madrasa events and approval status.",
  body: `
  ${subHeader({ title: "Notifications", sub: "Push and email are sent together — this is the permanent history", unread: 4 })}
  <main class="sheet-body">
    <div class="chips" data-group="nfilter" data-filter-group="nfilter">
      <button type="button" class="chip" data-value="all" aria-pressed="true">All</button>
      <button type="button" class="chip" data-value="unread">Unread</button>
      <button type="button" class="chip" data-value="pass">Pass activity</button>
      <button type="button" class="chip" data-value="alert">Alerts</button>
      <button type="button" class="chip" data-value="madrasa">Madrasa</button>
      <button type="button" class="chip" data-value="admin">Approvals</button>
    </div>

    <div class="card flush" data-filter-scope="nfilter">
      <div class="notif unread" data-tags="unread,alert,pass">
        <span class="n-ico" style="background:#FDF0D9">⏱</span>
        <span class="n-body"><span class="n-title">Artisan overstay warning</span><span class="n-text">Chidi (AC servicing) is 12 minutes past the 13:00 window. The Estate Manager and Security Manager were alerted too.</span><span class="n-time">Today · 13:12</span></span>
        <span class="n-dot"></span>
      </div>
      <div class="notif unread" data-tags="unread,pass">
        <span class="n-ico" style="background:#E1F4EA">→</span>
        <span class="n-body"><span class="n-title">Halimat Bello checked in</span><span class="n-text">Guest pass 4K7-2M9 · Gate 1</span><span class="n-time">Today · 10:04</span></span>
        <span class="n-dot"></span>
      </div>
      <div class="notif unread" data-tags="unread,madrasa">
        <span class="n-ico" style="background:#FBE6E5">🕌</span>
        <span class="n-body"><span class="n-title">Ibrahim marked absent</span><span class="n-text">Level 1 · recorded by Ustadh Bilal at the morning register.</span><span class="n-time">Today · 08:15</span></span>
        <span class="n-dot"></span>
      </div>
      <div class="notif unread" data-tags="unread,madrasa">
        <span class="n-ico">🕌</span>
        <span class="n-body"><span class="n-title">Maryam checked in</span><span class="n-text">Level 3 · Ustadha Sumayyah</span><span class="n-time">Today · 07:52</span></span>
        <span class="n-dot"></span>
      </div>
      <div class="notif" data-tags="pass">
        <span class="n-ico">🎟️</span>
        <span class="n-body"><span class="n-title">Zainab issued a Long-stay pass</span><span class="n-text">Aunt Kikelomo · 2–16 Sept · overnight allowed. You are copied as household Primary.</span><span class="n-time">Yesterday · 20:31</span></span>
      </div>
      <div class="notif" data-tags="pass">
        <span class="n-ico" style="background:#EEF1F0">←</span>
        <span class="n-body"><span class="n-title">Amina Sule checked out</span><span class="n-text">Live-in staff · Gate 1</span><span class="n-time">Yesterday · 19:05</span></span>
      </div>
      <div class="notif" data-tags="alert">
        <span class="n-ico" style="background:#FBE6E5">✕</span>
        <span class="n-body"><span class="n-title">Expired code presented at Gate 2</span><span class="n-text">Delivery pass 3B9-4X1 was refused. Issue a fresh code if the courier is still waiting.</span><span class="n-time">Yesterday · 08:31</span></span>
      </div>
      <div class="notif" data-tags="alert">
        <span class="n-ico" style="background:#FDF0D9">🌙</span>
        <span class="n-body"><span class="n-title">Wrong-time access attempt</span><span class="n-text">Emeka Nwosu presented his PIN at 06:12, before his 07:30 window opened. Entry was refused.</span><span class="n-time">Mon · 06:12</span></span>
      </div>
      <div class="notif" data-tags="admin">
        <span class="n-ico" style="background:#E4EFF6">🏟️</span>
        <span class="n-body"><span class="n-title">Facility booking confirmed</span><span class="n-text">Football Pitch · Sat 12 Sept · 15:00–17:00. Deposit of ₦20,000 received.</span><span class="n-time">Sun · 14:22</span></span>
      </div>
      <div class="notif" data-tags="admin">
        <span class="n-ico" style="background:#E4EFF6">🔧</span>
        <span class="n-body"><span class="n-title">Ticket #FX-1042 moved to In Progress</span><span class="n-text">Street light out at the corner · Electrical</span><span class="n-time">Sat · 09:40</span></span>
      </div>
      <div class="notif" data-tags="admin">
        <span class="n-ico" style="background:#E4EFF6">✅</span>
        <span class="n-body"><span class="n-title">Sub-account approved for gate access</span><span class="n-text">Fatima Adeleke's PIN is now active at both gates.</span><span class="n-time">28 Aug</span></span>
      </div>
      <div class="notif" data-tags="madrasa">
        <span class="n-ico">📣</span>
        <span class="n-body"><span class="n-title">Madrasa term starts 14 September</span><span class="n-text">Class lists published. Pickup passes required for guardians.</span><span class="n-time">28 Aug</span></span>
      </div>
      <div class="notif" data-tags="admin">
        <span class="n-ico" style="background:#E4EFF6">💳</span>
        <span class="n-body"><span class="n-title">Dues payment received</span><span class="n-text">₦115,000 applied to the 2026 service charge. ₦85,000 remains outstanding.</span><span class="n-time">26 Aug</span></span>
      </div>
    </div>

    <button class="btn btn-ghost btn-block" style="margin-top:16px">Mark all as read</button>
    <div class="spacer-nav"></div>
  </main>
  ${bottomNav("Home")}`,
};
