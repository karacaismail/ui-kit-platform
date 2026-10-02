# UI Kit platform

Public demo: [GitHub Pages](https://karacaismail.github.io/ui-kit-platform/) (static frontend and Storybook; no API). Production target: `pen.atonota.net` on the Hetzner host, installed once with `deploy/install.sh` and updated automatically after every green push to `main`. See [docs/DEPLOY.md](docs/DEPLOY.md).

Development plan: [roadmap](https://karacaismail.github.io/ui-kit-platform/roadmap/). Its content lives in `apps/web/src/roadmap/data.ts`; the view-model rejects a phase with fewer than 3 or more than 24 parts, so the build fails on an invalid plan. The independent gap analysis of the plan and how each finding was handled: [docs/roadmap-gap-analysis.md](docs/roadmap-gap-analysis.md).

Productionized from the supplied interactive design. The Astro frontend is complete and works without the API. Storybook uses the same production styles. FastAPI and PostgreSQL provide a deliberately small starting boundary for the later backend maturity plan.

## Requirements

- Node.js 24+
- pnpm 11+
- Python 3.9+
- PostgreSQL 17 (optional for the frontend)

## Frontend

```sh
pnpm install
pnpm dev
```

Open `http://localhost:4321`. Storybook development runs separately:

```sh
pnpm storybook
```

The production build first creates static Storybook at `/storybook/index.html`, then builds Astro:

```sh
pnpm build
```

Set `PUBLIC_SITE_URL` to the final HTTPS origin when building for deployment. Local builds omit the canonical link instead of publishing a placeholder URL.

## GitHub Pages

`.github/workflows/pages.yml` runs on every push to `main`: a build for the Pages path, the Playwright suite against that same output, then publication of `apps/web/dist`.

Project Pages serve the site under `/ui-kit-platform/`, so the workflow sets `PUBLIC_BASE_PATH=/ui-kit-platform`. The page takes its script, stylesheet and Storybook addresses from that value. Leave `PUBLIC_BASE_PATH` unset for a root deployment such as `pen.atonota.net`. To reproduce the Pages build locally:

```sh
PUBLIC_SITE_URL=https://karacaismail.github.io PUBLIC_BASE_PATH=/ui-kit-platform pnpm --filter @ui-kit/web test
```

## CI and deployment

`.github/workflows/ci.yml` runs on every push and pull request:

| Job | Checks |
| --- | --- |
| `web` | `astro check`, production build, Playwright on Chromium, Firefox and WebKit |
| `api` | `ruff check`, `ruff format --check`, `pytest` on Python 3.13 with the pinned `requirements.txt` |
| `deploy-files` | `shellcheck` on `deploy/*.sh`, `docker compose config` |
| `images` | builds both images, starts the production stack, runs `deploy/smoke.sh`; on `main` pushes `sha-<commit>` tags to GHCR |

The server follows `main` and deploys a commit only after its images exist, so a red build is never deployed. CodeQL and Dependabot run alongside. Dependabot covers GitHub Actions, the pinned Python requirements and the Dockerfile base images; it does not cover the pnpm lockfile or the PostgreSQL image in `deploy/compose.yaml`. To run the production stack locally:

```sh
docker build -f deploy/web.Dockerfile -t ghcr.io/karacaismail/ui-kit-platform-web:ci .
docker build -f deploy/api.Dockerfile -t ghcr.io/karacaismail/ui-kit-platform-api:ci .
PEN_IMAGE_TAG=ci docker compose --env-file <your env file> -f deploy/compose.yaml up -d --wait
deploy/smoke.sh http://127.0.0.1:<PEN_HTTP_PORT>
```

`deploy/.env.example` lists the variables. The Storybook password file must live in a directory the Colima profile mounts.

No open source license has been chosen yet. Public visibility is not a license.

## API

Create a virtual environment, install `-r apps/api/requirements.txt -e "apps/api[dev]"`, then run:

```sh
python3 -m uvicorn app.main:app --reload --app-dir apps/api
```

OpenAPI is at `http://127.0.0.1:8000/docs`. The frontend does not depend on it yet.

## PostgreSQL on this Mac

The configured container runtime is Colima, not Docker Desktop. With the existing `factory` profile running:

```sh
DOCKER_HOST=unix:///Users/w6x/.colima/factory/docker.sock docker compose up -d postgres
```

This project binds PostgreSQL only to `127.0.0.1:55432` and uses a named volume. Do not restart unrelated existing services.
On the first empty-volume startup, `apps/api/sql/001_initial.sql` creates the single seed table used by the minimal SQLAlchemy model.

## Verification

```sh
pnpm check
pnpm lint
pnpm test
```

`pnpm test` runs the web unit tests (`node --test`), builds the frontend, runs the Playwright suite (Chromium, Firefox, WebKit; 320 px to 1440 px) and then the API tests. The test server ignores the `astro preview` lock, so a preview already running on another port is left alone.
