# ADJ-WEB — ADJ Educational Consultants website

Marketing + consultation-booking site for ADJ Educational Consultants (Igbe-Laara, Ikorodu, Lagos).

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript + React 19 |
| Styling | Tailwind CSS v4 (`@theme` brand tokens in `src/app/globals.css`) |
| UI | shadcn/ui primitives + 21st.dev registry + AkmanOS blocks (see `.mcp.json`) |
| Icons | lucide-react |
| Backend (next step) | Supabase — booking persistence (`.env.example`) |
| Hosting | Vercel |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Conventions

- All business facts live in `src/lib/site.ts` — phone, WhatsApp, address, services, FAQs. Anything marked `TODO` still needs the real value.
- Testimonials in `site.ts` are **DEMO** — replace with real student stories before launch.
- Brand: dark-first, cobalt `#2D52E8` / gold `#F59E0B` on ink `#080B14`; display font Space Grotesk, body Inter.
- UI providers: shadcn CLI (`npx shadcn@latest add <component>`), 21st + AkmanOS via the MCP config in `.mcp.json`. The 21st server needs an API key — create one at https://21st.dev/mcp and paste it into `.mcp.json`.
