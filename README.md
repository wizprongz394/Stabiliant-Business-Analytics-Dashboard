# 📊 Stabiliant Business Analytics Dashboard

An end-to-end business analytics dashboard that helps monitor and visualize performance metrics across various departments. Built using **React**, **Express**, **MongoDB**, and **Node.js**.

---

## 📁 Project Structure

Stabiliant-Business-Analytics-Dashboard/
├── backend/ # Express + MongoDB backend API
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── .env # Environment variables
│ └── server.js # Entry point for backend
│
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ ├── .env # React environment variables
│ └── App.js
│
├── README.md
└── package.json

---

## 🚀 Features

- ✅ User authentication and role-based access  
- 📊 Real-time data visualization using charts and tables  
- 💾 MongoDB integration for dynamic data  
- 🔍 Dashboard filters, sorting, and analytics  
- 📱 Responsive UI for mobile and desktop  

---

## 🛠️ Tech Stack

| Frontend              | Backend        | Database       |
|-----------------------|----------------|----------------|
| React.js              | Express.js     | MongoDB        |
| Axios                 | Node.js        | Mongoose       |
| Chart.js / Recharts   | JWT Auth       | MongoDB Atlas  |

---

## ⚙️ Setup Instructions (Copy-Paste Ready)

### ✅ Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Stabiliant-Business-Analytics-Dashboard.git
cd Stabiliant-Business-Analytics-Dashboard
```

---

### ✅ Step 2: Backend Setup

```bash
cd backend
npm install
```

#### 🔐 Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

> Replace `your_mongodb_connection_string` with your actual MongoDB Atlas URI
> Replace `your_jwt_secret_key` with a secret string (e.g., `mysecret123`)

#### ▶️ Start the Backend Server

```bash
npm run dev
```

> Backend server will start on: `http://localhost:5000`

---

### ✅ Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

#### 🌐 Create a `.env` file inside the `frontend/` folder:

```env
REACT_APP_API_URL=http://localhost:5000
```

#### ▶️ Start the Frontend React App

```bash
npm start
```

> Frontend will run on: `http://localhost:3000`

---

### ✅ Step 4: Using the App

* Open [http://localhost:3000](http://localhost:3000) in your browser
* Register a new user or login
* Explore the dashboard, charts, filters, and analytics
* All requests are connected to the backend API (running on `localhost:5000`)

---

🧪 Sample API Endpoints
Method	Endpoint	Description
GET	/api/data	Get analytics data
POST	/api/auth/login	User login
POST	/api/auth/register	Register new user
---
🧠 Contribution Guidelines
Fork the repository

Create a new branch:

```bash
git checkout -b feature-name
Make your changes
```
Commit and push:
```bash
git push origin feature-name
Create a Pull Request
```

🛡️ License
This project is licensed under the MIT License.

🙋‍♀️ Maintainer
Ritodip Dewry

Contributors are welcome! Feel free to fork and submit PRs 😊
