# SQL Practice App

This is a React application built with Vite for practicing SQL. It runs entirely in the browser using [Alasql](https://github.com/agershun/alasql).

## Features
- Interactive SQL Editor
- Pre-loaded 'Students' database
- 12+ Practice Exercises provided in the sidebar
- Real-time results
- Modern, clean UI

## Project Structure
- `src/App.tsx`: Main application logic.
- `src/data.ts`: Contains the `Students` sample data and the list of exercises.
- `src/index.css`: Global styles (Vanilla CSS + modern variables).
- `package.json`: Dependencies (React, Alasql, Lucide Icons).

## How to Run Locally
1. Open terminal in this directory (`e:\individual project\SQL_Practice`).
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the link shown in terminal (usually `http://localhost:5173`).

## How to Deploy to Vercel
1. Creates a GitHub repository and push this code.
2. Go to [Vercel Dashboard](https://vercel.com).
3. Click "Add New Project" -> Import from GitHub.
4. Select your repository.
5. **Important**: In "Framework Preset", it should auto-detect "Vite".
6. **Root Directory**: Leave it as `./` (default).
7. Click **Deploy**.

## Modifying Data
To change the sample data or add more exercises, edit `src/data.ts`.
