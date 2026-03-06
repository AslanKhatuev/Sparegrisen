# Sparegrisen

Eksamensprojekt i webutvikling. Et nettsted om privatøkonomi og sparing.

## Kom i gang

```bash
npm install
npm run dev

Åpne [http://localhost:3000] i nettleseren.

Prosjektet bruker følgende pakker:

npm install zustand recharts

## Sider

### Forside 

Oversiktsside med Hero-komponent, tre feature-kort og en personlig beskjed.

### Rentebarometer 

Viser en tabell med sparerenter fra ulike banker. Brukeren kan:

- Endre sparebeløp og se avkastning oppdatert i sanntid
- Sortere tabellen fra høyest til lavest rente og omvendt
- Se beste tilbud fremhevet øverst

### Sparekalkulator 

Kalkulator for langsiktig sparing. Brukeren kan:

- Legge inn månedlig beløp, årsrente og antall år
- Se total saldo, totalt innbetalt og renteinntekter
- Se grafisk fremstilling av sparingen over tid
- Bruke slider for å justere antall år
- Verdiene lagres persistent med Zustand og localStorage

### Kutt en vane 

Viser hva brukeren kan spare ved å kutte kostbare vaner. Brukeren kan:

- Legge til og fjerne vaner med daglig kostnad
- Redigere eksisterende vaner direkte i listen
- Se månedlig sparebeløp beregnet automatisk
- Se grafisk fremstilling av sparingen (gjenbruker SpareGraf fra oppgave 2)
- Verdiene lagres persistent med Zustand og localStorage

## Teknologi

- **Next.js 16.1.6 ** med App Router
- **React** med hooks (useState, useEffect)
- **Tailwind CSS** og inline styles for responsivt design
- **Zustand** med persist-middleware for persistent lagring i localStorage
- **Recharts** for grafisk fremstilling av sparing

## Mappestruktur

- app/rentebarometer/page.js — Oppgave 1
- app/sparekalkulator/page.js — Oppgave 2
- app/kutt-en-vane/page.js — Oppgave 3
- app/globals.css — Global styling
- app/layout.js — Root layout med header
- app/page.js — Forside
- components/Header.js — Navigasjon med hamburger-meny
- components/Hero.js — Hero-komponent
- components/SpareGraf.js — Gjenbrukbar grafkomponent
- store/store.js — Zustand stores med persistent lagring
- lib/bankerData.js — Bankdata med renter

## Gjenbruk av komponenter

`SpareGraf` og `beregnSparedata` brukes både i Sparekalkulator (oppgave 2) og Kutt en vane (oppgave 3).

## Responsivt design

Nettstedet er tilpasset alle skjermstørrelser:

- **Mobil** — hamburger-meny, stablede kolonner
- **Nettbrett (iPad/iPad Pro)** — hamburger-meny, tilpasset layout
- **Desktop** — full navigasjon, grid-layout

## Persistent lagring

Zustand med `persist`-middleware lagrer automatisk alle verdier i localStorage.
Verdiene i Sparekalkulator og Kutt en vane vil derfor ikke forsvinne ved refresh.

## Kilder

- Rentesatser: Veiledende tall basert på diverse banker, sist oppdatert...
- [Next.js dokumentasjon](https://nextjs.org/docs)
- [Zustand dokumentasjon](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Recharts dokumentasjon](https://recharts.org/en-US/)
- [Logo henetet fra:](https://pixabay.com/vectors/piggy-bank-penny-bank-money-box-pig-146311/)
