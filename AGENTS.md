# AGENTS.md

## Project Context

This is a standalone, full-stack application. All Base44 integrations have been completely removed. Maintain this standalone, local-first architecture when editing the codebase.

## Key Abstractions

- `src/`: React frontend application source.
- `backend/`: Node.js Express backend application source.
- `backend/config/db.js`: Mongoose connection configuration.
- `backend/models/`: Mongoose schemas.
- `backend/controllers/`: Route controller handlers.
- `backend/routes/`: Route mappings.
- `backend/middleware/`: JWT verification and access controls.

## Working Notes

- Use `npm run dev` to start both the Express backend (port 5001) and Vite frontend (port 5173) concurrently.
- Run `node backend/seed.js` to seed/reset the local MongoDB instance.
- Before committing or releasing changes, run `npm run build` to confirm Vite production bundling compiles successfully.
