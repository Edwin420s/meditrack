# MediTrack 🏥

**MediTrack** is a full-stack web application that enables patients to book appointments, doctors to manage queues, and healthcare providers to organize health records and visits. Built with a modern tech stack for seamless and efficient health service delivery.

---

## 🔗 Live Demo

👉 [Live Website](https://your-live-demo-link.com)  
*(Replace with actual deployment URL)*

---

## 📸 Screenshots

![Home Page](./screenshots/home.png)
![Doctor Dashboard](./screenshots/doctor-dashboard.png)

---

## 🚀 Features

- 🔐 Secure user authentication (patients & doctors)
- 📅 Book, view, and manage appointments
- 🩺 Doctor dashboard for queue and patient management
- 🧾 View health history & medical records
- 🌓 Dark mode support
- ⚡ Real-time updates with Socket.io *(if used)*

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js & Express
- MongoDB (Mongoose)
- JWT Authentication
- dotenv for environment config

---

## 🧪 Installation (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/Edwin420s/meditrack.git
cd meditrack
```
Set Up Environment Files
Create the following files (based on .env.example):

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
# In root
npm install

# In client
cd client
npm install

# In server
cd ../server
npm install
```
 Run the App 
 ```
# In root (or separate terminals)
cd client
npm run dev

cd ../server
npm run dev
```
🧾 Folder Structure
```
meditrack/
│
├── client/                # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/                # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── .gitignore
├── README.md
└── package.json
```
🙋‍♂️ Author
Edwin Mwiti
📧 eduedwyn5@gmail.com
🌐 LinkedIn
📞 +254 748 750 912
