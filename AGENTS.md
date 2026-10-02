# UI Kit platform development contract

- Preserve `karar.json` as the product decision record. Add decisions; do not silently rewrite prior decisions.
- The production documentation shell is Astro and remains statically buildable. Static component metadata is authoritative until a later backend maturity level explicitly changes that boundary.
- Storybook imports the same production tokens and component styles. A story must not carry a separate visual theme that can drift from the product.
- Keep documentation chrome square (`--radius: 0`). Hosted component examples may define their own style family.
- Build at 320 CSS px first. Treat layout, input capabilities and user preferences as independent signals; do not infer device identity from width or user agent.
- Keep one visible `:focus-visible` indicator on the focused control. Do not add container `:focus-within` rings.
- Use semantic design tokens for color, type, spacing, motion, controls and state. Do not add component-local hard-coded theme values.
- The technical example sequence is preview, actions, code. Dark/light/accessibility appearance controls are a distinct group from code and playground actions.
- User-edited examples run only in sandboxed iframes. Never add same-origin, top-navigation or popup permissions.
- The FastAPI application is intentionally minimal. Do not introduce authentication, moderation, jobs, MCP publishing, entitlement or final domain schemas until the corresponding waterfall maturity level is supplied.
- PostgreSQL is the target database. Keep frontend rendering independent from database availability during this maturity level.
- Use the repository scripts for formatting, type checks, builds and tests. Do not weaken checks to make a change pass.
- Git authorship must remain `karacaismail <35493655+karacaismail@users.noreply.github.com>` with no AI/bot co-author or generated-with trailers.
- The site is published to GitHub Pages under `/ui-kit-platform/` and must also work at a domain root. Build every site-internal URL from `import.meta.env.BASE_URL`; do not hard-code a leading `/`. Tests navigate relative to the Playwright `baseURL`, which follows `PUBLIC_BASE_PATH`.
