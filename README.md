# 🛒 বাজার দর (BazarDor) - Market Price Tracking Application

An all-in-one full-stack web application built with **Next.js (App Router)** to monitor daily market prices, track price surges/drops, and compare item costs across different markets in Bangladesh in real-time.

[![Live Site](https://img.shields.io/badge/Live%20Demo-bazardorapp.netlify.app-emerald?style=for-the-badge&logo=netlify)](https://bazardorapp.netlify.app)
[![Framework](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Database](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Auth](https://img.shields.io/badge/Better--Auth-OAuth-blue?style=for-the-badge)](https://www.better-auth.com/)

---

## 🌐 Live Application
- **Live URL:** [https://bazardorapp.netlify.app](https://bazardorapp.netlify.app)
- **GitHub Repository:** [https://github.com/hasantanvir357/seventh-assignment](https://github.com/hasantanvir357/seventh-assignment)

---

## ✨ Key Features

1. **🔐 Multi-Method Authentication System:**
   - Full authentication flow powered by **Better-Auth**.
   - Supports Email/Password Sign-In & Registration alongside 1-click **Google** and **GitHub OAuth** social logins.
   - Protected routes for sensitive product details with toast notifications and automatic redirect logic.

2. **📈 Real-time Market Ticker & Home Analytics:**
   - Dynamic top price risers (**আজ দাম বেড়েছে ▲**) and top price fallers (**আজ দাম কমেছে ▼**) calculation.
   - Infinite marquee ticker bar displaying real-time price change percentages with Bengali numerals (`toBengaliNumber`).
   - Smooth anchor scrolling directly to the `#সব-পণ্য` section from the Hero CTA button.

3. **📊 Market-wise Price Breakdown & Product Details:**
   - Detailed product view at `/product/[slug]` displaying minimum, maximum, and average price distribution.
   - Market-specific price listing breakdown across various regional markets in Bangladesh.

4. **🗂️ Category Filtering & Numerical Sorting (C1 Challenge):**
   - Dynamic category route `/category/[slug]` with interactive sorting dropdown (ডিফল্ট, দাম: কম থেকে বেশি, দাম: বেশি থেকে কম).
   - Handles true numeric sorting using custom Bengali digit converters.
   - Skeleton loading states and clean empty-state fallback UI when no items are available.

5. **📱 Fully Responsive Design & 404 Fallback:**
   - Modern, high-performance UI styled using **Tailwind CSS** and **DaisyUI**, tailored to mirror the Figma specifications across mobile, tablet, and desktop viewports.
   - Custom 404 error handling for non-existent category/product slugs.

---

## 🛠️ Tech Stack & Tools

- **Framework:** Next.js (App Router)
- **Language:** JavaScript / React
- **Styling & UI:** Tailwind CSS, DaisyUI, Lucide React
- **Authentication:** Better-Auth (Google & GitHub OAuth + Local Credentials)
- **Database:** MongoDB Atlas
- **Notifications:** React Toastify
- **Deployment:** Netlify

---

## 🚀 Local Development Setup

To run this project on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone [https://github.com/hasantanvir357/seventh-assignment.git](https://github.com/hasantanvir357/seventh-assignment.git)
cd seventh-assignment
