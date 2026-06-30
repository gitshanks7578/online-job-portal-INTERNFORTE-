# Job Portal

A full-stack job portal that connects recruiters and job seekers in one role-based platform.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-FF6B35?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

A full-stack job portal that connects recruiters and job seekers in one role-based platform.

LIVE LINK : https://online-job-portal-internforte-1-client.onrender.com/login

## Problem It Solves

Hiring workflows are often scattered across messages, spreadsheets, and manual tracking. This project provides a simple system where recruiters can post jobs and review applications, while candidates can discover open roles, apply, and track their application status.

## Key Features

- Role-based authentication for admins and users
- JWT-based protected routes
- Admin dashboard to create, update, delete, and manage job posts
- Job status management: open, closed, or filled
- User dashboard to browse and filter open jobs
- One-click job application flow with duplicate-application prevention
- Application tracking for users
- Application review and status update for admins
- Profile view and update for both roles
- Password reset flow using email OTP support

## Tech Stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Axios, Zustand  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT, bcrypt, cookies  
**Email:** Mailtrap

## Project Structure

```txt
JOB_portal/
  client/   React frontend
  server/   Express + MongoDB backend
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd JOB_portal
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `server/`:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
MAILTRAP_TOKEN=your_mailtrap_token
MAILTRAP_ENDPOINT=your_mailtrap_endpoint
```

Create a `.env` file inside `client/`:

```env
VITE_AXIOS_BASE_URL=http://localhost:8000/api/v1
```

### 4. Run the project

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

## Recruiter Note

This project demonstrates full-stack development skills through a real-world hiring workflow, including REST APIs, authentication, protected role-based access, MongoDB data modeling, frontend routing, and practical user/admin dashboards.
