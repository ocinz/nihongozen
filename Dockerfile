FROM node:20-alpine

WORKDIR /app

# aktifkan pnpm
RUN corepack enable

# copy file dependency dulu (biar cache optimal)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install
# RUN pnpm builds-approve

# baru copy source code
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]