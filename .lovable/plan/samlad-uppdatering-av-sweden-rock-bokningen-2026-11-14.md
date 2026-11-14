# Samlad uppdatering av Sweden Rock-bokningen

## Resultat
- Behåll nuvarande design, bilder, grundpriser (Medium 7 900 kr, Deluxe 11 900 kr) och kapacitet.
- Visa Ingemans Camping, Truckvägen 1, Sölvesborg, cirka 800 meter från entrén. Incheckning tisdag 8 juni 2027 från kvällen; utcheckning söndag 13 juni senast kl. 12.00. Vistelsen förblir 5 nätter.
- Gör bokningsflödet helt svenskspråkigt och visa belopp i kr. Uppdatera relevanta Sweden Rock 2027-texter utan att ändra andra evenemang eller redesigna sidor.
- Medium börjar med 1 gäst och Deluxe med 2. Dessa antal blir även miniminivåer. Extra gäster kostar 850 kr/person för hela vistelsen, med max 3 respektive 4 gäster.
- Ta bort el från standardutrustningen och erbjud el som ej förvalt tillval: 850 kr/tält för hela vistelsen. Visa 230 V, max 230 W och hela användningsbeskrivningen.
- Ta bort Comfort Pack från nya val. Behåll minikylen dold enligt tidigare beslut.
- Uppdatera handduk till 100 kr/person, frukost till 699 kr/person och bäddset till 500 kr/person. Behåll befintliga innehållsdetaljer och prismodeller.
- Visa grundpris, extra gäster och varje valt tillval separat. Samma summa används i sammanfattning, betalning och ny bekräftelse, tillsammans med rätt campinginformation.

## Skydd av tidigare bokningar
- Inga befintliga bokningsposter, betalningar eller historiska tillval skrivs om.
- Tidigare bokningar med sparade priser fortsätter använda dessa; äldre bokningar utan strukturerade prisuppgifter får ingen automatisk omräkning.
- Kvitton ska använda sparade datum och uppgifter i stället för att ersätta historiska värden med dagens festivalinformation.
- Påbörjade betalningar behåller sina sparade belopp. Ett redan öppet äldre bokningsflöde får behålla sin prisversion när den skickas in efter uppdateringen.
- Publicering sker först när den samlade uppdateringen är verifierad; den publicerade sidan ändras inte genom en separat automatisk publicering.

## Tekniskt genomförande
- Nuvarande lagring har 25 bokningar, varav 12 har strukturerade totalpriser, tillval och datum. Admin och kvitton använder sparad metadata; kvittofunktionen har dock en datumöverskrivning som behöver tas bort för historikskyddet.
- Inför versionsmärkt prisunderlag för nya bokningar, inklusive camping, tider, enhetspriser och inkluderat gästantal. Behåll äldre prisversion för pågående flöden och historiska betalningar.
- Dela beräkningsregler mellan bokningsflödet och serverkontrollen. Servern kontrollerar gästantal, valbara tillval, prisversion, total och förskott före lagring och betalning; lita inte på ett belopp skickat av webbläsaren.
- Nuvarande kortbetalning tar emot belopp direkt från webbläsaren. Ändra den till att läsa verifierat, sparat bokningsunderlag, utan att omprissätta äldre bokningar.
- Använd befintlig bokningstabell och dess metadata om möjligt. Eventuell ny serverfunktion ska inte ge offentlig åtkomst till kunduppgifter eller kringgå befintlig adminbehörighet.

## Verifiering
- Automatiska tester för varje tältmodell: inkluderade gäster, min/max, extrapriser, oförändrade grundpriser och hela vistelsen.
- Tester för ej förvald el, av/på-val, oförändrat elpris oavsett gästantal, nya personbaserade tillval och att Comfort Pack inte kan bokas i nya prisversionen.
- Kontrollera Medium med 2 gäster, el och 2 handdukar: 9 800 kr. Deluxe med 3 gäster, el och 3 handdukar: 13 900 kr.
- Testa att felaktiga belopp och otillåtna val stoppas på servern samt att äldre underlag behåller sina sparade priser.
- Kontrollera sammanfattning, bekräftelse och betalningsunderlag på dator och mobil. Undvik riktiga debiteringar i testerna.
- Jämför tidigare bokningsdata före och efter för att bekräfta att den inte ändrats.