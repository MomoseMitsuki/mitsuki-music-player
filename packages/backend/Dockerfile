FROM node:24-slim

RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

COPY packages/backend/package.json ./packages/backend/

RUN pnpm install --frozen-lockfile

COPY packages/backend/prisma ./packages/backend/prisma

WORKDIR /usr/src/app/packages/backend
RUN npx prisma generate --schema=./prisma/schema.prisma

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/packages/backend

EXPOSE 3000
