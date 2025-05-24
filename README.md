# expensesApp

A full-stack web application for managing personal finances. Track your income, expenses, and salary, and visualize your financial health with an intuitive dashboard.

## Features

- User registration and login
- Password recovery (Forgot Password)
- Set and update your monthly salary
- Add income and expense transactions with categories
- Responsive and modern UI (Tailwind CSS + Heroicons)
- Secure authentication with JWT and cookies
- Backend and frontend fully separated

## Technologies Used

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- @heroicons/react

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cookie-parser

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/expensesApp.git
cd expensesApp
```

#### 2. Install dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd ../backend
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the `backend` folder with the following variables:
