# 🧑‍💻 Frontend Assignment – 2-Step Role-Based Employee Wizard

This project implements a **2-step role-based wizard form** and an **employee list page** using **React + TypeScript** and **json-server** mock APIs.  
It demonstrates key frontend capabilities including async operations, draft persistence, modular architecture, and clean CSS design.

---

## 🚀 Live Demo

**Frontend (Vercel):** [https://fe-am.vercel.app](#)  
> ⚠️ Mock APIs run locally — see setup instructions below.

---

## 📋 Features

### 🧭 Role-Based Wizard
- **Admin role** → Step 1 (Basic Info) + Step 2 (Details & Submit)
- **Ops role** → Step 2 (Details & Submit) only
- Role simulation via query parameter:
  - `/wizard?role=admin`
  - `/wizard?role=ops`

### 🧩 Step 1 – Basic Info (Admin Only)
- Full name, email, and department  
- Department autocomplete (`/departments?name_like=`)  
- Data stored locally until submission  

### 🧾 Step 2 – Details & Submit
- Role selection dropdown  
- Location autocomplete (`/locations?name_like=`)  
- File upload with Base64 preview  
- Auto-generated Employee ID (`<3-letter dept>-<3-digit seq>`, e.g. `ENG-003`)  
- Sequential POST submissions with 3s delay each  
- Progress log UI with submission states  

### 💾 Draft Auto-Save
- Debounced auto-save every 2 seconds  
- Separate storage per role (`draft_admin`, `draft_ops`)  
- Automatically restores saved drafts on reload  
- “Clear Draft” resets current role only  

### 📋 Employee List Page
- Merges `/basicInfo` (port 4001) and `/details` (port 4002)  
- Displays: Name · Department · Role · Location · Photo  
- Pagination via `_page` and `_limit`  
- Placeholder (`—`) for missing fields  
- “+ Add Employee” button to open the wizard  

### 💅 Styling
- **Vanilla CSS (BEM convention)**  
- **Responsive layout** (360px – 1440px)  
- **No UI frameworks** (no Tailwind, MUI, Bootstrap, etc.)  

---

## ⚙️ Tech Stack

| Tool | Purpose |
|------|----------|
| React + TypeScript (Vite) | Frontend framework |
| json-server | Mock backend APIs |
| Jest + React Testing Library | Unit testing |
| Vanilla CSS | Styling |
| Docker Compose | Optional local multi-service setup |
| Vercel | Frontend hosting |

---

## 📁 Folder Structure

```
frontend-assignment/
 ├── src/
 │   ├── components/
 │   │   ├── Wizard/
 │   │   └── common/
 │   ├── hooks/
 │   ├── pages/
 │   ├── utils/
 │   └── styles/
 ├── db/
 │   ├── db-step1.json
 │   └── db-step2.json
 ├── Dockerfile
 ├── docker-compose.yml
 ├── vercel.json
 ├── vite.config.ts
 ├── package.json
 └── README.md
```

---

## 🧩 Local Setup (with Mock APIs)

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run mock APIs (json-server)
```bash
npm run server:step1
npm run server:step2
```

These start:
- Step 1 API → `http://localhost:4001`  
- Step 2 API → `http://localhost:4002`  

Mock data files:
- `db/db-step1.json` → departments + basicInfo  
- `db/db-step2.json` → locations + details  

### 3️⃣ Run frontend (Use Node 20.19)
```bash
npm run dev
```

Then open:  
- `http://localhost:5173/wizard?role=admin`  
- `http://localhost:5173/employees`  

---

## 🐳 Optional: Run Everything with Docker Compose

If you have Docker installed, you can run all services in one command:

```bash
docker compose up --build
```

This runs:
- Frontend on port **5173**  
- Step1 mock API on **4001**  
- Step2 mock API on **4002**  

To stop containers:
```bash
docker compose down
```

---

## 🧠 API Endpoints

### Step 1 (port 4001)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/departments?name_like=` | Department autocomplete |
| POST | `/basicInfo` | Save basic info |

### Step 2 (port 4002)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/locations?name_like=` | Location autocomplete |
| POST | `/details` | Save employee details |

---

## 🧪 Testing

### Run all tests:
```bash
npm test
```

### Included Tests
1. **Autocomplete Test** → verifies async suggestion rendering  
2. **Submit Flow Test** → verifies sequential POST requests + progress display  

---

## 🧱 Deployment

### 🧩 Frontend (Vercel)
The frontend is deployed to **Vercel** as a static site.  
Vercel config (`vercel.json`):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

✅ Ensures client-side routing works for `/wizard` and `/employees`.

### 💾 Mock APIs
Mock APIs (`json-server`) are designed for **local usage only**.  
They can optionally be hosted using **Render**, **Railway**, or **MockAPI.io** if remote access is required.

> ⚠️ As per assignment instructions, only the frontend must be deployed.  
> The mock APIs are intended for local simulation.

---

## 💾 Auto-Save Draft Logic

| Role | LocalStorage Key |
|------|------------------|
| Admin | `draft_admin` |
| Ops | `draft_ops` |

- Auto-saves every 2 seconds of inactivity  
- Restores on reload  
- “Clear Draft” clears only the active role’s draft

---

## 🧩 Developer Notes

- React Router manages `/wizard` and `/employees` routes.
- Employee ID auto-generated as `<DEPT>-<SEQ>`.
- Submission simulates async bulk uploads with progress updates.
- Draft auto-save uses debounced localStorage logic.
- CSS follows **BEM structure** and responsive design (360–1440px).

---

## 📜 Evaluation Focus (from the brief)

✅ Correct role-based logic  
✅ Async autocomplete implementation  
✅ Draft auto-save (debounced)  
✅ Sequential POST simulation  
✅ Clean, modular architecture  
✅ Vanilla CSS (no frameworks)  
✅ Responsive layout  
✅ Passing Jest + RTL tests  
✅ Working frontend deployment (Vercel or Netlify)

---

## 👨‍💻 Author

**Shofwan Hanif**  
Frontend Engineer | React • TypeScript • UI/UX Driven Development  
[LinkedIn](#) · [GitHub](#)
