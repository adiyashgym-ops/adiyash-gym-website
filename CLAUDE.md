# CLAUDE.md

## Cross-Project Rules (read this first, every session)

This project (adiyash-gym-website) is one of three connected codebases (website, adiyash-crm, adiyashauto) that together form one system. Before making any changes:

- Read the workspace-level `CONNECTIONS.md` file (one folder up, at `adiyash gym/CONNECTIONS.md`) so you know how this project connects to the other two.
- When I ask for a change, tell me which project(s) it affects based on what's in CONNECTIONS.md. If a change here requires a matching change in another project, explain exactly what needs to change there, and ask before doing anything.
- Work on ONE project at a time - finish and get my approval before moving to another project, even if a task spans multiple projects.
- Never push automatically. Always ask "should I push this to adiyash-gym-website's GitHub?" and wait for my yes.
- After any change that affects a cross-project connection (shared secrets, endpoints, branch IDs, etc.), update CONNECTIONS.md's changelog with what changed and why.

## Working Rules

I'm self-taught with no formal coding background. Please follow these rules in every session:

- Keep it simple. Explain things in short, plain language - no jargon without explaining it.
- One task at a time. Don't move to the next task until I've confirmed the current one is done.
- Show before you change. Before editing any file, tell me in plain language what you're about to change and why. Wait for my go-ahead.
- Flag sensitive changes (lead forms, payments, database/Supabase structure, security) with "⚠️ This is a sensitive change" at the top.
- No unapproved extras. Don't install extra tools, run heavy/extra verification, or do anything beyond what I explicitly asked for - even if it seems helpful. If you think something extra would help, ask me first.

## About Me and My Business

I'm Saleem Shaikh (Tozi), sole technical operator for Adiyash Gym, a 7-branch Mumbai gym chain owned by Sheetal Kamble. No formal coding background - built this entire stack through AI assistance.

## This Project (adiyash-gym-website)

Public marketing website (Vite/React, Tailwind), hosted on Vercel, live at adiyashgym.in. Handles the public-facing site content, branch pages, offers/promotions display, and lead capture forms (name/mobile/branch). Has its own Supabase project (separate from the CRM's Supabase - see CONNECTIONS.md) for its own admin dashboard: offers, site visit analytics, trial sign-up tracking, and a raw copy of every lead.

## Related Projects (separate codebases, not in this folder)

- **adiyash-crm** - Next.js/TypeScript on Supabase (Postgres), hosted on Vercel, live at crm.adiyashgym.in. Main gym management CRM. This website forwards every lead form submission to the CRM via its own `/api/leads` serverless function, authenticated with a shared secret. See CONNECTIONS.md for exact details.
- **adiyashauto** - FastAPI (Python) + React frontend on MongoDB, hosted on Railway, live at app.adiyashgym.in. Handles WhatsApp automation for the gym chain. This website does not talk to it directly.

If a task ever needs changes on both sides of a connection, tell me clearly which parts belong to which project.

## Branches

Kurla, Kandivali, Marol (test branch - most new work happens here first), Vikhroli, Asalfa Unisex, Asalfa Ladies, Thane/V49.
