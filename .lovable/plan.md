# Sweden Rock booking terms

## Scope
Only update the final checkout step on the Sweden Rock booking page. Keep all current design, pricing, dates, products, payment choices, and booking behavior unchanged.

## Changes
- Add a required terms checkbox immediately before the final booking button.
- Make “Booking & Accommodation Terms” open the supplied full Sweden Rock terms in an in-flow modal, without leaving checkout.
- Add the supplied discreet 20% payment notice close to the final booking button.
- Require acceptance in both desktop and mobile submit controls, and guard submission in the booking handler.
- Preserve the existing Swedish/English booking toggle by presenting the supplied English legal copy exactly as provided.

## Verification
- Confirm the terms modal opens, scrolls, and closes on desktop and mobile.
- Confirm both final submit buttons stay disabled until required customer details and terms acceptance are complete.
- Confirm accepting the terms enables the existing submission path without changing payment or booking logic.
- Check that no unrelated page files or UI were changed.
