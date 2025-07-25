# MediTrack 🏥

**MediTrack** is a full-stack health appointment and records management web application. It allows patients to easily book doctor appointments, doctors to manage queues and view patient details, and clinics to centralize healthcare information — all from a modern, user-friendly dashboard.

> ⚙️ Built using the **MERN stack (MongoDB, Express, React, Node.js)**, MediTrack is designed to simplify health workflows with secure, scalable, and responsive design practices.

---

## 🔗 Live Demo

👉 [Access MediTrack Live](https://meditrack-lac.vercel.app/)  

---

## 📸 Screenshots

| Home Page | Doctor Dashboard |
|-----------|------------------|
| ![Home Page](./screenshots/home.png) | ![Doctor Dashboard](./screenshots/doctor-dashboard.png) |

> More screenshots and walkthrough GIFs coming soon.

---

## 🚀 Features

### 👥 User Management
- 🔐 **Secure JWT-based authentication** (Patients & Doctors)
- 🚪 Role-based login and access control
- 🛡️ Encrypted credentials using bcrypt

### 📅 Appointment System (MVP)
- 👨‍⚕️ Doctors can view and manage their appointment queues
- 🧍 Patients can book appointments with doctors
- 🗓️ Track upcoming visits via dashboards

### 🩺 Health Records *(Coming Soon)*
- View medical history
- Doctor’s diagnosis notes (Planned)

### 🌓 UI/UX
- 🌙 Dark mode supported
- 📱 Fully responsive (desktop + mobile)
- 🧭 Intuitive navigation with React Router

### 🔌 Integrations & Future Enhancements
- 📡 Real-time communication using **Socket.io** *(Planned)*
- 🔔 Email/SMS notifications *(Planned)*

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js with Vite
- 🎨 Tailwind CSS
- 🌐 React Router DOM
- 📡 Axios (API Calls)

### Backend
- 🧠 Node.js + Express.js
- 🗃️ MongoDB + Mongoose
- 🔐 JWT for secure auth
- 🔑 dotenv for managing environment variables

### Dev & Deployment
- 🔄 Git & GitHub for version control
- 🧪 Postman for API testing
- ☁️ Deployed via:
  - Vercel (Frontend)
  - Render (Backend)

---

## 📁 Folder Structure

```
meditrack/
│
├── client/ # React frontend
│ ├── public/ # Static assets
│ └── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page routes (e.g., Login, Dashboard)
│ ├── services/ # Axios configs / API calls
│ ├── context/ # Auth context
│ └── App.jsx
│
├── server/ # Node.js backend
│ ├── controllers/ # Route logic
│ ├── models/ # MongoDB schemas
│ ├── routes/ # Express routes
│ ├── middleware/ # JWT auth middleware
│ └── server.js
│
├── .env.example
├── README.md
└── package.json

```

---

## 🧪 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Edwin420s/meditrack.git
cd meditrack
```

Set Up Environment Variables
Create .env files using .env.example in both /client and /server:

server/.env
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
client/.env 
```
VITE_API_URL=http://localhost:5000
```
 Install Dependencies 
 ```
# Root
npm install

# Client
cd client
npm install

# Server
cd ../server
npm install
```
Run the App 
```
# In two terminals

# Terminal 1
cd client
npm run dev

# Terminal 2
cd server
npm run dev

```
🎯 Roadmap
✅ Book & manage appointments (MVP)

🛠️ CRUD health records & diagnostics (In Progress)

📱 React Native or Flutter mobile version

📧 Email/SMS alerts for appointments

📊 Analytics dashboard for clinics

🧑‍💻 Author
Edwin Mwiti
Full-Stack Developer | MERN Enthusiast | HealthTech Innovator
📧 Email: eduedwyn5@gmail.com
🔗 LinkedIn
📞 +254 748 750 912

📝 License
This project is open source and available under the MIT License.
```

---

## 🔄 Next Steps

Would you like me to now:
- ✅ Turn this into a **pitch deck (PDF or Google Slides)**?
- 📦 Help you write a submission summary for your final project form?
- 🎥 Guide you in recording a 1-minute video demo?

Let me know how you’d like to present MediTrack — you’ve built a solid MVP!
```
