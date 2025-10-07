# ✨ PAJ App React

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-purple.svg)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

A modern React-based web application for managing jewellery inventory, built with TypeScript and Vite. Features a sleek admin dashboard, secure authentication, and responsive design.

## 📋 Table of Contents

- [⚡ Quick Start](#-quick-start)
- [🚀 Features](#-features)
- [🎥 Demo](#-demo)
- [🛠️ Tech Stack](#-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🛠️ Installation](#-installation)
- [🚀 Running Locally](#-running-locally)
- [🏗️ Building for Production](#-building-for-production)
- [🐳 Docker](#-docker)
- [🔍 Linting](#-linting)
- [📂 Project Structure](#-project-structure)
- [📜 Scripts](#-scripts)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

- 🔐 **User Authentication & Authorization** - Secure login system
- 📊 **Admin Dashboard** - Comprehensive inventory management
- 💎 **Jewellery Management** - Add, edit, and manage jewellery items
- 🏷️ **Material & Category Management** - Organize inventory efficiently
- 🖼️ **Image Carousel** - Beautiful product display
- 📱 **Responsive Design** - Works on all devices with Material-UI
- 🛡️ **Protected Routes** - Secure access control

## 🎥 Demo

![PAJ App Screenshot](https://via.placeholder.com/800x400?text=PAJ+App+Screenshot)

*Add a screenshot of your application here*

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Frontend** | React | 19 |
| **Language** | TypeScript | 5.8+ |
| **Build Tool** | Vite | 6.0+ |
| **UI Library** | Material-UI (MUI) | 7.3+ |
| **Routing** | React Router DOM | 7.8+ |
| **HTTP Client** | Axios | 1.12+ |
| **Notifications** | React Toastify | 11.0+ |
| **Image Carousel** | React Responsive Carousel | 3.2+ |
| **Styling** | Emotion (CSS-in-JS) | 11.14+ |

## ⚡ Quick Start

```bash
git clone <repository-url>
cd raj-react-app
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 📋 Prerequisites

- 🟢 Node.js (version 18 or higher)
- 📦 npm or yarn

## 🛠️ Installation

1. 📥 Clone the repository:
   ```bash
   git clone <repository-url>
   cd raj-react-app
   ```

2. 📦 Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Running Locally

To start the development server:

```bash
npm run dev
```

🌐 The application will be available at `http://localhost:5173`.

## 🏗️ Building for Production

To build the application for production:

```bash
npm run build
```

📁 The built files will be in the `dist` directory.

## 👀 Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 🐳 Docker

### 🏗️ Building the Docker Image

```bash
docker build -t paj-app-react .
```

### ▶️ Running the Docker Container

```bash
docker run -p 80:80 paj-app-react
```

🌐 The application will be available at `http://localhost`.

## 🔍 Linting

To run ESLint:

```bash
npm run lint
```

## 📂 Project Structure

```
src/
├── components/
│   ├── common/          # 🔄 Reusable components
│   ├── pages/           # 📄 Page components
│   └── admin/           # 👑 Admin-specific components
├── contexts/            # 🔄 React contexts
├── layout/              # 🎨 Layout components
├── services/            # 🌐 API services
├── constants/           # 📊 Application constants
└── assets/              # 🖼️ Static assets
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server |
| `npm run build` | 🏗️ Build for production |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | 🔍 Run ESLint |

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. 🔧 Make your changes
4. ✅ Run tests and linting
5. 📤 Submit a pull request

## 📄 License

This project is private and proprietary.
