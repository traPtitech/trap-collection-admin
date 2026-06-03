FROM node:18.4-alpine@sha256:7ae41699c38d8e50f5bf592867cf661368d71ff922e07f6f66f36dca2ff0c590 as builder
WORKDIR /app

COPY package*.json ./
RUN apk add --update --no-cache openjdk11-jre-headless
# RUN apt-get update && apt-get install -y default-jre
COPY ./scripts ./scripts
RUN npm ci
COPY . .
# RUN npm run build
RUN npx vite build


FROM caddy:2.4.6-alpine@sha256:15e576e7d00b1f41a648c5295a03677c24da5fede09131edcb1e6d809c7dc8aa

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist /usr/share/caddy
