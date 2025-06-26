# 🗂️ Google Drive Clone – Lightweight File Management System

A full-stack clone of Google Drive built using modern web technologies. This app allows users to upload files, organize them into folders, and manage their personal storage in a secure and responsive UI. Authentication, local storage, and file preview capabilities are all built-in.

---

## 🚀 Tech Stack

### ⚛️ Frontend

- **Next.js (App Router)** – Full-featured React framework with server-side rendering.
- **Tailwind CSS** – Utility-first styling for responsive and fast UI development.
- **React** – For component-based UI building.

### 🖥️ Backend

- **Next.js API Routes** – Lightweight backend for business logic and APIs.
- **PostgreSQL** – Relational DB used to store user and file metadata.
- **TypeORM (EntitySchema)** – ORM for interacting with the database using entities.
- **NextAuth.js** – Manages secure user login and session handling.
- **Local File Storage** – Files are stored in the `/public/uploads` folder, replacing any cloud dependency.

---

## ✨ Features

### 🔐 Authentication

- User sign up, login, logout
- Secure sessions with NextAuth
- Access control: Only authenticated users can access file/folder dashboard

### 📁 Folder & File Operations

- Create nested folders
- Upload files into specific folders
- Navigate using breadcrumb trail
- Switch between **grid** and **list** views

### 📝 File Management

- Rename & delete files or folders
- Preview file types:
  - **Images (JPG, PNG, WEBP, etc.)**
  - **PDFs** (via browser iframe)

> 🔒 Files are saved inside the `public/uploads` directory and organized per user and folder structure.

### 👤 User-Based Storage

- Isolated files/folders per user
- Ownership checks enforced
- Backend APIs respect user permissions

### 📱 Fully Responsive

- Clean UX with easy navigation and action buttons

---

## ⚙️ Getting Started

### 1. Clone the Repository

````bash
git clone https://FaisalZulfiqarr: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@github.com/FaisalZulfiqarr/googledrive-clone.git
cd googledrive-clone

### 2. Install Dependencies

```bash
npm install
````

### 3. Configure Environment Variables

Rename `.env.sample` file to `.env` and include:

```env
DATABASE_URL=postgres://your_user:your_password@localhost:5432/your_database
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

```

### 4. Initialize the Database

```bash
npm run create:db
```

### 5. Run the App

```bash
npm run dev
```

## 📦 Future Improvements

- Enable drag-and-drop support for uploading files
- Introduce shareable file links and collaborative folder access
- Improve PDF viewing experience using PDF.js or custom embedded viewers
- Add expandable/collapsible folder tree navigation in the sidebar

## 🙋‍♂️ Why These Choices?

- **Next.js App Router** – Chosen for its modern routing system, server components, and streamlined full-stack development support in a single framework.
- **LocalFileStorage** – Files and folders are handled directly on the server using the public/uploads directory, ensuring simplicity and full control without third-party dependencies.
- **PostgreSQL with TypeORM** – A reliable SQL database combined with a flexible, schema-based ORM for handling structured data and complex relationships easily.
- **NextAuth.js** – Provides a secure, session-based authentication system that integrates well with database-backed user management.
- **Tailwind CSS** – Used for its utility-first approach, enabling fast and responsive UI development with minimal custom CSS.
