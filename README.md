# Connectify front-end – React.js Web Application

Connectify is a front-end web application inspired by the core features of modern networking and professional social platforms. The current UI is intentionally based on wireframes for clarity and rapid development; visual styling and branding will be added in future updates.

> **Note:** This frontend project is designed to work seamlessly with the companion backend project [kondim23/connectify-springboot-backend](https://github.com/kondim23/connectify-springboot-backend) (Spring Boot). For a complete experience, clone and run both the backend and frontend repositories.

## 🚀 Features

- User authentication (Sign Up, Log In, Admin access)
- User profiles with editable info, privacy controls, and profile images
- Create, view, and interact with posts (with media attachments)
- Like and comment on posts
- Network: search users, send/accept connection requests
- Jobs: view, post, and request jobs
- Real-time messaging between users
- Notifications for likes, comments, and connection requests
- Admin dashboard for user management
- Responsive layout based on wireframes

## 🛠️ Tech Stack

- **Frontend:** React, React Router, React Bootstrap
- **Styling:** Bootstrap 5, Custom CSS
- **State Management:** React Context API
- **API:** RESTful backend (not included in this repo)

## 📦 Folder Structure

```
src/
  Components/      # Reusable UI components
  pages/           # Main app pages (Home, Profile, Jobs, etc.)
  store/           # Context providers
  App.js           # Main app component
  index.js         # Entry point
  App.css, index.css # Global styles
public/
  index.html       # Main HTML file
  ...
```

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js (v16 or v18 recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kondim23/connectify-reactjs-frontend.git
   cd connectify-reactjs-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   > If you use Node.js v17+, run:
   > ```bash
   > export NODE_OPTIONS=--openssl-legacy-provider
   > npm start
   > ```

## 📝 Usage
- Sign up or log in to your account
- Edit your profile and upload a profile picture
- Create posts, like, and comment
- Search for users and connect
- Explore jobs and send job requests
- Chat with your connections
- View notifications and manage your network

---