# 📝 Leave Request Application

This is a full-stack **Leave Request Management** system built with a **React (Vite)** frontend and a **Spring Boot** backend. The backend uses **PostgreSQL** for data storage and implements **JWT-based authentication and authorization**.

---

## 🔧 Tech Stack

### Frontend

- React (Vite)
- React Router
- Axios
- RxJS
- react marial ui
- Tailwind CSS
- JWT Authentication

### Backend

-  Spring Boot
-  Spring Security
-  PostgreSQL
-  JPA (Hibernate)
-  JWT Token Authentication

---

## 📁 Project Structure

### Frontend

Located in the root directory `/leave-request/frontend`:

- `Login`, `Signup`, `LeaveForm`, and `LeaveList` components
- HTTP interceptor for JWT authentication
- RxJS Subjects for cross-component communication

### Backend

Located in `/leave-request/backend`:

- `User` and `LeaveRequest` entities
- `AuthController` and `LeaveRequestController`
- Services and Repositories
- JWT Utility classes

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mihan2002/leave-request.git
cd leave-request
```

### 2. Backend Setup

Prerequisites: - Java 17+ - Maven - PostgreSQL

Configure Application Properties

Edit src/main/resources/application.properties:

```bash
  spring.datasource.url=your_database_url
  spring.datasource.username=your_username
  spring.datasource.password=your_password
```

### 3. Frontend Setup

Create a .env file in the root of the frontend folder (leave-request-ui):

```bash
  VITE_APP_API_BASE=http://localhost:8080/
```

Install dependencies:

```bash
  cd leave-request-ui
  npm install
```

### 4. Run the Backend

cd backend

```bash
./mvnw spring-boot:run
```

### 5. Run the Frontend

```bash
  cd leave-request-ui
npm run dev
```
