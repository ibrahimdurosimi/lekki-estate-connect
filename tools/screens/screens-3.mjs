// Estate Manager — dashboard, Estate Staff records, estate-wide analytics.
import { adminHeader, navBar, NAV_EM, sheet, scrim, kpi, chart, rangeBar, cfgAttr, feedItem } from "./lib.mjs";

/* ------------------------------------------- 19. Estate Manager dashboard */
export const emDashboard = {
  slug: "em-dashboard.html",
  title: "Estate Manager dashboard",
  desc: "Pending approvals, dues reconciliation, estate-wide audit log, account creation, notices, facility review and Fix-it assignment.",
  body: `
  ${adminHeader({
    role: "Estate Manager",
    title: "Good morning, Bilkisu",
    sub: "Lighthouse Lekki Estate · you are one of 3 Estate Managers, all equal peers",
    unread: 9,
  })}
  <main class="sheet-body">
    <div class="grid-2">
      ${kpi("Pending approvals", "4", "", "2 over 24h", "down")}
      ${kpi("Dues collected", "78", "%", "6 pts vs. Aug", "up")}
      ${kpi("Open Fix-it tickets", "11", "", "3 unassigned", "flat")}
      ${kpi("Night-access flags", "5", "", "last 7 nights", "flat")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Pending resident approvals</h2><span class="pill pill-warn">4 waiting</span></div>
      <div class="note">Approving issues the household's 6-character PIN (4 digits, 2 letters) and moves the account from <b>pending</b> to active. Review the full next-of-kin record before approving — it is the estate's only emergency contact for that house.</div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Yakubu Danladi</h3><p class="tiny muted" style="margin-top:3px">Submitted 31 Aug 2026 · 18h ago</p></div><span class="pill pill-warn">Pending</span></div>
        <div class="divider"></div>
        <table class="table">
          <tbody>
            <tr><td class="t-strong">House / unit</td><td>House 17 · Unit A</td></tr>
            <tr><td class="t-strong">Relationship to property</td><td>Owner-occupier</td></tr>
            <tr><td class="t-strong">Phone</td><td>0803 000 0117</td></tr>
            <tr><td class="t-strong">Email</td><td>y.danladi@example.com</td></tr>
            <tr><td class="t-strong">Preferences</td><td><span class="pill">Madrasa</span> <span class="pill">Mosque</span></td></tr>
          </tbody>
        </table>
        <div class="note note-gold" style="text-align:left">
          <b>Next of kin — full record</b><br>
          Name: Halima Danladi<br>
          Relationship: Spouse<br>
          Phone: 0803 000 0118<br>
          Second contact: Musa Danladi (Brother) · 0802 000 0441<br>
          Address on file: 17 Lighthouse Crescent, Lekki
        </div>
        <div class="pair" style="margin-top:12px">
          <button class="btn btn-ghost" data-open-sheet="sheet-reject">Reject</button>
          <button class="btn" data-open-sheet="sheet-approve">Approve</button>
        </div>
      </div>

      <div class="card flush" style="margin-top:12px">
        <button class="row" data-open-sheet="sheet-approve"><span class="row-icon">FO</span><span class="grow"><span class="row-title">Folasade Ogunleye · House 63 · Unit B</span><span class="row-sub">Tenant · submitted 30 Aug · next of kin on file</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-approve"><span class="row-icon">IK</span><span class="grow"><span class="row-title">Ikenna Obi · House 8 · Unit A</span><span class="row-sub">Owner-occupier · submitted 29 Aug · next of kin on file</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-approve"><span class="row-icon">RA</span><span class="grow"><span class="row-title">Rukayat Adisa · House 91 · Unit C</span><span class="row-sub">Tenant · submitted 28 Aug · next of kin incomplete</span></span><span class="pill pill-danger">Query</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Dues &amp; levies</h2><a class="link" href="em-analytics.html">Full trend</a></div>
      <div class="card">
        <div class="card-head"><div class="grow"><h3>September 2026 service charge</h3><p class="tiny muted" style="margin-top:3px">100 houses · ₦45,000 per unit</p></div><span class="pill pill-ok">78%</span></div>
        <div class="progress" style="margin-top:12px"><i style="width:78%"></i></div>
        <div class="grid-3" style="margin-top:14px">
          ${kpi("Paid", "71")}
          ${kpi("Partial", "12")}
          ${kpi("Outstanding", "17")}
        </div>
        <div class="divider"></div>
        <button class="btn btn-ghost btn-block" data-open-sheet="sheet-levy">Post a levy or reconcile a payment</button>
      </div>
      <div class="card flush" style="margin-top:12px">
        <div class="row row-static"><span class="row-icon">₦</span><span class="grow"><span class="row-title">Security levy — Q3</span><span class="row-sub">₦20,000 per unit · 64 of 100 settled</span></span><span class="pill pill-warn">Open</span></div>
        <div class="row row-static"><span class="row-icon">₦</span><span class="grow"><span class="row-title">Borehole repair levy</span><span class="row-sub">₦12,500 per unit · closed 14 Aug</span></span><span class="pill pill-ok">Settled</span></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Estate-wide audit log</h2><span class="pill pill-mute"><span class="livedot"></span> Live</span></div>
      <div class="chips" data-group="auditfilter" data-filter-group="auditfilter">
        <button type="button" class="chip" data-value="all" aria-pressed="true">All events</button>
        <button type="button" class="chip" data-value="night">Night access</button>
        <button type="button" class="chip" data-value="denied">Denied</button>
        <button type="button" class="chip" data-value="overstay">Overstay</button>
        <button type="button" class="chip" data-value="admin">Admin actions</button>
      </div>
      <div class="note">Passive night-access flagging runs 10pm–5am. A flag is not an accusation — it marks the movement for review alongside the pass that authorised it.</div>
      <div class="card flush feed" style="margin-top:12px" data-filter-scope="auditfilter">
        ${feedItem({ gate: "1", title: "Night access flagged — House 42 · Unit B", sub: "Long-stay pass · Ahmed Yusuf entered 23:41 · authorised", time: "23:41", pill: { cls: "pill pill-warn", text: "Night" } }).replace('class="fitem"', 'class="fitem" data-tags="night"')}
        ${feedItem({ gate: "2", title: "DENIED — unrecognised code", sub: "Code 88••KP entered twice at Gate 2 pedestrian lane", time: "22:07", pill: { cls: "pill pill-danger", text: "Denied" } }).replace('class="fitem"', 'class="fitem" data-tags="denied"')}
        ${feedItem({ gate: "1", title: "Artisan overstay — House 42 · Unit B", sub: "Chidi Eze (AC servicing) 12 min past 13:00 window + grace", time: "13:12", pill: { cls: "pill pill-danger", text: "Overstay" } }).replace('class="fitem"', 'class="fitem" data-tags="overstay"')}
        ${feedItem({ gate: "2", title: "Estate Staff check-in — Musa Garba", sub: "Groundskeeper · recurring term pass · shift 07:00–15:00", time: "06:58", pill: { cls: "pill pill-ok", text: "Access" } }).replace('class="fitem"', 'class="fitem" data-tags="all"')}
        ${feedItem({ gate: "1", title: "Registration approved — House 55 · Unit A", sub: "Approved by Estate Manager Tolu Akande · PIN issued", time: "Yesterday", pill: { cls: "pill pill-info", text: "Admin" } }).replace('class="fitem"', 'class="fitem" data-tags="admin"')}
        ${feedItem({ gate: "1", title: "Night access flagged — House 12 · Unit A", sub: "Guest pass · checked out 01:14, no return", time: "Yesterday", pill: { cls: "pill pill-warn", text: "Night" } }).replace('class="fitem"', 'class="fitem" data-tags="night"')}
      </div>
      <button class="btn btn-quiet btn-block" style="margin-top:12px">Export audit log (CSV / PDF)</button>
    </div>

    <div class="section">
      <div class="section-head"><h2>Fix-it tickets</h2><a class="link" href="tickets.html">Resident view</a></div>
      <div class="note">Tickets are assigned by <b>job category</b>, never to a named Estate Staff member. You move the status as real-world work is confirmed.</div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Street light out — Crescent B</h3><p class="tiny muted" style="margin-top:3px">FIX-2098 · House 63 · reported 30 Aug</p></div><span class="pill pill-danger">Urgent</span></div>
        <div class="stepper" style="margin-top:14px">
          <div class="st done"><div class="bead"></div><div class="st-label">Submitted</div></div>
          <div class="st current"><div class="bead"></div><div class="st-label">Assigned</div></div>
          <div class="st"><div class="bead"></div><div class="st-label">In progress</div></div>
          <div class="st"><div class="bead"></div><div class="st-label">Resolved</div></div>
        </div>
        <div class="divider"></div>
        <label class="field"><span class="label">Job category</span>
          <select class="select"><option>Electrical</option><option>Plumbing</option><option>Security</option><option>Groundskeeping</option><option>Other</option></select>
        </label>
        <label class="field"><span class="label">Move status to</span>
          <select class="select"><option>Assigned</option><option>In progress</option><option>Resolved</option></select>
        </label>
        <button class="btn btn-block">Save assignment &amp; status</button>
      </div>
      <div class="card flush" style="margin-top:12px">
        <button class="row"><span class="row-icon">🚿</span><span class="grow"><span class="row-title">Low water pressure — House 8</span><span class="row-sub">FIX-2097 · Plumbing · In progress</span></span><span class="pill pill-warn">In progress</span></button>
        <button class="row"><span class="row-icon">🔌</span><span class="grow"><span class="row-title">Generator noise at night — House 27</span><span class="row-sub">FIX-2094 · unassigned</span></span><span class="pill pill-mute">Unassigned</span></button>
        <button class="row"><span class="row-icon">🌿</span><span class="grow"><span class="row-title">Overgrown verge — Gate 2 approach</span><span class="row-sub">FIX-2090 · Groundskeeping · Resolved 29 Aug</span></span><span class="pill pill-ok">Resolved</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Facility booking review</h2><span class="pill pill-warn">3 to review</span></div>
      <div class="card flush">
        <div class="row row-static"><span class="row-icon">⚽</span><span class="grow"><span class="row-title">Five-a-side pitch · Sat 5 Sep, 16:00–18:00</span><span class="row-sub">House 42 · Unit B — 18 guests expected</span></span><button class="btn btn-sm" data-open-sheet="sheet-booking">Review</button></div>
        <div class="row row-static"><span class="row-icon">🏛</span><span class="grow"><span class="row-title">Community hall · Sun 6 Sep, 12:00–16:00</span><span class="row-sub">House 63 · Unit B — naming ceremony</span></span><button class="btn btn-sm" data-open-sheet="sheet-booking">Review</button></div>
        <div class="row row-static"><span class="row-icon">🍳</span><span class="grow"><span class="row-title">Shared kitchen · Fri 4 Sep, 09:00–12:00</span><span class="row-sub">House 8 · Unit A</span></span><button class="btn btn-sm" data-open-sheet="sheet-booking">Review</button></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Accounts you can create</h2></div>
      <div class="card flush">
        <button class="row" data-open-sheet="sheet-account"><span class="row-icon">🛡️</span><span class="grow"><span class="row-title">Estate Security Manager</span><span class="row-sub">Email + password · 1 active account</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-guard"><span class="row-icon">🚧</span><span class="grow"><span class="row-title">Estate Security (Guard)</span><span class="row-sub">PIN-only kiosk login · 6 active guards</span></span><span class="chev">›</span></button>
        <a class="row" href="estate-staff.html"><span class="row-icon">🧹</span><span class="grow"><span class="row-title">Estate Staff record</span><span class="row-sub">No login, ever · records and gate pass only</span></span><span class="chev">›</span></a>
      </div>
      <p class="tiny muted" style="margin-top:10px">Estate Manager accounts are created by the President/VP, not from here.</p>
    </div>

    <div class="section">
      <div class="section-head"><h2>Notices</h2><a class="link" href="notices.html">Board</a></div>
      <button class="btn btn-block" data-open-sheet="sheet-notice">Post an estate notice</button>
      <div class="card flush" style="margin-top:12px">
        <div class="row row-static"><span class="row-icon" style="background:#FBE6E5">⚠️</span><span class="grow"><span class="row-title">Water tanker schedule change</span><span class="row-sub">Emergency · posted by you · 31 Aug</span></span><span class="pill pill-danger">Emergency</span></div>
        <div class="row row-static"><span class="row-icon">ℹ️</span><span class="grow"><span class="row-title">Gate 2 pedestrian lane resurfacing</span><span class="row-sub">Maintenance · posted by Tolu Akande · 28 Aug</span></span><span class="pill pill-info">Maintenance</span></div>
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-approve",
    title: "Approve registration",
    sub: "Yakubu Danladi · House 17 · Unit A",
    bodyHtml: `<div class="note">Approving generates the Primary Resident PIN and sends push + email to the applicant. The PIN is shown to them once, in the app.</div>
    <div class="card" style="margin-top:12px">
      <div class="tiny muted">Next of kin recorded</div>
      <div class="row row-static" style="border-radius:12px;margin-top:6px"><span class="row-icon">HD</span><span class="grow"><span class="row-title">Halima Danladi</span><span class="row-sub">Spouse · 0803 000 0118</span></span></div>
      <div class="row row-static" style="border-radius:12px"><span class="row-icon">MD</span><span class="grow"><span class="row-title">Musa Danladi</span><span class="row-sub">Brother · 0802 000 0441</span></span></div>
    </div>
    <label class="field" style="margin-top:12px"><span class="label">Confirm house and unit</span>
      <div class="pair"><input class="input" value="17"><input class="input" value="Unit A"></div>
    </label>
    <label class="field"><span class="label">Note for the audit log (optional)</span><textarea class="textarea" rows="2" placeholder="Verified allocation letter in person"></textarea></label>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Approve &amp; issue PIN</button>`,
  })}
  ${sheet({
    id: "sheet-reject",
    title: "Reject or query",
    sub: "The applicant is told which field to fix",
    bodyHtml: `<label class="field"><span class="label">Outcome</span><select class="select"><option>Query — ask for more information</option><option>Reject — not eligible</option></select></label>
    <label class="field"><span class="label">Reason sent to the applicant</span><textarea class="textarea" rows="3" placeholder="Next-of-kin phone number is incomplete"></textarea></label>
    <div class="note">Both outcomes are written to the estate-wide audit log with your name against them.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn btn-danger" data-close-sheet>Send</button>`,
  })}
  ${sheet({
    id: "sheet-levy",
    title: "Dues &amp; levies",
    sub: "Reconcile a payment or post a new levy",
    bodyHtml: `<div class="seg" data-group="levyseg" role="group" aria-label="Action">
      <button type="button" aria-pressed="true">Reconcile</button><button type="button">New levy</button>
    </div>
    <label class="field" style="margin-top:14px"><span class="label">House &amp; unit</span><div class="pair"><input class="input" placeholder="House no."><input class="input" placeholder="Unit"></div></label>
    <label class="field"><span class="label">Amount received</span><input class="input" inputmode="decimal" placeholder="₦45,000"></label>
    <label class="field"><span class="label">Reference</span><input class="input" placeholder="Bank reference or receipt no."></label>
    <div class="note">Marks the household paid or partial for the selected charge and updates the collection trend.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save</button>`,
  })}
  ${sheet({
    id: "sheet-booking",
    title: "Facility booking review",
    sub: "Five-a-side pitch · Sat 5 Sep, 16:00–18:00",
    bodyHtml: `<div class="card flush">
      <div class="row row-static"><span class="row-icon">🏠</span><span class="grow"><span class="row-title">House 42 · Unit B</span><span class="row-sub">Ahmed Yusuf · Primary Resident</span></span></div>
      <div class="row row-static"><span class="row-icon">👥</span><span class="grow"><span class="row-title">18 guests expected</span><span class="row-sub">Group pass will be needed at the gate</span></span></div>
      <div class="row row-static"><span class="row-icon">₦</span><span class="grow"><span class="row-title">Dues status: paid</span><span class="row-sub">September service charge settled</span></span><span class="pill pill-ok">Clear</span></div>
    </div>
    <label class="field" style="margin-top:12px"><span class="label">Condition attached (optional)</span><textarea class="textarea" rows="2" placeholder="Clear the pitch by 18:30"></textarea></label>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Decline</button><button class="btn" data-close-sheet>Approve booking</button>`,
  })}
  ${sheet({
    id: "sheet-account",
    title: "Create Security Manager account",
    sub: "Email + password · created by Estate Manager",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <div class="pair">
      <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
      <label class="field"><span class="label">Email</span><input class="input" type="email" placeholder="name@example.com"></label>
    </div>
    <div class="note">The Security Manager receives full, unfiltered security escalations — the same detail you receive, never a summary. They can also create Guard accounts.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Send invite</button>`,
  })}
  ${sheet({
    id: "sheet-guard",
    title: "Create Guard account",
    sub: "PIN-only kiosk login — no email, no house or unit",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <label class="field"><span class="label">Assigned gate</span><select class="select"><option>Gate 1</option><option>Gate 2</option></select></label>
    <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
    <div class="card" style="margin-top:6px">
      <div class="tiny muted">System-generated kiosk PIN</div>
      <div class="code-display" style="margin-top:6px">5 1 8 3 R T</div>
      <div class="note note-gold" style="margin-top:12px;text-align:left">Shown once. The guard signs straight into the kiosk for their assigned gate with this PIN — there is no house or unit step.</div>
    </div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Create guard</button>`,
  })}
  ${sheet({
    id: "sheet-notice",
    title: "Post an estate notice",
    bodyHtml: `<label class="field"><span class="label">Category</span><select class="select"><option>Emergency</option><option>Information</option><option>Maintenance</option></select></label>
    <label class="field"><span class="label">Headline</span><input class="input" placeholder="Short and specific"></label>
    <label class="field"><span class="label">Body</span><textarea class="textarea" rows="4" placeholder="What residents need to do, and by when"></textarea></label>
    <div class="note">Notices go out as push and email together, and stay on the notice board as the permanent record.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Post notice</button>`,
  })}
  ${navBar(NAV_EM, "Home")}`,
};

/* ---------------------------------------------- 20. Estate Staff records */
export const estateStaff = {
  slug: "estate-staff.html",
  title: "Estate Staff records",
  desc: "Record-keeping panel for Estate Staff — name, job category, contact and gate-pass status. This role never logs in.",
  body: `
  ${adminHeader({
    role: "Estate Manager",
    title: "Estate Staff",
    sub: "Records only — 14 people on file",
    back: "em-dashboard.html",
    unread: 9,
  })}
  <main class="sheet-body">
    <div class="note"><b>This role never logs in.</b> There is no Estate Staff dashboard and no app account — only a record here, plus a recurring term-length gate pass with unlimited entries, the same underlying pattern as a resident's Long-stay pass. You are notified when they check in and out at the gate.</div>

    <div class="grid-3" style="margin-top:14px">
      ${kpi("On file", "14")}
      ${kpi("Pass active", "12")}
      ${kpi("Pass expired", "2")}
    </div>

    <div class="chips" style="margin-top:16px" data-group="catfilter" data-filter-group="catfilter">
      <button type="button" class="chip" data-value="all" aria-pressed="true">All categories</button>
      <button type="button" class="chip" data-value="ground">Groundskeeper</button>
      <button type="button" class="chip" data-value="clean">Cleaner</button>
      <button type="button" class="chip" data-value="maint">Maintenance</button>
      <button type="button" class="chip" data-value="admin">Administrative</button>
    </div>

    <div class="card flush" style="margin-top:12px" data-filter-scope="catfilter">
      <button class="row" data-tags="ground" data-open-sheet="sheet-staff-detail"><span class="row-icon">MG</span><span class="grow"><span class="row-title">Musa Garba</span><span class="row-sub">Groundskeeper · 0803 000 2201 · pass to 31 Dec 2026</span></span><span class="pill pill-ok">Active</span></button>
      <button class="row" data-tags="clean" data-open-sheet="sheet-staff-detail"><span class="row-icon">BA</span><span class="grow"><span class="row-title">Blessing Aigbe</span><span class="row-sub">Cleaner · 0806 000 2214 · pass to 31 Dec 2026</span></span><span class="pill pill-ok">Active</span></button>
      <button class="row" data-tags="maint" data-open-sheet="sheet-staff-detail"><span class="row-icon">SO</span><span class="grow"><span class="row-title">Sadiq Onuoha</span><span class="row-sub">Maintenance · 0805 000 2230 · pass to 31 Dec 2026</span></span><span class="pill pill-ok">Active</span></button>
      <button class="row" data-tags="admin" data-open-sheet="sheet-staff-detail"><span class="row-icon">NE</span><span class="grow"><span class="row-title">Ngozi Eze</span><span class="row-sub">Administrative · 0807 000 2242 · pass to 31 Dec 2026</span></span><span class="pill pill-ok">Active</span></button>
      <button class="row" data-tags="ground" data-open-sheet="sheet-staff-detail"><span class="row-icon">KA</span><span class="grow"><span class="row-title">Kabiru Aliyu</span><span class="row-sub">Groundskeeper · 0809 000 2255 · pass ended 31 Aug 2026</span></span><span class="pill pill-danger">Expired</span></button>
      <button class="row" data-tags="clean" data-open-sheet="sheet-staff-detail"><span class="row-icon">PU</span><span class="grow"><span class="row-title">Peace Udoh</span><span class="row-sub">Cleaner · 0802 000 2261 · pass ended 31 Aug 2026</span></span><span class="pill pill-danger">Expired</span></button>
    </div>

    <button class="btn btn-block" style="margin-top:18px" data-open-sheet="sheet-staff-new">Add an Estate Staff record</button>

    <div class="section">
      <div class="section-head"><h2>Gate activity today</h2><span class="pill pill-mute">You are notified for each</span></div>
      <div class="card flush feed">
        ${feedItem({ gate: "2", title: "Musa Garba checked in", sub: "Groundskeeper · recurring term pass", time: "06:58", pill: { cls: "pill pill-ok", text: "In" } })}
        ${feedItem({ gate: "2", title: "Blessing Aigbe checked in", sub: "Cleaner · recurring term pass", time: "07:04", pill: { cls: "pill pill-ok", text: "In" } })}
        ${feedItem({ gate: "1", title: "Ngozi Eze checked out", sub: "Administrative · recurring term pass", time: "15:02", pill: { cls: "pill pill-mute", text: "Out" } })}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Category coverage</h2></div>
      ${chart({
        title: "Headcount by job category",
        kind: "bar",
        note: "Fix-it tickets are assigned to a category, not to a named person.",
        cfg: { labels: ["Ground.", "Cleaner", "Maint.", "Admin"], values: [5, 4, 3, 2], colors: ["#3FAE7A", "#123528", "#E8C547", "#2C6E9B"] },
      })}
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-staff-new",
    title: "Add Estate Staff record",
    sub: "No login is created — record and gate pass only",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <label class="field"><span class="label">Job category</span>
      <select class="select"><option>Groundskeeper</option><option>Cleaner</option><option>Maintenance</option><option>Administrative</option></select>
    </label>
    <div class="pair">
      <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
      <label class="field"><span class="label">Alternate contact</span><input class="input" inputmode="tel" placeholder="Next of kin"></label>
    </div>
    <div class="divider"></div>
    <h4>Recurring gate pass</h4>
    <div class="pair" style="margin-top:10px">
      <label class="field"><span class="label">Term starts</span><input class="input" value="01 Sep 2026"></label>
      <label class="field"><span class="label">Term ends</span><input class="input" value="31 Dec 2026"></label>
    </div>
    <div class="note">Unlimited entries between those dates, the same pattern as a Long-stay pass. It auto-expires at the end date and must be renewed here.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save record</button>`,
  })}
  ${sheet({
    id: "sheet-staff-detail",
    title: "Musa Garba",
    sub: "Groundskeeper · record only, no app account",
    bodyHtml: `<div class="card flush">
      <div class="row row-static"><span class="row-icon">📞</span><span class="grow"><span class="row-title">0803 000 2201</span><span class="row-sub">Primary contact</span></span></div>
      <div class="row row-static"><span class="row-icon">🎫</span><span class="grow"><span class="row-title">Recurring pass · 01 Sep – 31 Dec 2026</span><span class="row-sub">Unlimited entries, both gates</span></span><span class="pill pill-ok">Active</span></div>
      <div class="row row-static"><span class="row-icon">🕕</span><span class="grow"><span class="row-title">Usual shift 07:00 – 15:00</span><span class="row-sub">Recorded for reference — the pass is not time-bound</span></span></div>
    </div>
    <div class="card flush" style="margin-top:12px">
      <button class="row"><span class="row-icon">✏️</span><span class="grow"><span class="row-title">Edit record</span><span class="row-sub">Name, category, contacts</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon">🔁</span><span class="grow"><span class="row-title">Renew gate pass</span><span class="row-sub">Set a new term-length date range</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon" style="background:#FBE6E5">🚫</span><span class="grow"><span class="row-title" style="color:var(--danger)">Revoke gate pass</span><span class="row-sub">Record is kept, access stops immediately</span></span><span class="chev">›</span></button>
    </div>`,
    footHtml: `<button class="btn btn-ghost btn-block" data-close-sheet>Close</button>`,
  })}
  ${navBar(NAV_EM, "Staff")}`,
};

/* -------------------------------------------- 21. Estate Manager analytics */
export const emAnalytics = {
  slug: "em-analytics.html",
  title: "Estate analytics",
  desc: "Estate-wide analytics — gate traffic, pass types, dues, approvals, growth, overstays, tickets, facilities, night access, community activity and SOS.",
  body: `
  ${adminHeader({
    role: "Estate Manager",
    title: "Estate analytics",
    sub: "Scope: estate-wide — every household, both gates",
    back: "em-dashboard.html",
    unread: 9,
  })}
  <main class="sheet-body">
    ${rangeBar("Month")}
    <div class="chips" style="margin-top:10px" data-group="gatefilter">
      <button type="button" class="chip" aria-pressed="true">Both gates</button>
      <button type="button" class="chip">Gate 1</button>
      <button type="button" class="chip">Gate 2</button>
    </div>
    <div class="chips" data-group="passfilter">
      <button type="button" class="chip" aria-pressed="true">All pass types</button>
      <button type="button" class="chip">Guest</button>
      <button type="button" class="chip">Delivery</button>
      <button type="button" class="chip">Artisan</button>
      <button type="button" class="chip">Long-stay</button>
      <button type="button" class="chip">Group</button>
    </div>

    <div class="grid-2" style="margin-top:6px">
      ${kpi("Gate traffic", "9,412", "", "7% vs. Aug", "up")}
      ${kpi("Dues collected", "78", "%", "6 pts", "up")}
      ${kpi("Approval turnaround", "19h", "avg", "5h faster", "up")}
      ${kpi("Avg. ticket resolution", "2.4", "days", "0.3 slower", "down")}
    </div>

    <div class="section">
      ${chart({
        title: "Total gate traffic (entries and exits)",
        id: "c-em-traffic",
        kind: "line",
        compare: true,
        note: "Both gates combined. Turn on “vs. prev” to overlay the previous month.",
        cfg: {
          labels: ["W1", "W2", "W3", "W4"],
          series: [
            { name: "This month", color: "#3FAE7A", values: [2180, 2420, 2310, 2502] },
            { name: "Previous", color: "#A9B5AF", isCompare: true, values: [2040, 2260, 2170, 2320] },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Estate-wide pass type breakdown",
        kind: "donut",
        note: "Composition of the 3,164 passes issued estate-wide this month.",
        cfg: {
          centerValue: "3,164",
          centerLabel: "passes",
          items: [
            { label: "Guest", value: 1180, color: "#3FAE7A" },
            { label: "Delivery", value: 940, color: "#123528" },
            { label: "Artisan", value: 412, color: "#E8C547" },
            { label: "Long-stay", value: 268, color: "#2C6E9B" },
            { label: "Jumu'ah", value: 196, color: "#4A6E5E" },
            { label: "Exit", value: 92, color: "#C6413B" },
            { label: "Group", value: 76, color: "#8A6B08" },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Households by dues status",
        kind: "donut",
        note: "100 houses. Partial means some but not all of the September charge is settled.",
        cfg: {
          centerValue: "100",
          centerLabel: "houses",
          items: [
            { label: "Paid", value: 71, color: "#3FAE7A" },
            { label: "Partial", value: 12, color: "#E8C547" },
            { label: "Outstanding", value: 17, color: "#C6413B" },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Dues collection trend",
        id: "c-em-dues",
        kind: "line",
        compare: true,
        note: "Percentage of the period's charge collected by month end.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "% collected", color: "#3FAE7A", values: [64, 70, 68, 74, 72, 78] },
            { name: "Previous year", color: "#A9B5AF", isCompare: true, values: [58, 61, 63, 66, 65, 69] },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Registration approval turnaround",
        kind: "bar",
        note: "Average hours from submission to approval, by month.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], values: [41, 36, 30, 27, 24, 19], unit: "h" },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Active resident accounts over time",
        kind: "line",
        note: "Primary residents plus sub-accounts, estate-wide.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "Primary", color: "#123528", values: [78, 81, 84, 88, 91, 94] },
            { name: "Sub-accounts", color: "#3FAE7A", values: [142, 151, 163, 178, 190, 204] },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Overstay incidents",
        kind: "line",
        note: "Artisan and Visiting Staff passes past window plus grace. Escalated to you and the Security Manager in full.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "Overstays", color: "#C6413B", values: [9, 12, 8, 14, 11, 13] }] },
      })}
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Overstay drill-down</h3><span class="tiny muted">this month</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>House</th><th>Pass</th><th>Window</th><th>Over by</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">42 · B</td><td>Artisan</td><td>10:00–13:00</td><td>12m</td></tr>
              <tr><td class="t-strong">27 · A</td><td>Artisan</td><td>08:00–11:00</td><td>48m</td></tr>
              <tr><td class="t-strong">63 · B</td><td>Visiting staff</td><td>07:00–16:00</td><td>1h 05m</td></tr>
              <tr><td class="t-strong">12 · A</td><td>Artisan</td><td>14:00–17:00</td><td>22m</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      ${chart({
        title: "Fix-it ticket volume by category",
        kind: "donut",
        note: "All tickets raised this month.",
        cfg: {
          centerValue: "38",
          centerLabel: "tickets",
          items: [
            { label: "Electrical", value: 13, color: "#E8C547" },
            { label: "Plumbing", value: 11, color: "#2C6E9B" },
            { label: "Security", value: 6, color: "#C6413B" },
            { label: "Other", value: 8, color: "#3FAE7A" },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Open vs. resolved tickets",
        kind: "bar",
        note: "Resolved bars use mint, open bars use deep green.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          values: [31, 29, 34, 27, 33, 27],
          colors: ["#3FAE7A", "#3FAE7A", "#3FAE7A", "#3FAE7A", "#3FAE7A", "#123528"],
        },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Facility utilization</h3><span class="tiny muted">day × hour</span></div>
        <div data-chart="heat" data-cfg='${cfgAttr({
          rows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          cols: ["8", "10", "12", "14", "16", "18", "20"],
          values: [
            [1, 2, 1, 2, 4, 6, 3],
            [1, 1, 2, 2, 5, 5, 2],
            [2, 2, 1, 3, 6, 7, 3],
            [1, 2, 2, 2, 5, 6, 4],
            [2, 3, 7, 4, 6, 8, 4],
            [5, 8, 9, 8, 9, 10, 6],
            [4, 6, 7, 6, 7, 8, 4],
          ],
        })}'></div>
        <p class="chart-note">Bookings per slot across all four facilities. Friday midday is Jumu'ah traffic in the community hall.</p>
      </div>
      ${chart({
        title: "Bookings by facility",
        kind: "bar",
        note: "This month, estate-wide.",
        cfg: { labels: ["Pitch", "Hall", "Kitchen", "Club"], values: [42, 26, 18, 21], colors: ["#3FAE7A", "#123528", "#E8C547", "#2C6E9B"] },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Night access frequency (10pm–5am)",
        kind: "line",
        note: "Passive flagging only. Every flagged movement carries the pass that authorised it.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "Flagged movements", color: "#E8C547", values: [22, 26, 24, 31, 28, 34] }] },
      })}
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Individual night events</h3><span class="pill pill-warn">Last 7 nights</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Night</th><th>House</th><th>Gate</th><th>Time</th><th>Pass</th></tr></thead>
            <tbody>
              <tr><td>31 Aug</td><td class="t-strong">42 · B</td><td>1</td><td>23:41</td><td>Long-stay</td></tr>
              <tr><td>30 Aug</td><td class="t-strong">12 · A</td><td>1</td><td>01:14</td><td>Guest</td></tr>
              <tr><td>29 Aug</td><td class="t-strong">7 · A</td><td>2</td><td>02:38</td><td>Resident PIN</td></tr>
              <tr><td>28 Aug</td><td class="t-strong">63 · B</td><td>1</td><td>22:55</td><td>Delivery</td></tr>
              <tr><td>27 Aug</td><td class="t-strong">88 · C</td><td>2</td><td>04:20</td><td>Resident PIN</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Community activity</h2></div>
      <div class="grid-2">
        ${kpi("Poll participation", "62", "%", "of households", "up")}
        ${kpi("Listings posted", "47", "", "9 more", "up")}
      </div>
      ${chart({
        title: "Marketplace activity volume",
        kind: "line",
        note: "Listings posted per month.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "Listings", color: "#3FAE7A", values: [22, 27, 31, 34, 38, 47] }] },
      })}
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Poll participation rate</h3><span class="tiny muted">per poll</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Poll</th><th>Closed</th><th>Households voted</th><th>Rate</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Gate 2 opening hours</td><td>28 Aug</td><td>62 / 100</td><td>62%</td></tr>
              <tr><td class="t-strong">Playground resurfacing</td><td>14 Aug</td><td>54 / 100</td><td>54%</td></tr>
              <tr><td class="t-strong">Security levy renewal</td><td>31 Jul</td><td>71 / 100</td><td>71%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      ${chart({
        title: "SOS incident trend",
        kind: "line",
        note: "Every SOS is broadcast to guards at both gates, the Security Manager and Estate Manager.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "SOS alerts", color: "#C6413B", values: [2, 1, 3, 2, 4, 3] }] },
      })}
      ${chart({
        title: "SOS outcome breakdown",
        kind: "donut",
        note: "Outcome recorded by the acknowledging guard.",
        cfg: {
          centerValue: "15",
          centerLabel: "alerts",
          items: [
            { label: "Resolved", value: 11, color: "#3FAE7A" },
            { label: "False alarm", value: 4, color: "#E8C547" },
          ],
        },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Guard and staff headcount, shift coverage</h3><span class="pill pill-mute">Current</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Team</th><th>Headcount</th><th>Gate 1</th><th>Gate 2</th><th>Coverage</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Guards — day</td><td>3</td><td>2</td><td>1</td><td><span class="pill pill-ok">Full</span></td></tr>
              <tr><td class="t-strong">Guards — night</td><td>3</td><td>1</td><td>1</td><td><span class="pill pill-warn">1 short</span></td></tr>
              <tr><td class="t-strong">Estate Staff</td><td>14</td><td>—</td><td>—</td><td><span class="pill pill-ok">Full</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <button class="btn btn-quiet btn-block" style="margin-top:20px">Export report (PDF / CSV)</button>
    <div class="spacer-nav"></div>
  </main>
  ${navBar(NAV_EM, "Insights")}`,
};
