// Builds every Lighthouse screen as a self-contained static HTML file.
//   bun tools/screens/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page } from "./lib.mjs";
import * as S1 from "./screens-1.mjs";
import * as S2 from "./screens-2.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, "../../public/screens");
const CSS = readFileSync(join(here, "app.css"), "utf8");
const JS = readFileSync(join(here, "app.js"), "utf8");

const SCREENS = [
  { group: "Public", items: [S1.welcome, S1.loginResident, S1.loginAdmin, S1.register] },
  { group: "Resident dashboards", items: [S1.dashboardPrimary, S1.dashboardSub] },
  { group: "Household management", items: [S2.subAccounts, S2.staffOnboarding, S2.staffManagement] },
  { group: "Estate services", items: [S2.facilities, S2.tickets, S2.notices, S2.polls, S2.marketplace] },
  { group: "Account & insights", items: [S2.settings, S2.analytics, S2.notifications] },
];

const BLURB = {
  "welcome.html": "Resident-only landing with the daily rotating hadith.",
  "login-resident.html": "House + unit + 6-character PIN on the custom keypad.",
  "login-admin.html": "Email, password and MFA for estate and Madrasa staff.",
  "register.html": "Household registration ending in a pending-review confirmation.",
  "dashboard-primary.html": "Full household view: passes, gate feed, dues, staff, Madrasa, SOS.",
  "dashboard-sub.html": "Reduced sub-account shell — only passes they issued.",
  "sub-accounts.html": "List, add (PIN shown once) and deactivate sub-accounts.",
  "staff-onboarding.html": "Invite code → live-in/visiting → KYC → gate PIN.",
  "staff-management.html": "Primary's view of household staff and invite codes.",
  "facilities.html": "Facility carousel, date and slot picker, my bookings.",
  "tickets.html": "Category tiles, urgency form and 4-stage status stepper.",
  "notices.html": "Notice board filtered by Emergency / Info / Maintenance.",
  "polls.html": "Townhall polls with animated result bars and closed history.",
  "marketplace.html": "Category grid, free vs. paid, message-seller sheet.",
  "settings.html": "Profile, next-of-kin, PIN change and notification preferences.",
  "analytics.html": "Household analytics using the shared chart vocabulary.",
  "notifications.html": "Persistent notification history, filterable.",
};

mkdirSync(OUT, { recursive: true });

let count = 0;
for (const g of SCREENS) {
  for (const s of g.items) {
    writeFileSync(join(OUT, s.slug), page(s, CSS, JS));
    count++;
  }
}

/* ------------------------------- gallery index -------------------------- */
const gallery = page(
  {
    title: "Screen index",
    desc: "Index of the Lighthouse Lekki Estate resident-facing static screens.",
    body: `
  <header class="hero">
    <div class="topbar">
      <div class="avatar" style="background:var(--gold);color:var(--deep)">LH</div>
      <div class="grow"><div style="font-weight:700;font-size:14.5px;color:#fff">Lighthouse Lekki Estate</div><div class="tiny muted">Community Portal — screen index</div></div>
    </div>
    <div style="margin-top:24px">
      <span class="pill pill-gold">Batch 1 of 3 · public &amp; resident</span>
      <h1 style="margin-top:12px">${count} static screens</h1>
      <p class="muted" style="margin-top:10px;font-size:13.5px">Self-contained HTML with embedded CSS and vanilla JS. No framework, no routing, no backend calls — a visual and interaction reference.</p>
    </div>
  </header>
  <main class="sheet-body">
    ${SCREENS.map(
      (g) => `<div class="section" style="margin-top:0;margin-bottom:24px">
      <div class="section-head"><h2>${g.group}</h2><span class="pill pill-mute">${g.items.length}</span></div>
      <div class="card flush">
        ${g.items
          .map(
            (s) => `<a class="row" href="${s.slug}"><span class="row-icon">›</span><span class="grow"><span class="row-title">${s.title}</span><span class="row-sub">${BLURB[s.slug] || ""}</span></span><span class="chev">›</span></a>`
          )
          .join("")}
      </div>
    </div>`
    ).join("")}
    <div class="note" style="margin-bottom:30px">Design system: mint <b>#3FAE7A</b> / deep <b>#123528</b> with a lemon-gold <b>#E8C547</b> accent, Bricolage Grotesque for display and Plus Jakarta Sans for body. Reused patterns: hero-then-rounded-sheet, .card / .row / .pill / .tile, bottom-sheet modals, the on-screen PIN keypad, and the KPI / line / bar / donut / heatmap / table chart vocabulary.</div>
  </main>`,
  },
  CSS,
  JS
);
writeFileSync(join(OUT, "index.html"), gallery);

console.log("Wrote " + (count + 1) + " screens to public/screens/");
