# STRIDE Threat Modeling Report

## Project

Secure Task Manager

## Methodology

Microsoft STRIDE Threat Modeling Framework

---

# Spoofing

### Threat

An attacker attempts to impersonate a legitimate user.

### Impact

Unauthorized access to user accounts and data.

### Mitigation

- JWT Authentication
- Secure Session Cookies
- Password Hashing using bcrypt

---

# Tampering

### Threat

Modification of task data or user records.

### Impact

Data integrity compromise.

### Mitigation

- Authentication Middleware
- Ownership Validation
- Input Validation
- Input Sanitization

---

# Repudiation

### Threat

Users deny performing actions.

### Impact

Difficulty investigating incidents.

### Mitigation

- Audit Logging
- Timestamped Records
- User Activity Tracking

---

# Information Disclosure

### Threat

Exposure of sensitive information.

### Impact

Privacy violations and credential compromise.

### Mitigation

- Password Hashing
- AES Encryption
- Secure Error Messages
- Restricted Data Exposure

---

# Denial of Service

### Threat

Attackers flood endpoints with requests.

### Impact

Application unavailability.

### Mitigation

- Express Rate Limiting
- Request Throttling
- Efficient API Design

---

# Elevation of Privilege

### Threat

Regular users gain administrative privileges.

### Impact

Unauthorized access to administrative functions.

### Mitigation

- Role-Based Access Control (RBAC)
- Protected Admin Routes
- JWT Role Verification

---

# Summary

The Secure Task Manager system incorporates controls to mitigate threats across all STRIDE categories and follows secure software development principles.
