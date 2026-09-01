// Shared HTML fragments + page shell for the Lighthouse static screens.

export const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

export function page({ title, desc, body, script = "", css = "" }, CSS, JS) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title} · Lighthouse Lekki Estate</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#123528">
${FONTS}
<style>
${CSS}${css ? "\n/* screen-specific */\n" + css : ""}
</style>
</head>
<body>
<div class="app">
${body}
</div>
<script>
${JS}
</script>${script ? `\n<script>\n${script}\n</script>` : ""}
</body>
</html>
`;
}

/* Notification bell — persistent in every authenticated header. */
export function bell({ light = false, count = 4 } = {}) {
  return `<a class="iconbtn${light ? " on-light" : ""}" href="notifications.html" aria-label="Notifications, ${count} unread">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
        <span class="badge-dot">${count}</span>
      </a>`;
}

export function backLink(href = "dashboard-primary.html", label = "Back") {
  return `<a class="back" href="${href}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>${label}</a>`;
}

/* Compact header used on interior authenticated screens. */
export function subHeader({ title, sub = "", back = "dashboard-primary.html", unread = 4 }) {
  return `<header class="hero hero-sm">
    <div class="topbar">
      ${backLink(back)}
      <div class="grow"></div>
      ${bell({ count: unread })}
    </div>
    <div style="margin-top:16px">
      <h1 style="font-size:25px">${title}</h1>
      ${sub ? `<p class="muted" style="margin-top:6px;font-size:13.5px">${sub}</p>` : ""}
    </div>
  </header>`;
}

const NAV = [
  ["Home", "dashboard-primary.html", `<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>`],
  ["Facilities", "facilities.html", `<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M9 20V10"/>`],
  ["Notices", "notices.html", `<path d="M4 4h16v13H8l-4 4z"/>`],
  ["Insights", "analytics.html", `<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`],
  ["Settings", "settings.html", `<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4.6 14H4a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 5.7 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 11 4.6V4a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 .3 1.8"/>`],
];

export function bottomNav(active, homeHref = "dashboard-primary.html") {
  return `<nav class="bottomnav" aria-label="Primary">
    ${NAV.map(([label, href, path]) => {
      const h = label === "Home" ? homeHref : href;
      const cur = label === active ? ' aria-current="page"' : "";
      return `<a class="navitem" href="${h}"${cur}>
      <span class="nav-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>${label}</a>`;
    }).join("\n    ")}
  </nav>`;
}

/* Reduced nav for sub-accounts: no facilities. */
export function bottomNavSub(active) {
  const items = [
    ["Home", "dashboard-sub.html", `<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>`],
    ["Notices", "notices.html", `<path d="M4 4h16v13H8l-4 4z"/>`],
    ["Polls", "polls.html", `<path d="M9 11l3 3 7-7"/><path d="M20 12v7H4V5h11"/>`],
    ["Market", "marketplace.html", `<path d="M3 7h18l-1.5 12h-15z"/><path d="M8 7a4 4 0 0 1 8 0"/>`],
    ["Settings", "settings.html", `<circle cx="12" cy="12" r="3.2"/><path d="M4 12h2M18 12h2M12 4v2M12 18v2"/>`],
  ];
  return `<nav class="bottomnav" aria-label="Primary">
    ${items.map(([label, href, path]) => `<a class="navitem" href="${href}"${label === active ? ' aria-current="page"' : ""}>
      <span class="nav-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>${label}</a>`).join("\n    ")}
  </nav>`;
}

export function sosFab() {
  return `<button class="sos-fab" data-sos aria-label="Emergency SOS — press and hold five seconds"><span class="sos-ring" aria-hidden="true"></span>SOS</button>`;
}

export function sosSheet() {
  return sheet({
    id: "sheet-sos",
    title: "SOS sent",
    sub: "Estate Security, Security Manager and Estate Manager alerted",
    bodyHtml: `<div class="card" style="text-align:center">
      <div style="font-size:34px">🚨</div>
      <h3 style="margin-top:8px">Alert broadcast from House 42, Unit B</h3>
      <p class="tiny muted" style="margin-top:8px">Gate 1 and Gate 2 kiosks are showing your alert now. A guard must acknowledge before this clears. Stay where you are if it is safe to do so.</p>
      <div class="divider"></div>
      <div class="row row-static" style="border-radius:12px"><span class="row-icon">🛡️</span><span class="grow"><span class="row-title">Awaiting guard acknowledgement</span><span class="row-sub">Sent just now</span></span><span class="pill pill-danger">Live</span></div>
    </div>`,
    footHtml: `<button class="btn btn-ghost" data-close-sheet>Cancel alert</button><button class="btn btn-danger" data-close-sheet>Keep active</button>`,
  });
}

/* Generic bottom-sheet modal. */
export function sheet({ id, title, sub = "", bodyHtml, footHtml = "" }) {
  return `<div class="sheet" id="${id}" role="dialog" aria-modal="true" aria-label="${title}">
    <div class="sheet-grab"></div>
    <div class="sheet-head">
      <div class="grow"><h2 style="font-size:19px">${title}</h2>${sub ? `<p class="tiny muted" style="margin-top:3px">${sub}</p>` : ""}</div>
      <button class="iconbtn on-light" data-close-sheet aria-label="Close">✕</button>
    </div>
    <div class="sheet-scroll">${bodyHtml}</div>
    ${footHtml ? `<div class="sheet-foot">${footHtml}</div>` : ""}
  </div>`;
}

export const scrim = `<div class="scrim" id="scrim"></div>`;

/* KPI card */
export function kpi(label, value, unit = "", delta = null, dir = "up") {
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "■";
  return `<div class="kpi">
    <div class="k-label">${label}</div>
    <div class="k-value">${value}${unit ? `<span>${unit}</span>` : ""}</div>
    ${delta ? `<div class="k-delta k-${dir}">${arrow} ${delta}</div>` : ""}
  </div>`;
}

/* Chart card wrapper. Kind: line|bar|donut|heat */
export function chart({ title, note = "", kind, cfg, compare = false, id = "" }) {
  return `<div class="card chart-card">
    <div class="chart-head">
      <h3 style="font-size:15px">${title}</h3>
      ${compare ? `<label class="compare-toggle"><button class="switch" role="switch" aria-checked="false" data-compare-toggle="#${id}" aria-label="Compare to previous period"></button>vs. prev</label>` : ""}
    </div>
    <div data-chart="${kind}"${id ? ` id="${id}"` : ""} data-cfg='${JSON.stringify(cfg)}'></div>
    ${note ? `<p class="chart-note">${note}</p>` : ""}
  </div>`;
}

/* Shared analytics time-range filter bar */
export function rangeBar(active = "Month") {
  return `<div class="seg" data-group="range" role="group" aria-label="Time range">
    ${["Today", "Week", "Month", "Quarter", "Year", "Custom"].map(r => `<button type="button" aria-pressed="${r === active}">${r}</button>`).join("")}
  </div>`;
}
