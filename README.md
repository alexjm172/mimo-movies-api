# MIMO Movies API

API REST para gestionar **películas**, **valoraciones (ratings)** y la **watchlist** de usuarios. Incluye autenticación con **JWT**, documentación **OpenAPI/Swagger**, base de datos **SQLite** con **Sequelize**, validación con **Joi** y batería de tests con **Vitest + Supertest**.

---

# Índice

- [Stack](#stack)
- [Endpoints y docs](#endpoints-y-docs)
- [Arquitectura & carpetas](#arquitectura--carpetas)
- [Requisitos](#requisitos)
- [Configuración de entorno](#configuración-de-entorno)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Seed de datos](#seed-de-datos)
- [Autenticación](#autenticación)
- [Contratos de error](#contratos-de-error)
- [Base de datos](#base-de-datos)
- [Testing](#testing)
- [Casos cubiertos por tests](#casos-cubiertos-por-tests)
- [Notas de implementación](#notas-de-implementación)
- [Mejoras futuras](#mejoras-futuras)
- [Licencia](#licencia)

---

# Stack

- **Node.js** + **Express**
- **TypeScript**
- **SQLite** + **Sequelize**
- **Joi** para validaciones
- **JWT** (jsonwebtoken) para auth
- **Helmet** + **CORS**
- **Swagger UI** para documentación
- **Vitest** + **Supertest** para tests

---

# Endpoints y docs

- **Healthcheck:** `GET /health`
- **Auth (Sessions):** `POST /sessions`
- **Movies:**  
  - `GET /movies` (filtros: `page`, `limit`, `genre`, `titleLike`)
  - `GET /movies/{movieId}/ratings`
  - `POST /movies/{movieId}/ratings` *(auth)*
  - `GET /movies/{movieId}/ratings/{ratingId}`
  - `PATCH /movies/{movieId}/ratings/{ratingId}` *(auth)*
  - `DELETE /movies/{movieId}/ratings/{ratingId}` *(auth)*
- **Watchlist** *(todas requieren auth y que el userId del path coincida con el del token)*  
  - `GET /watchlist/{userId}`
  - `POST /watchlist/{userId}/items`
  - `DELETE /watchlist/{userId}/items/{itemId}` *(itemId == movieId)*

**Swagger UI:** `http://localhost:3000/docs`  
**Spec:** `http://localhost:3000/openapi.json` y `http://localhost:3000/openapi.yaml`  
> El archivo `openapi.yaml` vive en el repo (y la app lo carga via `config/swagger`).

---

# Arquitectura & carpetas