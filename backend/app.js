const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.use(errorHandler);

module.exports = app;