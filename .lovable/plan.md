## Plan: Switch from Sweden Rock to CLSR Butikfestival

### 1. Database (migration)
- Insert 1 row in `tent_inventory`: `festival='clsr-boutique-2026'`, `tent_type='deluxe'`, `total_count=9`, `available_count=9`.
- Sweden Rock rows stay untouched (still sold out). All historical Sweden Rock bookings remain in `bookings` (their `meta.festival = 'sweden-rock'`).

### 2. Homepage (`src/pages/Index.tsx`)
- Remove `<NewBookingSection />` (the Sweden Rock booking block) from the homepage.
- Add a new `<ClsrBookingSection />` in its place (above `IncludedSection`).

### 3. New component `src/components/ClsrBookingSection.tsx`
- Hero-style section using uploaded CLSR photo as background (uploaded via lovable-assets).
- Copy: "Private VIP Glamping Stay at CLSR Butikfestival", subtitle about 9 exclusive tents, 5 min walk to stage, Stora Sundby Slott 26–27 juni 2026.
- Bullet list of included items + venue benefits.
- Live countdown to 2026-06-26 00:00 Europe/Stockholm.
- Availability badge ("X av 9 kvar") from `get_tent_availability('clsr-boutique-2026')`.
- Step 1: event card with "Boka din privata vistelse" button + price 1608 SEK / 2 dagar.
- Step 2: inline form (name, email, phone, antal gäster 1–4, villkor checkbox), shows total 1608 kr + 20 % deposit (322 kr) + 1500 kr deposition, inline Swish/Bankgiro instructions on submit (same UX as today, per project memory). Writes to `bookings` with `meta = { festival: 'clsr-boutique-2026', event: 'CLSR Butikfestival', tentType: 'deluxe', guests, totalPrice: 1608, advance: 322 }`, then calls `decrease_tent_inventory`.
- Sold-out fallback message if `available_count === 0`.

### 4. Gallery — "Previous Events" (`src/components/GallerySection.tsx`)
- Append a "Tidigare event" block below the gallery grid with a single placeholder card for "Sweden Rock 2026" (subtle styling, no images yet, ready to populate later).

### 5. Navigation
- Keep existing nav links. The booking anchor `#boka-talt` now scrolls to the CLSR section (re-use the same id).

### 6. Admin (`src/pages/ZenAdmin.tsx`)
- Add an event selector (Select) at the top: "Sweden Rock 2026" (default) | "CLSR Butikfestival".
- Filter the bookings list by `meta->>festival` matching the selected event (`sweden-rock` or `clsr-boutique-2026`).
- Existing booking detail view, status changes, deposit confirmation, CSV export all keep working — they just operate on the filtered list.
- No deletions or data migration of existing Sweden Rock bookings.

### 7. Out of scope (confirmed)
- No Stripe / online deposit charging (manual Swish, per your answer).
- No changes to halvpall, weddings, extras, contact, or other sections.
- Sweden Rock page/route (if any) is left as-is; only homepage promotion is removed.

### Technical notes
- Upload the attached CLSR image via `lovable-assets create` → `src/assets/clsr-hero.jpg.asset.json`; reference via `import asset from "@/assets/clsr-hero.jpg.asset.json"`.
- Reuse existing form patterns (inline confirmation, disabled fields after submit) from `NewBookingSection.tsx` to stay consistent with project UX memory.
- `NewBookingSection.tsx` file stays in repo (unused) in case Sweden Rock content is needed later; it's just unlinked from `Index.tsx`. Say so if you'd prefer it deleted.
