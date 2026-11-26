# SkillBridge – Backend

SkillBridge is a project-based freelance marketplace that connects clients with independent professionals. This repository contains the backend API used by the SkillBridge web application.

## Live Demo

- **Frontend:** https://skillbridge-client-theta.vercel.app/
- **Backend:** https://skillbridge-server-opal.vercel.app/
- **Frontend repository:** https://github.com/mufassir-mahmud/skillbridge-client
- **Backend repository:** https://github.com/mufassir-mahmud/skillbridge-server

## Overview

The backend provides REST API endpoints for retrieving users and projects, filtering projects, and creating projects. It uses Express.js and MongoDB.

## Technology Stack

- Node.js
- Express.js 5
- MongoDB Node.js Driver
- MongoDB
- CORS
- dotenv
- Vercel (deployment)

## Current API Features

### User endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user` | Retrieve all users |
| GET | `/api/user/:id` | Retrieve a user by MongoDB ObjectId |

### Project endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Retrieve projects |
| GET | `/api/projects/:id` | Retrieve a project by MongoDB ObjectId |
| POST | `/api/projects` | Create a project |

The `GET /api/projects` endpoint supports these optional query parameters:

- `clientId` – filter projects by client ID.
- `category` – filter projects by category.
- `status` – filter projects by status.

Example requests:

```http
GET /api/projects
GET /api/projects?category=Web%20Development
GET /api/projects?clientId=USER_ID
GET /api/projects?status=open
GET /api/projects?category=Design&status=open
```

### Create a project

Send a JSON request body to `POST /api/projects`.

Example payload (adjust fields to match the project form in the frontend):

```json
{
  "title": "Build a Responsive Website",
  "category": "Web Development",
  "description": "Create a modern and responsive website.",
  "clientId": "CLIENT_ID",
  "status": "open"
}
```

A successful insert returns the MongoDB insert result.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- A MongoDB database and connection URI
- Git

### 1. Clone the repository

```bash
git clone https://github.com/mufassir-mahmud/skillbridge-server.git
cd skillbridge-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
```

Replace the MongoDB placeholder with your own connection string. Never commit `.env` or expose database credentials.

### 4. Start the server

The current `package.json` does not define a development or start script. You can run the entry file directly:

```bash
node index.js
```

The API will use the configured `PORT`, or `5000` if no port is provided.

For automatic restarts during development, you can optionally install and use nodemon:

```bash
npm install --save-dev nodemon
npx nodemon index.js
```

## Database

The server connects to MongoDB and selects the database:

```text
skillbridge_db
```

Collections currently referenced in the backend source:

- `user`
- `projects`

Make sure these collections and the expected document structures are available in your MongoDB database.

## Deployment

The backend is deployed on Vercel:

https://skillbridge-server-opal.vercel.app/

Configure the following environment variable in your deployment settings:

- `MONGO_DB_URI` – MongoDB connection string.
- `PORT` – optional; the application defaults to port `5000` when it is not set.

The deployed root endpoint currently responds with:

```text
Hello World!
```

API routes are available under `/api`.

## Important Notes

- This README documents the routes present in the current `index.js` source.
- The current API source uses MongoDB `ObjectId` for individual user and project lookups. Supply valid ObjectId values.
- Add authentication, authorization, request validation, and centralized error handling before using the API in a production environment.
- Do not put secrets, database credentials, or private keys in source code or public repositories.

## Related Project

SkillBridge frontend: https://github.com/mufassir-mahmud/skillbridge-client

## Author

**Mufassir Mahmud**

GitHub: https://github.com/mufassir-mahmud
