# <center>Image Processing API (NestJS)</center>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

----

## 📖 Description

**Image Processing Api** is a backend service built with **NestJS** that allows authenticated users to perform a variety of image transformations via RESTful endpoints.

Principal features include:

- User authentication and authorization (JWT-based)
- Image transformation capabilities:
  - Resize, crop, rotate, flip, mirror
  - Watermark application
  - Format conversion (JPEG, PNG)
  - Compression
  - Basic filters (grayscale)

----

## 🚀 Live Demo
> To do...

----

## 🛠️ Technologies

- **[NestJS](https://nestjs.com/)** - Node.js framework for scalable server-side applications
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Prisma ORM](https://www.prisma.io)** - Type-safe database access
- **[Docker](https://www.docker.com)** - Containerized deployment and local development
- **[JWT](https://jwt.io/)** - Authentication
- **[Swagger](https://swagger.io)** - API Documentation
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image processing library

----

## 🌐 Endpoints

Here is the list of endpoints for this project:

### 🔐 Authentication Endpoints

- `POST /auth/signup` - Create an account
- `POST /auth/signin` - Sign in and receive JWT tokens
- `TODO`

### 🖼️ Image Management Endpoints

*TODO*

----

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker
- PostgreSQL
- NPM / YARN

----

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Oaklxy/image-processing-api.git
cd image-processing-api

#2. Install dependencies
npm install

#3. Run database image
docker-compose up -d image-processing-db

#4. Setup Prisma
npx prisma init
npx prisma generate

#5. Run database migrations
npx prisma migrate dev --name init

#6. Run the API
npm run start:dev
```

