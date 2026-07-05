## Sammanfattning
Vi uppdaterar Sweden Rock 2027-bokningssidan med nya bilder på tälten och tilläggen, ger sidan en mer festival/rock-känsla med accentfärger från Sweden Rock-loggan, byter hero-videon på startsidan och åtgärdar scroll-problemet i bokningsflödet. Priser, tältkapacitet och backend-logik lämnas orörda.

## 1. Nya bilder på tält och tillägg
- Ladda upp de fyra nya bilderna som Lovable Assets:
  - `medium_tentify_sweden_rock_glamping.webp` → ny bild för **Medium tält**
  - `frukost_sweden_rock_glamping.webp` → bild för tillägget **Lyxig festivalfrukost**
  - `glamping_swedenrock_tillagg.webp` → bild för tillägget **Festival Survival Pack**
  - `handdukar_sweden_rock_glamping.webp` → bild för tillägget **Handduk**
- I `src/config/festivals.ts`:
  - Medium tält: byt `image` till nya Medium-bilden.
  - Deluxe tält: byt `image` till den gamla Medium-bilden (`bekvamt-boende-sweden-rock-glamping.webp`), så alla får konsekvent look.
  - Lägg till `image` på `breakfast`, `festival-survival-pack` och `towel`.
  - För `fridge` och `comfort-pack` (som saknar egen bild): behåll utan bild men rendera en enhetlig ikon-placeholder i kortet, så layouten känns enhetlig.
- I `AddOnCard` i `src/pages/EventBookingPage.tsx`: rendera en bildyta överst (`aspect-[4/3]`, `object-cover`) när `addOn.image` finns; annars visa nuvarande ikonbaserad header med samma höjd så alla kort blir lika höga.
- I `TentCard`: behåll `aspect-[4/3]` + `object-cover` (finns redan) så Medium och Deluxe blir samma höjd.

## 2. Sweden Rock-tema (färg och känsla)
Målet är premium glamping med festival/rock-energi — inte "rockig hemsida", utan accentfärger, kraftfullare rubriker och energiskt hover-beteende.

- Lägg till nya semantiska tokens i `src/index.css` (endast för bokningssidan, scopat via en wrapper-klass `.theme-sweden-rock`):
  - `--sr-red` (djup Sweden Rock-röd), `--sr-orange` (varm orange/gul), `--sr-steel` (mörk stålblå/grå).
  - Nya gradients: `--gradient-sr-heat` (röd → orange), `--gradient-sr-night` (mörk stål → svart).
- I `EventBookingPage.tsx` wrappa root i `<div className="theme-sweden-rock">` och använd de nya tokensen för:
  - Hero-overlay: byt från platt svart till `--gradient-sr-night` med lite värme underifrån.
  - Rubriker (`h1/h2`): tyngre vikt, lätt "chrome"-textshadow inspirerat av loggan (subtil, inte kitschig).
  - Badges och stegnummer: accent i `--sr-red` / `--sr-orange` istället för brun primary.
  - CTA-knapp (`Fortsätt` / `Betala`): ny variant `sr-hero` med `--gradient-sr-heat`, vitt textfärg, hover ger scale + glödande ring.
  - Tent-kort hover: ram lyser upp i `--sr-orange` istället för brun primary-ring.
  - Progress-bar: fill i `--gradient-sr-heat`.
- Behåll bakgrund, kort och muted-toner i befintlig chino/beige så helheten fortfarande känns glamping och premium.

## 3. Ny hero-video på startsidan
- I `src/components/HeroSection.tsx`:
  - Byt `<source src="/tentify_.mp4" ...>` till Sweden Rocks video-URL:  
    `https://swedenrock-prod.storage.googleapis.com/wp-content/uploads/2026/06/SRF_Recap_Hemsida_16x9_.mp4#t=0.1`
  - Behåll `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"`, `poster={heroImage1}` och `<img>`-fallback.
  - Gör overlayn något mörkare (`from-black/40 to-black/55`) så vit text står ut mot en mer färgstark video.

## 4. Scroll-fix i bokningsflödet
- I `src/App.tsx`: lägg till en `ScrollToTop`-komponent som lyssnar på `useLocation()` och kör `window.scrollTo({ top: 0, behavior: "instant" })` vid varje route-byte. Löser att man landar mitt på sidan när man går till `/booking/...`.
- I `EventBookingPage.tsx`:
  - Behåll `scrollTo` som redan finns vid steg-byten men gör dem robusta: använd `requestAnimationFrame` + scrolla till ett `ref` istället för `top: 0`.
  - Lägg till `checkoutTopRef` överst i checkout-vyn; vid `setStep("checkout")` scrolla smooth till `checkoutTopRef` så användaren hamnar vid "Kunduppgifter"-formuläret direkt (både desktop och mobil).
  - Lägg till `confirmationTopRef` överst i bekräftelsevyn; vid `setStep("confirmation")` scrolla smooth dit.
  - Använd samma teknik i mobilens sticky "Fortsätt"-knapp.

## 5. Sidor och komponenter som inte rörs
- Priser, tältkapacitet, `get_tent_availability`, `decrease_tent_inventory`, Stripe-flöde, Supabase-scheman och `NewBookingSection` (gamla widgeten på startsidan) rörs inte.
- Bokningssammanställningen visar fortfarande Medium/Deluxe med rätt namn och pris.

## Tekniska detaljer
- Nya assets skapas via `lovable-assets create --file /mnt/user-uploads/<fil> --filename <fil> > src/assets/<fil>.asset.json`.
- Nya CSS-tokens går i `:root` men aktiveras endast under `.theme-sweden-rock { … }` så resten av sajten inte ändrar färg.
- `sr-hero`-knappen implementeras som en ny variant i `src/components/ui/button.tsx` eller som en Tailwind class-composition direkt i `EventBookingPage.tsx` för att undvika bred påverkan.
- `ScrollToTop` använder `behavior: "instant"` för att undvika visuell "hopp"-animering vid navigation.

## Verifiering efter implementation
- Öppna `/booking/sweden-rock-2027` och bekräfta: rätt bilder på Medium/Deluxe, alla tilläggskort har enhetlig höjd, accentfärger syns på knappar/badges/progress, hero-video på startsidan spelar upp Sweden Rock-videon med mörk overlay.
- Klicka igenom flödet: landning → välj tält → Fortsätt (hamna vid Kunduppgifter) → Skicka bokning (hamna vid bekräftelsen). Testa både desktop och mobil.
