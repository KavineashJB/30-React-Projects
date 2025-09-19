# 📝 QuoteBoard

QuoteBoard is a simple and interactive full-stack web app built with React + TypeScript and Node.js/Express that lets you add, edit, filter, and delete your favorite quotes.  
It supports pagination, dark/light themes, and shows when each quote was created in a human-friendly format.

---

## ✨ Features

- ➕ Add New Quotes – Save your favorite quotes with ease.
- ✏ Edit & Update – Modify existing quotes inline.
- ❌ Delete Quotes – Remove quotes permanently with confirmation.
- 🔍 Filter Mode – Search quotes by text with ascending/descending sort.
- 📑 Pagination – Navigate through quotes page by page.
- 🌗 Theme Toggle – Switch between Light 🌞 and Dark 🌙 modes.
- ⏱️ Relative Time – See when each quote was created (e.g., _2 hours ago_).
- 📋 One-Click Copy – Copy quotes instantly to clipboard.
- 🚫 Duplicate Protection – Prevents adding the same quote twice.
- ⚠ Validation – Ensures quotes are non-empty and max 60 characters.

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript – UI rendering & type safety
- Tailwind CSS – Styling and dark/light theme support
- React Icons – Icons for actions (copy, edit, delete, etc.)
- Framer Motion – Smooth animations for lists
- React Toastify – Notifications and alerts

### Backend

- Node.js + Express – REST API server
- MongoDB + Mongoose – Database & schema modeling
- CORS & dotenv – Configuration and security

---

## 🚀 How It Works

1. **Add a Quote** – Enter text (max 60 chars) and click _Add_.
2. **Edit a Quote** – Click _Edit_, update text, and confirm with _Update_.
3. **Delete a Quote** – Remove a quote permanently after confirmation.
4. **Filter Mode** – Toggle filter, type keywords, and sort by date.
5. **Navigate** – Use arrows to go to previous/next pages.
6. **Theme Switch** – Switch between light and dark modes (saved in localStorage).
