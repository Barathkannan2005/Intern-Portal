# Online Internship Portal with Academic and Career Integration

A full-stack web platform connecting students, companies, faculty, and administrators to manage internships with academic integration.

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Frontend     | React.js, Vite, Tailwind CSS, Axios     |
| Backend      | Node.js, Express.js, JWT Authentication |
| Database     | MongoDB with Mongoose                   |
| File Storage | Cloudinary                              |

## Project Structure

```
internship-portal/
├── backend/
│   ├── config/          # Database & Cloudinary configuration
│   ├── controllers/     # Route handlers (MVC controllers)
│   ├── middleware/       # Auth, upload, error handling middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   ├── server.js        # App entry point
│   └── .env.example     # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context (Auth)
│   │   ├── pages/       # Page components by role
│   │   ├── services/    # API service modules
│   │   ├── App.jsx      # Root component with routing
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Tailwind imports
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## User Roles

| Role        | Capabilities                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| **Student** | Register, create profile, upload resume, browse & apply for internships, track applications, upload reports |
| **Company** | Register, create company profile, post internships, manage applicants, accept/reject applications           |
| **Faculty** | View student progress, review reports, approve completion, assign academic credit                           |
| **Admin**   | Manage users & companies, verify internship postings, view analytics dashboard                              |

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Backend Setup

```bash
cd internship-portal/backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Cloudinary credentials
npm install
npm run dev
```

### 2. Frontend Setup

```bash
cd internship-portal/frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to `http://localhost:5000`.

## Environment Variables

Create a `.env` file in `backend/` with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internship-portal
JWT_SECRET=your_strong_secret_key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

## API Endpoints

### Auth

| Method | Route                | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login             |
| GET    | `/api/auth/me`       | Get current user  |

### Student

| Method | Route                          | Description                 |
| ------ | ------------------------------ | --------------------------- |
| GET    | `/api/student/profile`         | Get profile                 |
| PUT    | `/api/student/profile`         | Update profile              |
| POST   | `/api/student/resume`          | Upload resume               |
| GET    | `/api/student/internships`     | Browse internships          |
| POST   | `/api/student/apply/:id`       | Apply for internship        |
| GET    | `/api/student/applications`    | Get applications            |
| POST   | `/api/student/report`          | Upload report               |
| GET    | `/api/student/recommendations` | Get recommended internships |

### Company

| Method | Route                             | Description               |
| ------ | --------------------------------- | ------------------------- |
| GET    | `/api/company/profile`            | Get company profile       |
| PUT    | `/api/company/profile`            | Update profile            |
| POST   | `/api/company/internship`         | Post internship           |
| GET    | `/api/company/internships`        | Get my internships        |
| GET    | `/api/company/applicants/:id`     | Get applicants            |
| PUT    | `/api/company/application/status` | Update application status |

### Faculty

| Method | Route                               | Description          |
| ------ | ----------------------------------- | -------------------- |
| GET    | `/api/faculty/students`             | Get students         |
| GET    | `/api/faculty/student/:id/progress` | Get student progress |
| GET    | `/api/faculty/reports`              | Get all reports      |
| PUT    | `/api/faculty/report/:id/approve`   | Approve report       |
| PUT    | `/api/faculty/report/:id/reject`    | Reject report        |

### Admin

| Method | Route                              | Description         |
| ------ | ---------------------------------- | ------------------- |
| GET    | `/api/admin/students`              | Get all students    |
| GET    | `/api/admin/companies`             | Get all companies   |
| GET    | `/api/admin/internships`           | Get all internships |
| PUT    | `/api/admin/internship/:id/verify` | Verify internship   |
| DELETE | `/api/admin/user/:id`              | Delete user         |
| GET    | `/api/admin/analytics`             | Get analytics       |

## Database Models

- **User** — name, email, password (hashed), role
- **StudentProfile** — department, CGPA, skills, projects, academics, resumeURL
- **Company** — companyName, description, website, industry, location
- **Internship** — companyId, role, description, requiredSkills, stipend, duration, location
- **Application** — studentId, internshipId, status, coverLetter
- **Report** — studentId, internshipId, reportURL, certificateURL, approvedByFaculty, academicCredit

## Security

- JWT-based authentication with role-based access control
- Password hashing with bcrypt (12 salt rounds)
- Helmet for HTTP security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configured for frontend origin
- Input validation via Mongoose schemas
- File size limits on uploads

## License

MIT
