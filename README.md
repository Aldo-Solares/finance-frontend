# Finance Frontend

Frontend del sistema personal de administración financiera.

Construido con Next.js, React y TypeScript. Consume la API REST proporcionada por el backend en Spring Boot.

## Stack

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

## Arquitectura

```text
Next.js
   ↓
Services
   ↓
Spring Boot REST API
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

Los Services son la única capa encargada de realizar llamadas HTTP al backend.

Zod es la fuente de verdad para los contratos utilizados por el frontend.

## Requisitos

Para ejecutar el proyecto necesitas:

- Node.js
- npm
- Backend de Finance ejecutándose

## Variable de entorno

Configura:

```env
API_URL=http://localhost:9000/api
```

Las variables locales pueden almacenarse en:

```text
.env.local
```

No deben subirse credenciales ni secretos al repositorio.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

El frontend estará disponible en:

```text
http://localhost:3000
```

## Backend

El frontend consume la API REST de Finance:

```text
http://localhost:9000/api
```

Las peticiones protegidas utilizan autenticación JWT.

```http
Authorization: Bearer <token>
```

El frontend administra el JWT mediante su infraestructura de autenticación.

## Autenticación

Los endpoints públicos del backend relacionados con autenticación son:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

Las demás rutas requieren autenticación.

Un usuario no puede iniciar sesión hasta verificar su correo electrónico.

## Roles

El sistema maneja:

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

## Módulos principales

El frontend consume información relacionada con:

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

## Librerías adicionales

### lucide-react

Utilizada para iconos de interfaz.

Instalación:

```bash
npm install lucide-react
```

Cada nueva librería externa utilizada en el proyecto debe agregarse a esta sección indicando:

- nombre
- propósito
- comando de instalación

## Desarrollo local

Para trabajar con el sistema completo:

1. Iniciar PostgreSQL.
2. Iniciar el backend en el puerto `9000`.
3. Configurar `API_URL`.
4. Iniciar el frontend.

```text
Frontend
http://localhost:3000

Backend
http://localhost:9000/api
```
