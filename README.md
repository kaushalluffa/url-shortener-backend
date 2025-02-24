# Fastify URL Shortener Backend

This is a URL shortener backend built using Fastify. It provides API endpoints to shorten URLs, expand them, and track analytics.

## Features
- Fast and lightweight backend using Fastify
- MongoDB for URL storage
- JWT authentication for secure access
- Rate limiting for API protection
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
COOKIE_SECRET='__cookie_secret__'
COOKIE_NAME='__cookie_name__'
COOKIE_SECURED=false
RATE_LIMIT_MAX=''
RATE_LIMIT_TIME_WINDOW=''
UPLOAD_DIRNAME=''
UPLOAD_TASKS_DIRNAME=''
MONGODB_DB_NAME=''
HSTS_ENABLED=''
HSTS_MAX_AGE=''
HSTS_INCLUDE_SUB_DOMAINS=''
HSTS_PRELOAD=''
X_FRAME_OPTIONS=''
UNDER_PRESSURE_MAX_EVENT_LOOP_DELAY=1000
UNDER_PRESSURE_MAX_HEAP_USED_BYTES=''
UNDER_PRESSURE_MAX_RSS_BYTES=''
UNDER_PRESSURE_MAX_EVENT_LOOP_UTILIZATION=''
UNDER_PRESSURE_MESSAGE=''
UNDER_PRESSURE_RETRY_AFTER=''
UNDER_PRESSURE_HEALTH_CHECK_INTERVAL=''
MONGODB_HEALTH_CHECK_COLLECTION='mongodb_health_check_collection'
SESSION_SECRET_KEY=''
JWT_SECRET_KEY=''
SESSION_NAME=__session__
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

