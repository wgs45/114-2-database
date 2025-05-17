# 🍽️ Setup project

- 🖥️ **Frontend:** React.js + Material UI
- ⚙️ **Backend:** Node.js + Express
- 🗃️ **Database:** MySQL
- 📦 **Package Manager:** [pnpm](https://pnpm.io/) (preferred) or npm

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v18+
- MySQL installed and running
- Git installed
- Either `pnpm` (preferred) or `npm`

---

## 📁 Folder Structure

```
root/
├── frontend/       # React frontend
├── backend/        # Express backend
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `/frontend` folder with:

```
VITE_API_URL=http://localhost:3001/api
```

Create a `.env` file inside the `/backend` folder with:

```
DB_HOST=localhost
DB_USER=your_computer_mysql_username
DB_PASS=your_computer_mysql_password
DB_NAME=ordering_system
JWT_SECRET=any_secret_work
PORT=3001
BCRYPT_SALT=10
```

> Remember that .env files only stay at your computer and are not pushed to the git repository

---

## ⚙️ Install Dependencies

### Option 1: Using `pnpm` (recommended)

```bash
# Install dependencies
cd frontend/ && pnpm install
cd backend/ && pnpm install
```

### Option 2: Using `npm`

```bash
# Install dependencies
rm pnpm-lock.yaml
cd frontend/ && npm install

rm pnpm-workspace.yaml
rm pnpm-lock.yaml
cd backend/ && npm install
```

---

## 🏃‍♂️ Running the Project

### Start Backend (API server)

```bash
cd backend
node server.js
```

### Start Frontend (React app)

```bash
cd frontend
pnpm run dev # or: npm run dev
```

Frontend runs at `http://localhost:5173`
Backend runs at `http://localhost:5000`

> Port number may differ on everyone computer

---

## 💻 Setting Up the Database

1. Open your MySQL GUI or terminal
2. Run the SQL in `schema.sql` to create tables
3. Run the SQL in `seed.sql` to inject dummy data
4. Make sure your `.env` file matches your database credentials

---

## 🔄 Git Branching Tips

If you're contributing:

```bash
# Create a new branch to avoid breaking the main code
git checkout -b feature/your-branch-name

# After making changes and push to the new branch (not main branch)
git add .
git commit -m "Your message"
git push origin feature/your-branch-name
```

---
