# Plan: "A Day in the Life" demo-data polish for all 34 screens

## Goal
Make the Lighthouse Lekki demo feel like one live estate on one busy day, with the same fictional people, houses and events appearing consistently across resident, operations, security, governance and Madrasa screens — plus a presenter walkthrough script.

## The demo story
One connected day: **Friday, 4 September 2026** (Jumu'ah day), told through recurring characters:

- **The Yusuf family — House 42, Unit B** (primary resident Ahmed Yusuf; children Maryam and Ibrahim in the Madrasa)
- **The Baloguns — House 104** (External Guardian Sekinat Balogun, house number in the 101+ range; children Amina and Yusuf)
- **Key staff**: Estate Manager, Security Manager, Guard on duty, Madrasa Teacher Zainab Idris, Minder Musa Garba

Timeline woven through the screens:
1. Morning — a delivery pass issued for House 42; a Jumu'ah guest pass batch approved
2. Midday — guard kiosk verifies the delivery PIN (ACCESS verdict); an expired artisan pass is DENIED
3. Afternoon — a fix-it ticket resolved; a facility booking for the weekend
4. 15:30–17:30 — Madrasa check-ins (Maryam Yusuf, Yusuf Balogun), one absence flagged, pickups recorded
5. Evening — SOS drill logged; executive and analytics screens show the same day's numbers

## Work items

### 1. Consistency pass (all screens)
- Single cast list of names, house numbers, phone numbers, staff names, pass codes used everywhere
- Same dates/times where screens overlap (a check-in at 15:38 on the teacher dashboard matches the guardian's notification)
- Numbers reconcile: KPI totals, chart values and list rows agree with each other on every dashboard/analytics pair
- Edit the screen definitions in `tools/screens/screens-1.mjs` … `screens-7.mjs`, then rebuild via `tools/screens/build.mjs`

### 2. Density pass
- Fill any screen with sparse lists, single-row tables or empty sections so nothing looks unfinished on a projector
- Keep data plausible and generic (no real-sounding specific facts beyond the specs)

### 3. Presenter walkthrough script
- A short, printable document (markdown + delivered as a downloadable file) with:
  - Suggested screen order for a ~15-minute demo
  - Per-screen talking points: what to tap (e.g. open a bottom sheet, run the PIN keypad, trigger an ACCESS verdict)
  - The narrative beats connecting screens ("the pass you just issued now appears at the gate")
- Saved to `/mnt/documents` so you can download it, and referenced from the screen index

### 4. Verify
- Rebuild all screens, serve them, and spot-check key screens (dashboard, guard kiosk, guardian dashboard, one analytics page) with Playwright screenshots to confirm data renders and nothing broke

## Technical notes
- No new components or design changes — data and copy only, same tokens/components/patterns
- No backend, no seeding logic — all data is baked into the static HTML, which is exactly what makes this demo portable
- The gallery index (`public/screens/index.html`) gets a short "Demo day" note linking the walkthrough

## Deliverables
- 34 updated static HTML screens with a coherent cross-screen story
- `demo-walkthrough.md` presenter script, downloadable
