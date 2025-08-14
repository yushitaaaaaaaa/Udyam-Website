# 🏢 Udyam Registration Form Clone — Steps 1 & 2

## 📄 Overview
This project replicates the **first two steps** of the [Udyam Registration Portal](https://udyamregistration.gov.in/UdyamRegistration.aspx), focusing on **Aadhaar + OTP verification** and **PAN validation**.

The goal was to:
1. Scrape the original form fields, validation rules, and UI structure.
2. Rebuild a fully responsive front-end in **React**.
3. Implement a backend API to validate data and store submissions in **PostgreSQL**.
4. Ensure all validation rules match the original portal.

---

## 🎯 Key Features
### 1. **Web Scraping** (Puppeteer)
- Extracted **form fields, labels, dropdown options, and validation rules** from the Udyam portal.
- Stored scraped data in a structured **JSON schema** for reuse in the frontend.
- Examples of scraped validations:
  - **Aadhaar Format:** 12 digits
  - **PAN Format:** `[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}`

### 2. **Responsive UI** (React)
- Mobile-first design for accessibility.
- Form fields are **rendered dynamically** from the scraped JSON schema.
- Integrated **real-time validation**:
  - Invalid PAN triggers an error instantly.
  - Aadhaar must match numeric format before OTP step is available.
- Used **Flexbox + media queries** for a clean, adaptive layout.

### 3. **Backend Integration** (Node.js + Express + PostgreSQL)
- Built a REST API for:
  - Validating input against the scraped rules.
  - Storing valid submissions into PostgreSQL.
- Database managed via **Prisma ORM** with a schema reflecting the original form.
- Proper error handling and status codes.

### 4. **Testing** (Jest)
- Unit tests for PAN and Aadhaar validation functions.
- Example: Ensure invalid Aadhaar numbers never reach OTP stage.

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| **Frontend** | React.js, HTML5, CSS3 |
| **Backend**  | Node.js, Express.js |
| **Database** | PostgreSQL |
| **ORM**      | Prisma |
| **Scraping** | Puppeteer |

---

## 📂 Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img width="250" src="https://github.com/user-attachments/assets/0838adf2-f612-4bec-8d38-16a2544cfbe1" alt="Home Page - Navbar, Info Header, Aadhaar Verification with OTP" />
      <p>Home Page - Navbar, Info Header, Aadhaar Verification with OTP</p>
    </td>
    <td align="center" width="50%">
      <img width="250" src="https://github.com/user-attachments/assets/cc0446c6-e571-4721-8f34-13fd1fc09616" alt="OTP Input & Notice Container" />
      <p>OTP Input & Notice Container</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="250" src="https://github.com/user-attachments/assets/5c939556-5563-42bb-bacc-b33a1586c7ad" alt="Aadhaar Verified & PAN Verification" />
      <p>Aadhaar Verified & PAN Verification</p>
    </td>
    <td align="center" width="50%">
      <img width="250" src="https://github.com/user-attachments/assets/bfc14108-cd35-41d1-b906-40df43e38a29" alt="PAN Details Filled & Organization Dropdown" />
      <p>PAN Details Filled & Organization Dropdown</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="250" src="https://github.com/user-attachments/assets/d40b350d-2f0c-46bb-9487-381fffa0fc48" alt="Notice Container, Footer & Back-to-Top Button" />
      <p>Notice Container, Footer & Back-to-Top Button</p>
    </td>
    <td align="center" width="50%">
      <img width="250" src="https://github.com/user-attachments/assets/6bc81428-ef8f-4770-ab83-ad4bc4d4497b" alt="PostgreSQL Data Output" />
      <p>PostgreSQL Data Output</p>
    </td>
  </tr>
</table>








