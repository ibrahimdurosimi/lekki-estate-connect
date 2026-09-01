// President/VP governance screens and System Admin screens.
import { adminHeader, navBar, NAV_EXEC, NAV_SYS, sheet, scrim, kpi, chart, rangeBar, cfgAttr, feedItem } from "./lib.mjs";

/* -------------------------------------------------- 26. President/VP dashboard */
export const execDashboard = {
  slug: "exec-dashboard.html",
  title: "President / VP dashboard",
  desc: "Everything the Estate Manager sees, plus Estate Manager account creation and suspension, System Admin visibility and the System Admin override log.",
  body: `
  ${adminHeader({
    role: "President / Vice President",
    title: "Estate governance",
    sub: "Full estate oversight · 3 Estate Managers, all equal peers",
    unread: 14,
  })}
  <main class="sheet-body">
    <div class="grid-2">
      ${kpi("Dues collected", "78", "%", "6 pts vs. Aug", "up")}
      ${kpi("Occupancy", "94", "%", "94 of 100 houses", "up")}
      ${kpi("Open incidents", "3", "", "1 SOS active", "flat")}
      ${kpi("Ticket backlog", "11", "", "3 unassigned", "down")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Estate Manager accounts</h2><button class="btn btn-sm" data-open-sheet="sheet-em-new">Create</button></div>
      <div class="note">Estate Managers are equal peers — none outranks another. Any of them can act on any approval, and every action is attributed by name in the audit log.</div>
      <div class="card flush" style="margin-top:12px">
        <button class="row" data-open-sheet="sheet-em-manage"><span class="row-icon">BM</span><span class="grow"><span class="row-title">Bilkisu Mohammed</span><span class="row-sub">Estate Manager · created 04 Feb 2026 · 96 approvals</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row" data-open-sheet="sheet-em-manage"><span class="row-icon">TA</span><span class="grow"><span class="row-title">Tolu Akande</span><span class="row-sub">Estate Manager · created 04 Feb 2026 · 74 approvals</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row" data-open-sheet="sheet-em-manage"><span class="row-icon">CN</span><span class="grow"><span class="row-title">Chinedu Nwachukwu</span><span class="row-sub">Estate Manager · created 19 May 2026 · 41 approvals</span></span><span class="pill pill-ok">Active</span></button>
        <button class="row" data-open-sheet="sheet-em-manage"><span class="row-icon">AO</span><span class="grow"><span class="row-title">Aisha Olawale</span><span class="row-sub">Estate Manager · suspended 12 Aug 2026</span></span><span class="pill pill-danger">Suspended</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>System Admin visibility</h2><span class="pill pill-gold">Read-only</span></div>
      <div class="note note-gold" style="text-align:left">You can see which System Admin accounts exist and everything they have done, but System Admin accounts are created and removed by System Admins themselves.</div>
      <div class="card flush" style="margin-top:12px">
        <div class="row row-static"><span class="row-icon">SA</span><span class="grow"><span class="row-title">Samuel Adeyemi</span><span class="row-sub">System Admin · last active 12 min ago · 6 overrides this month</span></span><span class="pill pill-ok">Active</span></div>
        <div class="row row-static"><span class="row-icon">LK</span><span class="grow"><span class="row-title">Lola Kuti</span><span class="row-sub">System Admin · last active 2 days ago · 1 override this month</span></span><span class="pill pill-ok">Active</span></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>System Admin override log</h2><a class="link" href="exec-analytics.html">Trend</a></div>
      <div class="note">Every override is permanently visible to other System Admins and to the President/VP. Overrides cannot be deleted, only annotated.</div>
      <div class="card flush" style="margin-top:12px">
        <div class="row row-static"><span class="row-icon" style="background:#FDF3D6">⚙️</span><span class="grow"><span class="row-title">PIN reset — House 88 · Unit C</span><span class="row-sub">Samuel Adeyemi · 31 Aug 14:02 · resident locked out, verified by phone</span></span><span class="pill pill-gold">Override</span></div>
        <div class="row row-static"><span class="row-icon" style="background:#FDF3D6">⚙️</span><span class="grow"><span class="row-title">Pass revoked outside host action</span><span class="row-sub">Samuel Adeyemi · 30 Aug 22:41 · duplicate Artisan pass issued in error</span></span><span class="pill pill-gold">Override</span></div>
        <div class="row row-static"><span class="row-icon" style="background:#FDF3D6">⚙️</span><span class="grow"><span class="row-title">Account restored — Estate Manager</span><span class="row-sub">Lola Kuti · 24 Aug 09:15 · suspension lifted at President's request</span></span><span class="pill pill-gold">Override</span></div>
        <div class="row row-static"><span class="row-icon" style="background:#FDF3D6">⚙️</span><span class="grow"><span class="row-title">Audit export — full estate, 12 months</span><span class="row-sub">Samuel Adeyemi · 21 Aug 16:50 · requested for the AGM pack</span></span><span class="pill pill-gold">Override</span></div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Pending approvals</h2><span class="pill pill-warn">4 waiting</span></div>
      <div class="card flush">
        <a class="row" href="em-dashboard.html"><span class="row-icon">YD</span><span class="grow"><span class="row-title">Yakubu Danladi · House 17 · Unit A</span><span class="row-sub">Owner-occupier · next of kin on file · 18h waiting</span></span><span class="chev">›</span></a>
        <a class="row" href="em-dashboard.html"><span class="row-icon">FO</span><span class="grow"><span class="row-title">Folasade Ogunleye · House 63 · Unit B</span><span class="row-sub">Tenant · next of kin on file</span></span><span class="chev">›</span></a>
        <a class="row" href="em-dashboard.html"><span class="row-icon">RA</span><span class="grow"><span class="row-title">Rukayat Adisa · House 91 · Unit C</span><span class="row-sub">Next of kin incomplete · queried</span></span><span class="pill pill-danger">Query</span></a>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Dues &amp; levies</h2><a class="link" href="exec-analytics.html">Financial trend</a></div>
      <div class="card">
        <div class="card-head"><div class="grow"><h3>September 2026 service charge</h3><p class="tiny muted" style="margin-top:3px">100 houses · ₦45,000 per unit</p></div><span class="pill pill-ok">78%</span></div>
        <div class="progress" style="margin-top:12px"><i style="width:78%"></i></div>
        <div class="grid-3" style="margin-top:14px">${kpi("Paid", "71")}${kpi("Partial", "12")}${kpi("Outstanding", "17")}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Estate-wide audit log</h2><span class="pill pill-mute"><span class="livedot"></span> Live</span></div>
      <div class="card flush feed">
        ${feedItem({ gate: "1", title: "Night access flagged — House 42 · Unit B", sub: "Long-stay pass · authorised entry 23:41", time: "23:41", pill: { cls: "pill pill-warn", text: "Night" } })}
        ${feedItem({ gate: "2", title: "DENIED — unrecognised code, twice", sub: "Escalated to Security Manager", time: "22:07", pill: { cls: "pill pill-danger", text: "Denied" } })}
        ${feedItem({ gate: "1", title: "Registration approved — House 55 · Unit A", sub: "By Estate Manager Tolu Akande", time: "Yesterday", pill: { cls: "pill pill-info", text: "Admin" } })}
      </div>
      <div class="pair" style="margin-top:12px">
        <a class="btn btn-ghost" href="em-dashboard.html">Operations view</a>
        <a class="btn btn-ghost" href="sm-dashboard.html">Security view</a>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Operations at a glance</h2></div>
      <div class="card flush">
        <a class="row" href="em-dashboard.html"><span class="row-icon">🔧</span><span class="grow"><span class="row-title">Fix-it tickets</span><span class="row-sub">11 open · 3 unassigned · 2.4 day average</span></span><span class="chev">›</span></a>
        <a class="row" href="em-dashboard.html"><span class="row-icon">🏛</span><span class="grow"><span class="row-title">Facility bookings</span><span class="row-sub">3 awaiting Estate Manager review</span></span><span class="chev">›</span></a>
        <a class="row" href="estate-staff.html"><span class="row-icon">🧹</span><span class="grow"><span class="row-title">Estate Staff</span><span class="row-sub">14 on file · 2 gate passes expired</span></span><span class="chev">›</span></a>
        <a class="row" href="notices.html"><span class="row-icon">📢</span><span class="grow"><span class="row-title">Notices</span><span class="row-sub">2 posted in the last week</span></span><span class="chev">›</span></a>
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-em-new",
    title: "Create Estate Manager account",
    sub: "Email + password · created by President/VP only",
    bodyHtml: `<label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <div class="pair">
      <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
      <label class="field"><span class="label">Email</span><input class="input" type="email" placeholder="name@example.com"></label>
    </div>
    <div class="note">New Estate Managers join as equal peers to the existing three. They can approve registrations, manage dues, create Security Manager and Guard accounts and keep Estate Staff records.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Send invite</button>`,
  })}
  ${sheet({
    id: "sheet-em-manage",
    title: "Bilkisu Mohammed",
    sub: "Estate Manager · created 04 Feb 2026",
    bodyHtml: `<div class="grid-3">${kpi("Approvals", "96")}${kpi("Avg. turnaround", "17h")}${kpi("Overrides", "0")}</div>
    <div class="card flush" style="margin-top:12px">
      <button class="row"><span class="row-icon">📄</span><span class="grow"><span class="row-title">View her audit trail</span><span class="row-sub">Every action attributed to this account</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon">✉️</span><span class="grow"><span class="row-title">Resend credentials</span><span class="row-sub">Password reset by email</span></span><span class="chev">›</span></button>
      <button class="row"><span class="row-icon" style="background:#FBE6E5">⏸️</span><span class="grow"><span class="row-title" style="color:var(--danger)">Suspend account</span><span class="row-sub">Access stops immediately, history is kept</span></span><span class="chev">›</span></button>
    </div>
    <div class="note">Suspension is reversible and is itself logged. It does not delete any approval she has already made.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Close</button><button class="btn btn-danger" data-close-sheet>Suspend</button>`,
  })}
  ${navBar(NAV_EXEC, "Home")}`,
};

/* -------------------------------------------------- 27. President/VP analytics */
export const execAnalytics = {
  slug: "exec-analytics.html",
  title: "Estate health — President / VP",
  desc: "Consolidated estate-health KPIs, Estate Manager accountability, year-over-year financial trend, plus the full Estate Manager and Security Manager analytics.",
  body: `
  ${adminHeader({
    role: "President / Vice President",
    title: "Estate health",
    sub: "Consolidated governance view · everything, in one place",
    back: "exec-dashboard.html",
    unread: 14,
  })}
  <main class="sheet-body">
    ${rangeBar("Year")}

    <div class="section">
      <div class="section-head"><h2>Estate health at a glance</h2><span class="pill pill-gold">One glance</span></div>
      <div class="grid-2">
        ${kpi("Dues collected", "78", "%", "6 pts vs. Aug", "up")}
        ${kpi("Occupancy", "94", "%", "2 houses filled", "up")}
        ${kpi("Open incidents", "3", "", "1 active SOS", "flat")}
        ${kpi("Ticket backlog", "11", "", "4 fewer", "up")}
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-head"><div class="grow"><h3>Twelve-month health line</h3><p class="tiny muted" style="margin-top:3px">The four headline measures, indexed for comparison</p></div></div>
        <div data-chart="line" data-cfg='${cfgAttr({
          labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "Dues %", color: "#3FAE7A", values: [61, 63, 66, 69, 67, 70, 64, 70, 68, 74, 72, 78] },
            { name: "Occupancy %", color: "#123528", values: [86, 87, 87, 88, 89, 90, 90, 91, 92, 92, 93, 94] },
            { name: "Ticket backlog", color: "#E8C547", values: [19, 22, 17, 15, 18, 16, 14, 17, 13, 15, 15, 11] },
          ],
        })}'></div>
        <p class="chart-note">Backlog is a count, not a percentage — read it against its own trend, not the two rates.</p>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Estate Manager accountability</h2><span class="pill pill-mute">3 equal peers</span></div>
      <div class="note">Attribution matters because the Estate Managers are peers with identical powers. Every approval, rejection and status change carries the name of the manager who made it.</div>
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Approvals processed, by manager</h3><span class="tiny muted">last 12 months</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Estate Manager</th><th>Approved</th><th>Queried</th><th>Rejected</th><th>Avg. turnaround</th><th>Overdue &gt;48h</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Bilkisu Mohammed</td><td>96</td><td>14</td><td>3</td><td>17h</td><td>2</td></tr>
              <tr><td class="t-strong">Tolu Akande</td><td>74</td><td>9</td><td>5</td><td>21h</td><td>4</td></tr>
              <tr><td class="t-strong">Chinedu Nwachukwu</td><td>41</td><td>6</td><td>1</td><td>26h</td><td>5</td></tr>
              <tr><td class="t-strong">Aisha Olawale <span class="pill pill-danger">Suspended</span></td><td>22</td><td>3</td><td>0</td><td>34h</td><td>7</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      ${chart({
        title: "Share of approvals handled",
        kind: "donut",
        note: "A heavily skewed split usually means cover is uneven, not that anyone is underperforming.",
        cfg: {
          centerValue: "233",
          centerLabel: "approvals",
          items: [
            { label: "Bilkisu", value: 96, color: "#3FAE7A" },
            { label: "Tolu", value: 74, color: "#123528" },
            { label: "Chinedu", value: 41, color: "#E8C547" },
            { label: "Aisha", value: 22, color: "#A9B5AF" },
          ],
        },
      })}
    </div>

    <div class="section">
      <div class="section-head"><h2>Long-horizon finance</h2><span class="pill pill-gold">Year over year</span></div>
      ${chart({
        title: "Dues collection — this year vs. last",
        id: "c-x-yoy",
        kind: "line",
        compare: true,
        note: "Percentage of the period charge collected by month end.",
        cfg: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "2026", color: "#3FAE7A", values: [69, 67, 70, 64, 70, 68, 74, 72, 78] },
            { name: "2025", color: "#A9B5AF", isCompare: true, values: [58, 56, 60, 57, 61, 63, 66, 65, 69] },
          ],
        },
      })}
      ${chart({
        title: "Levies raised per year",
        kind: "bar",
        note: "Count of one-off levies posted, excluding the recurring service charge.",
        cfg: { labels: ["2022", "2023", "2024", "2025", "2026"], values: [2, 3, 3, 5, 4] },
      })}
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Collection by charge</h3><span class="tiny muted">2026 to date</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Charge</th><th>Per unit</th><th>Settled</th><th>Rate</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Service charge — monthly</td><td>₦45,000</td><td>71 / 100</td><td>71%</td></tr>
              <tr><td class="t-strong">Security levy — Q3</td><td>₦20,000</td><td>64 / 100</td><td>64%</td></tr>
              <tr><td class="t-strong">Borehole repair levy</td><td>₦12,500</td><td>100 / 100</td><td>100%</td></tr>
              <tr><td class="t-strong">Gate 2 resurfacing levy</td><td>₦15,000</td><td>38 / 100</td><td>38%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Operations — full Estate Manager set</h2><a class="link" href="em-analytics.html">Open</a></div>
      ${chart({
        title: "Gate traffic (entries and exits)",
        kind: "line",
        note: "Both gates combined.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "Movements", color: "#3FAE7A", values: [8210, 8480, 8390, 8940, 8802, 9412] }] },
      })}
      ${chart({
        title: "Pass type breakdown",
        kind: "donut",
        note: "Estate-wide composition this month.",
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
      <div class="grid-2" style="margin-top:12px">
        ${kpi("Approval turnaround", "19h", "avg", "5h faster", "up")}
        ${kpi("Overstay incidents", "13", "", "2 more", "down")}
        ${kpi("Resident growth", "298", "accounts", "21 added", "up")}
        ${kpi("Poll participation", "62", "%", "of households", "up")}
      </div>
      <div class="card chart-card" style="margin-top:12px">
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
        <p class="chart-note">Bookings per slot across all four facilities.</p>
      </div>
      ${chart({
        title: "Night access frequency (10pm–5am)",
        kind: "line",
        note: "Passively flagged movements, estate-wide.",
        cfg: { labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], series: [{ name: "Flagged", color: "#E8C547", values: [22, 26, 24, 31, 28, 34] }] },
      })}
    </div>

    <div class="section">
      <div class="section-head"><h2>Security — full Security Manager set</h2><a class="link" href="sm-analytics.html">Open</a></div>
      ${chart({
        title: "Verification outcomes — ACCESS / DENIED / EXPIRED",
        kind: "donut",
        note: "The security team's core health indicator, reproduced here unchanged.",
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
        title: "Gate traffic by gate",
        kind: "line",
        note: "Gate 1 vehicular, Gate 2 pedestrian and service.",
        cfg: {
          labels: ["W1", "W2", "W3", "W4"],
          series: [
            { name: "Gate 1", color: "#123528", values: [1310, 1442, 1388, 1502] },
            { name: "Gate 2", color: "#3FAE7A", values: [870, 978, 922, 1000] },
          ],
        },
      })}
      ${chart({
        title: "Denied attempts and SOS trend",
        kind: "line",
        note: "Denied attempts scaled per 100 verifications so the two sit on one axis.",
        cfg: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          series: [
            { name: "Denied per 100", color: "#C6413B", values: [5.1, 4.7, 4.4, 4.9, 4.1, 3.6] },
            { name: "SOS alerts", color: "#123528", values: [2, 1, 3, 2, 4, 3] },
          ],
        },
      })}
      <div class="card chart-card" style="margin-top:12px">
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
        <p class="chart-note">Both gates combined.</p>
      </div>
      <div class="card chart-card" style="margin-top:12px">
        <div class="chart-head"><h3 style="font-size:15px">Scans per guard, per shift</h3><span class="tiny muted">this month</span></div>
        <div class="table-scroll">
          <table class="table">
            <thead><tr><th>Guard</th><th>Gate</th><th>Shift</th><th>Scans</th><th>Avg.</th></tr></thead>
            <tbody>
              <tr><td class="t-strong">Sule Bako</td><td>1</td><td>Day</td><td>3,612</td><td>172</td></tr>
              <tr><td class="t-strong">Grace Ntim</td><td>1</td><td>Evening</td><td>2,480</td><td>124</td></tr>
              <tr><td class="t-strong">Ibrahim Sanni</td><td>2</td><td>Day</td><td>2,706</td><td>123</td></tr>
              <tr><td class="t-strong">Yemi Bakare</td><td>2</td><td>Evening</td><td>1,824</td><td>96</td></tr>
              <tr><td class="t-strong">Danjuma Isa</td><td>2</td><td>Night</td><td>714</td><td>34</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <button class="btn btn-quiet btn-block" style="margin-top:20px">Export governance pack (PDF / CSV)</button>
    <div class="spacer-nav"></div>
  </main>
  ${navBar(NAV_EXEC, "Insights")}`,
};

/* ------------------------------------------------- 28. System Admin dashboard */
export const sysadminDashboard = {
  slug: "sysadmin-dashboard.html",
  title: "System Admin dashboard",
  desc: "Account management across every role, full-reach override tools, and the permanent override-action log.",
  body: `
  ${adminHeader({
    role: "System Admin",
    title: "Account &amp; override console",
    sub: "Full reach across every role and level",
    unread: 5,
  })}
  <main class="sheet-body">
    <div class="grid-2">
      ${kpi("Accounts", "312", "", "all roles", "flat")}
      ${kpi("Active today", "148", "", "47%", "up")}
      ${kpi("Overrides (30d)", "7", "", "2 more", "down")}
      ${kpi("Failed logins (24h)", "12", "", "3 accounts", "flat")}
    </div>

    <div class="section">
      <div class="section-head"><h2>Accounts by role</h2><button class="btn btn-sm" data-open-sheet="sheet-sa-new">Create account</button></div>
      <div class="card flush">
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">SY</span><span class="grow"><span class="row-title">System Admin</span><span class="row-sub">2 accounts · email + password</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">PV</span><span class="grow"><span class="row-title">President / Vice President</span><span class="row-sub">2 accounts · email + password</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">EM</span><span class="grow"><span class="row-title">Estate Manager</span><span class="row-sub">4 accounts · 1 suspended</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">SM</span><span class="grow"><span class="row-title">Estate Security Manager</span><span class="row-sub">1 account</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">GD</span><span class="grow"><span class="row-title">Estate Security (Guard)</span><span class="row-sub">6 accounts · PIN-only login</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">PR</span><span class="grow"><span class="row-title">Primary Resident</span><span class="row-sub">94 accounts · houses 1–100</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">SU</span><span class="grow"><span class="row-title">Sub-account</span><span class="row-sub">204 accounts · under a primary household</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">HS</span><span class="grow"><span class="row-title">Household Staff</span><span class="row-sub">31 records · resident-managed</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">ES</span><span class="grow"><span class="row-title">Estate Staff</span><span class="row-sub">14 records · never logs in</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">MA</span><span class="grow"><span class="row-title">Madrasa Admin / Staff</span><span class="row-sub">1 admin · 5 staff</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-sa-manage"><span class="row-icon">EG</span><span class="grow"><span class="row-title">External Guardian</span><span class="row-sub">23 accounts · identifiers 101 and above</span></span><span class="chev">›</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Override tools</h2><span class="pill pill-gold">Logged permanently</span></div>
      <div class="note note-gold" style="text-align:left"><b>Every override is recorded.</b> The entry names you, the target, the reason and the timestamp, and is visible to the other System Admin and to the President/VP. Entries cannot be deleted.</div>
      <div class="card flush" style="margin-top:12px">
        <button class="row" data-open-sheet="sheet-override"><span class="row-icon">🔑</span><span class="grow"><span class="row-title">Reset a PIN or password</span><span class="row-sub">Any account, any role</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-override"><span class="row-icon">🎫</span><span class="grow"><span class="row-title">Revoke or reinstate a pass</span><span class="row-sub">Outside the host resident's action</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-override"><span class="row-icon">⏸️</span><span class="grow"><span class="row-title">Suspend or restore an account</span><span class="row-sub">Including Estate Manager and President/VP</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-override"><span class="row-icon">🏠</span><span class="grow"><span class="row-title">Reassign a house or unit</span><span class="row-sub">Move a household record between units</span></span><span class="chev">›</span></button>
        <button class="row" data-open-sheet="sheet-override"><span class="row-icon">📤</span><span class="grow"><span class="row-title">Export full audit history</span><span class="row-sub">Whole estate, any date range</span></span><span class="chev">›</span></button>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Override log</h2><span class="pill pill-danger">Permanent</span></div>
      <div class="card chart-card">
        <div class="table-scroll">
          <table class="table dense">
            <thead><tr><th>When</th><th>Admin</th><th>Action</th><th>Target</th><th>Reason</th></tr></thead>
            <tbody>
              <tr><td class="mono">31 Aug 14:02</td><td>S. Adeyemi</td><td>PIN reset</td><td>House 88 · C</td><td>Locked out, verified by phone</td></tr>
              <tr><td class="mono">30 Aug 22:41</td><td>S. Adeyemi</td><td>Pass revoked</td><td>Artisan · House 27 · A</td><td>Duplicate pass issued in error</td></tr>
              <tr><td class="mono">24 Aug 09:15</td><td>L. Kuti</td><td>Account restored</td><td>Estate Manager</td><td>Suspension lifted at President's request</td></tr>
              <tr><td class="mono">21 Aug 16:50</td><td>S. Adeyemi</td><td>Audit export</td><td>Whole estate · 12 months</td><td>AGM pack</td></tr>
              <tr><td class="mono">17 Aug 11:26</td><td>S. Adeyemi</td><td>Unit reassigned</td><td>House 55 · A → B</td><td>Allocation corrected</td></tr>
              <tr><td class="mono">12 Aug 08:04</td><td>L. Kuti</td><td>Account suspended</td><td>Estate Manager</td><td>Requested by President</td></tr>
              <tr><td class="mono">05 Aug 19:33</td><td>S. Adeyemi</td><td>Guard PIN reset</td><td>Guard · relief</td><td>PIN forgotten mid-shift</td></tr>
            </tbody>
          </table>
        </div>
        <p class="chart-note">Visible to every System Admin and to the President/VP. Annotations can be added; rows cannot be removed.</p>
      </div>
    </div>
    <div class="spacer-nav"></div>
  </main>

  ${scrim}
  ${sheet({
    id: "sheet-sa-new",
    title: "Create account",
    sub: "Any role, any level",
    bodyHtml: `<label class="field"><span class="label">Role</span><select class="select"><option>System Admin</option><option>President / Vice President</option><option>Estate Manager</option><option>Estate Security Manager</option><option>Estate Security (Guard)</option><option>Primary Resident</option><option>Madrasa Admin</option><option>External Guardian</option></select></label>
    <label class="field"><span class="label">Full name</span><input class="input" placeholder="Surname first"></label>
    <div class="pair">
      <label class="field"><span class="label">Email</span><input class="input" type="email" placeholder="name@example.com"></label>
      <label class="field"><span class="label">Phone</span><input class="input" inputmode="tel" placeholder="080 0000 0000"></label>
    </div>
    <div class="pair">
      <label class="field"><span class="label">House / identifier</span><input class="input" placeholder="1–100, or 101+ for guardians"></label>
      <label class="field"><span class="label">Unit</span><input class="input" placeholder="Unit A"></label>
    </div>
    <div class="note">Guard accounts get a PIN and no email. External Guardians take an identifier of 101 or above so they never collide with a house number.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn" data-close-sheet>Create</button>`,
  })}
  ${sheet({
    id: "sheet-sa-manage",
    title: "Estate Manager accounts",
    sub: "4 accounts · 1 suspended",
    bodyHtml: `<div class="card flush">
      <div class="row row-static"><span class="row-icon">BM</span><span class="grow"><span class="row-title">Bilkisu Mohammed</span><span class="row-sub">Last active 4 min ago</span></span><span class="pill pill-ok">Active</span></div>
      <div class="row row-static"><span class="row-icon">TA</span><span class="grow"><span class="row-title">Tolu Akande</span><span class="row-sub">Last active 2h ago</span></span><span class="pill pill-ok">Active</span></div>
      <div class="row row-static"><span class="row-icon">CN</span><span class="grow"><span class="row-title">Chinedu Nwachukwu</span><span class="row-sub">Last active yesterday</span></span><span class="pill pill-ok">Active</span></div>
      <div class="row row-static"><span class="row-icon">AO</span><span class="grow"><span class="row-title">Aisha Olawale</span><span class="row-sub">Suspended 12 Aug</span></span><span class="pill pill-danger">Suspended</span></div>
    </div>
    <div class="note">Acting on any of these accounts is an override and appears in the permanent log.</div>`,
    footHtml: `<button class="btn btn-ghost btn-block" data-close-sheet>Close</button>`,
  })}
  ${sheet({
    id: "sheet-override",
    title: "Confirm override",
    sub: "This action is logged permanently",
    bodyHtml: `<label class="field"><span class="label">Target account or record</span><input class="input" placeholder="Search by name, house or identifier"></label>
    <label class="field"><span class="label">Reason — required</span><textarea class="textarea" rows="3" placeholder="Why the normal route could not be used"></textarea></label>
    <div class="note note-gold" style="text-align:left">The log entry will read: <b>your name</b>, the action, the target, this reason and the timestamp. The other System Admin and the President/VP can see it immediately.</div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel</button><button class="btn btn-danger" data-close-sheet>Override &amp; log</button>`,
  })}
  ${navBar(NAV_SYS, "Accounts")}`,
};

/* ---------------------------------------------- 29. System Admin system health */
export const sysadminHealth = {
  slug: "sysadmin-health.html",
  title: "System health",
  desc: "Technical troubleshooting view — active users by role, login patterns, override frequency and cross-role activity.",
  body: `
  ${adminHeader({
    role: "System Admin",
    title: "System health",
    sub: "Technical view · plain and data-dense by design",
    back: "sysadmin-dashboard.html",
    unread: 5,
  })}
  <main class="sheet-body">
    ${rangeBar("Week")}
    <p class="tiny muted" style="margin-top:10px">This page is for troubleshooting, not reporting. Figures are raw counts, unrounded, refreshed on load.</p>

    <div class="card plain" style="margin-top:14px">
      <div class="table-scroll">
        <table class="table dense">
          <thead><tr><th>Role</th><th>Accounts</th><th>Active 24h</th><th>Active 7d</th><th>Never signed in</th><th>Failed logins 24h</th></tr></thead>
          <tbody>
            <tr><td class="t-strong">System Admin</td><td>2</td><td>2</td><td>2</td><td>0</td><td>0</td></tr>
            <tr><td class="t-strong">President / VP</td><td>2</td><td>1</td><td>2</td><td>0</td><td>0</td></tr>
            <tr><td class="t-strong">Estate Manager</td><td>4</td><td>3</td><td>3</td><td>0</td><td>1</td></tr>
            <tr><td class="t-strong">Security Manager</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
            <tr><td class="t-strong">Guard</td><td>6</td><td>5</td><td>6</td><td>0</td><td>3</td></tr>
            <tr><td class="t-strong">Primary Resident</td><td>94</td><td>61</td><td>88</td><td>2</td><td>6</td></tr>
            <tr><td class="t-strong">Sub-account</td><td>204</td><td>68</td><td>171</td><td>14</td><td>2</td></tr>
            <tr><td class="t-strong">Madrasa Admin / Staff</td><td>6</td><td>4</td><td>6</td><td>0</td><td>0</td></tr>
            <tr><td class="t-strong">External Guardian</td><td>23</td><td>3</td><td>17</td><td>1</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card plain" style="margin-top:14px">
      <div class="chart-head"><h3 style="font-size:15px">Active accounts by role</h3><span class="tiny muted">last 24h</span></div>
      <div data-chart="bar" data-cfg='${cfgAttr({
        labels: ["Res.", "Sub", "Guard", "EM", "Guardian", "Madrasa", "Exec", "SysAdm"],
        values: [61, 68, 5, 3, 3, 4, 1, 2],
      })}'></div>
    </div>

    <div class="card plain" style="margin-top:14px">
      <div class="chart-head"><h3 style="font-size:15px">Logins per hour</h3><span class="tiny muted">last 24h, all roles</span></div>
      <div data-chart="line" data-cfg='${cfgAttr({
        labels: ["00", "03", "06", "09", "12", "15", "18", "21"],
        series: [
          { name: "Logins", color: "#3FAE7A", values: [4, 2, 21, 48, 33, 41, 62, 27] },
          { name: "Failed", color: "#C6413B", values: [1, 0, 2, 3, 1, 2, 2, 1] },
        ],
      })}'></div>
      <p class="chart-note">Guard kiosk sign-ins cluster at shift change: 07:00, 15:00 and 23:00.</p>
    </div>

    <div class="card plain" style="margin-top:14px">
      <div class="chart-head"><h3 style="font-size:15px">Login pattern by day and hour</h3><span class="tiny muted">count</span></div>
      <div data-chart="heat" data-cfg='${cfgAttr({
        rows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        cols: ["0", "4", "8", "12", "16", "20"],
        values: [
          [3, 2, 44, 31, 52, 24],
          [4, 1, 41, 29, 48, 22],
          [3, 2, 46, 33, 55, 26],
          [5, 2, 42, 30, 50, 23],
          [4, 2, 39, 61, 47, 21],
          [7, 3, 28, 35, 44, 30],
          [6, 3, 24, 30, 41, 28],
        ],
      })}'></div>
    </div>

    <div class="card plain" style="margin-top:14px">
      <div class="chart-head"><h3 style="font-size:15px">Override frequency</h3><span class="tiny muted">per month</span></div>
      <div data-chart="bar" data-cfg='${cfgAttr({
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        values: [3, 5, 4, 6, 7, 2],
        colors: ["#E8C547", "#E8C547", "#E8C547", "#E8C547", "#C6413B", "#E8C547"],
      })}'></div>
      <p class="chart-note">August is flagged because it exceeded the previous twelve-month maximum.</p>
    </div>

    <div class="card plain" style="margin-top:14px">
      <div class="chart-head"><h3 style="font-size:15px">Override frequency by admin and type</h3><span class="tiny muted">last 6 months</span></div>
      <div class="table-scroll">
        <table class="table dense">
          <thead><tr><th>Admin</th><th>PIN reset</th><th>Pass</th><th>Account</th><th>Unit</th><th>Export</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td class="t-strong">S. Adeyemi</td><td>9</td><td>4</td><td>2</td><td>1</td><td>3</td><td>19</td></tr>
            <tr><td class="t-strong">L. Kuti</td><td>2</td><td>1</td><td>4</td><td>0</td><td>1</td><td>8</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card plain" style="margin-top:14px">
      <div class="chart-head"><h3 style="font-size:15px">Cross-role activity</h3><span class="tiny muted">last 7 days</span></div>
      <div class="table-scroll">
        <table class="table dense">
          <thead><tr><th>Role</th><th>Sessions</th><th>Passes issued</th><th>Approvals</th><th>Scans</th><th>Tickets</th><th>Posts</th><th>Errors</th></tr></thead>
          <tbody>
            <tr><td class="t-strong">Primary Resident</td><td>612</td><td>488</td><td>0</td><td>0</td><td>19</td><td>34</td><td>3</td></tr>
            <tr><td class="t-strong">Sub-account</td><td>431</td><td>206</td><td>0</td><td>0</td><td>6</td><td>11</td><td>1</td></tr>
            <tr><td class="t-strong">Guard</td><td>42</td><td>0</td><td>0</td><td>2,214</td><td>0</td><td>0</td><td>0</td></tr>
            <tr><td class="t-strong">Security Manager</td><td>21</td><td>0</td><td>0</td><td>0</td><td>0</td><td>2</td><td>0</td></tr>
            <tr><td class="t-strong">Estate Manager</td><td>38</td><td>0</td><td>27</td><td>0</td><td>31</td><td>4</td><td>0</td></tr>
            <tr><td class="t-strong">President / VP</td><td>9</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
            <tr><td class="t-strong">Madrasa Admin / Staff</td><td>27</td><td>14</td><td>0</td><td>0</td><td>0</td><td>3</td><td>0</td></tr>
            <tr><td class="t-strong">External Guardian</td><td>31</td><td>26</td><td>0</td><td>0</td><td>0</td><td>0</td><td>2</td></tr>
            <tr><td class="t-strong">System Admin</td><td>14</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card plain" style="margin-top:14px">
      <div class="chart-head"><h3 style="font-size:15px">Recent errors and failed sign-ins</h3><span class="tiny muted">raw</span></div>
      <div class="table-scroll">
        <table class="table dense">
          <thead><tr><th>Timestamp</th><th>Role</th><th>Identifier</th><th>Event</th></tr></thead>
          <tbody>
            <tr><td class="mono">01 Sep 09:14:02</td><td>Guard</td><td class="mono">G-004</td><td>PIN rejected ×3, kiosk locked 60s</td></tr>
            <tr><td class="mono">01 Sep 08:41:55</td><td>Primary Resident</td><td class="mono">H-088-C</td><td>Password rejected ×2</td></tr>
            <tr><td class="mono">01 Sep 07:02:31</td><td>External Guardian</td><td class="mono">EG-113</td><td>Pass issue failed — window outside policy</td></tr>
            <tr><td class="mono">31 Aug 23:58:10</td><td>Sub-account</td><td class="mono">H-042-B-2</td><td>Session expired mid-request</td></tr>
            <tr><td class="mono">31 Aug 21:07:44</td><td>Primary Resident</td><td class="mono">H-012-A</td><td>Push delivery failed, email sent</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <button class="btn btn-quiet btn-block" style="margin-top:20px">Export raw log (CSV)</button>
    <div class="spacer-nav"></div>
  </main>
  ${navBar(NAV_SYS, "Health")}`,
};
