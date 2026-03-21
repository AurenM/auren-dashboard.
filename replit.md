# Auren AI Zero

## Overview
A React-based Learning Management System (LMS) / Dashboard application with a dark-themed UI. Built for tracking leads, consultations, learning progress, and group activities. The UI is in Portuguese.

## Tech Stack
- **Frontend:** React 18 + Vite 6
- **Styling:** Tailwind CSS 3
- **Charts:** Recharts
- **Icons:** Lucide React
- **Package Manager:** npm

## Project Structure
```
src/
  main.jsx          # App entry point
  App.jsx           # Root component
  index.css         # Global styles + Tailwind directives
  components/       # Dashboard UI components
    CalendarCard.jsx
    ConsultationCard.jsx
    CourseCard.jsx
    Header.jsx
    HomeworkProgressCard.jsx
    InboxCard.jsx
    LearningProgressCard.jsx
    MyGroupCard.jsx
    Sidebar.jsx
  data/
    dashboardData.js  # Mock data for dashboard
```

## Dev Setup
- Runs on port 5000 via `npm run dev`
- Vite configured with `host: "0.0.0.0"` and `allowedHosts: true` for Replit proxy compatibility

## Deployment
- Target: Static site
- Build command: `npm run build`
- Public directory: `dist`
