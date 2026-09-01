# Lighthouse Community Hub

I'm rebuilding the Lighthouse Lekki Estate Community Portal from the ground up. Two documents are attached with the complete role/permissions/analytics specification — read both before starting. This is the first of three prompts; this one covers the public and resident-facing side only.

CRITICAL — output format: every screen as a self-contained static HTML file, inline/embedded CSS, vanilla JS only where needed — no React/Lovable project scaffolding, no routing framework, no backend calls. Visual/interaction reference for a separate Google AI Studio build.

Design system: mint green (#3FAE7A primary, #123528 deep), lemon-gold accent (#E8C547), Bricolage Grotesque for display/headings, Plus Jakarta Sans for body. Reuse: hero-then-rounded-sheet layout for dashboards, .card/.row/.pill/.tile for lists and status, bottom-sheet modals for in-context actions, and the custom on-screen PIN keypad (never a native input) for every PIN/access-code entry.

Don't invent content — realistic placeholder data, never real-sounding specific facts beyond the attached specs. Mobile-first: single column under 640px, 2-column only for short paired fields, horizontal scroll-snap carousels for browsable sets over 3-4 items, 44px minimum tap targets, safe-area padding on fixed elements.

Screens to build

Public welcome/landing — resident-only framing, not marketing. Daily rotating hadith (four established hadith, see spec).

Resident-pattern login — House number + Unit + 6-character PIN via the custom keypad. Serves Residents, Sub-accounts, Staff, and External Guardians alike — the PIN determines which account within a house+unit.

Admin-pattern login — email + password, MFA-capable. Serves Estate Manager, President/VP, System Admin, Madrasa Admin, Estate Imam.

Resident registration — full name, phone, email (required), relationship to property, house number if known, next-of-kin (name/phone/relationship), Madrasa/Mosque/Volunteer checkboxes, PIN creation with strength guidance. Submits to a pending-review confirmation, never redirects to login.

Resident Dashboard — Primary: greeting hero, metrics row, quick actions, active passes (all household passes), gate-activity feed, dues/financial snapshot, sub-account management entry point, staff management entry point, Madrasa child records if applicable, SOS button, notification bell (see below).

Resident Dashboard — Sub-account: same shell, reduced content — only passes they issued, no gate-activity feed, no dues, no facility booking, no staff management, no sub-account management.

Issue Pass modal: bottom-sheet, segmented selector across all 8 pass types (Guest, Delivery, Artisan, Long-stay, Exit, Jumu'ah, Offline, Group), conditional fields per type — Artisan gets time window + grace period, Long-stay gets date range + overnight-stay checkbox.

Sub-account management: list existing sub-accounts, "add sub-account" (name, relationship, phone, email, instant creation, system-generated PIN shown once), remove/deactivate. Primary-only.

Household Staff onboarding: invite code → KYC (ID type/number, photo ID placeholder, guarantor details) → gate PIN via keypad. Live-in vs. Visiting selection early, since it determines access rules.

Household Staff management: Primary's view of their staff — name, Live-in/Visiting tag, active/inactive, last gate activity. Entry point to generate a new invite code.

Facility booking: facility carousel (Football Pitch, Mosque Hall, Community Kitchen, Clubhouse), date + slot picker with visibly disabled booked slots, fee/deposit note, "my bookings" list.

Fix-it tickets: category tiles, description + urgency form, ticket list with a 4-stage status stepper (Reported → Assigned → In Progress → Resolved).

Notice board: filterable by Emergency/Info/Maintenance.

Townhall polls: active polls with tappable options and animated result bars once voted, closed-poll history.

Marketplace: category-filtered grid, free vs. paid visually distinguished, "message seller" rather than exposing phone numbers.

Settings/Profile: edit personal details, next-of-kin, change PIN via keypad with strength guidance, notification preferences.

Resident Analytics: guests hosted, pass-type breakdown, average visit duration, peak visiting heatmap, overstay incidents, staff attendance, facility booking frequency, dues history, child's Madrasa attendance trend. See "Analytics UI requirements" below.

Analytics UI requirements

Small, consistent chart vocabulary — reuse across every analytics screen in this whole project, not just this batch: KPI card (big number + trend delta), line chart (time range selector + "compare to previous period" toggle), bar chart (category comparison), pie/donut chart (composition breakdown), heatmap (day × hour), table (row-level drill-down, used sparingly).

Notification center

Persistent bell icon with unread badge, in every authenticated screen's header — showing recent push notifications (pass activity, overstay/wrong-time alerts, Madrasa events, approval status). Not just one-off toasts per event; a real history view.

What not to change

Don't alter the color tokens, typography, or component patterns. Don't invent new pass types, roles, or permissions beyond the attached specs.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e32cab51-35c0-4c18-973a-cb8208adc2a3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
