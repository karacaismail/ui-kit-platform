# Build context: repository root.
FROM node:26-slim AS build
WORKDIR /src
RUN npm install --global pnpm@11.19.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile
COPY apps/web apps/web
# Canonical origin of the production site. The site is served from the domain root, so no base path.
ARG PUBLIC_SITE_URL=https://pen.atonota.net
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
RUN pnpm build

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/apps/web/dist /usr/share/nginx/html
EXPOSE 8080
