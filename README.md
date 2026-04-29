# PayTrack — Invoice & Payment Management System

> **Invoice Smart. Get Paid Fast.**

PayTrack is a full-stack web application built for freelancers and small businesses who are tired of chasing payments in Excel sheets and WhatsApp messages. It provides a clean, secure, and professional way to create invoices, track payments, and monitor your financial health — all in one place.

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend | Spring Boot 3.x | REST API Development |
| Security | Spring Security + JWT | Authentication & Authorization |
| Database | MySQL 8.x | Persistent Data Storage |
| ORM | Spring Data JPA (Hibernate) | Database Interaction |
| Frontend | React (Vite) | User Interface |
| Styling | Tailwind CSS | UI Styling |
| HTTP Client | Axios | API Calls from Frontend |
| Icons | Lucide React | Professional Icons |
| Build Tool | Maven | Backend Build Management |
| Version Control | GitHub | Code Management |

---

## ✨ Features (v1.0.0 — MVP)

### Authentication
- Secure User Registration with BCrypt password hashing
- JWT-based Login — stateless, secure token authentication
- Protected routes — unauthorized users redirected to login

### Invoice Management
- Create invoices with client name, email, amount, due date
- Multi-currency support — INR, USD, EUR, GBP, AED
- Advance payment recording at invoice creation
- Update invoice details and status
- Delete invoices
- Invoice status — PENDING, PAID, OVERDUE

### Payment Tracking
- Record multiple partial payments per invoice (One-to-Many)
- Payment modes — UPI, Cash, Bank Transfer, Card
- Real-time remaining amount calculation
- Overpayment prevention — frontend + backend validation
- Auto status update — invoice automatically marked PAID when fully settled

### Dashboard
- Total invoices count
- Real-time Paid, Pending, Overdue amounts
- Advance payment included in calculations
- Recent 5 invoices with status badges
- Quick Create Invoice button

### Automation
- Auto OVERDUE — scheduler checks due dates every minute
- Auto PAID — status updates instantly when full payment received
- Overpayment cap — payment capped at remaining amount

### Developer Features
- Clean 3-layer architecture — Controller → Service → Repository
- DTO pattern — entities not exposed directly in API responses
- Global Exception Handler — clean, consistent error responses
- CORS configured for frontend-backend communication

---

## 📸 Application Pages

| Page | Route | Access |
|---|---|---|
| Landing Page | / | Public |
| Login | /login | Public |
| Register | /register | Public |
| Documentation | /docs | Public |
| Dashboard | /dashboard | Protected |
| Invoice List | /invoices | Protected |
| Create Invoice | /invoices/create | Protected |
| Invoice Detail | /invoices/:id | Protected |
| Edit Invoice | /invoices/:id/edit | Protected |
| Profile | /profile | Protected |

---

## 🗄️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices Table
CREATE TABLE invoices (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  client_name VARCHAR(100) NOT NULL,
  client_email VARCHAR(100),
  amount DECIMAL(10,2) NOT NULL,
  advance_amount DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'INR',
  due_date DATE NOT NULL,
  status ENUM('PENDING','PAID','OVERDUE') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Payments Table
CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  invoice_id BIGINT NOT NULL,
  paid_amount DECIMAL(10,2) NOT NULL,
  paid_date DATE NOT NULL,
  payment_mode ENUM('CASH','UPI','BANK_TRANSFER','CARD') NOT NULL,
  note VARCHAR(255),
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);
```

---

## 🛠️ Local Setup

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.x
- Maven 3.8+

### Backend Setup
```bash
# 1. Clone the repository
git clone https://github.com/Pankaj282002/paytrack.git
cd paytrack/paytrack-backend

# 2. Create MySQL database
CREATE DATABASE paytrack_db;

# 3. Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/paytrack_db
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=your_secret_key
jwt.expiration=86400000

# 4. Run the application
./mvnw spring-boot:run
# Backend starts at http://localhost:8080
```

### Frontend Setup
```bash
# 1. Navigate to frontend folder
cd paytrack/paytrack-frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Frontend starts at http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login and get JWT | No |
| GET | /api/invoices | Get all invoices | Yes |
| POST | /api/invoices | Create invoice | Yes |
| GET | /api/invoices/:id | Get invoice detail | Yes |
| PUT | /api/invoices/:id | Update invoice | Yes |
| DELETE | /api/invoices/:id | Delete invoice | Yes |
| GET | /api/invoices/:id/payments | Get payments | Yes |
| POST | /api/invoices/:id/payments | Add payment | Yes |
| GET | /api/dashboard | Get dashboard summary | Yes |

---

## 🗺️ Roadmap

**v1.1.0 — Enhancement**
- Invoice PDF export
- Filter by date range and status
- Search invoices by client name
- Pagination on invoice list

**v1.2.0 — Notifications**
- Overdue invoice email alerts (JavaMailSender)
- Payment reminder notifications
- Due date warning (3 days before)

**v2.0.0 — Advanced**
- Razorpay payment gateway integration
- Webhook for auto payment status sync
- Multi-user client portal
- Role-based access control
- Docker containerization

---

## 📝 Feedback & Support

Found a bug or have a feature request? We'd love to hear from you!

- 📋 [Submit Feedback](https://docs.google.com/forms/d/e/1FAIpQLScMcsJ1JLsIpfMalbNVNIIpTZOfV1lid4yz1f7QUA0QT0wGhg/viewform)
- 🐛 [Report a Bug on GitHub](https://github.com/Pankaj282002/paytrack/issues)

---

## 👨‍💻 Developer

**Pankaj Patil**
MCA Student — Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon, Maharashtra

> Built with passion using Spring Boot & React
