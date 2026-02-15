# VizsgaGyak-Users

Simple user registry with a React (Vite) frontend and an Express + MySQL backend.

## Project Structure

- Backend/ - Express API (MySQL)
- Frontend/ - React + TypeScript (Vite)

## Requirements

- Node.js 18+ (or newer)
- MySQL or MariaDB

## Setup

1. Create a database and import the SQL dump (if you have one).
2. Create a .env file in Backend/:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DATABASE=userregister
```

## Database Schema

Minimal schema expected by the API:

```sql
CREATE TABLE users (
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	birthday DATE DEFAULT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY name (name),
	UNIQUE KEY email (email)
);
```

## Run Backend

```bash
cd Backend
npm install
npm start
```

API runs on http://localhost:3000

## Run Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on the Vite dev server URL shown in the terminal.

## API Endpoints

- GET /users
- POST /users
- DELETE /users/:id

### POST /users

Request body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "birthday": "1985-05-11"
}
```

Response:

```json
{
  "message": "User created",
  "userId": 21
}
```

### GET /users

Response:

```json
[
  {
    "id": 1,
    "name": "Kovacs Janos",
    "email": "janos.kovacs@email.hu",
    "birthday": "1985-05-12"
  }
]
```

### DELETE /users/:id

Example:

```bash
curl -X DELETE http://localhost:3000/users/21
```

Response:

```json
{
  "message": "User deleted successfully"
}
```

## Scripts

Backend (Backend/package.json):

- npm start - run the API in watch mode

Frontend (Frontend/package.json):

- npm run dev - start Vite dev server
- npm run build - build for production
- npm run lint - run ESLint
- npm run preview - preview production build

## Notes

- The API exposes endpoints under /users.
- For date fields, use YYYY-MM-DD.
- Do not call the delete route with a colon in the URL. Use /users/21, not /users/:21.
