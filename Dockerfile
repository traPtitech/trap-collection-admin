FROM node:16-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --unsafe-perm
COPY . .
# RUN npm run build
RUN vite build


FROM caddy:2.4.6-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist /usr/share/caddy
