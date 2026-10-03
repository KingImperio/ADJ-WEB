# What to do next

Last: both apps are on Vercel with the visual pass + admin table-list filters + sticky morphing nav + mobile bottom bar + OG cover.

## shadcn/ui — planned upgrades

Neither app ships shadcn/ui's full component set yet. It's a legitimate way to make both feel more professional without new design work. Priorities:

### Site (`ADJ-WEB`)
- `Sheet` — mobile nav drawer (currently the nav hides links on <lg)
- `Accordion` — FAQ section on Programmes/About/Results pages
- `Tabs` — Programmes overview "modalities comparison" table to a card
- `Card` / `Badge` — hero metric cards, track cards (replace the custom tones map)
- `Button` (sm/md/lg with variants) — CTA consistency
- `Sonner` toast — "Copied" / WhatsApp handoff feedback
- `Carousel` — testimonial row on homepage/results
- `Separator` / `AspectRatio` — hero photo treatment

### Admin (`ADJ-ADMIN`)
- `Toast` via Sonner — save/delete confirmations (currently silent)
- `Command` + `Dialog` — command palette for table switching
- `ToggleGroup`/`Tabs` — filter chips for status (currently custom buttons)
- `Form` wrapper + `zod` — RowForm validation for JSON fields
- `Skeleton` — table loading state while Supabase responds

### Bonus ideas
- `Perspective/viewer` for the hero photo, `Motion` for section reveals
- Admin: auth via `Form` + `InputOTP`? No — keep password.

## Confirmed pending from before (unchanged)
- Real results/photos/tutor names from the owner (placeholders currently)
- OG cover image + per-program OG variant
- GitHub App for auto-deploy on push
- Custom domain once adjeduconsult.com.ng is ready
- Email alert on new booking (skipped Resend #2; WhatsApp + dashboard badge cover it for now)
