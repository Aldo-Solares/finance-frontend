# Finance

Sistema personal de administración financiera compuesto por:

- Frontend en Next.js
- Backend en Spring Boot
- PostgreSQL
- ETL independiente en Python

## Arquitectura general

```text
Next.js
   ↓
Spring Boot REST API
   ↓
PostgreSQL

Python ETL
   ↓
Spring Boot REST API
```

El frontend y el ETL consumen la misma API.

El ETL no escribe directamente en PostgreSQL.

---

## Frontend

Stack:

- Next.js
- React
- TypeScript
- App Router
- Server Components
- Client Components
- Server Actions
- Zod
- JWT
- Lucide React

Ubicación esperada:

```text
projectr/
```

Variable de entorno:

```env
API_URL=http://localhost:9000/api
```

Instalación:

```bash
npm install
npm install lucide-react
```

Ejecución:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Flujo principal:

```text
Server Component
      ↓
   Service
      ↓
Spring Boot API
```

Para mutaciones:

```text
Client Component
      ↓
Server Action
      ↓
Service
      ↓
Spring Boot API
```

Los Services son la única capa que realiza llamadas HTTP.

Zod es la fuente de verdad para los contratos del frontend.

---

## Backend

Stack:

- Java 21+
- Spring Boot 4.x
- Spring Web MVC
- Spring Data JPA
- Spring Security
- JWT
- BCrypt
- PostgreSQL
- Maven

Ubicación esperada:

```text
finance-backend/
```

Variables necesarias:

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
JWT_EXPIRATION=
```

Puerto:

```text
9000
```

API:

```text
http://localhost:9000/api
```

Ejecución con Maven:

```bash
./mvnw spring-boot:run
```

En Windows:

```bash
mvnw.cmd spring-boot:run
```

---

## Base de datos

Se utiliza PostgreSQL.

Durante desarrollo:

```properties
spring.jpa.hibernate.ddl-auto=update
```

No se utiliza Flyway actualmente.

---

## Autenticación

El backend utiliza JWT.

Endpoints públicos:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

Las demás rutas requieren autenticación.

Las peticiones protegidas utilizan:

```http
Authorization: Bearer <token>
```

El frontend administra el JWT mediante su infraestructura de autenticación.

---

## Roles

```text
ADMIN
USER
DEBTOR
```

Todo usuario nuevo inicia como:

```text
DEBTOR
```

y con:

```text
emailVerified = false
```

Un usuario no puede iniciar sesión hasta verificar su email.

---

## Módulos principales

El sistema maneja:

```text
User
CardProduct
Card
Concept
Statement
StatementEntry
Payment
```

No existe `Person` ni `People`.

Las relaciones personales utilizan `User` y `userId`.

---

## Modelo financiero

### Card

```text
cardId
cardCode
product
user
active
```

### CardProduct

```text
productId
bank
cardName
```

### Concept

```text
conceptId
name
```

### Statement

```text
statementId
card
year
month
periodStart
periodEnd
paymentDate
```

### StatementEntry

```text
entryId
statement
concept
user
description
purchaseDate
installmentAmount
paid
msiCurrent
msiTotal
purchaseTotal
remainingMonths
remainingTotal
```

### Payment

```text
paymentId
statement
user
amount
paymentType
```

---

## ETL

El ETL está desarrollado en Python.

Su responsabilidad es transformar datos externos y cargarlos mediante la API REST.

```text
Excel
  ↓
Python ETL
  ↓
Spring Boot API
  ↓
PostgreSQL
```

Spring Boot no procesa archivos Excel.

---

## Requisitos

Para ejecutar todo el sistema necesitas:

- Node.js
- npm
- Java 21+
- Maven o Maven Wrapper
- PostgreSQL
- Python para el ETL

También necesitas configurar:

```text
Frontend
└── API_URL

Backend
├── DB_URL
├── DB_USERNAME
├── DB_PASSWORD
├── JWT_SECRET
└── JWT_EXPIRATION
```

---

## Orden para levantar el proyecto

1. Iniciar PostgreSQL.
2. Configurar las variables del backend.
3. Iniciar Spring Boot en el puerto `9000`.
4. Configurar `API_URL` en el frontend.
5. Iniciar Next.js en el puerto `3000`.
6. Ejecutar el ETL cuando sea necesario cargar información.

---

## Librerías adicionales del frontend

### lucide-react

Utilizada para iconos de interfaz.

```bash
npm install lucide-react
```

Cada nueva librería externa utilizada en el proyecto debe agregarse a esta sección indicando:

- nombre
- propósito
- comando de instalación
