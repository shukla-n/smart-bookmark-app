# Smart Bookmark App 🚀

A secure, real-time bookmark manager built using modern full-stack technologies. Users can log in with Google, save private bookmarks, and see updates instantly across multiple tabs.

This project demonstrates authentication, database security, realtime systems, and modern UI using Next.js and Supabase.

---

# 🌐 Live Demo

(Add after deployment)


---

# ✨ Features

- Google OAuth authentication
- Add bookmarks (title and URL)
- Delete bookmarks
- Private bookmarks per user
- Real-time updates across tabs
- Secure database using Row Level Security (RLS)
- Responsive modern UI using Tailwind CSS
- Built with Next.js App Router and TypeScript

---

# 🛠 Tech Stack

- Frontend: Next.js 16 (App Router, TypeScript)
- Backend: Supabase (Auth, Database, Realtime)
- Styling: Tailwind CSS v4
- Deployment: Vercel
- Authentication: Google OAuth

---


---

# 🔐 Authentication Flow

1. User clicks "Login with Google"
2. Supabase handles Google OAuth authentication
3. Session is stored securely
4. User can access only their own bookmarks

---

# 🗄 Database Schema

Table: bookmarks

Columns:

id uuid (Primary Key)
title text
url text
user_id uuid
created_at timestamp

This prevents unauthorized access.

---

# ⚡ Realtime Functionality

Supabase Realtime listens for database changes:

- INSERT
- DELETE

Bookmarks update instantly across tabs without refresh.

---
## ⚠️ Hard Problems Faced & Solutions

### 1. Google OAuth Authentication Not Working

**Problem:**  
Login failed initially when trying to authenticate using Google OAuth.

**Cause:**  
OAuth credentials were not configured correctly between Google Cloud and Supabase.

**Solution:**  
- Created OAuth credentials in Google Cloud Console  
- Added the correct Redirect URL in Supabase Authentication settings  
- Added Google Client ID and Client Secret in Supabase  
- Enabled Google provider in Supabase Auth settings  

**Result:**  
Google OAuth login started working successfully.

---

### 2. Realtime Updates Not Working

**Problem:**  
Changes made in one browser tab did not appear in another tab in realtime.

**Cause:**  
Supabase Realtime was not enabled and subscription was not configured in frontend.

**Solution:**  
- Enabled Realtime replication for required tables in Supabase  
- Configured realtime subscription in Next.js frontend using Supabase client  
- Verified channel subscription and event listening  

**Result:**  
Realtime updates started syncing instantly across tabs.


---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

