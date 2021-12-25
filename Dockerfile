FROM node:16-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN apk add --update --no-cache openjdk8-jre-base
COPY ./scripts ./scripts
RUN npm ci
COPY . .
# RUN npm run build
RUN npx vite build


FROM caddy:2.4.6-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist /usr/share/caddy
