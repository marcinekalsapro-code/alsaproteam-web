# 🔧 Refaktoring - Poznámky a plán

## Aktuální stav
- **App.js**: 2116 řádků
- **Stav**: Funkční, ale monolitický

## Co bylo udělánoByla vytvořena základní struktura pro budoucí refaktoring:
```
/app/frontend/src/components/
├── context/
│   └── CartContext.jsx  ✅ (extrahováno z App.js)
├── layout/
│   └── Header.jsx ✅ (připraveno, zatím nepoužito)
├── sections/
├── cart/
```

## Proč nebyl dokončen plný refaktoring?

App.js obsahuje ~15 komponent, produktová data, a komplexní state management. Kompletní refaktoring by:
1. Trval 2-3 hodiny
2. Nesl riziko zavedení chyb
3. Nebyl kritický pro funkčnost (P1, P2 byly prioritní)

## Doporučení pro budoucí refaktoring

### Fáze 1: Extrakce dat
```
/app/frontend/src/
├── data/
│   ├── products.js      // Ammunition data
│   ├── bullets.js       // Střely data
│   └── articles.js      // Blog articles
```

### Fáze 2: Extrakce komponent (postupně)
1. **CartModal** + **OrderFormModal** → `/components/cart/`
2. **Products**, **Bullets**, **Sponsorship** → `/components/sections/`
3. **Hero**, **Gallery**, **Contact** → `/components/sections/`
4. **Footer** → `/components/layout/`

### Fáze 3: Context API
- Udělat CartContext jako globální (už hotovo ✅)
- Možná přidat ProductContext, pokud budete chtít dynamická data

## Benefit refaktoringu
- ✅ Lepší čitelnost kódu
- ✅ Snadnější údržba
- ✅ Rychlejší přidávání nových funkcí
- ✅ Lepší performance (lazy loading komponent)

## Jak postupovat?
Refaktoring doporučuji dělat **postupně** při každé další úpravě:
- Přidáváte novou sekci? → Vytvořte ji jako samostatnou komponentu
- Upravujete Cart? → Přesuňte CartModal do `/components/cart/`

---

**Poznámka**: Aplikace je plně funkční i bez refaktoringu. Je to optimalizace, ne nutnost.
