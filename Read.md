## Scalable REST API with Authentication & RBAC

## Features
- JWT Authentication
- Role-Based Access Control (Admin/User)
- CRUD APIs
- Secure password hashing
- Simple React frontend for testing

## Tech Stack
- Node.js
- Express.js
- MongoDB
- React.js

## Setup Instructions

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Posts
- GET /api/posts
- POST /api/posts
- DELETE /api/posts/:id (Admin only)

## Notes
- Use JWT token in headers:
Authorization: token
