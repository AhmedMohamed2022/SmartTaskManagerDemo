# DREAD Risk Assessment

## Project

Secure Task Manager

## Methodology

DREAD Risk Rating Model

| Threat                     | Damage | Reproducibility | Exploitability | Affected Users | Discoverability | Total | Risk Level |
| -------------------------- | ------ | --------------- | -------------- | -------------- | --------------- | ----- | ---------- |
| Brute Force Login          | 6      | 8               | 7              | 8              | 8               | 37    | High       |
| Cross-Site Scripting (XSS) | 7      | 7               | 6              | 7              | 7               | 34    | Medium     |
| Broken Authentication      | 9      | 7               | 8              | 9              | 8               | 41    | High       |
| Unauthorized Access        | 8      | 6               | 6              | 8              | 6               | 34    | Medium     |
| Session Hijacking          | 8      | 5               | 5              | 8              | 5               | 31    | Medium     |
| Information Disclosure     | 9      | 6               | 5              | 9              | 5               | 34    | Medium     |
| Denial of Service          | 6      | 7               | 8              | 8              | 7               | 36    | High       |

---

## Risk Analysis

### High Risks

- Brute Force Login
- Broken Authentication
- Denial of Service

### Medium Risks

- XSS
- Unauthorized Access
- Session Hijacking
- Information Disclosure

---

## Mitigation Summary

| Risk                   | Mitigation         |
| ---------------------- | ------------------ |
| Brute Force            | Rate Limiting      |
| Authentication Attacks | JWT + bcrypt       |
| XSS                    | Input Sanitization |
| Unauthorized Access    | RBAC               |
| Session Hijacking      | HttpOnly Cookies   |
| Information Disclosure | AES Encryption     |
| DoS                    | Rate Limiting      |

---

## Conclusion

The implemented security controls significantly reduce the overall attack surface and improve the security posture of the Secure Task Manager application.
