# Online Job Portal

Full-stack job portal with role-based access.

* **Admins**: manage jobs, review applicants, update statuses
* **Users**: browse jobs, apply, track applications

---

## Live

* Frontend: https://online-job-portal-internforte-1-client.onrender.com
* API: https://online-job-portal-internforte-1-server.onrender.com/signup

---

## Stack

**Frontend**

* React (Vite)
* React Router
* Axios
* Tailwind CSS

**Backend**

* Node.js, Express
* MongoDB (Mongoose)
* JWT (access + refresh tokens)
* Cookie-based auth
* Mailtrap (email flows)

---

## Features

**Auth**

* Register (user/admin)
* Login / Logout
* JWT auth (access + refresh)
* Account deletion

**User**

* View jobs
* Apply to jobs
* Track applications
* Profile management

**Admin**

* Create / update / delete jobs
* Manage job status
* Review applicants
* Update application status
* Profile management

---

## API

Base: `/api/v1`

**Auth**

```
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/forgetPassword/send
POST /auth/forgetPassword/verify
POST /auth/forgetPassword/reset
POST /auth/removeUser
```

**Admin (admin only)**

```
POST   /admin/jobs
GET    /admin/jobs
GET    /admin/jobs/:jobId
PUT    /admin/jobs/:jobId
DELETE /admin/jobs/:jobId
PATCH  /admin/jobs/:jobId/status

GET    /admin/jobs/:jobId/applications
PATCH  /admin/applications/:applicationId/status

GET    /admin/profile
PUT    /admin/profile
```

**User (user only)**

```
GET  /user/jobs
GET  /user/jobs/:jobId
POST /user/jobs/:jobId/apply

GET  /user/applications

GET  /user/profile
PUT  /user/profile
```

---

## Structure

```
client/   # React frontend  
server/   # Express backend  
```

