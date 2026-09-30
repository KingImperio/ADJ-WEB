# Stitch design system — source of truth

Pulled from Stitch project `4716569519546531997` ("ADJ Educational Consultancy Platform").
Reference HTML for all 10 screens lives in `docs/stitch-reference/`.

## Identity

- **customColor:** `#1a365d` (the seed Stitch generated everything from)
- **headlineFont:** Source Serif 4 · **bodyFont / labelFont:** Plus Jakarta Sans
- **roundness:** `ROUND_FOUR` (4px base radius) · **colorMode:** LIGHT
- Screens are DESKTOP, rendered 2560px wide.

## Palette (identical across all 10 screens — only key ordering varies)

Stitch derives a full Material 3 ramp from the `#1a365d` seed. The generated
Tailwind config emits these **lowercase** names:

| Token | Value | Role |
|---|---|---|
| `primary` | `#002045` | nav bars, primary CTAs, headings |
| `primary-container` | `#1a365d` | the brand navy seed; hero overlay, footer accents |
| `secondary` | `#006c48` | emerald — conversion CTAs, verified/success states |
| `secondary-container` | `#98f6c5` | |
| `tertiary` | `#361900` | |
| `tertiary-container` | `#552b00` | |
| `on-tertiary-container` | `#eb851c` | amber/gold accents |
| `background` / `surface` | `#faf8ff` | lavender-tinted canvas |
| `surface-container-lowest` | `#ffffff` | cards |
| `surface-container-low` | `#f2f3ff` | alternating bands |
| `surface-container` | `#eaedff` | |
| `surface-container-high` | `#e2e7ff` | banner bands |
| `surface-container-highest` | `#dae2fd` | icon tiles |
| `on-surface` | `#131b2e` | body text |
| `on-surface-variant` | `#43474e` | secondary text |
| `outline-variant` | `#c4c6cf` | borders |
| `outline` | `#74777f` | |

### Badge colors (hardcoded inline in the HTML, not from the theme)

| Badge | Background | Border / text |
|---|---|---|
| JAMB / UTME | `#ECFDF5` | `#006c48` (emerald) |
| WAEC / NECO | `#EFF6FF` | `#002045` (navy) |
| JUPEB / Direct Entry | `#EEF2FF` | `#3730A3` (indigo) |
| IELTS / SAT / GRE | `#FEF3C7` | `#B45309` (amber) |

## Typography scale

Plus Jakarta Sans is the UI/body face; Source Serif 4 is every heading.
Note the source HTML uses compound classes like `text-headline-sm font-headline-sm`.

| Token | Size / LH | Weight | Tracking |
|---|---|---|---|
| `display-lg` | 52/60 | 700 | -0.02em |
| `display-lg-mobile` | 34/40 | 700 | -0.01em |
| `headline-lg` | 38/46 | 700 | -0.015em |
| `headline-lg-mobile` | 28/34 | 700 | -0.01em |
| `headline-md` | 26/34 | 600 | — |
| `headline-sm` | 20/28 | 600 | — |
| `body-lg` | 18/28 | 400 | — |
| `body-md` | 16/24 | 400 | — |
| `body-sm` | 14/20 | 400 | — |
| `label-lg` | 14/20 | 600 | 0.01em |
| `label-md` | 12/16 | 600 | 0.02em |
| `label-sm` | 11/14 | 700 | 0.04em |

## Radii

Buttons/inputs `0.25rem` (4px) · cards/containers `0.5rem` (8px) · badges `0.125rem` (2px).
Deliberately **not** pills — the DESIGN.md calls this out as "the utilitarian stamp
of official exam certificates".

## Layout

`max-w-7xl` (1280px) containers, `px-4 sm:px-6 lg:px-8`. Section padding
`py-16 lg:py-24`. 12-col desktop grid, hero splits 7/5, pillar grid 4-up,
programme grid 3-up, catchment panel 6/6, results 3-up.

## Icons

Material Symbols Outlined via Google Fonts CDN, referenced as
`<span class="material-symbols-outlined">name</span>`.

## Screens

| Screen | Route to build |
|---|---|
| Homepage | `/` |
| Programmes Overview | `/programs` |
| JAMB / UTME Clinic | `/programs/jamb` |
| WAEC & NECO Intensive | `/programs/waec` (+ `/programs/neco`) |
| JUPEB Direct Entry | `/programs/jupeb` |
| International Exams | `/programs/international` |
| Admissions Processing & CAPS | `/programs/admissions` |
| Results & Matriculation Wall | `/results` |
| About Us & Partnership | `/about` |
| Contact & Free Consultation | `/contact` |

## Known gaps

- **Timed CBT Practice Lab** appears as the 6th track on the Stitch homepage but
  has **no dedicated screen**. Existing `/programs/gce` also has no screen.
- Stitch merged WAEC + NECO into one page; the live site has them separate.
