# ADJ-WEB — app tree map

Generated from the working tree. `(*)` = AkmanOS vendored block.

```text
ADJ-WEB/
├── docs/
│   ├── STRUCTURE.md          # route/component/data plan + phase exit criteria
│   ├── TREEMAP.md            # this file
│   └── BRIEF.md              # planning-agent handoff: all website details
├── public/
│   ├── adj-logo.png          # real ADJ logo (header, footer)
│   ├── adj-icon.png          # favicon
│   └── testimonials/
│       └── demo-{1,2,3}.svg  # DEMO portraits → real photos
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # fonts, metadata, JSON-LD, header/footer shell
│   │   ├── page.tsx          # homepage: Hero + Stats + Results + Faq
│   │   └── globals.css       # Tailwind v4 theme + shadcn tokens + AkmanOS scopes
│   ├── components/
│   │   ├── ui/               # shadcn primitives (5, all in use)
│   │   │   ├── badge, button, separator, sheet
│   │   │   └── marquee.tsx   # Magic UI (21st ecosystem), hero exams ticker
│   │   ├── statistic-cards/  # (*) AkmanOS → Stats band
│   │   │   ├── statistic-cards.tsx + growth-badge.tsx + index.ts
│   │   │   └── constants.ts  # ADJ figures (DEMO/TODO)
│   │   ├── testimonial-card/ # (*) AkmanOS → Results section
│   │   │   ├── testimonial-card.tsx + types.ts + index.ts
│   │   │   └── constants.ts  # upstream defaults (unused, props win)
│   │   ├── bouncy-accordion/ # (*) AkmanOS → FAQ section
│   │   │   └── bouncy-accordion.tsx + constants.ts + index.ts
│   │   ├── animated-text/    # (*) AkmanOS → hero gold headline
│   │   │   └── animated-text.tsx + constants.ts + index.ts
│   │   ├── charts/
│   │   │   └── animated-number.tsx  # (*) AkmanOS count-up primitive
│   │   ├── icons/
│   │   │   └── icon.tsx + metric-icon-box.tsx  # (*) AkmanOS icon wrappers
│   │   ├── home/             # homepage sections (compose the above)
│   │   │   ├── hero.tsx      # headline, CTAs, marquee ticker
│   │   │   ├── proof.tsx     # Stats + Results
│   │   │   └── faq.tsx       # bouncy accordion wired to site.ts faqs
│   │   ├── site-header.tsx   # sticky nav + mobile sheet + CTAs
│   │   └── site-footer.tsx   # nav, programmes, contact, partnership note
│   └── lib/
│       ├── site.ts           # ALL business facts (TODO = need real value)
│       ├── utils.ts          # shadcn cn()
│       ├── cn.ts             # AkmanOS import-path alias → utils
│       └── motion-ease.ts    # (*) AkmanOS spring presets
├── components.json           # shadcn aliases (@/components/ui, @/lib)
├── .mcp.json                 # AkmanOS MCP (live) + 21st MCP (needs API key)
├── .env.example              # Supabase keys (booking v2, unused yet)
└── package.json              # next 16 · react 19 · tailwind v4 · motion · lucide
```

## Where each homepage section comes from

| Section (`page.tsx` order) | File | Built with |
|---|---|---|
| Hero | `home/hero.tsx` | AkmanOS animated-text + Magic UI marquee + shadcn buttonVariants |
| Stats | `home/proof.tsx` → `Stats` | AkmanOS statistic-cards |
| Results | `home/proof.tsx` → `Results` | AkmanOS testimonial-card ×3 |
| FAQ | `home/faq.tsx` | AkmanOS bouncy-accordion |

## Removed during cleanup (restorable from git history)

Hand-rolled `home/services.tsx` (services grid, tutorials, about), `home/contact.tsx`
(WhatsApp booking form), `CbtBand` (greyed coming-soon), `ui/{card,input,textarea,select,label}.tsx`
(unused after the above), `ui/{accordion,dialog,sonner}.tsx` (unused), default Next.js assets.
```

