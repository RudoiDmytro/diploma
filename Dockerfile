# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# Multi-stage build for the Next.js 16 (standalone) app.
# Prisma 7 uses a WASM query compiler + the pg driver adapter, so no
# native Prisma engine / openssl is needed. bcrypt is the only native
# module, hence the build toolchain in the deps stage.
# ─────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ── Dependencies ─────────────────────────────────────────────
FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ ca-certificates \
    && rm -rf /var/lib/apt/lists/*
# Schema + config are needed because `postinstall` runs `prisma generate`.
COPY package.json package-lock.json .npmrc prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

# ── Builder (produces .next/standalone) ──────────────────────
FROM base AS builder
# NEXT_PUBLIC_* vars are inlined at build time. DB-touching pages are
# force-dynamic, so no database is required during `next build`.
ARG NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_NEXTAUTH_URL=$NEXT_PUBLIC_NEXTAUTH_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Migrator (one-shot: applies migrations, then exits) ──────
FROM base AS migrator
ENV NODE_ENV=production
# openssl silences a Prisma CLI detection warning during migrate.
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json .npmrc prisma.config.ts ./
COPY prisma ./prisma
CMD ["npx", "prisma", "migrate", "deploy"]

# ── Runner (minimal standalone image) ────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
