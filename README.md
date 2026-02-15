# OIBSIP_PIZZA_DELIVERY_APPLICATION

<div align="center">

```
██████╗ ██╗███████╗███████╗ █████╗      ██████╗██████╗  █████╗ ███████╗████████╗
██╔══██╗██║╚══███╔╝╚══███╔╝██╔══██╗    ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
██████╔╝██║  ███╔╝   ███╔╝ ███████║    ██║     ██████╔╝███████║█████╗     ██║   
██╔═══╝ ██║ ███╔╝   ███╔╝  ██╔══██║    ██║     ██╔══██╗██╔══██║██╔══╝     ██║   
██║     ██║███████╗███████╗██║  ██║    ╚██████╗██║  ██║██║  ██║██║        ██║   
╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝   
```

### 🍕 Build it. Bake it. Track it.

<br/>

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Test_Mode-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br/>

> **PizzaCraft** is a full-stack pizza ordering platform where customers build custom pizzas,  
> pay via Razorpay, and track orders in real-time — while admins manage inventory and  
> dispatch statuses from a dedicated control panel.

<br/>

[🚀 Features](#-features) · [🛠 Tech Stack](#-tech-stack) · [📁 Project Structure](#-project-structure) · [⚙️ Setup](#️-installation--setup) · [🔐 Environment Variables](#-environment-variables) · [📡 API Reference](#-api-reference) · [📸 Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 👤 User Side
| Feature | Description |
|--------|-------------|
| 🔐 **Auth System** | Register, Login, Email Verification, Forgot Password |
| 🍕 **Menu Dashboard** | Browse available pizza varieties with pricing |
| 🛠️ **Pizza Builder** | 4-step custom pizza wizard (Base → Sauce → Cheese → Veggies) |
| 💳 **Razorpay Checkout** | Secure test-mode payment integration |
| 📦 **Order Tracking** | Real-time order status updates from admin |
| 🔔 **Status Notifications** | Toast alerts on every order status change |

### 🛡️ Admin Side
| Feature | Description |
|--------|-------------|
| 📊 **Admin Dashboard** | Order overview with live stats |
| 📦 **Inventory Management** | Track Pizza Base, Sauce, Cheese, Veggies & Meat stock |
| 🔄 **Stock Auto-Update** | Deducts ingredients automatically after each order |
| ⚠️ **Low Stock Email Alerts** | Scheduled notifications when stock falls below threshold |
| 🍳 **Order Status Control** | Update: Order Received → In Kitchen → Sent to Delivery |
| 📬 **Real-Time Sync** | Status changes reflected instantly in user dashboard |

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│   React 18  ·  React Router  ·  Axios  ·  Socket.io-client  │
├─────────────────────────────────────────────────────────────┤
│                         BACKEND                             │
│   Node.js  ·  Express.js  ·  Socket.io  ·  Node-Cron       │
├─────────────────────────────────────────────────────────────┤
│                        DATABASE                             │
│   MongoDB  ·  Mongoose ODM                                  │
├─────────────────────────────────────────────────────────────┤
│                    AUTHENTICATION                           │
│   JWT  ·  Bcrypt  ·  Nodemailer  ·  Email Verification      │
├─────────────────────────────────────────────────────────────┤
│                       PAYMENTS                              │
│   Razorpay SDK  ·  Test Mode  ·  Webhook Verification       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pizzacraft/
│
├── 📂 client/                          # React Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── ResetPassword.jsx
│   │   │   │   └── VerifyEmail.jsx
│   │   │   ├── 📂 user/
│   │   │   │   ├── UserDashboard.jsx   # ← Main user dashboard
│   │   │   │   ├── PizzaMenu.jsx
│   │   │   │   ├── PizzaBuilder.jsx
│   │   │   │   ├── CartDrawer.jsx
│   │   │   │   ├── OrderTracker.jsx
│   │   │   │   └── OrderHistory.jsx
│   │   │   └── 📂 admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── InventoryManager.jsx
│   │   │       ├── OrdersPanel.jsx
│   │   │       └── StockAlerts.jsx
│   │   ├── 📂 context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── 📂 hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useSocket.js
│   │   ├── 📂 services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
│
├── 📂 server/                          # Node.js Backend
│   ├── 📂 config/
│   │   ├── db.js                       # MongoDB connection
│   │   └── nodemailer.js               # Email transporter
│   ├── 📂 controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   ├── pizzaController.js
│   │   └── inventoryController.js
│   ├── 📂 middleware/
│   │   ├── authMiddleware.js           # JWT verify
│   │   └── adminMiddleware.js          # Admin role guard
│   ├── 📂 models/
│   │   ├── User.js
│   │   ├── Order.js
│   │   ├── Pizza.js
│   │   └── Inventory.js
│   ├── 📂 routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── pizzaRoutes.js
│   │   └── inventoryRoutes.js
│   ├── 📂 utils/
│   │   ├── emailTemplates.js
│   │   ├── razorpay.js
│   │   └── stockChecker.js             # Cron job logic
│   ├── socket.js                       # Socket.io events
│   ├── cron.js                         # Scheduled stock alerts
│   └── server.js                       # Entry point
│
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

```bash
node -v   # v18.x or higher
npm -v    # v9.x or higher
mongod    # MongoDB running locally or Atlas URI
```

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/pizzacraft.git
cd pizzacraft
```

### 2️⃣ Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3️⃣ Configure Environment Variables

```bash
# In /server directory
cp .env.example .env
# Fill in the values (see Environment Variables section below)
```

### 4️⃣ Seed Initial Inventory Data

```bash
cd server
npm run seed
```

### 5️⃣ Start the Application

```bash
# Terminal 1 — Start backend
cd server
npm run dev

# Terminal 2 — Start frontend
cd client
npm run dev
```

> 🟢 Backend runs on **http://localhost:5000**  
> 🔵 Frontend runs on **http://localhost:5173**

---

## 🔐 Environment Variables

Create a `.env` file inside the `/server` directory:

```env
# ── Server ──────────────────────────────────
PORT=5000
NODE_ENV=development

# ── MongoDB ─────────────────────────────────
MONGO_URI=mongodb://localhost:27017/pizzacraft
# or MongoDB Atlas:
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/pizzacraft

# ── JWT ──────────────────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# ── Email (Nodemailer) ────────────────────────
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@yourpizzacraft.com

# ── Razorpay ─────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# ── Client URL ───────────────────────────────
CLIENT_URL=http://localhost:5173

# ── Stock Alert Threshold ─────────────────────
STOCK_THRESHOLD=20
```

> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`.

---

## 📡 API Reference

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/register` | Register new user | ❌ |
| `POST` | `/login` | Login user/admin | ❌ |
| `GET` | `/verify-email/:token` | Verify email address | ❌ |
| `POST` | `/forgot-password` | Send password reset email | ❌ |
| `POST` | `/reset-password/:token` | Reset with new password | ❌ |
| `GET` | `/me` | Get current user profile | ✅ |

### 🍕 Pizza Routes — `/api/pizzas`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/` | Get all pizza varieties | ✅ |
| `POST` | `/` | Add new pizza (admin) | 🛡️ Admin |
| `PUT` | `/:id` | Update pizza (admin) | 🛡️ Admin |
| `DELETE` | `/:id` | Remove pizza (admin) | 🛡️ Admin |

### 📦 Order Routes — `/api/orders`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/` | Place new order | ✅ |
| `GET` | `/my-orders` | Get user's orders | ✅ |
| `GET` | `/` | Get all orders (admin) | 🛡️ Admin |
| `PATCH` | `/:id/status` | Update order status (admin) | 🛡️ Admin |
| `POST` | `/verify-payment` | Verify Razorpay payment | ✅ |

### 🏪 Inventory Routes — `/api/inventory`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/` | Get full inventory (admin) | 🛡️ Admin |
| `PUT` | `/:id` | Update stock quantity | 🛡️ Admin |
| `GET` | `/low-stock` | Get below-threshold items | 🛡️ Admin |

---

## 🔄 Real-Time Flow (Socket.io)

```
User places order
      │
      ▼
Server creates order in MongoDB
      │
      ▼
Admin dashboard receives 🔔 new order notification
      │
      ▼
Admin updates status: "In the Kitchen"
      │
      ▼
Server emits: socket.emit('order:status-update', { orderId, status })
      │
      ▼
User dashboard receives update → Status tracker animates ✅
```

**Socket Events:**

```js
// Server → Client
'order:status-update'   // { orderId, status, timestamp }
'inventory:low-stock'   // { item, quantity, threshold }

// Client → Server  
'order:subscribe'       // { orderId } — user joins order room
```

---

## 💳 Razorpay Integration

This app uses **Razorpay Test Mode**. Use these test credentials:

```
Card Number  :  4111 1111 1111 1111
Expiry       :  Any future date (e.g. 12/26)
CVV          :  Any 3 digits (e.g. 123)
OTP          :  Any value (e.g. 1234)
```

> 🔑 Get your test API keys from [Razorpay Dashboard](https://dashboard.razorpay.com/) → Settings → API Keys → Test Mode

**Payment Flow:**
```
1. User clicks "Pay with Razorpay"
2. Frontend calls POST /api/orders/create-payment-order
3. Razorpay modal opens with order_id
4. User completes payment (test mode)
5. Frontend sends payment signature to POST /api/orders/verify-payment
6. Server verifies signature → Confirms order → Deducts inventory
```

---

## 📊 Inventory & Stock Alerts

The app uses **node-cron** to run a scheduled job every hour checking stock levels:

```js
// Runs every hour
cron.schedule('0 * * * *', async () => {
  const lowItems = await Inventory.find({ quantity: { $lt: threshold } });
  if (lowItems.length > 0) {
    sendLowStockAlert(adminEmail, lowItems); // Nodemailer
  }
});
```

**Triggered when:**
- Pizza Base stock < 20 units
- Sauce stock < 15 units  
- Cheese stock < 10 units
- Veggie stock < 25 units
- *(All thresholds configurable via `STOCK_THRESHOLD` env var)*

---

## 🍕 Pizza Builder Options

| Step | Options | Price Range |
|------|---------|-------------|
| **Base** | Thin Crust, Thick Crust, Cheese Stuffed, Multigrain, Gluten Free | +₹0 to +₹80 |
| **Sauce** | Tomato, BBQ, Pesto, White Sauce, Arrabbiata | +₹0 to +₹30 |
| **Cheese** | Mozzarella, Cheddar, Parmesan, Vegan Cheese | +₹0 to +₹50 |
| **Veggies** | Capsicum, Mushroom, Onion, Olives, Corn, Jalapeño, Tomato, Spinach | +₹10 to +₹25 each |

> Base pizza price: **₹199** + add-on costs

---

## 🔐 Auth Flow

```
Register → Email Verification Link Sent
              │
              ▼
         Verify Email → Account Activated
              │
              ▼
           Login → JWT Token Issued
              │
        ┌─────┴─────┐
        ▼            ▼
   User Dashboard  Admin Dashboard
   (role: user)   (role: admin)
```

**Forgot Password Flow:**
```
Enter Email → Reset Link Sent (valid 15 mins)
                   │
                   ▼
            Click Link → Enter New Password
                   │
                   ▼
            Password Updated → Redirect to Login
```

---

## 🧪 Running Tests

```bash
# Backend unit tests
cd server
npm test

# Frontend component tests
cd client
npm test
```

---

## 📸 Screenshots

| User Dashboard | 


<img width="904" height="819" alt="image" src="https://github.com/user-attachments/assets/287dda3a-a506-44ca-b12d-05c790ac2bad" />


 | Pizza Builder |

 
 <img width="916" height="820" alt="image" src="https://github.com/user-attachments/assets/70dc2e77-5800-4735-bdcd-7f8f39f47a76" />

 
| Order Tracker |


<img width="904" height="614" alt="image" src="https://github.com/user-attachments/assets/8f7f4f72-9232-4def-9a44-e4445541c074" />





---

## 🚀 Deployment

### Backend (Railway / Render)
```bash
# Set all environment variables in your hosting dashboard
# Build command:
npm install

# Start command:
node server.js
```

### Frontend (Vercel / Netlify)
```bash
# Build command:
npm run build

# Output directory:
dist/

# Add environment variable:
VITE_API_URL=https://your-backend-url.railway.app
VITE_RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
```

---

## 🤝 Contributing

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

**Commit Convention:**
```
feat:     New feature
fix:      Bug fix
docs:     Documentation update
style:    UI/formatting changes
refactor: Code refactoring
test:     Adding tests
chore:    Maintenance
```

---

## 📄 License

```
MIT License — feel free to use, modify, and distribute.
See LICENSE file for details.
```

---

<div align="center">

**Made with 🍕 and lots of ☕**

If this project helped you, please give it a ⭐ — it means a lot!

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/pizzacraft?style=social)](https://github.com/yourusername/pizzacraft)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/pizzacraft?style=social)](https://github.com/yourusername/pizzacraft)

</div>
