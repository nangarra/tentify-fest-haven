# Plan: Starkare bröllopssida med filmen och originalbilderna

## Mål
Bygga om endast `/talt-brollop` till en varm, premium och konverterande sida för både bröllopspar och bröllopsplatser. Huvudbudskapet blir att gästerna kan stanna kvar och att bröllopet blir en hel helg — inte tältuthyrning i första hand.

## Sidans nya flöde
1. **Videoheader**
   - Återinför den befintliga riktiga Tentify-bröllopsfilmen som stor bakgrundsvideo med läsbar mörk toning och bildreserv.
   - Nytt budskap: “Låt inte festen ta slut. Låt gästerna stanna kvar.”
   - Två tydliga vägar: prisförslag och det riktiga Tentify-bröllopet.
   - Kompakt bevisrad med färdigbäddning, komplett uppbyggnad, närhet till festen och pris från 1 200 kr.

2. **Problemet och förändringen**
   - Känslomässig jämförelse mellan gäster som måste ordna taxi/hotell och en samlad glampingby där festen och gemenskapen fortsätter.
   - Visuell övergång som fungerar tydligt även på mobil.

3. **Majas riktiga bröllopshelg**
   - Flyttas högt upp och använder originalbilderna från bröllopet, inklusive bilden på dig vid tälten.
   - Lyfter 10 tält, 2 nätter och 0 tält för brudparet att montera.
   - Antalet övernattande gäster utelämnas tills en verifierad siffra finns.
   - Befintligt kundcitat får en framträdande plats.

4. **Vad som faktiskt ingår**
   - Innehållet grupperas visuellt i Sova, Komfort, Detaljer och Vi sköter i stället för en lång lista.
   - Riktiga bilder visar glampingbyn, interiör, sängar och detaljer.
   - Tillval markeras separat: handdukar, extra säng och specialstyling.

5. **Enkel process**
   - Fyra sammanhängande steg från datum och plats till färdig glampingby och nedmontering.
   - Samma befintliga Tentify-stil, men med tydligare progression.

6. **Bröllopsgårdar och venues**
   - Behålls som en kortare B2B-del längre ned.
   - Fokuserar på extra kapacitet utan investering, lager eller arbete för personalen.
   - Leder till samma offertformulär.

7. **Prisindikation**
   - Tydligt “Från 1 200 kr per tält & natt”.
   - Förklarar vilka faktorer som påverkar priset och att offerten är kostnadsfri utan förpliktelse.

8. **FAQ och internlänkar**
   - SEO-anpassad accordion med samtliga efterfrågade frågor och utförliga, användbara svar.
   - Naturliga länkar till glampingtält, tältuthyrning i Skåne och övriga relevanta Tentify-sidor.

9. **Emotionell avslutning och offertformulär**
   - Avslutas med “När den sista låten spelats behöver ingen åka hem.”
   - Formuläret anpassas för bröllopspar: namn, e-post, telefon, datum, plats, gäster, nätter och meddelande.
   - Behåller befintlig inskickning, bekräftelse direkt på sidan och avisering.

## Bild och film
- Återanvänd `tentify_brolopp-2.mp4` som headerfilm och befintlig bild som reserv medan filmen laddas.
- Återanvänd bröllopsbilderna med tältbyn, gårdsmiljön, interiören och porträttet på dig.
- Bilder under första skärmen laddas först när de närmar sig skärmen, får stabila proportioner och beskrivande svenska alt-texter.
- Kontrollera filmens ljudlösa autoplay, mobil beskärning, laddning och reservbild i både dator- och mobilvy.

## SEO
- En enda H1 och tydlig H2-struktur med sökfraserna naturligt invävda utan upprepning.
- Titel: **Glampingtält till bröllop i Skåne | Boende för bröllopsgäster | Tentify**.
- Angiven metabeskrivning, självrefererande canonical och `og:url`.
- Service-, FAQ- och BreadcrumbList-data i sidans metadata med befintliga Tentify-företagsuppgifter.
- All viktig text visas direkt på sidan; endast FAQ-svaren ligger i accordion men finns fortfarande i sidans HTML efter laddning.

## Teknisk avgränsning och kontroll
- Endast `TaltBrollop` och vid behov sidunika stilar/media ändras; navigation, footer, andra sidor, bokningslogik och globala visuella regler lämnas orörda.
- Kontrollera formulärinskickning, knappar, ankarlänkar, film/bilder, konsolfel samt layout utan överlapp i desktop och mobil.
- Projektet är i dag en klientrenderad webbapp. Metadata och strukturerad data förbättras inom den befintliga lösningen; full serverrendering kräver separat malluppgradering och ingår inte i denna avgränsade sidändring.
