# Resume AI - Interview Preparation Platform

An intelligent AI-powered platform that analyzes your resume and job description to generate personalized interview preparation strategies, technical questions, behavioral insights, and tailored resume recommendations.

## Overview

Resume AI leverages Google's Gemini AI to provide candidates with:
- Match Score Analysis - Evaluate how well your profile aligns with the target job
- Personalized Interview Questions - Technical and behavioral questions specific to the role
- Skill Gap Identification - Discover what you need to improve
- Preparation Roadmap - Day-wise structured plan to prepare for the interview
- Tailored Resume Generation - AI-optimized resume for the specific job description

## Features

### Core Features
- User Authentication - Secure login/register with JWT tokens
- Resume Upload - Support for PDF and DOCX formats
- AI Analysis - Powered by Google Gemini 3.5 Flash
- Match Score - Percentage-based job compatibility analysis
- Interview Report - Comprehensive preparation guide
- Resume History - Track and revisit previous reports
- Resume Download - Export optimized resume as PDF *(Coming Soon)*

### Technical Features
- Real-time Processing - Fast AI-powered analysis (~30s)
- Secure Authentication - JWT-based session management
- Database Persistence - MongoDB for report storage
- Responsive Design - Works on desktop and mobile
- PDF Generation - Dynamic resume creation from HTML

## Architecture

### Tech Stack

**Frontend:**
- React 19.2.0
- React Router 7.13.0
- Axios for API calls
- Sass/SCSS for styling
- Vite for fast development

**Backend:**
- Node.js + Express.js 5.2.1
- MongoDB 9.2.1 + Mongoose
- Google GenAI API
- JWT Authentication
- Puppeteer for PDF generation
- Multer for file uploads

### Project Structure

```
resume_ai/
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── interview/
│   │   ├── style/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB Atlas account
- Google GenAI API key

### Installation

#### Backend Setup

```bash
cd Backend

npm install

# Create .env file with:
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_google_api_key
PORT=3000

# Install Chrome for PDF generation
npx puppeteer browsers install chrome

# Start server
npm run dev
```

Backend runs on: http://localhost:3000

#### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Frontend runs on: http://localhost:5173

## Environment Variables

### Backend .env

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/resume_ai
JWT_SECRET=your_random_jwt_secret_key_here
GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here
PORT=3000
```

**How to get credentials:**

1. MongoDB URI - Go to MongoDB Atlas, create cluster, get connection string
2. JWT Secret - Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
3. Google GenAI API Key - Visit Google AI Studio, create API key

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/logout - Logout user

### Interview
- POST /api/interview/generate - Generate interview report
- GET /api/interview/:id - Get report by ID
- GET /api/interview/all - Get all user reports
- POST /api/interview/:id/resume - Download optimized resume
- DELETE /api/interview/:id - Delete report

## Interview Preparation Guide

### How to Use Resume AI

#### Step 1: Create Account
- Register with email and password
- Secure account with strong password
- Login to dashboard

#### Step 2: Prepare Your Profile
Choose one of two options:

**Option A: Upload Resume**
- PDF or DOCX format
- Max 5MB file size
- Clearly formatted with sections

**Option B: Quick Self-Description**
- Years of experience
- Key technical skills
- Relevant projects
- Education details

#### Step 3: Provide Job Description
- Copy full job posting
- Include required skills
- Note preferred qualifications
- Paste entire description

#### Step 4: Generate Strategy
- Click "Generate My Interview Strategy"
- Wait ~30 seconds for AI analysis
- System processes your profile vs job requirements

#### Step 5: Review Results

**Match Score (0-100%)**
- 80-100: Strong fit, focus on standout achievements
- 60-79: Good fit, address skill gaps
- Below 60: Work on missing skills before applying

**Technical Questions (5-7 questions)**
- Specific to job role
- Covers key technologies mentioned
- Includes solution approaches

**Behavioral Questions (4-6 questions)**
- Company culture alignment
- Leadership and teamwork
- Problem-solving examples
- Conflict resolution

**Skill Gaps**
- Low: Nice to have skills
- Medium: Important for role
- High: Critical for success

**Preparation Plan (7-10 days)**
- Day-wise learning objectives
- Specific topics to cover
- Practice exercises
- Mock interview prep

#### Step 6: Download Resume (Coming Soon)
- AI generates optimized resume
- Tailored for job description
- ATS-friendly format
- Ready to submit
- *Note: This feature is coming soon*

### Interview Preparation Tips

**Before the Interview:**
1. Follow the day-wise preparation plan provided
2. Practice technical questions with solutions
3. Prepare real examples for behavioral questions
4. Research company culture and values
5. Mock interview with friends or family
6. Get 8 hours sleep before interview
7. Review your tailored resume

**During the Interview:**
1. Be confident in your strengths
2. Acknowledge skill gaps honestly
3. Show willingness to learn
4. Use STAR method for behavioral questions
5. Ask thoughtful questions about role
6. Thank interviewer for their time

**After the Interview:**
1. Send thank you email within 24 hours
2. Reference specific conversation points
3. Reiterate your interest
4. Mention how you'll address skill gaps
5. Wait for decision

## Database Schema

### User
```
_id: ObjectId
email: String (unique)
password: String (hashed)
createdAt: Date
updatedAt: Date
```

### Interview Report
```
_id: ObjectId
userId: ObjectId
title: String
jobDescription: String
resume: String
selfDescription: String
matchScore: Number
technicalQuestions: Array
behavioralQuestions: Array
skillGaps: Array
preparationPlan: Array
createdAt: Date
updatedAt: Date
```

## Security

- JWT-based authentication
- Password hashing with bcryptjs
- CORS enabled for frontend only
- Input validation with Zod
- Secure MongoDB connections
- Environment variables for sensitive data
- Cookie-based sessions

## Development

### Frontend Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview build
```

### Backend Scripts
```bash
npm run dev      # Start with nodemon
```

## Deployment

### Frontend
```bash
npm run build
# Deploy 'dist' folder to Vercel, Netlify, or GitHub Pages
```

### Backend
```bash
# Deploy to Heroku, Railway, Render, or AWS
# Set environment variables on hosting platform
```

## Troubleshooting

**MongoDB Connection Failed**
- Verify MONGO_URI in .env
- Check IP whitelist in MongoDB Atlas
- Ensure username/password are correct

**Google GenAI API 503 Error**
- API experiencing high load
- Wait 5-10 minutes and retry
- Check API quota limits

**Frontend Can't Reach Backend**
- Ensure Backend running on :3000
- Check CORS in Backend app.js
- Verify API URL in Frontend

**Chrome Not Found for PDF**
- Run: npx puppeteer browsers install chrome
- Verify cache path in .env

## Contributing

1. Fork repository
2. Create feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open Pull Request

## License

ISC License

## Support

For issues or questions:
- Create GitHub issue
- Check troubleshooting section
- Review documentation

## Learning Resources

- React: https://react.dev
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Google GenAI: https://ai.google.dev
- Vite: https://vitejs.dev

Ready to ace your interview? Start with Resume AI today!
