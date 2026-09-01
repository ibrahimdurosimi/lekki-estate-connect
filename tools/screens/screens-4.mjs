// Security Manager dashboard & analytics, Guard kiosk, Guard incoming-SOS panel.
import { adminHeader, navBar, NAV_SM, NAV_GUARD, sheet, scrim, sosSheet, sosInline, kpi, chart, rangeBar, cfgAttr, feedItem, bell } from "./lib.mjs";

/* ------------------------------------------ 22. Security Manager dashboard */
export const smDashboard = {
  slug: "sm-dashboard.html",
  title: "Security Manager dashboard",
  desc: "Guard roster and shift assignment across both gates, cross-gate live activity, full security escalations, Guard account creation and personal SOS.",
  body: `
  ${adminHeader({
    role: "Security Manager",
    title: "Gate command",
    sub: "Gate 1 and Gate 2 · shift in progress 15:00–23:00",
    unread: 12,
    extra: sosInline("My SOS"),
  })}
  <main class="sheet-body">
    <div class="grid-2">
      ${kpi("Movements today", "412", "", "Gate 1: 244", "flat")}
      ${kpi("Denied attempts", "9", "", "3 vs. yesterday", "down")}
      ${kpi("Open escalations", "3", "", "1 SOS active", "flat")}
      ${kpi("Guards on duty", "4", "/ 5", "1 slot unfilled", "down")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Active escalations</h2><span class="pill pill-danger">Full detail</span></div>
      <div class="note">You receive security escalations in full — never a summarised version. Artisan overstay, wrong-time attempts and resident SOS all land here with the complete record.</div>

      <div class="card" style="margin-top:12px;border:1px solid var(--danger)">
        <div class="card-head"><div class="grow"><h3 style="color:var(--danger)">Resident SOS — House 42 · Unit B</h3><p class="tiny muted" style="margin-top:3px">Raised 15:42 · acknowledged by Guard Sule Bako (Gate 1) at 15:43</p></div><span class="pill pill-danger">Active</span></div>
        <div class="divider"></div>
        <table class="table">
          <tbody>
            <tr><td class="t-strong">Raised by</td><td>Ahmed Yusuf · Primary Resident</td></tr>
            <tr><td class="t-strong">Phone</td><td>0803 000 0142</td></tr>
            <tr><td class="t-strong">House / unit</td><td>House 42 · Unit B</td></tr>
            <tr><td class="t-strong">Next of kin</td><td>Fatima Yusuf (Spouse) · 0803 000 0143</td></tr>
            <tr><td class="t-strong">Broadcast to</td><td>Gate 1, Gate 2, Security Manager, Estate Manager</td></tr>
          </tbody>
        </table>
        <div class="pair" style="margin-top:12px">
          <button class="btn btn-ghost">Call resident</button>
          <button class="btn btn-danger" data-open-sheet="sheet-resolve">Record outcome</button>
        </div>
      </div>

      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Artisan overstay — House 42 · Unit B</h3><p class="tiny muted" style="margin-top:3px">Escalated 13:12 · 12 minutes past window plus grace</p></div><span class="pill pill-warn">Overstay</span></div>
        <div class="divider"></div>
        <table class="table">
          <tbody>
            <tr><td class="t-strong">Artisan</td><td>Chidi Eze · AC servicing</td></tr>
            <tr><td class="t-strong">Phone</td><td>0805 000 7781</td></tr>
            <tr><td class="t-strong">Pass window</td><td>10:00 – 13:00 · entered 10:06 via Gate 1</td></tr>
            <tr><td class="t-strong">Host</td><td>Ahmed Yusuf · House 42 · Unit B · 0803 000 0142</td></tr>
            <tr><td class="t-strong">Also notified</td><td>Host resident, Estate Manager</td></tr>
          </tbody>
        </table>
        <div class="pair" style="margin-top:12px"><button class="btn btn-ghost">Call host</button><button class="btn" data-open-sheet="sheet-resolve">Record outcome</button></div>
      </div>

      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Wrong-time attempt — Gate 2</h3><p class="tiny muted" style="margin-top:3px">Escalated 22:07 · code presented outside its authorised window</p></div><span class="pill pill-warn">Wrong time</span></div>
        <div class="divider"></div>
        <table class="table">
          <tbody>
            <tr><td class="t-strong">Code presented</td><td class="mono">88••KP</td></tr>
            <tr><td class="t-strong">Pass on record</td><td>Delivery pass · window 09:00 – 11:00, same day</td></tr>
            <tr><td class="t-strong">Verdict shown</td><td><span class="pill pill-danger">DENIED</span> at the kiosk, twice</td></tr>
            <tr><td class="t-strong">Gate / guard</td><td>Gate 2 · Ibrahim Sanni</td></tr>
            <tr><td class="t-strong">Host household</td><td>House 63 · Unit B</td></tr>
          </tbody>
        </table>
        <div class="pair" style="margin-top:12px"><button class="btn btn-ghost">View gate log</button><button class="btn" data-open-sheet="sheet-resolve">Record outcome</button></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Guard roster &amp; shifts</h2><button class="btn btn-sm btn-ghost" data-open-sheet="sheet-shift">Assign</button></div>
      <div class="seg" data-group="gateseg" role="group" aria-label="Gate">
        <button type="button" aria-pressed="true">Gate 1</button><button type="button">Gate 2</button>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Gate 1 · Tuesday 1 Sep</h3><p class="tiny muted" style="margin-top:3px">Main vehicular entrance</p></div><span class="pill pill-ok">Covered</span></div>
        <div class="roster" style="margin-top:12px">
          <div class="rslot filled"><span class="rs-time">07:00–15:00</span><span class="grow"><span class="row-title">Sule Bako</span><span class="row-sub">Day shift · 168 scans</span></span><span class="pill pill-ok">On duty</span></div>
          <div class="rslot filled"><span class="rs-time">15:00–23:00</span><span class="grow"><span class="row-title">Grace Ntim</span><span class="row-sub">Evening shift · 76 scans so far</span></span><span class="pill pill-ok">On duty</span></div>
          <div class="rslot"><span class="rs-time">23:00–07:00</span><span class="grow"><span class="row-title muted">Night shift unassigned</span><span class="row-sub">Tap assign to fill this slot</span></span><button class="btn btn-sm" data-open-sheet="sheet-shift">Assign</button></div>
        </div>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Gate 2 · Tuesday 1 Sep</h3><p class="tiny muted" style="margin-top:3px">Pedestrian and service entrance</p></div><span class="pill pill-ok">Covered</span></div>
        <div class="roster" style="margin-top:12px">
          <div class="rslot filled"><span class="rs-time">07:00–15:00</span><span class="grow"><span class="row-title">Ibrahim Sanni</span><span class="row-sub">Day shift · 121 scans</span></span><span class="pill pill-ok">On duty</span></div>
          <div class="rslot filled"><span class="rs-time">15:00–23:00</span><span class="grow"><span class="row-title">Yemi Bakare</span><span class="row-sub">Evening shift · 47 scans so far</span></span><span class="pill pill-ok">On duty</span></div>
          <div class="rslot filled"><span class="rs-time">23:00–07:00</span><span class="grow"><span class="row-title">Danjuma Isa</span><span class="row-sub">Night shift · starts in 7h</span></span><span class="pill pill-mute">Scheduled</span></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Live activity — both gates</h2><span class="pill pill-mute"><span class="livedot"></span> Live</span></div>
      <div class="chips" data-group="feedfilter" data-filter-group="feedfilter">
        <button type="button" class="chip" data-value="all" aria-pressed="true">All</button>
        <button type="button" class="chip" data-value="access">Access</button>
        <button type="button" class="chip" data-value="denied">Denied</button>
        <button type="button" class="chip" data-value="expired">Expired</button>
      </div>
      <div class="card flush feed" style="margin-top:12px" data-filter-scope="feedfilter">
        ${feedItem({ gate: "1", title: "ACCESS — Guest pass, House 42 · Unit B", sub: "Amina Bello · scanned by Grace Ntim", time: "15:52", pill: { cls: "pill pill-ok", text: "Access" } }).replace('class="fitem"', 'class="fitem" data-tags="access"')}
        ${feedItem({ gate: "2", title: "ACCESS — Delivery pass, House 8 · Unit A", sub: "Rider · single entry consumed", time: "15:47", pill: { cls: "pill pill-ok", text: "Access" } }).replace('class="fitem"', 'class="fitem" data-tags="access"')}
        ${feedItem({ gate: "1", title: "EXPIRED — Artisan pass, House 27 · Unit A", sub: "Window closed 11:00 · barrier held, host called", time: "15:31", pill: { cls: "pill pill-warn", text: "Expired" } }).replace('class="fitem"', 'class="fitem" data-tags="expired"')}
        ${feedItem({ gate: "2", title: "DENIED — code not recognised", sub: "Second attempt in 4 minutes · escalated", time: "15:12", pill: { cls: "pill pill-danger", text: "Denied" } }).replace('class="fitem"', 'class="fitem" data-tags="denied"')}
        ${feedItem({ gate: "1", title: "ACCESS — Resident PIN, House 63 · Unit B", sub: "Folasade Ogunleye · vehicle", time: "15:04", pill: { cls: "pill pill-ok", text: "Access" } }).replace('class="fitem"', 'class="fitem" data-tags="access"')}
        ${feedItem({ gate: "2", title: "ACCESS — Estate Staff, Ngozi Eze", sub: "Recurring term pass · check-out", time: "15:02", pill: { cls: "pill pill-ok", text: "Access" } }).replace('class="fitem"', 'class="fitem" data-tags="access"')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Guard accounts</h2><button class="btn btn-sm" data-open-sheet="sheet-guard-new">Create</button></div>
      <div class="card flush">
        <button class="row"><span class="row-icon">SB</span><span class="grow"><span class="row-title">Sule Bako</span><span class="row-sub">Gate 1 · PIN-only login · created 12 Jun</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">GN</span><span class="grow"><span class="row-title">Grace Ntim</span><span class="row-sub">Gate 1 · PIN-only login · created 03 Jul</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">IS</span><span class="grow"><span class="row-title">Ibrahim Sanni</span><span class="row-sub">Gate 2 · PIN-only login · created 18 Apr</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">YB</span><span class="grow"><span class="row-title">Yemi Bakare</span><span class="row-sub">Gate 2 · PIN-only login · created 21 Aug</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">DI</span><span class="grow"><span class="row-title">Danjuma Isa</span><span class="row-sub">Gate 2 · PIN-only login · created 09 May</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row"><span class="row-icon">HA</span><span class="grow"><span class="row-title">Hauwa Adamu</span><span class="row-sub">Relief · PIN reset requested 30 Aug</span></span><span class="pill pill-warn">PIN reset</span></button>
      </div>
      <div class="pair" style="margin-top:12px">
        <a class="btn btn-ghost" href="guard-kiosk.html">Open guard kiosk</a>
        <a class="btn btn-ghost" href="guard-sos.html">Guard SOS panel</a>
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sosSheet()}
  ${sheet({
    id: "sheet-shift",
    title: "Assign shift",
    sub: "Gate 1 · night shift 23:00 – 07:00",
    bodyHtml: `<label class="field"><span class="label">Guard</span><select class="select"><option>Sule Bako</option><option>Grace Ntim</option><option>Ibrahim Sanni</option><option>Yemi Bakare</option><option>Danjuma Isa</option><option>Hauwa Adamu (relief)</option></select></label>
    <div class="pair">
      <label class="field"><span class="label">Gate</span><select class="select"><option>Gate 1</option><option>Gate 2</option></select></label>
      <label class="field"><span class="label">Shift</span><select class="select"><option>Night 23:00–07:00</option><option>Day 07:00–15:00</option><option>Evening 15:00–23:00</option></select></label>
    </div>
    <label class="field"><span class="label">Repeat</span><select class="select"><option>This date only</option><option>Every night this week</option><option>Rotating fortnight</option></select></label>
    <div class="note">The guard signs in at that gate's kiosk with their PIN. Their scan count for the shift feeds the per-guard analytics.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Assign shift</button>`,
  })}
  ${sheet({
    id: "sheet-guard-new",
    title: "Create Guard account",
    sub: "PIN-only kiosk login — no email, no house or unit",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <div class="pair">
      <label class="field"><span class="label">Assigned gate</span><select class="select"><option>Gate 1</option><option>Gate 2</option></select></label>
      <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
    </div>
    <div class="card">
      <div class="tiny muted">System-generated kiosk PIN</div>
      <div class="code-display" style="margin-top:6px">4 7 0 2 M B</div>
      <div class="note note-gold" style="margin-top:12px;text-align:left">Shown once. Entering it at the kiosk drops the guard straight into the code-verification screen for their gate.</div>
    </div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Create guard</button>`,
  })}
  ${sheet({
    id: "sheet-resolve",
    title: "Record outcome",
    bodyHtml: `<label class="field"><span class="label">Outcome</span><select class="select"><option>Resolved</option><option>False alarm</option><option>Referred to Estate Manager</option></select></label>
    <label class="field"><span class="label">What happened</span><textarea class="textarea" rows="3" placeholder="Kept factual — this becomes part of the audit log"></textarea></label>
    <div class="note">The outcome is written to the estate-wide audit log and closes the escalation for everyone it was broadcast to.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Save outcome</button>`,
  })}
  ${navBar(NAV_SM, "Home")}`,
};

/* ------------------------------------------ 23. Security Manager analytics */
export const smAnalytics = {
  slug: "sm-analytics.html",
  title: "Security analytics",
  desc: "Gate traffic by gate, peak-hour heatmap, ACCESS/DENIED/EXPIRED breakdown, denied-attempt trend, SOS response time and scans per shift per guard.",
  body: `
  ${adminHeader({
    role: "Security Manager",
    title: "Security analytics",
    sub: "Scope: gate operations, both gates, all shifts",
    back: "sm-dashboard.html",
    unread: 12,
  })}
  <main class="sheet-body">
    ${rangeBar("Month")}
    <div class="chips" style="margin-top:10px" data-group="smgate">
      <button type="button" class="chip" aria-pressed="true">Both gates</button>
      <button type="button" class="chip">Gate 1</button>
      <button type="button" class="chip">Gate 2</button>
    </div>

    <div class="section">
      <div class="section-head"><h2>Core health indicator</h2><span class="pill pill-gold">Primary</span></div>
      <div class="note note-gold" style="text-align:left"><b>Read this first.</b> The proportion of gate verifications ending in ACCESS, DENIED or EXPIRED is the single clearest measure of whether the gate is working. A rising DENIED or EXPIRED share means codes, windows or guard practice need attention before anything else on this page does.</div>
      ${chart({
        title: "Verification outcomes — ACCESS / DENIED / EXPIRED",
        kind: "donut",
        note: "9,412 verifications this month across both gates.",
        cfg: {
          centerValue: "94%",
          centerLabel: "access",
          items: [
            { label: "ACCESS", value: 8847, color: "#3FAE7A" },
            { label: "DENIED", value: 341, color: "#C6413B" },
            { label: "EXPIRED", value: 224, color: "#E8C547" },
          ],
        },
      })}
      ${chart({
        title: "Outcome share over time",
        kind: "line",
        note: "Percentage of verifications, month by month. DENIED and EXPIRED plotted against the same axis.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "DENIED %", color: "#C6413B", values: [5.1, 4.7, 4.4, 4.9, 4.1, 3.6] },
            { name: "EXPIRED %", color: "#E8C547", values: [3.4, 3.1, 2.9, 3.2, 2.6, 2.4] },
          ],
        },
      })}
    </div>

    <div class="grid-2">
      ${kpi("Verifications", "9,412", "", "7% vs. Aug", "up")}
      ${kpi("Denied", "341", "", "0.5 pts", "up")}
      ${kpi("Expired", "224", "", "0.2 pts", "up")}
      ${kpi("Avg. SOS response", "1m 48s", "", "22s faster", "up")}
    </div>

    <div class="section">
      ${chart({
        title: "Gate traffic by gate",
        id: "c-sm-gates",
        kind: "line",
        compare: true,
        note: "Gate 1 is the vehicular entrance, Gate 2 pedestrian and service.",
        cfg: {
          labels: ["W1", "W2", "W3", "W4"],
          series: [
            { name: "Gate 1", color: "#123528", values: [1310, 1442, 1388, 1502] },
            { name: "Gate 2", color: "#3FAE7A", values: [870, 978, 922, 1000] },
          ],
        },
      })}
    </div>

    <div class="section">
      <div class="card chart-card">
        <div class="chart-head"><h3 style="font-size:15px">Peak entry hours</h3><span class="tiny muted">day × hour</span></div>
        <div data-chart="heat" data-cfg='${cfgAttr({
          rows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          cols: ["6", "9", "12", "15", "18", "21", "0"],
          values: [
            [6, 9, 5, 7, 10, 5, 1],
            [6, 8, 5, 7, 10, 4, 1],
            [7, 9, 6, 8, 11, 5, 2],
            [6, 9, 5, 8, 10, 5, 1],
            [7, 8, 12, 9, 11, 6, 2],
            [4, 7, 9, 10, 12, 8, 3],
            [3, 6, 8, 9, 10, 6, 2],
          ],
        })}'></div>
        <p class="chart-note">Both gates combined. The Friday midday band is Jumu'ah arrivals; the 18:00 column is the evening return peak.</p>
      </div>
    </div>

    <div class="section">
      ${chart({
        title: "Denied attempts over time",
        kind: "bar",
        note: "Counts per month. Repeat attempts on the same code within minutes are escalated to the Security Manager.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], values: [402, 371, 358, 389, 352, 341] },
      })}
      ${chart({
        title: "Denied attempts by reason",
        kind: "donut",
        note: "Why the kiosk refused the code.",
        cfg: {
          centerValue: "341",
          centerLabel: "denied",
          items: [
            { label: "Code not recognised", value: 168, color: "#C6413B" },
            { label: "Outside time window", value: 94, color: "#E8C547" },
            { label: "Already used", value: 51, color: "#2C6E9B" },
            { label: "Revoked by host", value: 28, color: "#123528" },
          ],
        },
      })}
    </div>

    <div class="section">
      ${chart({
        title: "Guard SOS response time",
        kind: "line",
        note: "Minutes from alert broadcast to guard acknowledgement, monthly average.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "Minutes to acknowledge", color: "#3FAE7A", values: [3.4, 3.1, 2.8, 2.6, 2.2, 1.8] }] },
      })}
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Response detail</h3><span class="tiny muted">this month</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Alert</th><th>Raised</th><th>Acknowledged by</th><th>Time</th><th>Outcome</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">House 42 · B</td><td>15:42</td><td>Sule Bako · G1</td><td>1m 04s</td><td><span class="pill pill-danger">Active</span></td></tr>
              <tr><td class="t-strong">House 12 · A</td><td>21:18</td><td>Danjuma Isa · G2</td><td>2m 11s</td><td><span class="pill pill-ok">Resolved</span></td></tr>
              <tr><td class="t-strong">Guard · Gate 2</td><td>02:44</td><td>Sule Bako · G1</td><td>0m 51s</td><td><span class="pill pill-ok">Resolved</span></td></tr>
              <tr><td class="t-strong">House 88 · C</td><td>19:03</td><td>Grace Ntim · G1</td><td>3m 20s</td><td><span class="pill pill-warn">False alarm</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      ${chart({
        title: "Scans per shift",
        kind: "bar",
        note: "Average verifications handled per shift, by shift band.",
        cfg: { labels: ["Day", "Evening", "Night"], values: [168, 121, 34], colors: ["#3FAE7A", "#123528", "#E8C547"] },
      })}
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Scans per guard, per shift</h3><span class="tiny muted">this month</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Guard</th><th>Gate</th><th>Shift</th><th>Shifts</th><th>Scans</th><th>Avg.</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Sule Bako</td><td>1</td><td>Day</td><td>21</td><td>3,612</td><td>172</td></tr>
              <tr><td class="t-strong">Grace Ntim</td><td>1</td><td>Evening</td><td>20</td><td>2,480</td><td>124</td></tr>
              <tr><td class="t-strong">Ibrahim Sanni</td><td>2</td><td>Day</td><td>22</td><td>2,706</td><td>123</td></tr>
              <tr><td class="t-strong">Yemi Bakare</td><td>2</td><td>Evening</td><td>19</td><td>1,824</td><td>96</td></tr>
              <tr><td class="t-strong">Danjuma Isa</td><td>2</td><td>Night</td><td>21</td><td>714</td><td>34</td></tr>
              <tr><td class="t-strong">Hauwa Adamu</td><td>relief</td><td>Mixed</td><td>7</td><td>602</td><td>86</td></tr>
            </tbody>
          </table>
        </div>
        <p class="chart-note">Night volume is low by design — the figure matters as a presence check, not a productivity target.</p>
      </div>
    </div>

    <button class="btn btn-quiet btn-block" style="margin-top:20px">Export report (PDF / CSV)</button>
    <div class="spacer-nav"></div>
  </main>
  ${navBar(NAV_SM, "Insights")}`,
};

/* ---------------------------------------------------------- 24. Guard kiosk */
export const guardKiosk = {
  slug: "guard-kiosk.html",
  title: "Guard kiosk",
  desc: "PIN-only guard login straight into code verification, with full-screen ACCESS / DENIED / EXPIRED verdicts and operational guidance.",
  body: `
  <div class="kiosk">
    <div class="kiosk-top">
      <span class="k-gate">Gate 1 · Sule Bako</span>
      <div class="grow"></div>
      ${sosInline("My SOS")}
      ${bell({ light: true, count: 3 })}
    </div>
    <div class="kiosk-body">
      <div class="card" style="margin-top:2px">
        <div style="text-align:center">
          <span class="pill pill-mute">Day shift 07:00 – 15:00</span>
          <h2 style="margin-top:10px;font-size:22px">Enter visitor code</h2>
          <p class="tiny muted" style="margin-top:6px">6 characters — 4 digits and 2 letters. Switch to ABC for the letters.</p>
        </div>
        <div data-keypad data-length="6" data-cta="#verify" style="margin-top:14px"></div>
        <button class="btn btn-block" id="verify" disabled style="margin-top:14px">Verify code</button>
      </div>

      <div class="card plain" style="margin-top:14px;background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18)">
        <div class="tiny" style="color:rgba(255,255,255,.7);letter-spacing:.08em;text-transform:uppercase;font-weight:800">Preview a verdict</div>
        <div class="pair" style="margin-top:10px">
          <button class="btn btn-sm btn-ghost" data-verdict="access">ACCESS</button>
          <button class="btn btn-sm btn-ghost" data-verdict="denied">DENIED</button>
        </div>
        <button class="btn btn-sm btn-ghost btn-block" style="margin-top:8px" data-verdict="expired">EXPIRED</button>
      </div>

      <div class="card plain" style="margin-top:14px;background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18)">
        <div class="tiny" style="color:rgba(255,255,255,.7);letter-spacing:.08em;text-transform:uppercase;font-weight:800">Last 3 verifications, this shift</div>
        <div style="margin-top:10px;color:#fff">
          <div style="display:flex;gap:8px;align-items:center;padding:7px 0"><span class="pill pill-ok">ACCESS</span><span class="tiny" style="color:rgba(255,255,255,.85)">Guest · House 42 · Unit B</span><span class="grow"></span><span class="tiny" style="color:rgba(255,255,255,.6)">15:52</span></div>
          <div style="display:flex;gap:8px;align-items:center;padding:7px 0"><span class="pill pill-warn">EXPIRED</span><span class="tiny" style="color:rgba(255,255,255,.85)">Artisan · House 27 · Unit A</span><span class="grow"></span><span class="tiny" style="color:rgba(255,255,255,.6)">15:31</span></div>
          <div style="display:flex;gap:8px;align-items:center;padding:7px 0"><span class="pill pill-danger">DENIED</span><span class="tiny" style="color:rgba(255,255,255,.85)">Code not recognised</span><span class="grow"></span><span class="tiny" style="color:rgba(255,255,255,.6)">15:12</span></div>
        </div>
      </div>
      <div class="spacer-nav"></div>
    </div>
  </div>

  <div class="verdict v-access" id="v-access" role="alertdialog" aria-label="Access granted">
    <div class="v-mark">✓</div>
    <h2>ACCESS</h2>
    <p class="v-sub">Guest pass · Amina Bello · House 42 · Unit B</p>
    <div class="v-guide"><b>What to do</b>Open the barrier and let the visitor through. Confirm the name on the screen matches the person in front of you before you do. The pass is now marked used and the host has been notified.</div>
    <p class="v-meta">Valid 14:00 – 18:00 today · single entry · issued by Ahmed Yusuf</p>
    <button class="btn" data-verdict-close>Next visitor</button>
  </div>

  <div class="verdict v-denied" id="v-denied" role="alertdialog" aria-label="Access denied">
    <div class="v-mark">✕</div>
    <h2>DENIED</h2>
    <p class="v-sub">Code not recognised · no matching pass on file</p>
    <div class="v-guide"><b>What to do</b>Do not open the barrier. Ask the visitor to confirm the code with the resident who issued it, and to have a fresh pass sent. If the same code is presented again, this attempt is escalated to the Security Manager automatically.</div>
    <p class="v-meta">Attempt logged at Gate 1 · 2nd attempt in 4 minutes</p>
    <button class="btn" data-verdict-close>Back to keypad</button>
  </div>

  <div class="verdict v-expired" id="v-expired" role="alertdialog" aria-label="Pass expired">
    <div class="v-mark">⌛</div>
    <h2>EXPIRED</h2>
    <p class="v-sub">Artisan pass · Chidi Eze · House 27 · Unit A</p>
    <div class="v-guide"><b>What to do</b>Do not open the barrier. The pass window closed at 11:00 and the grace period has run out. Call the host household to confirm before anyone is let through — only the host can issue a new pass.</div>
    <p class="v-meta">Window 08:00 – 11:00 · host 0803 000 0127 · Estate Manager notified</p>
    <button class="btn" data-verdict-close>Back to keypad</button>
  </div>

  ${scrim}
  ${sheet({
    id: "sheet-sos",
    title: "Guard SOS sent",
    sub: "Broadcast as a guard-originated alert",
    bodyHtml: `<div class="card" style="text-align:center">
      <div style="font-size:34px">🚨</div>
      <h3 style="margin-top:8px">Sule Bako · Gate 1</h3>
      <p class="tiny muted" style="margin-top:8px">Sent to the Security Manager, the Estate Manager and the guard at the other gate. Your identity, not a household, is shown on their alert.</p>
      <div class="divider"></div>
      <div class="row row-static" style="border-radius:12px"><span class="row-icon">🛡️</span><span class="grow"><span class="row-title">Awaiting acknowledgement</span><span class="row-sub">Sent just now</span></span><span class="pill pill-danger">Live</span></div>
    </div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel alert</button><button class="btn btn-danger" data-close-sheet>Keep active</button>`,
  })}
  ${navBar(NAV_GUARD, "Kiosk")}`,
  script: `
  (function(){
    function show(id){
      document.querySelectorAll('.verdict').forEach(function(v){ v.classList.remove('open'); });
      var el = document.getElementById('v-' + id);
      if (el) el.classList.add('open');
    }
    document.querySelectorAll('[data-verdict]').forEach(function(b){
      b.addEventListener('click', function(){ show(b.getAttribute('data-verdict')); });
    });
    document.querySelectorAll('[data-verdict-close]').forEach(function(b){
      b.addEventListener('click', function(){
        document.querySelectorAll('.verdict').forEach(function(v){ v.classList.remove('open'); });
      });
    });
    var order = ['access','denied','expired'], i = 0;
    var verify = document.getElementById('verify');
    if (verify) verify.addEventListener('click', function(){ show(order[i++ % order.length]); });
  })();`,
};

/* ------------------------------------------- 25. Guard incoming-SOS panel */
export const guardSos = {
  slug: "guard-sos.html",
  title: "Guard SOS panel",
  desc: "Active SOS alert banner with full identity detail, acknowledge action, and the full day's alert log including resolved and false-alarm outcomes.",
  body: `
  ${adminHeader({
    role: "Estate Security · Gate 1",
    title: "SOS panel",
    sub: "Sule Bako · day shift 07:00 – 15:00",
    back: "guard-kiosk.html",
    unread: 3,
    extra: sosInline("My SOS"),
  })}
  <main class="sheet-body">
    <div class="alert-banner">
      <span class="pill" style="background:rgba(255,255,255,.2);color:#fff;border-color:transparent">Resident SOS · active</span>
      <h3 style="margin-top:10px">House 42 · Unit B — Ahmed Yusuf</h3>
      <div class="ab-row">📞 0803 000 0142 · Primary Resident</div>
      <div class="ab-row">👤 Next of kin: Fatima Yusuf (Spouse) · 0803 000 0143</div>
      <div class="ab-row">🕒 Raised 15:42 · 1m 04s ago · unacknowledged</div>
      <div class="ab-row">📡 Also on the Gate 2 kiosk, Security Manager and Estate Manager</div>
      <button class="btn btn-block" style="background:#fff;color:var(--danger);margin-top:14px" data-open-sheet="sheet-ack">Acknowledge alert</button>
    </div>

    <div class="section">
      <div class="section-head"><h2>Also active</h2><span class="pill pill-warn">1</span></div>
      <div class="card" style="border:1px solid var(--warn)">
        <div class="card-head"><div class="grow"><h3>Guard SOS — Gate 2</h3><p class="tiny muted" style="margin-top:3px">Raised 15:39 · guard-originated, no household attached</p></div><span class="pill pill-warn">Unacknowledged</span></div>
        <div class="divider"></div>
        <table class="table">
          <tbody>
            <tr><td class="t-strong">Guard</td><td>Yemi Bakare · Gate 2 evening shift</td></tr>
            <tr><td class="t-strong">Phone</td><td>0806 000 3390</td></tr>
            <tr><td class="t-strong">Post</td><td>Gate 2 pedestrian lane</td></tr>
          </tbody>
        </table>
        <button class="btn btn-block" style="margin-top:12px" data-open-sheet="sheet-ack">Acknowledge</button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Today's alert log</h2><span class="pill pill-mute">Full day</span></div>
      <div class="chips" data-group="sosfilter" data-filter-group="sosfilter">
        <button type="button" class="chip" data-value="all" aria-pressed="true">All</button>
        <button type="button" class="chip" data-value="active">Active</button>
        <button type="button" class="chip" data-value="resolved">Resolved</button>
        <button type="button" class="chip" data-value="false">False alarm</button>
      </div>
      <div class="card flush" style="margin-top:12px" data-filter-scope="sosfilter">
        <div class="row row-static" data-tags="active,all"><span class="row-icon" style="background:#FBE6E5">🚨</span><span class="grow"><span class="row-title">House 42 · Unit B — Ahmed Yusuf</span><span class="row-sub">15:42 · resident SOS · awaiting acknowledgement</span></span><span class="pill pill-danger">Active</span></div>
        <div class="row row-static" data-tags="active,all"><span class="row-icon" style="background:#FDF3D6">🛡️</span><span class="grow"><span class="row-title">Guard SOS — Yemi Bakare, Gate 2</span><span class="row-sub">15:39 · guard-originated · awaiting acknowledgement</span></span><span class="pill pill-warn">Active</span></div>
        <div class="row row-static" data-tags="resolved,all"><span class="row-icon">✅</span><span class="grow"><span class="row-title">House 12 · Unit A — Zainab Musa</span><span class="row-sub">13:18 · acknowledged 2m 11s · guard attended, medical, ambulance called</span></span><span class="pill pill-ok">Resolved</span></div>
        <div class="row row-static" data-tags="false,all"><span class="row-icon">🟡</span><span class="grow"><span class="row-title">House 88 · Unit C — Emeka Nwosu</span><span class="row-sub">11:03 · acknowledged 3m 20s · button pressed by a child</span></span><span class="pill pill-warn">False alarm</span></div>
        <div class="row row-static" data-tags="resolved,all"><span class="row-icon">✅</span><span class="grow"><span class="row-title">House 7 · Unit A — Sub-account, Yusuf Ahmed</span><span class="row-sub">09:47 · acknowledged 1m 32s · locked out, escorted home</span></span><span class="pill pill-ok">Resolved</span></div>
        <div class="row row-static" data-tags="resolved,all"><span class="row-icon">✅</span><span class="grow"><span class="row-title">Guard SOS — Danjuma Isa, Gate 2</span><span class="row-sub">02:44 · acknowledged 0m 51s · attempted forced entry, police notified</span></span><span class="pill pill-ok">Resolved</span></div>
      </div>
      <p class="tiny muted" style="margin-top:10px">Every alert stays on this list for the full day, whatever the outcome. Acknowledgement times feed the Security Manager's response-time chart.</p>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-ack",
    title: "Acknowledge alert",
    sub: "House 42 · Unit B — Ahmed Yusuf",
    bodyHtml: `<div class="note">Acknowledging tells the resident and both gates that a guard is responding. It does not close the alert — record the outcome once you have attended.</div>
    <label class="field" style="margin-top:12px"><span class="label">Your position now</span><select class="select"><option>Leaving the gate to attend</option><option>Attending with the other guard</option><option>Cannot leave post — sending relief</option></select></label>
    <label class="field"><span class="label">Outcome, once attended</span><select class="select"><option>Not yet attended</option><option>Resolved</option><option>False alarm</option></select></label>
    <label class="field"><span class="label">Note</span><textarea class="textarea" rows="2" placeholder="Short factual note for the log"></textarea></label>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn btn-danger" data-close-sheet>Acknowledge</button>`,
  })}
  ${sheet({
    id: "sheet-sos",
    title: "Guard SOS sent",
    sub: "Broadcast as a guard-originated alert",
    bodyHtml: `<div class="card" style="text-align:center"><div style="font-size:34px">🚨</div><h3 style="margin-top:8px">Sule Bako · Gate 1</h3><p class="tiny muted" style="margin-top:8px">Sent to the Security Manager, the Estate Manager and the guard at the other gate.</p></div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel alert</button><button class="btn btn-danger" data-close-sheet>Keep active</button>`,
  })}
  ${navBar(NAV_GUARD, "SOS panel")}`,
};
