# WORK IN PROGRESS


# Fastify URL Shortener Backend

This is a URL shortener backend built using Fastify. It provides API endpoints to shorten URLs, expand them, and track analytics.

## Features
- Fast and lightweight backend using Fastify
- MongoDB for URL storage
- JWT authentication for secure access
- Swagger UI for API documentation
- Environment-based configurations

## Installation

### Prerequisites
- Node.js (>=18)
- MongoDB (local or cloud instance)

### Clone the Repository
```sh
git clone https://github.com/kaushalluffa/url-shortener-backend.git
cd url-shortener-backend
```

### Install Dependencies
```sh
npm install
```

## Environment Variables
Create a `.env` file and configure necessary variables:
```env
PORT=3030
MONGODB_URI='mongodb://localhost:27017'
MONGODB_DB_NAME=''
JWT_SECRET_KEY=''
```

## Running the Server

### Development Mode
```sh
npm run dev
```
This starts the server with hot-reloading.

### Production Mode
```sh
npm run build
npm run start
```

## Testing
Run tests with:
```sh
npm test
```
This includes database seeding before execution.

## Linting and Code Style
Check for linting errors:
```sh
npm run lint
```
Fix linting issues:
```sh
npm run lint:fix
```

## API Documentation
Swagger UI is available at:
```
http://localhost:3030/docs
```

## License
This project is licensed under the MIT License.

