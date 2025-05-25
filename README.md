# ExpenseTracker App

A full-stack web application for managing personal finances. Track your income and expenses, visualize your financial data with interactive charts, and maintain a healthy financial overview with automatic monthly resets.

## ✨ Features

- 🔐 User registration and secure login
- 💰 Add income and expense transactions with categories
- 📊 Interactive pie chart visualization of your finances
- 📱 Responsive and modern UI with mobile-friendly design
- 🔄 Automatic monthly reset functionality
- 🎨 Beautiful gradient cards and custom styled components
- 🛡️ Secure authentication with JWT and HTTP-only cookies
- 🚨 Custom alert and confirmation dialogs
- 📅 Calendar widget showing days until monthly reset

## 🛠️ Technologies Used

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Heroicons
- Recharts (for pie charts)
- @heroicons/react

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT authentication with HTTP-only cookies
- bcryptjs for password hashing
- CORS configuration for cross-origin requests
- Automatic monthly reset functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or MongoDB Atlas)

### Local Development Setup

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

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## 📦 Production Deployment

### Backend Deployment

#### Environment Variables Required:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expensesApp
JWT_SECRET=your_super_secure_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
```

#### Recommended Platforms:
- **Render**: Easy deployment with GitHub integration
- **Railway**: Automatic deployments with database support
- **Heroku**: Classic PaaS with MongoDB Atlas integration

### Frontend Deployment

#### Environment Variables Required:
```env
VITE_API_URL=https://your-backend-domain.com
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_NODE_ENV=production
```

#### Recommended Platforms:
- **Vercel**: Optimized for React/Vite applications
- **Netlify**: Easy static site deployment
- **Render**: Full-stack application support

### Database Setup (MongoDB Atlas)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Configure network access (add your deployment platform IPs)
4. Create a database user
5. Get the connection string and update `MONGODB_URI`

## 🎯 Usage

1. **Register** a new user account or **log in** with existing credentials
2. **Add transactions**: Create income and expense entries with categories
3. **View dashboard**: Monitor your financial summary with beautiful gradient cards
4. **Interactive charts**: Visualize your spending patterns with pie charts
5. **Monthly reset**: Automatic reset at month-end or manual reset anytime
6. **Mobile support**: Use the app seamlessly on mobile devices

## 🏗️ Project Structure

```
expensesApp/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── .env.example       # Environment variables template
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── routes/        # Page components
│   │   ├── context/       # React context providers
│   │   └── config/        # API configuration
│   └── .env.example       # Environment variables template
└── README.md              # This file
```

## 🔒 Security Features

- JWT tokens stored in HTTP-only cookies
- Password hashing with bcryptjs
- CORS configuration for cross-origin requests
- Environment variables for sensitive data
- Input validation and sanitization

## Dependencies

See `package.json` in both `frontend` and `backend` folders for a full list of dependencies.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Feel free to contribute or open issues for improvements! Please read the contributing guidelines before submitting pull requests.

---

**Built with ❤️ for better financial management JUNIOR | DEV**
