// ─────────────────────────────────────────────────────────────────────────────
// app.js — Express Application Configuration
//
// This file sets up the Express app (NOT the server). It:
//   1. Applies global security middleware (helmet, cors, mongo-sanitize)
//   2. Parses incoming request bodies as JSON
//   3. Registers all API route groups
//   4. Registers the global error handler (must be LAST)
//
// Why separate from index.js?
//   Keeping app config separate from server startup makes the app easier
//   to test — you can import just the app without starting a real server.
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

// Import route modules — each handles a group of related endpoints
const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");
const forgotPasswordRoutes = require("./routes/forgot-password.routes");

// Global error handler — catches any errors thrown by controllers/services
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// ── Security Headers ──────────────────────────────────────────────────────────
// helmet() automatically sets HTTP headers that protect against common attacks:
//   - XSS: sets Content-Security-Policy
//   - Clickjacking: sets X-Frame-Options
//   - MIME sniffing: sets X-Content-Type-Options
//   - And more: https://helmetjs.github.io/
app.use(helmet());

// ── CORS (Cross-Origin Resource Sharing) ─────────────────────────────────────
// Only allow requests from our frontend URL (set in .env.local)
// Without this, browsers would block requests from a different origin
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. "http://localhost:3000"
    credentials: true,              // allow cookies to be sent cross-origin
  })
);

// ── Body Parser ───────────────────────────────────────────────────────────────
// Parse incoming JSON request bodies (makes req.body available)
// limit: "10kb" prevents attackers from sending huge payloads to crash the server
app.use(express.json({ limit: "10kb" }));

// ── NoSQL Injection Prevention ────────────────────────────────────────────────
// Strips out $ and . characters from req.body, req.query, req.params
// This prevents MongoDB operator injection attacks like: { "email": { "$gt": "" } }
app.use(mongoSanitize());

// ── Routes ────────────────────────────────────────────────────────────────────
// Each route group is mounted at a specific base path.
// Express will forward matching requests to the correct router file.
app.use("/api/auth", authRoutes);                       // POST /api/auth/register, /api/auth/login
app.use("/api/notes", notesRoutes);                     // GET/POST/PUT/DELETE /api/notes
app.use("/api/forgot-password", forgotPasswordRoutes);  // POST /api/forgot-password

// ── Global Error Handler ──────────────────────────────────────────────────────
// IMPORTANT: This must be registered AFTER all routes.
// Express identifies error-handling middleware by its 4 parameters: (err, req, res, next)
app.use(errorHandler);

// Export the app so index.js can start the HTTP server with it
module.exports = app;