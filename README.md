# 💍 Wedora – Wedding Planning Platform (Frontend)

<p align="center">
  <b>A modern wedding planning platform connecting couples with trusted wedding service providers.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<p align="center">
  <a href="https://wedora-topaz.vercel.app/">Live Website</a> •
  <a href="https://github.com/prottoym/wedora-client">Frontend Repository</a> •
  <a href="https://github.com/prottoym/wedora-server">Backend Repository</a>
</p>

---

## 📖 About the Project

**Wedora** is a modern wedding planning platform designed to make wedding arrangements easier, smarter, and more convenient.

The platform provides a centralized marketplace where customers can discover wedding services, explore vendors, submit booking requests, and manage their wedding-related activities.

Wedora also provides dedicated dashboards for vendors and administrators, allowing them to manage services, bookings, users, and platform operations.

The frontend is built with Next.js, React, and TypeScript, providing a responsive and user-friendly experience.

## ✨ Key Features

### 👤 Customer Experience

- Browse available wedding services.
- Explore services by category and location.
- Search and filter wedding services.
- View detailed service information.
- Submit wedding booking requests.
- Manage personal bookings.
- View booking history and statistics.
- Cancel eligible pending bookings.
- Manage account and profile information.

### 🏢 Vendor Dashboard

- Dedicated vendor dashboard.
- View vendor statistics.
- Create and manage wedding services.
- Update service information and pricing.
- Delete existing services.
- Manage booking-related activities.
- Access subscription features.

### 🛡️ Admin Dashboard

- Dedicated administrator dashboard.
- View overall platform statistics.
- Manage customer and vendor accounts.
- Search and inspect registered users.
- Block or unblock user accounts.
- Review submitted wedding services.
- Approve or reject service submissions.
- Manage service listings.
- Monitor platform transactions.

### 💳 Payment & Subscription

- Stripe payment integration.
- Premium subscription checkout.
- Subscription status verification.
- Subscription cancellation.
- Payment session verification.

### 🔐 Authentication & Authorization

- User authentication with Better Auth.
- Protected routes and dashboard access.
- Role-based access control.
- Customer, vendor, and admin permissions.
- Secure session management.
- Backend API authentication.

### 🎨 User Interface

- Modern and responsive interface.
- Reusable UI components.
- Clean dashboard layouts.
- Interactive navigation.
- Form validation.
- Toast notifications.
- Smooth UI animations.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React Framework |
| React 19 | UI Development |
| TypeScript | Type Safety |
| Tailwind CSS 4 | Styling |
| shadcn/ui | UI Components |
| Better Auth | Authentication |
| MongoDB | Database Integration |
| Zod | Schema Validation |
| React Hook Form | Form Management |
| Lucide React | Icons |
| Motion | UI Animations |
| Sonner | Toast Notifications |
| next-themes | Theme Management |

## 📂 Project Structure

```text
wedora-client/
│
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── services/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   └── ...
│
├── hooks/
│
├── lib/
│
├── public/
│
├── types/
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── proxy.ts
└── tsconfig.json
```

*Note: The structure above is a simplified overview of the application.*

## ⚙️ Installation & Setup

Follow these steps to run the frontend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/prottoym/wedora-client.git
```

### 2. Navigate to the Project Directory

```bash
cd wedora-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

Configure the following environment variables according to your backend and authentication setup:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret

NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Important:** Use the actual environment variable names expected by your application. Replace placeholder values with your own configuration. Never expose secret keys or upload environment files to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |
| `npm run format` | Format TypeScript and TSX files |

## 🔗 Backend Integration

Wedora Client communicates with the Wedora Backend through RESTful APIs.

The backend handles:

- Wedding service management.
- Customer booking operations.
- Vendor dashboard operations.
- Admin management.
- User authentication and authorization.
- Stripe payments and subscriptions.

**Backend Repository:**

https://github.com/prottoym/wedora-server

**Backend Live API:**

https://wedora-server-beta.vercel.app/

## 🚀 Deployment

The frontend is deployed using **Vercel**.

**Live Website:**

https://wedora-topaz.vercel.app/

To deploy your own version:

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Connect the backend API.
4. Deploy the application.

## 🔐 Security

- Protected dashboard routes.
- Role-based access control.
- Secure authentication integration.
- Server-side API communication.
- Form validation using Zod.
- Environment-based secret management.

## 👨‍💻 Developer

**Prottoy Modak**
- Backend: [Wedora Server](https://github.com/prottoym/wedora-server)

---

<p align="center">
  <b>Wedora – Making Wedding Planning Easier 💍</b>
</p>
