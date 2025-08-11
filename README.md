# MIMO Movies API 🎬

API REST para gestionar **películas**, **valoraciones** (ratings) y **watchlist** de usuarios.  
Incluye autenticación **JWT**, validación con **Joi**, documentación **OpenAPI**, **SQLite + Sequelize** y tests **Vitest + Supertest**.

<p align="center">
  <a href="#requisitos">🧰 Requisitos</a> •
  <a href="#arranque-rápido">⚡ Arranque rápido</a>
  <a href="#despliegue-con-docker">🐳 Docker</a>
</p>

---

## Requisitos

- **Node.js 18+**
- **npm 9+**
- **SQLite** (incluido vía `sqlite3`)

---

## Arranque rápido (en local)

```bash
# 1) Instalar dependencias
npm install

# 2) Configurar entorno
cp .env.example .env   # Edita si es necesario

# 3) Arrancar en desarrollo
npm run dev

# 4) Comprobar estado
curl http://localhost:3000/health

# 5) Documentación Swagger
http://localhost:3000/docs

# Credenciales demo
username: mimo
password: mimo123
```

## Construir y arrancar en producción
```bash
# Construir la imagen
docker compose -f docker/docker-compose.yml build

# Arrancar el contenedor
docker compose -f docker/docker-compose.yml up -d

# Comprobar estado
curl http://localhost:3000/health

# Ver logs en tiempo realç
docker compose -f docker/docker-compose.yml logs -f

# Parar y limpiar
docker compose -f docker/docker-compose.yml down -v

```

