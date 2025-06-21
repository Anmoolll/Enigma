# 🔐 Enigma — Anonymous Messaging Platform

Enigma is a full-stack web application that allows users to receive anonymous messages through a public profile link. Built using **Next.js 14 (App Router)**, **MongoDB**, and **NextAuth**, it provides a secure and elegant way to interact with others without revealing identity.

---

## ✨ Features

- ✅ User authentication via **NextAuth.js (Credentials Provider)**
- 📨 Send anonymous messages through a `/u/[username]` public page
- 📬 View received messages on a private `/dashboard`
- 🚫 Toggle "Accepting Messages" setting
- 🔁 Live message refresh on dashboard
- ✅ Server-side session and secure JWT handling
- 🧪 Validated forms using **Zod + React Hook Form**
- 🔔 Toast feedback system using **shadcn/ui**

---

## 🚀 Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Framework    | Next.js 14 (App Router)          |
| Backend      | API Routes (Server Actions)      |
| Database     | MongoDB with Mongoose            |
| Authentication | next-auth (JWT-based sessions) |
| UI/Styling   | Tailwind CSS + shadcn/ui         |
| Forms        | React Hook Form + Zod            |
| Notifications| use-toast hook                   |

---

## 🛠️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/enigma.git
cd enigma
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Set up environment variables
Create a .env.local file and add the following:
```bash
MONGODB_URI=<your-mongodb-connection-uri>
NEXTAUTH_SECRET=<your-nextauth-secret>
RESEND_API_KEY=<your-resendAPI-key>
NEXTAUTH_URL=http://localhost:3000
```
### 4. Run the development server
```bash
npm run dev
```
### 5. The folder Structure should look like this:
```bash
src/
├── app/
│   ├── api/                # API routes
│   ├── (app)/          # Authenticated user dashboard
│   └── u/[username]/       # Public anonymous message form
|   └── (auth)              # sign-in/sign-up pages for routing  
├── components/             # UI components
├── lib/                    # DB connection helpers
├── model/                  # Mongoose models
├── hooks/                  # Custom hooks (e.g., use-toast)
├── schemas/                # Zod schemas for validation
├── helper/                  # verification email srtucture using resend
├── context/                 # Authprovider using next-auth
└── types/                   # API response 
```
