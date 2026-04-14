# ALSA PRO - Redesign webu

## Původní zadání
Návrh nového designu pro stránky alsapro.cz inspirovaného stránkami Specialized.com s moderním minimalistickým vzhledem.

## Architektura
- **Frontend**: React.js s Tailwind CSS
- **Backend**: FastAPI (minimální - pouze status endpoint)
- **Typ webu**: Prezentační/firemní marketing site

## Uživatelské persony
- Sportovní střelci hledající kvalitní střelivo
- Profesionální střelci a soutěžící
- Dealeři a distributoři v EU

## Základní požadavky
- Brand barvy: Oranžová (#FF5500), Černá (#050505), Šedá
- Moderní minimalistický design
- Sekce: Produkty, O nás, Novinky, Kontakt
- Responsivní design
- Česky lokalizovaný obsah

## Implementované funkce (2026-04-09)
✅ Hero sekce s průmyslovým pozadím
✅ Navigace (desktop + mobilní hamburger menu)
✅ Statistiky sekce (15+ let, 20M+ střel, 100% kvalita, EU distribuce)
✅ Produkty - bento grid layout (9mm FMJ 124gr, 115gr, 147gr, přebíjené náboje)
✅ O nás s timeline (2010, 2011, 2015, Dnes)
✅ Blog/Novinky sekce
✅ Kontaktní sekce s formulářem
✅ Footer s odkazy
✅ Smooth scroll navigace
✅ E-Shop odkazy na shop.alsapro.cz

### Logo Update (2026-04-09)
✅ Zakomponováno originální firemní logo ALSA PRO s tagline "EASY TRAINING"
✅ Logo bez bílého pozadí v navigaci (blend mode)
✅ Logo s pozadím ve footeru pro lepší čitelnost
✅ Responsivní zobrazení na všech zařízeních

## Backlog / Budoucí vylepšení
- P0: Napojení kontaktního formuláře na backend/email
- P1: Galerie produktů s detailními fotografiemi
- P1: Integrace s e-shopem (API pro produkty)
- P2: Blog systém s CMS
- P2: Distributoři mapa
- P2: Vícejazyčná verze (EN, DE, PL)

## Další kroky
1. Přidat reálné kontaktní údaje
2. Napojit kontaktní formulář na email službu
3. Přidat produktové fotografie
