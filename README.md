# InfluencerConnect 🌟  
A full-stack MERN (MongoDB, Express, React, Node.js) web app that connects **companies** with **influencers** for campaign collaborations.

---

## 📁 Project Structure

- `frontend/` — React-based UI for influencers and companies  
- `backend/` — Node.js & Express API connected to MongoDB

---

## 📦 Dependencies

Before running the app, make sure you have the following installed:

- **Node.js** (v16 or above recommended)
- **MongoDB** (local or cloud via MongoDB Atlas)
- **npm** 

**Key dependencies include:**

### Backend (`/backend`)
```bash
npm install
```
- `express`
- `mongoose`
- `bcryptjs`
- `cors`
- `express-session`
- `dotenv`

### Frontend (`/frontend`)
```bash
npm install
```
- `axios`
- `react-router-dom`
- `react-scripts`

---

## 🚀 Getting Started
### Option 1: Running from a zipped folder

### Step 1: Unzip the file
Extract it using your file explorer or terminal into a desired directory.

### Step 2: Navigate into Project folders
The app has two main folders:
-backend
-frontend

### Step 3: Install the dependencies
One for the backend:
   cd backend
   npm install

One for the frontend:
   cd frontend
   npm install

### Step 4: Run the App
Start the backend server:
   npm run dev

Start the React frontend:
   npm start

### Step 5: Go to: http://localhost:3000 in your browser.

### OR

### Option 2: Run using Github & Git
### Step 1: Clone the Repository
```bash
git clone https://github.com/huzaifaalam1/InfluencerConnect.git
cd InfluencerConnect
```

### Step 2: Install Dependencies
Run these commands in both folders:

```bash
cd backend
npm install
npm start
```

```bash
cd frontend
npm install
npm start
```

> Backend runs on `http://localhost:5000`  
> Frontend runs on `http://localhost:3000`

---

## 👥 User Roles

There are **two types of users**:  

### ✅ Influencer
- Sign up or log in
- **Browse all campaigns**
- **Apply** using a short form (name, DOB, height, experience, etc.)
- **View & edit profile**, including:
  - Profile picture
  - Bio
  - Interests
  - Additional pictures

### 🏢 Company
- Log in using a company account
- **Create campaigns** (title, budget, dates, etc.)
- **View submitted applications** per campaign — no need to access the database manually
- Delete or manage campaigns from the dashboard

---

## 🔄 Full Interaction Demo Flow

If you're testing locally:

1. **Sign up as an Influencer**
   - Go to `/signup`
   - Choose "Influencer" and submit form
2. **Browse Campaigns**
   - After logging in, view campaigns on the influencer dashboard
3. **Apply to a Campaign**
   - Click “Apply”
   - Submit details like experience and portfolio link
4. **Switch to a Company Account**
   - Log in as a company (already registered or create manually in DB)
   - Navigate to "My Campaigns"
   - Click on a campaign to **see real-time influencer applications**
   - No manual DB checking needed ✅

---

## ✨ Features Summary

- 🔐 Authentication with session management
- 👤 Dynamic Profile Management (Influencer)
  - Editable name, bio, interests
  - Upload profile photo and gallery
- 📝 Campaign Application Form
- 📄 Company Dashboard to track all campaigns and applicants
- 🧹 Clean, responsive UI styled with your custom color palette

---

## ⚠️ Notes

- Ensure MongoDB is running locally or your Atlas URI is set in `.env`
- For image uploads, this app **uses preview URLs only** (not persistent across sessions)
- You may want to add storage support (e.g. Cloudinary) for production

---

## 📫 Contact
For questions or suggestions, feel free to open an issue or contact the developer.
