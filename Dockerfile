FROM node:18.4-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN apk add --update --no-cache openjdk11-jre-headless
# RUN apt-get update && apt-get install -y default-jre
COPY ./scripts ./scripts
RUN npm ci
COPY . .
# RUN npm run build
RUN npx vite build


FROM caddy:2.4.6-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist /usr/share/caddy
