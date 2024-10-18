# Project Overview

This project is built with NestJS and Prisma, integrating various packages to ensure a secure, scalable, and efficient application.

## Installation

To set up the project, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/user/folder_name.git
   cd folder_name
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. .env file
   DATABASE_URL="DBConnectionString"
   PORT=3000
   NODE_ENV=LOCAL
   JWT_SECRET_KEY=""

## Running the Application

To run the application in development mode:

```
npm run start:dev
```

This command starts the NestJS Node server. Open your browser and navigate to `http://localhost:3000/swagger` (or the URL provided in the console) to view the application.

## Building for Production

To build the application for production:

```
npm run build
```

This command compiles the TypeScript code and creates a production-ready build in the `dist` directory.

# Prisma

1. **Database Migration Command**:
   To apply database migrations, use the following command:
   ```console
   npm run prisma migrate dev
   ```

# NestJS Implementations

### Explore the following NestJS documentation to understand the core concepts and implementations:

1. Modules - https://docs.nestjs.com/modules
2. Providers - https://docs.nestjs.com/providers
3. Controllers - https://docs.nestjs.com/controllers
4. Pipes - https://docs.nestjs.com/pipes
5. Guards - https://docs.nestjs.com/guards
6. Custom Decorators - https://docs.nestjs.com/custom-decorators
7. Swagger - https://docs.nestjs.com/openapi/introduction
8. Prisma - https://docs.nestjs.com/recipes/prisma
9. Auth Passport - https://docs.nestjs.com/recipes/passport
10. CRUD Generator - https://docs.nestjs.com/recipes/crud-generator

# Features Implemented

1. JWT Authentication and Authorization Guards: Secure API endpoints with JWT-based authentication and role-based authorization.
2. Role-Based Authentication Guards: Implement guards to control access based on user roles.
3. API Request Data Validation: Use JOI and Pipes to validate incoming data, ensuring only valid data is processed by the API.
4. Custom Logger Service: A tailored logging service for better tracking and debugging.
5. Swagger API Documentation: Using DTO of the swaggers Property.

# Packages Overview

This project uses a variety of packages to ensure secure, scalable, and efficient operation:

1. @nestjs/config: Provides configuration management in a NestJS application, allowing environment variables and other configurations to be managed centrally.

2. @nestjs/jwt: Handles JSON Web Token (JWT) authentication in a NestJS application, allowing secure user authentication and authorization.

3. @nestjs/passport: Integrates Passport.js authentication middleware with NestJS, enabling support for various authentication strategies.

4. @nestjs/swagger: Automates the generation of OpenAPI (Swagger) documentation for NestJS APIs, making it easier to create and maintain API documentation.

5. @nestjs/terminus: Offers health checks and graceful shutdowns for a NestJS application, ensuring reliability and stability.

6. helmet: Enhances the security of the Express.js application by setting various HTTP headers.

7. joi: A powerful schema description language and data validator for JavaScript objects, ensuring the integrity of data passed into the application.

8. passport: Middleware for handling authentication in Node.js, providing support for a wide variety of authentication strategies.

9. passport-jwt: A Passport.js strategy for authenticating with JWTs, enabling secure token-based authentication.

10. passport-local: A Passport.js strategy for authenticating with a username and password, useful for local authentication.

11. husky: Improves the quality of the codebase by running pre-commit hooks, ensuring that all code committed meets the project's standards.

12. prisma: A next-generation ORM (Object-Relational Mapping) that simplifies database access and queries while maintaining type safety.

13. @prisma/client: The client library that connects your application to the Prisma ORM, enabling you to interact with the database in a type-safe manner.

# Vscode Extensions

1. NestJS Files: Quickly create NestJS files such as controllers, modules, services, etc.
   Install from Visual Studio Marketplace - https://marketplace.visualstudio.com/items?itemName=AbhijoyBasak.nestjs-files
