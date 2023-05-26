FROM node:20-alpine AS builder

ARG ARG_DISABLE_ESLINT_PLUGIN='true'
ARG ARG_TS_IGNORE_BUILD_ERRORS='true'
ARG ARG_BACKEND_URL
ARG ARG_PUBLIC_HOST
ARG ARG_MATOMO_URL
ARG ARG_MATOMO_SITE_ID
ARG ARG_SITE_KEY

ENV DISABLE_ESLINT_PLUGIN=$ARG_DISABLE_ESLINT_PLUGIN
ENV TS_IGNORE_BUILD_ERRORS=$ARG_TS_IGNORE_BUILD_ERRORS
ENV BACKEND_URL=$ARG_BACKEND_URL
ENV PUBLIC_HOST=$ARG_PUBLIC_HOST
ENV MATOMO_URL=$ARG_MATOMO_URL
ENV MATOMO_SITE_ID=$ARG_MATOMO_SITE_ID
ENV SITE_KEY=$ARG_SITE_KEY

WORKDIR "/app"

RUN npm install -g npm@9.6.6

RUN printenv > .env
RUN chown node:node .env

COPY --chown=node:node . .
RUN npm ci --force
RUN npm run build

FROM node:20-alpine AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache tini

WORKDIR "/app"

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.env ./.env

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8081

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["sh", "-c", "npm run start"]
