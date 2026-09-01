// Public + authentication + dashboards
import { bell, bottomNav, bottomNavSub, sheet, scrim, sosFab, sosSheet, kpi, backLink } from "./lib.mjs";

/* ---------------------------------------------------------------- hadith */
export const HADITH = [
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    src: "Sahih al-Bukhari 13 · Sahih Muslim 45",
  },
  {
    text: "The believers, in their mutual mercy, love and compassion, are like one body — when one limb suffers, the whole body responds with wakefulness and fever.",
    src: "Sahih al-Bukhari 6011 · Sahih Muslim 2586",
  },
  {
    text: "Whoever believes in Allah and the Last Day, let him be generous to his neighbour.",
    src: "Sahih al-Bukhari 6018 · Sahih Muslim 47",
  },
  {
    text: "Removing a harmful thing from the path is charity.",
    src: "Sahih al-Bukhari 2989 · Sahih Muslim 1009",
  },
];

/* ------------------------------------------------------- issue-pass sheet */
const PASS_TYPES = [
  ["guest", "Guest", "Single-entry · not time-bound"],
  ["delivery", "Delivery", "Single-entry · not time-bound"],
  ["artisan", "Artisan", "Single-entry · time window + grace period · overstay escalates"],
  ["longstay", "Long-stay", "Multi-entry · date range · auto-expires after end date"],
  ["exit", "Exit", "Single-entry · not time-bound"],
  ["jumuah", "Jumu'ah", "Single-entry · fixed Friday window"],
  ["offline", "Offline", "Single-entry · works without connectivity at the gate"],
  ["group", "Group", "Multi-entry where the event needs it"],
];

function passPanel(key, label, rule) {
  const common = `
    <label class="field"><span class="label">Visitor name</span><input class="input" placeholder="e.g. Halimat Bello"></label>
    <div class="pair">
      <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
      <label class="field"><span class="label">Gate</span><select class="select"><option>Gate 1</option><option>Gate 2</option><option>Either gate</option></select></label>
    </div>`;
  let extra = "";
  if (key === "artisan") {
    extra = `
    <label class="field"><span class="label">Trade / job</span><input class="input" placeholder="e.g. AC servicing"></label>
    <label class="field"><span class="label">Date</span><input class="input" type="date" value="2026-09-04"></label>
    <div class="pair">
      <label class="field"><span class="label">Window opens</span><input class="input" type="time" value="09:00"></label>
      <label class="field"><span class="label">Window closes</span><input class="input" type="time" value="13:00"></label>
    </div>
    <label class="field"><span class="label">Grace period</span>
      <select class="select"><option>15 minutes</option><option selected>30 minutes</option><option>45 minutes</option><option>1 hour</option></select>
      <span class="hint">After the grace period an overstay alert goes to you, the Estate Manager and the Security Manager.</span>
    </label>`;
  } else if (key === "longstay") {
    extra = `
    <div class="pair">
      <label class="field"><span class="label">Start date</span><input class="input" type="date" value="2026-09-02"></label>
      <label class="field"><span class="label">End date</span><input class="input" type="date" value="2026-09-16"></label>
    </div>
    <label class="check" style="margin-bottom:14px"><input type="checkbox" checked><span><span class="c-title">Overnight stay</span><span class="c-sub">Guest may remain on the estate between 10pm and 5am without triggering a passive night-access flag.</span></span></label>
    <div class="note">Multi-entry for the whole range. The pass auto-expires after the end date — no manual revoke needed.</div>`;
  } else if (key === "group") {
    extra = `
    <div class="pair">
      <label class="field"><span class="label">Group size</span><input class="input" inputmode="numeric" value="12"></label>
      <label class="field"><span class="label">Occasion</span><input class="input" placeholder="e.g. Aqiqah"></label>
    </div>
    <label class="check" style="margin-bottom:14px"><input type="checkbox" checked><span><span class="c-title">Allow multi-entry</span><span class="c-sub">Guests may re-enter during the event.</span></span></label>`;
  } else if (key === "jumuah") {
    extra = `<div class="note">Fixed Friday window, 12:00–14:30. Single entry, no other timing options.</div><div style="height:14px"></div>`;
  } else if (key === "offline") {
    extra = `<div class="note note-gold">Offline pass codes are pre-validated so a guard can admit the visitor even if the kiosk loses connectivity. The scan syncs into the gate log when the kiosk reconnects.</div><div style="height:14px"></div>`;
  } else if (key === "exit") {
    extra = `<label class="field"><span class="label">Items leaving the estate</span><textarea class="textarea" placeholder="e.g. Two dining chairs, one wardrobe"></textarea></label>`;
  } else if (key === "delivery") {
    extra = `<label class="field"><span class="label">Vendor / courier</span><input class="input" placeholder="e.g. Marketplace vendor"></label>`;
  }
  return `<div data-panel="${key}" data-owner="passtype" ${key === "guest" ? "" : "hidden"}>
    <div class="note" style="margin-bottom:14px"><b>${label}</b> — ${rule}</div>
    ${common}${extra}
  </div>`;
}

export const issuePassSheet = sheet({
  id: "sheet-pass",
  title: "Issue a pass",
  sub: "House 42 · Unit B",
  bodyHtml: `
    <div class="seg" data-group="passtype" role="group" aria-label="Pass type" style="margin-bottom:14px">
      ${PASS_TYPES.map(([k, l]) => `<button type="button" data-target="${k}" data-value="${k}" aria-pressed="${k === "guest"}">${l}</button>`).join("")}
    </div>
    ${PASS_TYPES.map(([k, l, r]) => passPanel(k, l, r)).join("\n")}
    <label class="field"><span class="label">Note for the guard (optional)</span><input class="input" placeholder="e.g. Please direct to the back gate"></label>
  `,
  footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Generate code</button>`,
});

/* ------------------------------------------------------------- 1. welcome */
export const welcome = {
  slug: "welcome.html",
  title: "Welcome",
  desc: "Resident access portal for Lighthouse Lekki Estate — sign in or request a resident account.",
  body: `
  <header class="hero" style="padding-bottom:60px">
    <div class="topbar">
      <div class="avatar" style="background:var(--gold);color:var(--deep)">LH</div>
      <div class="grow"><div style="font-weight:700;font-size:14.5px;color:#fff">Lighthouse Lekki</div><div class="tiny muted">Estate Community Portal</div></div>
    </div>
    <div style="margin-top:34px">
      <span class="pill pill-gold">Residents &amp; estate staff only</span>
      <h1 style="font-size:34px;margin-top:14px;line-height:1.08">The estate, in one place.</h1>
      <p class="muted" style="margin-top:12px;font-size:14.5px;max-width:34ch">Gate passes, dues, facilities, the notice board and the Madrasa. Access is issued by the Estate Manager — this portal is not open to the public.</p>
    </div>
    <div class="stack" style="margin-top:26px">
      <a class="btn btn-gold btn-block" href="login-resident.html">Resident sign in</a>
      <a class="btn btn-block" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.22)" href="login-admin.html">Estate &amp; Madrasa staff sign in</a>
    </div>
  </header>

  <main class="sheet-body">
    <div class="card dark" style="background:var(--deep-700)">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px">
        <span class="pill pill-gold">Hadith of the day</span>
        <span class="tiny" style="color:rgba(255,255,255,.55)" id="hadith-date">—</span>
      </div>
      <div class="hadith">
        <p class="h-text" id="hadith-text">—</p>
        <p class="h-src" id="hadith-src">—</p>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>What the portal covers</h2></div>
      <div class="grid-2">
        <div class="tile" style="cursor:default"><span class="tile-ico">🎟️</span><span class="tile-label">Gate passes for guests, artisans &amp; staff</span></div>
        <div class="tile" style="cursor:default"><span class="tile-ico">💳</span><span class="tile-label">Dues, levies &amp; payment history</span></div>
        <div class="tile" style="cursor:default"><span class="tile-ico">🏟️</span><span class="tile-label">Facility booking</span></div>
        <div class="tile" style="cursor:default"><span class="tile-ico">🕌</span><span class="tile-label">Madrasa &amp; mosque records</span></div>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3>New to the estate?</h3>
        <p class="tiny muted" style="margin-top:6px">Register your household and the Estate Manager will review it. You will receive your PIN once the registration is approved.</p>
        <a class="btn btn-quiet btn-block" style="margin-top:12px" href="register.html">Register a household</a>
      </div>
    </div>

    <div class="section">
      <div class="note">Emergencies inside the estate: use the SOS button in the app once signed in, or call the gatehouse directly. Gate 1 and Gate 2 are manned around the clock.</div>
    </div>

    <p class="tiny muted center" style="margin:26px 0 30px">Lighthouse Lekki Estate Community Portal · Residents 1–100 · Madrasa guardians 101+</p>
  </main>`,
  script: `
  var H = ${JSON.stringify(HADITH)};
  var now = new Date();
  var day = Math.floor(now.getTime() / 86400000);
  var h = H[day % H.length];
  document.getElementById('hadith-text').textContent = '\\u201C' + h.text + '\\u201D';
  document.getElementById('hadith-src').textContent = h.src;
  document.getElementById('hadith-date').textContent = now.toLocaleDateString(undefined,{weekday:'long', day:'numeric', month:'long'});
  `,
};

/* ------------------------------------------------------ 2. resident login */
export const loginResident = {
  slug: "login-resident.html",
  title: "Resident sign in",
  desc: "Sign in with house number, unit and your 6-character PIN.",
  body: `
  <header class="hero" style="padding-bottom:54px">
    <div class="topbar">${backLink("welcome.html")}</div>
    <div style="margin-top:22px">
      <h1>Resident sign in</h1>
      <p class="muted" style="margin-top:8px;font-size:13.5px;max-width:36ch">Your PIN identifies you within the household — Primary, sub-account, household staff or Madrasa guardian.</p>
    </div>
  </header>

  <main class="sheet-body">
    <div class="card">
      <div class="pair">
        <label class="field" style="margin-bottom:0"><span class="label">House number</span><input class="input" inputmode="numeric" placeholder="42"></label>
        <label class="field" style="margin-bottom:0"><span class="label">Unit</span>
          <select class="select"><option>A</option><option selected>B</option><option>C</option><option>D</option></select>
        </label>
      </div>
      <p class="hint" style="margin-top:8px;font-size:12px;color:var(--muted)">Madrasa guardians use the house number assigned to them (101 and up).</p>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="card-head"><h3>6-character PIN</h3><span class="pill pill-mute">4 digits · 2 letters</span></div>
      <div data-keypad data-length="6" data-mask data-cta="#signin"></div>
    </div>

    <button class="btn btn-block" id="signin" style="margin-top:16px" disabled onclick="location.href='dashboard-primary.html'">Sign in</button>

    <div class="grid-2" style="margin-top:12px">
      <a class="btn btn-ghost btn-sm" href="dashboard-sub.html">Demo: sub-account</a>
      <a class="btn btn-ghost btn-sm" href="staff-onboarding.html">Demo: staff onboarding</a>
    </div>

    <div class="note" style="margin-top:18px">Forgotten your PIN? Only the Estate Manager can reset a Primary PIN. A sub-account or household-staff PIN is reset by the household Primary.</div>
    <p class="tiny muted center" style="margin:24px 0 30px">Four wrong PIN attempts locks the house+unit for 15 minutes and notifies the Primary.</p>
  </main>`,
};

/* --------------------------------------------------------- 3. admin login */
export const loginAdmin = {
  slug: "login-admin.html",
  title: "Staff sign in",
  desc: "Email and password sign-in for Estate Manager, President/VP, System Admin, Madrasa Admin and Estate Imam.",
  body: `
  <header class="hero" style="padding-bottom:54px">
    <div class="topbar">${backLink("welcome.html")}</div>
    <div style="margin-top:22px">
      <h1>Estate &amp; Madrasa staff</h1>
      <p class="muted" style="margin-top:8px;font-size:13.5px;max-width:36ch">Estate Manager · President / Vice President · System Admin · Madrasa Admin · Estate Imam</p>
    </div>
  </header>

  <main class="sheet-body">
    <div class="card">
      <label class="field"><span class="label">Work email</span><input class="input" type="email" inputmode="email" placeholder="name@lighthouselekki.org"></label>
      <label class="field" style="margin-bottom:6px"><span class="label">Password</span><input class="input" type="password" placeholder="••••••••••"></label>
      <a class="link" href="#">Forgot password</a>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="card-head"><h3>Two-factor</h3><span class="pill pill-ok">Required for this account</span></div>
      <p class="tiny muted">A 6-digit code from your authenticator app is requested after your password. System Admin accounts cannot disable it.</p>
      <label class="check" style="margin-top:12px"><input type="checkbox"><span><span class="c-title">Trust this device for 14 days</span><span class="c-sub">Not available on shared gatehouse devices.</span></span></label>
    </div>

    <button class="btn btn-deep btn-block" style="margin-top:16px" data-open-sheet="sheet-mfa">Continue</button>

    <div class="note" style="margin-top:18px">A President or Vice President who also lives in the estate holds two unconnected credentials — this login is separate from their resident account.</div>
    <p class="tiny muted center" style="margin:24px 0 30px">Guards do not sign in here. Gate kiosks use PIN-only entry on the gate device.</p>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-mfa",
    title: "Two-factor verification",
    sub: "Enter the 6-digit code from your authenticator",
    bodyHtml: `<div class="card"><div data-keypad data-length="6" data-cta="#mfa-go"></div></div>
      <p class="tiny muted center" style="margin-top:12px">Code refreshes every 30 seconds.</p>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn btn-deep" id="mfa-go" disabled data-close-sheet>Verify</button>`,
  })}`,
};

/* ---------------------------------------------------------- 4. registration */
export const register = {
  slug: "register.html",
  title: "Resident registration",
  desc: "Register your household for review by the Estate Manager.",
  body: `
  <div id="form-view">
  <header class="hero hero-sm">
    <div class="topbar">${backLink("welcome.html")}</div>
    <div style="margin-top:16px">
      <h1 style="font-size:25px">Register your household</h1>
      <p class="muted" style="margin-top:6px;font-size:13.5px">The Estate Manager reviews every registration before a PIN is issued.</p>
    </div>
  </header>

  <main class="sheet-body">
    <div class="card">
      <h3 style="margin-bottom:12px">About you</h3>
      <label class="field"><span class="label">Full name <span style="color:var(--danger)">*</span></span><input class="input" placeholder="Surname first"></label>
      <label class="field"><span class="label">Phone number <span style="color:var(--danger)">*</span></span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
      <label class="field"><span class="label">Email address <span style="color:var(--danger)">*</span></span>
        <input class="input" type="email" inputmode="email" placeholder="you@example.com">
        <span class="hint">Compulsory — every gate notification is sent by push and email together.</span>
      </label>
      <label class="field"><span class="label">Relationship to the property <span style="color:var(--danger)">*</span></span>
        <select class="select"><option>Owner-occupier</option><option>Tenant</option><option>Landlord (non-resident)</option><option>Family of owner</option><option>Caretaker</option></select>
      </label>
      <label class="field" style="margin-bottom:0"><span class="label">House number (if known)</span>
        <div class="pair"><input class="input" inputmode="numeric" placeholder="e.g. 42"><select class="select"><option>Unit A</option><option>Unit B</option><option>Unit C</option><option>Unit D</option></select></div>
        <span class="hint">Leave blank if you have not been allocated one yet — the Estate Manager will assign it at approval.</span>
      </label>
    </div>

    <div class="card" style="margin-top:12px">
      <h3 style="margin-bottom:12px">Next of kin</h3>
      <label class="field"><span class="label">Full name <span style="color:var(--danger)">*</span></span><input class="input" placeholder="Next-of-kin name"></label>
      <div class="pair">
        <label class="field"><span class="label">Phone <span style="color:var(--danger)">*</span></span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
        <label class="field"><span class="label">Relationship</span><input class="input" placeholder="e.g. Sibling"></label>
      </div>
      <p class="tiny muted">Used only for emergencies and SOS escalation.</p>
    </div>

    <div class="card" style="margin-top:12px">
      <h3 style="margin-bottom:4px">Community participation</h3>
      <p class="tiny muted" style="margin-bottom:12px">Optional. Madrasa selections are forwarded to the Madrasa Admin as a pending enrolment.</p>
      <div class="stack">
        <label class="check"><input type="checkbox"><span><span class="c-title">Madrasa enrolment</span><span class="c-sub">I want to enrol a child. The Madrasa Admin will contact you for the child's details.</span></span></label>
        <label class="check"><input type="checkbox"><span><span class="c-title">Mosque activities</span><span class="c-sub">Jumu'ah notices, halaqah and Ramadan programmes.</span></span></label>
        <label class="check"><input type="checkbox"><span><span class="c-title">Estate volunteer</span><span class="c-sub">Available for committees, clean-ups and event support.</span></span></label>
      </div>
    </div>

    <div class="card" style="margin-top:12px">
      <div class="card-head"><h3>Create your PIN</h3><span class="pill pill-mute">4 digits · 2 letters</span></div>
      <p class="tiny muted" style="margin-bottom:6px">This PIN identifies you personally within your house and unit. It is stored now and activated the moment your registration is approved.</p>
      <div data-keypad data-length="6" data-strength data-cta="#submit-reg"></div>
    </div>

    <button class="btn btn-block" id="submit-reg" style="margin-top:16px" disabled>Submit for review</button>
    <p class="tiny muted center" style="margin:14px 0 30px">Submitting does not create an active account. You cannot sign in until approval.</p>
  </main>
  </div>

  <div id="pending-view" hidden>
    <header class="hero" style="padding-bottom:60px">
      <div style="margin-top:20px;text-align:center">
        <div style="font-size:42px">📬</div>
        <span class="pill pill-gold" style="margin-top:12px">Pending review</span>
        <h1 style="margin-top:12px;font-size:28px">Registration submitted</h1>
        <p class="muted" style="margin-top:10px;font-size:14px">The Estate Manager has received your household registration.</p>
      </div>
    </header>
    <main class="sheet-body">
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">1</span><span class="grow"><span class="row-title">Submitted</span><span class="row-sub">Just now</span></span><span class="pill pill-ok">Done</span></div>
        <div class="row row-static"><span class="row-icon">2</span><span class="grow"><span class="row-title">Estate Manager review</span><span class="row-sub">Identity, unit allocation and next-of-kin checks</span></span><span class="pill pill-warn">In progress</span></div>
        <div class="row row-static"><span class="row-icon">3</span><span class="grow"><span class="row-title">PIN activated</span><span class="row-sub">You are notified by push and email</span></span><span class="pill pill-mute">Waiting</span></div>
      </div>
      <div class="note" style="margin-top:14px">Registrations are usually reviewed within two working days. If the Estate Manager needs anything else they will call the phone number you provided.</div>
      <div class="card" style="margin-top:12px">
        <h3>Reference</h3>
        <div class="code-display" style="margin-top:10px">REG-2026-0184</div>
        <p class="tiny muted center" style="margin-top:8px">Quote this at the estate office.</p>
      </div>
      <a class="btn btn-ghost btn-block" style="margin-top:16px;margin-bottom:30px" href="welcome.html">Back to the welcome screen</a>
    </main>
  </div>`,
  script: `
  document.getElementById('submit-reg').addEventListener('click', function(){
    document.getElementById('form-view').hidden = true;
    document.getElementById('pending-view').hidden = false;
    window.scrollTo(0,0);
  });`,
};

/* ------------------------------------------------- 5. dashboard (primary) */
export const dashboardPrimary = {
  slug: "dashboard-primary.html",
  title: "Resident dashboard",
  desc: "Household overview: passes, gate activity, dues, staff, sub-accounts and Madrasa records.",
  body: `
  <header class="hero">
    <div class="topbar">
      <div class="avatar">AY</div>
      <div class="grow">
        <div class="tiny muted">Assalamu alaikum</div>
        <div style="font-weight:700;font-size:16px;color:#fff">Adebayo Yusuf</div>
      </div>
      ${bell({ count: 4 })}
    </div>
    <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
      <span class="pill pill-gold">Primary resident</span>
      <span class="pill" style="background:rgba(255,255,255,.14);color:#fff">House 42 · Unit B</span>
    </div>
    <div class="grid-3" style="margin-top:16px">
      <div class="kpi" style="background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16)">
        <div class="k-label" style="color:rgba(255,255,255,.7)">Active passes</div>
        <div class="k-value" style="color:#fff">5</div>
      </div>
      <div class="kpi" style="background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16)">
        <div class="k-label" style="color:rgba(255,255,255,.7)">In estate now</div>
        <div class="k-value" style="color:#fff">2</div>
      </div>
      <div class="kpi" style="background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16)">
        <div class="k-label" style="color:rgba(255,255,255,.7)">Dues status</div>
        <div class="k-value" style="color:var(--gold);font-size:17px;padding-top:5px">Partial</div>
      </div>
    </div>
  </header>

  <main class="sheet-body">
    <div class="section" style="margin-top:0">
      <div class="section-head"><h2>Quick actions</h2></div>
      <div class="grid-4">
        <button class="tile" data-open-sheet="sheet-pass"><span class="tile-ico">🎟️</span><span class="tile-label">Issue pass</span></button>
        <a class="tile" href="facilities.html"><span class="tile-ico">🏟️</span><span class="tile-label">Book facility</span></a>
        <a class="tile" href="tickets.html"><span class="tile-ico">🔧</span><span class="tile-label">Fix-it</span></a>
        <a class="tile" href="marketplace.html"><span class="tile-ico">🛍️</span><span class="tile-label">Market</span></a>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Active passes</h2><a class="link" href="#">All household passes</a></div>
      <div class="carousel">
        <div class="card carousel-card">
          <div class="card-head" style="margin-bottom:8px"><span class="pill">Guest</span><span class="pill pill-ok">Checked in</span></div>
          <h3 style="font-size:15px">Halimat Bello</h3>
          <p class="tiny muted" style="margin-top:4px">Issued by you · Gate 1</p>
          <div class="code-display" style="font-size:22px;margin-top:10px">4K7-2M9</div>
        </div>
        <div class="card carousel-card">
          <div class="card-head" style="margin-bottom:8px"><span class="pill pill-warn">Artisan</span><span class="pill pill-warn">08:12 left</span></div>
          <h3 style="font-size:15px">Chidi — AC servicing</h3>
          <p class="tiny muted" style="margin-top:4px">09:00–13:00 · 30 min grace</p>
          <div class="code-display" style="font-size:22px;margin-top:10px">8P3-1T5</div>
        </div>
        <div class="card carousel-card">
          <div class="card-head" style="margin-bottom:8px"><span class="pill pill-info">Long-stay</span><span class="pill pill-mute">14 days</span></div>
          <h3 style="font-size:15px">Aunt Kikelomo</h3>
          <p class="tiny muted" style="margin-top:4px">Issued by Zainab · overnight allowed</p>
          <div class="code-display" style="font-size:22px;margin-top:10px">2R6-9C4</div>
        </div>
        <div class="card carousel-card">
          <div class="card-head" style="margin-bottom:8px"><span class="pill">Delivery</span><span class="pill pill-mute">Not used</span></div>
          <h3 style="font-size:15px">Furniture delivery</h3>
          <p class="tiny muted" style="margin-top:4px">Issued by Zainab (sub-account)</p>
          <div class="code-display" style="font-size:22px;margin-top:10px">7H2-5D8</div>
        </div>
        <div class="card carousel-card">
          <div class="card-head" style="margin-bottom:8px"><span class="pill pill-gold">Jumu'ah</span><span class="pill pill-mute">Friday</span></div>
          <h3 style="font-size:15px">Musa Ibrahim</h3>
          <p class="tiny muted" style="margin-top:4px">Fixed window 12:00–14:30</p>
          <div class="code-display" style="font-size:22px;margin-top:10px">1N8-6V3</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Gate activity</h2><a class="link" href="analytics.html">Insights</a></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon" style="background:#E1F4EA">→</span><span class="grow"><span class="row-title">Halimat Bello checked in</span><span class="row-sub">Guest pass · Gate 1 · 10:04</span></span><span class="pill pill-ok">Access</span></div>
        <div class="row row-static"><span class="row-icon" style="background:#E1F4EA">→</span><span class="grow"><span class="row-title">Chidi checked in</span><span class="row-sub">Artisan pass · Gate 2 · 09:18</span></span><span class="pill pill-ok">Access</span></div>
        <div class="row row-static"><span class="row-icon" style="background:#FDF0D9">⏱</span><span class="grow"><span class="row-title">Overstay alert cleared</span><span class="row-sub">Plumber · Gate 1 · yesterday 16:42</span></span><span class="pill pill-warn">Overstay</span></div>
        <div class="row row-static"><span class="row-icon" style="background:#E1F4EA">←</span><span class="grow"><span class="row-title">Amina (Live-in staff) checked out</span><span class="row-sub">Gate 1 · yesterday 19:05</span></span><span class="pill pill-mute">Exit</span></div>
        <div class="row row-static"><span class="row-icon" style="background:#FBE6E5">✕</span><span class="grow"><span class="row-title">Expired code presented</span><span class="row-sub">Delivery pass · Gate 2 · yesterday 08:31</span></span><span class="pill pill-danger">Expired</span></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Dues &amp; levies</h2><a class="link" href="analytics.html">History</a></div>
      <div class="card">
        <div class="card-head">
          <div><div class="tiny muted">Outstanding balance</div><div class="k-value" style="font-family:'Bricolage Grotesque',sans-serif;font-size:27px;font-weight:700;color:var(--ink);margin-top:2px">₦ 85,000</div></div>
          <span class="pill pill-warn">Partial</span>
        </div>
        <div class="progress"><i style="width:58%"></i></div>
        <p class="tiny muted" style="margin-top:8px">₦115,000 of ₦200,000 paid for the 2026 service charge. Next instalment due 30 September.</p>
        <div class="divider"></div>
        <div class="grid-2">
          <div><div class="tiny muted">Security levy</div><div style="font-weight:700;color:var(--ink)">Paid</div></div>
          <div><div class="tiny muted">Mosque development</div><div style="font-weight:700;color:var(--ink)">₦25,000 due</div></div>
        </div>
        <button class="btn btn-block" style="margin-top:14px">Make a payment</button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Household</h2></div>
      <div class="card flush">
        <a class="row" href="sub-accounts.html"><span class="row-icon">👥</span><span class="grow"><span class="row-title">Sub-accounts</span><span class="row-sub">3 active · Zainab, Tunde, Fatima</span></span><span class="chev">›</span></a>
        <a class="row" href="staff-management.html"><span class="row-icon">🧹</span><span class="grow"><span class="row-title">Household staff</span><span class="row-sub">2 active · 1 live-in, 1 visiting</span></span><span class="chev">›</span></a>
        <a class="row" href="settings.html"><span class="row-icon">⚙️</span><span class="grow"><span class="row-title">Household settings</span><span class="row-sub">Profile, next-of-kin, PIN, notifications</span></span><span class="chev">›</span></a>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Madrasa</h2><span class="pill pill-mute">2 children</span></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">🕌</span><span class="grow"><span class="row-title">Maryam Yusuf · Level 3</span><span class="row-sub">Checked in 07:52 by Ustadha Sumayyah</span></span><span class="pill pill-ok">Present</span></div>
        <div class="row row-static"><span class="row-icon">🕌</span><span class="grow"><span class="row-title">Ibrahim Yusuf · Level 1</span><span class="row-sub">Marked absent today</span></span><span class="pill pill-warn">Absent</span></div>
        <div class="row row-static"><span class="row-icon">📈</span><span class="grow"><span class="row-title">Term attendance</span><span class="row-sub">Maryam 94% · Ibrahim 81%</span></span><a class="link" href="analytics.html">Trend</a></div>
      </div>
    </div>

    <div class="spacer-nav"></div>
  </main>

  ${sosFab()}
  ${scrim}
  ${issuePassSheet}
  ${sosSheet()}
  ${bottomNav("Home")}`,
};

/* --------------------------------------------- 6. dashboard (sub-account) */
export const dashboardSub = {
  slug: "dashboard-sub.html",
  title: "Sub-account dashboard",
  desc: "Reduced household view for a resident sub-account.",
  body: `
  <header class="hero">
    <div class="topbar">
      <div class="avatar" style="background:var(--deep-400)">ZY</div>
      <div class="grow">
        <div class="tiny muted">Assalamu alaikum</div>
        <div style="font-weight:700;font-size:16px;color:#fff">Zainab Yusuf</div>
      </div>
      ${bell({ count: 2 })}
    </div>
    <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
      <span class="pill" style="background:rgba(255,255,255,.14);color:#fff">Sub-account</span>
      <span class="pill" style="background:rgba(255,255,255,.14);color:#fff">House 42 · Unit B</span>
    </div>
    <div class="grid-2" style="margin-top:16px">
      <div class="kpi" style="background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16)">
        <div class="k-label" style="color:rgba(255,255,255,.7)">Passes you issued</div>
        <div class="k-value" style="color:#fff">2</div>
      </div>
      <div class="kpi" style="background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.16)">
        <div class="k-label" style="color:rgba(255,255,255,.7)">In estate now</div>
        <div class="k-value" style="color:#fff">1</div>
      </div>
    </div>
  </header>

  <main class="sheet-body">
    <div class="note" style="margin-top:0">You are a sub-account of House 42, Unit B. You see only the passes you personally issued. Adebayo Yusuf, the household Primary, is copied on every pass you create.</div>

    <div class="section">
      <div class="section-head"><h2>Quick actions</h2></div>
      <div class="grid-4">
        <button class="tile" data-open-sheet="sheet-pass"><span class="tile-ico">🎟️</span><span class="tile-label">Issue pass</span></button>
        <a class="tile" href="tickets.html"><span class="tile-ico">🔧</span><span class="tile-label">Fix-it</span></a>
        <a class="tile" href="polls.html"><span class="tile-ico">🗳️</span><span class="tile-label">Polls</span></a>
        <a class="tile" href="marketplace.html"><span class="tile-ico">🛍️</span><span class="tile-label">Market</span></a>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Passes you issued</h2></div>
      <div class="carousel">
        <div class="card carousel-card">
          <div class="card-head" style="margin-bottom:8px"><span class="pill pill-info">Long-stay</span><span class="pill pill-ok">In estate</span></div>
          <h3 style="font-size:15px">Aunt Kikelomo</h3>
          <p class="tiny muted" style="margin-top:4px">2–16 Sept · overnight allowed</p>
          <div class="code-display" style="font-size:22px;margin-top:10px">2R6-9C4</div>
        </div>
        <div class="card carousel-card">
          <div class="card-head" style="margin-bottom:8px"><span class="pill">Delivery</span><span class="pill pill-mute">Not used</span></div>
          <h3 style="font-size:15px">Furniture delivery</h3>
          <p class="tiny muted" style="margin-top:4px">Gate 2 · single entry</p>
          <div class="code-display" style="font-size:22px;margin-top:10px">7H2-5D8</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Madrasa</h2><span class="pill pill-mute">1 child</span></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">🕌</span><span class="grow"><span class="row-title">Ibrahim Yusuf · Level 1</span><span class="row-sub">Marked absent today</span></span><span class="pill pill-warn">Absent</span></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Community</h2></div>
      <div class="card flush">
        <a class="row" href="notices.html"><span class="row-icon">📣</span><span class="grow"><span class="row-title">Notice board</span><span class="row-sub">2 new this week</span></span><span class="chev">›</span></a>
        <a class="row" href="polls.html"><span class="row-icon">🗳️</span><span class="grow"><span class="row-title">Townhall polls</span><span class="row-sub">1 poll open</span></span><span class="chev">›</span></a>
        <a class="row" href="settings.html"><span class="row-icon">⚙️</span><span class="grow"><span class="row-title">My profile &amp; PIN</span><span class="row-sub">Personal details and notifications</span></span><span class="chev">›</span></a>
      </div>
    </div>

    <div class="section">
      <div class="card" style="background:#F0F2F1;border-style:dashed">
        <h3 style="font-size:14.5px">Not available on a sub-account</h3>
        <p class="tiny muted" style="margin-top:6px">Dues and financials, facility booking, household staff onboarding, managing other sub-accounts, household settings, and the full household gate-activity feed. Ask the household Primary for these.</p>
      </div>
    </div>

    <div class="spacer-nav"></div>
  </main>

  ${sosFab()}
  ${scrim}
  ${issuePassSheet}
  ${sosSheet()}
  ${bottomNavSub("Home")}`,
};
