# Hustle.ai - Complete Folder Structure

This document provides a comprehensive overview of the entire project structure, helping developers quickly understand the codebase organization, locate specific components, and navigate the three-tier architecture (backend, frontend, and ML service).

## Complete Project Tree

```
Hustle.ai/
├── .vscode/
│   └── settings.json
│
├── backend/                          # Node.js/Express Backend Server
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Database configuration
│   │   │
│   │   ├── controllers/             # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── coverLetterController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── jobController.js
│   │   │   ├── jobMatchController.js
│   │   │   ├── resumeController.js
│   │   │   ├── searchController.js
│   │   │   ├── uploadController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middlewares/             # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── ownerMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   └── validation.js
│   │   │
│   │   ├── models/                  # Database models
│   │   │   ├── Application.model.js
│   │   │   ├── cover_letter.model.js
│   │   │   ├── index.js
│   │   │   ├── job.model.js
│   │   │   ├── job_match.model.js
│   │   │   ├── resume.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/                  # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── coverLetterRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── jobMatchRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   ├── resumeRoutes.js
│   │   │   ├── searchRoutes.js
│   │   │   ├── uploadRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── ENUMS.js
│   │   │   └── upload.js
│   │   │
│   │   ├── validations/             # Input validation schemas
│   │   │   ├── authValidation.js
│   │   │   ├── commonValidators.js
│   │   │   ├── coverLetterValidator.js
│   │   │   ├── jobValidator.js
│   │   │   ├── resumeValidator.js
│   │   │   └── userValidator.js
│   │   │
│   │   └── index.js                 # Main entry point
│   │
│   ├── uploads/                     # File upload storage
│   │   └── resumes/
│   │       ├── [4 uploaded resume PDF files]
│   │
│   ├── package-lock.json
│   └── package.json
│
├── frontend/                         # Next.js Frontend Application
│   ├── app/                         # Next.js App Router
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   │
│   ├── components/                  # React components
│   │   ├── marketing/              # Marketing/Landing page components
│   │   │   ├── cta.tsx
│   │   │   ├── faq.tsx
│   │   │   ├── features.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── metrics.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── pricing.tsx
│   │   │   └── testimonials.tsx
│   │   │
│   │   ├── providers/              # React context providers
│   │   │   └── theme-provider.tsx
│   │   │
│   │   ├── ui/                     # Reusable UI components (shadcn/ui)
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── input.tsx
│   │   │
│   │   └── SplitText.jsx          # Animation component
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   ├── public/                     # Static assets
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   │
│   ├── .gitignore
│   ├── README.md
│   ├── components.json             # shadcn/ui configuration
│   ├── eslint.config.mjs          # ESLint configuration
│   ├── next.config.ts             # Next.js configuration
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs         # PostCSS configuration
│   ├── tailwind.config.ts         # Tailwind CSS configuration
│   └── tsconfig.json              # TypeScript configuration
│
├── model/                           # Python ML Service (FastAPI)
│   ├── app/
│   │   ├── ml/                     # Machine learning modules
│   │   │   ├── __init__.py
│   │   │   ├── matcher.py         # Job matching algorithm
│   │   │   ├── model_loader.py    # ML model loading
│   │   │   └── text_preprocessor.py # Text preprocessing
│   │   │
│   │   ├── routers/                # FastAPI routers
│   │   │   └── jobmatch.py
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   └── logger.py
│   │   │
│   │   ├── __init__.py
│   │   ├── config.py              # Configuration settings
│   │   ├── database.py            # Database connection
│   │   └── main.py                # FastAPI entry point
│   │
│   ├── requirements.txt            # Python dependencies
│   └── run.sh                      # Startup script
│
└── Readme.md                        # Project documentation

```

## Summary

### Top-Level Folders

#### 📁 `.vscode/`
- **Purpose**: VSCode editor settings
- **Contents**: Workspace-specific configuration for Visual Studio Code

#### 📁 `backend/` (Node.js/Express)
- **Purpose**: Backend REST API server
- **Tech Stack**: Node.js, Express.js, JavaScript
- **Key Features**:
  - User authentication and authorization
  - Job listing management
  - Resume upload and processing
  - Cover letter generation
  - Job matching functionality
  - Dashboard analytics
  - Search capabilities
- **Architecture**: MVC pattern with controllers, models, routes, middlewares, and validations
- **File Storage**: Contains uploaded resumes in `uploads/resumes/`

#### 📁 `frontend/` (Next.js)
- **Purpose**: User-facing web application
- **Tech Stack**: Next.js 15, React, TypeScript, Tailwind CSS
- **Key Features**:
  - Marketing/landing pages with complete sections (hero, features, pricing, FAQ, testimonials)
  - User registration
  - Theme support (dark/light mode)
  - shadcn/ui component library integration
- **Architecture**: Next.js App Router with organized component structure
- **Styling**: Tailwind CSS with PostCSS

#### 📁 `model/` (Python/FastAPI)
- **Purpose**: Machine learning microservice for job matching
- **Tech Stack**: Python, FastAPI
- **Key Features**:
  - Job-resume matching algorithm
  - Text preprocessing
  - ML model loading and inference
  - Database integration for ML results
- **Architecture**: FastAPI with routers, ML modules, and utilities

## Statistics

- **Total Directories**: 27
- **Total Files**: 100
- **Backend Files**: 34 JavaScript files + configuration
- **Frontend Files**: 38 TypeScript/TSX files + configuration + assets
- **Model Files**: 11 Python files + configuration
- **Empty Folders**: None ✅

## Notes

### ✅ Well-Organized Structure
- Clear separation between backend, frontend, and ML services
- Consistent MVC pattern in backend
- Modular component organization in frontend
- Proper separation of concerns in ML service

### 📦 Build Artifacts (Excluded from this tree)
The following folders are excluded as they contain build artifacts or dependencies:
- `node_modules/` - NPM dependencies
- `.next/` - Next.js build output
- `dist/` - Distribution builds
- `.git/` - Git repository data
- `__pycache__/` - Python bytecode cache

### 📝 Files Present in Repository
The `backend/uploads/resumes/` folder contains 4 uploaded PDF resume files, indicating the upload functionality is operational.

### ⚠️ No Suspicious or Unused Folders Detected
All folders serve a clear purpose in the application architecture.

## Technology Stack Overview

1. **Backend**: Node.js + Express.js (JavaScript)
2. **Frontend**: Next.js 15 + React + TypeScript + Tailwind CSS
3. **ML Service**: Python + FastAPI
4. **UI Components**: shadcn/ui
5. **Styling**: Tailwind CSS + PostCSS
6. **Database**: MongoDB

---

*Generated on: December 11, 2024*  
*Repository: NEERAJ-45/Hustle.ai*
