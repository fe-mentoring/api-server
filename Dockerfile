FROM node:20-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm install

COPY . .

RUN npm run build

FROM node:20-alpine

ENV NODE_ENV production
ENV DATABASE_URL file:./dev.db
ENV JWT_SECRET_KEY secret_key
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start:prod"]