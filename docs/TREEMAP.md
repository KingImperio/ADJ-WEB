# ADJ-WEB — app tree map

Generated from the working tree. `(*)` = AkmanOS vendored block.

```text
ADJ-WEB/
├── docs/
│   ├── STRUCTURE.md          # route/component/data plan + phase exit criteria
│   └── TREEMAP.md            # this file
├── public/
│   ├── adj-logo.png          # real ADJ logo (header, footer)
│   ├── adj-icon.png          # favicon
│   └── testimonials/
│       └── demo-{1,2,3}.svg  # DEMO portraits → real photos
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # fonts, metadata, JSON-LD, header/footer shell
│   │   ├── page.tsx          # homepage composition (9 sections)
│   │   └── globals.css       # Tailwind v4 theme + shadcn tokens + AkmanOS scopes
│   ├── components/
│   │   ├── ui/               # shadcn primitives (10, all in use)
│   │   │   ├── badge, button, card, input, label
│   │   │   ├── select, separator, sheet, textarea
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
│   │   │   ├── services.tsx  # services grid + tutorials + about
│   │   │   ├── proof.tsx     # Stats + Results + CBT band (greyed)
│   │   │   ├── faq.tsx       # bouncy accordion wired to site.ts faqs
│   │   │   └── contact.tsx   # WhatsApp booking form + map + details
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
| Services | `home/services.tsx` | shadcn card + badge |
| Tutorials | `home/services.tsx` | shadcn card |
| Results | `home/proof.tsx` → `Results` | AkmanOS testimonial-card ×3 |
| About | `home/services.tsx` | shadcn card |
| FAQ | `home/faq.tsx` | AkmanOS bouncy-accordion |
| Contact/booking | `home/contact.tsx` | shadcn input/textarea/select/label + OSM map iframe |

## Planned (not yet created — see STRUCTURE.md)

`programs/[slug]/`, `results/`, `about/`, `contact/`, `booking/`, `blog/`, `portal/`, `admin/` routes and their `components/{programs,booking,blog,portal,admin}/` folders.
```

