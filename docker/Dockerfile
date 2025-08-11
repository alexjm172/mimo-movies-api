# Etapa 1: build (Node 20, Debian/glibc -> sqlite3 usa binarios precompilados)
FROM node:20-bookworm-slim AS build

WORKDIR /app

# Solo lo necesario para resolver deps y compilar TS
COPY package*.json tsconfig.json ./
RUN npm ci

# Copiamos el resto y construimos
COPY . .
RUN npm run build

# Etapa 2: runtime mínimo
FROM node:20-bookworm-slim

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# Instala solo deps de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copia artefactos construidos y ficheros necesarios
COPY --from=build /app/dist ./dist
COPY --from=build /app/mimo_movies.yaml ./mimo_movies.yaml
COPY --from=build /app/.env.example ./.env.example

EXPOSE 3000
CMD ["node", "dist/server.js"]