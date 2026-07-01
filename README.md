# MERN Task Tracker

A full-stack task tracker built for the COLL-EDGE CONNECT technical assignment.

## Features

- Create, view, update, and delete tasks
- REST API with Express and MongoDB/Mongoose
- Required-field validation on frontend and backend
- Responsive React UI with dynamic updates
- Filtering by status/priority, search, and sorting
- Toast-style notifications
- Environment-variable based configuration

## Project Structure

```text
client/   React + Vite frontend
server/   Node.js + Express + MongoDB backend
```

## Local Setup

1. Install dependencies:

   ```bash
   npm run install:all
   ```

2. Configure backend:

   ```bash
   cp server/.env.example server/.env
   ```

   Set `MONGODB_URI` to your local MongoDB or MongoDB Atlas connection string.

3. Configure frontend:

   ```bash
   cp client/.env.example client/.env
   ```

4. Run both apps:

   ```bash
   npm run dev
   ```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## Deployment Notes

- Railway can deploy from the repository root using the included `railway.json`.
- Set these Railway service variables for the backend:
  - `MONGODB_URI`: your MongoDB Atlas connection string
  - `CLIENT_URL`: your deployed frontend URL, or `*` while testing
  - `PORT`: Railway usually injects this automatically
- If you override Railway commands manually, use:
  - Build command: `npm --prefix server ci`
  - Start command: `npm --prefix server start`
- Deploy `server/` on Render, Railway, or Cyclic with `MONGODB_URI`, `CLIENT_URL`, and `PORT`.
- Deploy `client/` on Vercel or Netlify with `VITE_API_URL` pointing to the deployed backend URL plus `/api`.
