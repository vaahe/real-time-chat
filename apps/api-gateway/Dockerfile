FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json nx.json pnpm-lock.yaml tsconfig.base.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm nx build api-gateway

# Production image
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/dist/apps/api-gateway ./dist
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/main.js"]