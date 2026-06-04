# Secure Task Manager

## Overview

Secure Task Manager is a web application developed as part of an Application Security course project.

The project demonstrates the implementation of secure software development practices including:

- Authentication and Authorization
- Secure Session Management
- Password Hashing
- Data Encryption
- Input Validation and Sanitization
- Role-Based Access Control (RBAC)
- Threat Modeling
- Risk Assessment
- Secure API Development

---

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Security Libraries

- bcryptjs
- jsonwebtoken
- helmet
- express-rate-limit
- validator
- sanitize-html
- crypto-js
- cookie-parser

### Frontend

- HTML5
- CSS3
- JavaScript

---

## Security Features

### Authentication

- JWT Authentication
- HttpOnly Secure Cookies
- Session Expiration

### Authorization

- Role-Based Access Control (RBAC)
- Admin Routes Protection

### Password Protection

Passwords are hashed using bcrypt before storage.

### Data Encryption

Sensitive user information is encrypted using AES encryption before being stored in the database.

### Input Validation

All user input is validated and sanitized to reduce the risk of:

- Cross-Site Scripting (XSS)
- Malicious Input Injection
- Invalid Data Submission

### Security Headers

HTTP security headers are implemented using Helmet.

### Rate Limiting

Request rate limiting helps mitigate brute-force attacks.

### Audit Logging

Security-related events are logged for auditing and accountability.

---

## Project Structure

secure-task-manager/

backend/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js

frontend/
├── index.html
├── styles.css
├── script.js

docs/
├── STRIDE_Threat_Model.md
├── DREAD_Risk_Assessment.md

scans/
├── codeql-report.png
├── snyk-report.png

README.md

---

## Installation

### Clone Repository

git clone <repository-url>

### Install Backend Dependencies

cd backend

npm install

### Configure Environment

Create a .env file using .env.example

### Start MongoDB

Ensure MongoDB is running locally.

### Run Application

npm start

Backend URL:

http://localhost:5000

---

## Default Roles

### User

Can:

- Register
- Login
- Manage own tasks

### Admin

Can:

- View all users
- Promote users
- Delete users

---

## Threat Modeling

Threat modeling was performed using the STRIDE methodology.

See:

docs/STRIDE_Threat_Model.md

---

## Risk Assessment

Risk assessment was performed using the DREAD model.

See:

docs/DREAD_Risk_Assessment.md

---

## Security Testing

Static security analysis was performed using:

- GitHub CodeQL
- Snyk

Reports are available in the scans folder.

---

## Author

Application Security Course Project
