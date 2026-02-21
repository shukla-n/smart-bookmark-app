# 🔖 Smart Bookmark App

A production-ready full-stack bookmark manager built using Next.js (App Router), Supabase, and Tailwind CSS.

🌐 Live Demo: https://smart-bookmark-app-five-eosin.vercel.app  
📂 GitHub Repo: https://github.com/shukla-n/smart-bookmark-app

---

## 🚀 Features

- 🔐 Google OAuth Authentication (Supabase Auth)
- 🔒 Row Level Security (RLS) for per-user data isolation
- ➕ Add bookmarks (Title + URL)
- ❌ Delete bookmarks
- ⚡ Real-time updates across multiple tabs
- 🎨 Modern UI built with Tailwind CSS
- ☁️ Deployed on Vercel

---

## 🛠️ Tech Stack

- Next.js (App Router)
- Supabase (Auth + PostgreSQL + Realtime)
- Tailwind CSS
- Vercel (Deployment)

---

## 🔐 Authentication & Security

- Google OAuth only (no email/password login)
- Supabase manages secure session handling
- Row Level Security (RLS) policies ensure:
  - Users can only insert their own bookmarks
  - Users can only view their own bookmarks
  - Users can only delete their own bookmarks

Each bookmark is securely tied to the authenticated user ID.

---

## ⚡ Real-Time Implementation

Supabase Realtime subscriptions are used to listen for INSERT and DELETE events on the bookmarks table.

If a user opens two tabs:
- Adding a bookmark in one tab updates the other instantly.
- No manual refresh required.

---

## 🧠 Challenges Faced

- Configuring Google OAuth redirect URLs for both localhost and production.
- Correctly setting up Row Level Security policies.
- Handling real-time subscriptions without memory leaks.
- Debugging Tailwind CSS v4 configuration.

---

## 🏗️ Local Development

```bash
git clone https://github.com/shukla-n/smart-bookmark-app
cd smart-bookmark-app
npm install
npm run dev
