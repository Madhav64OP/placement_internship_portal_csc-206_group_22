# IITR PIP - Placement & Internship Portal

A robust, full-stack web application designed to orchestrate and streamline the placement and internship drives at IIT Roorkee. This portal bridges the gap between Students, Recruiters, and the Placement & Internship Cell (PIC) by offering role-specific dashboards, dynamic queue management, automated scheduling clash detection, and a QR-based physical attendance node.

## 🌟 Comprehensive Feature Set

### 1. PIC Head (Administrator) Module
* **Company Management:** Full CRUD capabilities to add and manage visiting recruiters, including roles, minimum CGPA cutoffs, and hiring status.
* **Student Master List:** Advanced filtering and validation of the student database based on CGPA, branch, and current shortlist status.
* **Dynamic Interview Queue:** Real-time visualization of interview queues, prioritizing students based on their number of shortlists and highlighting active scheduling clashes.
* **Event Dispatcher (Command Center):** Centralized notification system allowing the PIC to trigger alerts (e.g., `TEST_LINK`, `QUEUE_UPDATE`, `SHORTLIST_RESULT`) to all students or specific individuals.
* **Live Status Tracker:** Real-time log monitoring of dispatched notifications and their read/unread/failed statuses.

### 2. Associate Coordinator Module
* **QR Scanner Node:** A dedicated physical checkpoint portal used at test venues (e.g., LHC-102).
* **Attendance Validation:** Simulates processing QR tokens to mark student attendance (`PRESENT`), handling edge cases like invalid venue codes, wrong QR tokens, and duplicate scan attempts.

### 3. Student Module
* **Opportunity Dashboard:** A clean, filtered view of all active companies hiring on campus.
* **One-Click Apply:** Students can view job descriptions, role requirements, and apply directly to eligible companies.
* **Application Tracking:** View the real-time status of submitted applications across different companies.

### 4. Core Backend Systems
* **Algorithmic Clash Detection:** The scheduling engine intercepts overlapping interview times using MongoDB query aggregation. It prevents clashes in three distinct scenarios:
  1. *Overlap Start:* A new interview starts during an existing one.
  2. *Overlap End:* A new interview ends during an existing one.
  3. *Complete Swallow:* A new interview completely encompasses an existing time block.
* **Role-Based Access Control (RBAC):** Strict routing and data isolation for `Student`, `PIC_HEAD`, `ASSOCIATE`, and `HR` roles.

---

## 🛠️ Technical Stack

**Frontend Architecture:**
* **Framework:** React.js 19
* **Build Tool:** Vite (for rapid HMR and optimized builds)
* **Styling:** Tailwind CSS v4
* **Routing:** React Router DOM v7
* **State Management:** React Context API & Component-level Hooks
* **Network Requests:** Axios

**Backend Architecture:**
* **Runtime:** Node.js
* **Framework:** Express.js 5
* **Database:** MongoDB
* **ODM:** Mongoose v9
* **Security & Middleware:** CORS, Dotenv

---

## 🗄️ Database Schema Overview

The MongoDB database is structured around four primary collections:

1. **User:** Manages authentication and profile data. Includes `role`, `channeliId` (for OAuth), `branch`, `cgpa`, and `enrollmentNo`.
2. **Company:** Stores recruiter details, job descriptions, roles, eligibility criteria (`minCGPA`, `eligibleBranches`), and current drive status.
3. **Application:** Links a `Student` to a `Company`. Tracks the `status` (Applied, Shortlisted, Selected, etc.), current round, and physical `attendanceStatus`.
4. **Interview:** Manages the scheduling logistics. Links `Student` and `Company` with `startTime`, `endTime`, `meetingLink`, and `status`.

---

## ⚙️ Local Development Setup

### Prerequisites
Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v18.x or higher)
* [MongoDB](https://www.mongodb.com/) (Local server or Atlas URI)
* [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/iitr-pip.git](https://github.com/yourusername/iitr-pip.git)
cd iitr-pip
```

2. Backend Environment Setup
Navigate to the server directory and install the necessary dependencies:

```Bash
cd server
npm install
```

Create a .env file in the server directory and add the following:

```Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pip-db
```

Start the backend server:

```Bash
npm run start
# Server should log: "MongoDB Connected" and "Server is running on http://localhost:5000"
```

3. Frontend Environment Setup
Open a new terminal window, navigate to the frontend directory, and install the dependencies:

```Bash
cd frontend
npm install
```

Start the Vite development server:

```Bash
npm run dev
# Application will run on http://localhost:5173
```


## 📂 Project Structure

```text
├── frontend/                 # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/           # Images and SVG icons
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context API for state management
│   │   ├── features/         # Feature-specific logic (queue, scanner, applications)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Route components
│   │   │   ├── company/      # Company management views
│   │   │   ├── pic/          # PIC Head and Associate Coordinator dashboards
│   │   │   └── student/      # Student application interfaces
│   │   ├── services/         # API integration (axios config)
│   │   ├── App.jsx           # Main application routing
│   │   └── main.jsx          # React entry point
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                   # Node.js/Express backend application
    ├── config/               # Database connection setup
    │   └── db.js
    ├── controllers/          # Business logic for routes
    │   ├── ApplicationController.js
    │   ├── companyController.js
    │   └── interviewController.js
    ├── models/               # MongoDB schema definitions
    │   ├── Application.js
    │   ├── Company.js
    │   ├── Interview.js
    │   └── User.js
    ├── routes/               # API endpoint routing
    │   ├── applicationRoutes.js
    │   ├── companyRoutes.js
    │   └── interviewRoutes.js
    └── server.js             # Express application entry point
```


**📡 API Reference Documentation**
* **Health Check**
    GET /api/health - Verifies the backend service is running.

* **Companies**
    GET /api/companies - Retrieves a list of all companies (sorted newest first).

    POST /api/companies - Creates a new company posting. Requires companyName, roles, and criteria in the body.

* **Applications**
    GET /api/applications/student/:studentId - Retrieves all applications made by a specific student, populating company details.

    POST /api/applications/apply - Submits a new application. Validates if the student has already applied to prevent duplicates.

* **Interviews**
    POST /api/interviews/schedule - Attempts to schedule an interview.

* **payload**: companyId, studentId, startTime, endTime, meetingLink

* **Behavior**: Triggers the Clash Detection algorithm. Returns 201 Created on success or 400 Bad Request with conflict details if a schedule overlap is found.

**🚧 Future Roadmap & Integration Notes**
* **Channeli OAuth Integration**: The current login mechanism uses a mocked dropdown to simulate different administrative roles. Future iterations will integrate directly with IITR's Channeli/Omniport API to fetch verified student/staff tokens.

* **Real-time WebSockets**: Upgrading the Notification Command Center from polling to WebSockets (Socket.io) for instant dispatching of queue updates to student devices.

* **Hardware Scanner Integration**: Connecting the frontend Associate Portal with actual physical USB/Bluetooth QR scanners via the Web Serial API.


