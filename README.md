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
 MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


#### 4. Run the application

**Start the backend:**
```bash
cd backend
npm run dev
```

**Start the frontend:**
```bash
cd ../frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port Vite shows).

## Usage

1. Register a new user or log in.
2. Set your monthly salary.
3. Add income or expense transactions, selecting the appropriate category.
4. (Upcoming) View your dashboard and analytics.

## Dependencies

See `package.json` in both `frontend` and `backend` folders for a full list of dependencies.

## License

This project is licensed under the MIT License.

---

**Feel free to contribute or open issues for improvements!**
