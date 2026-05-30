
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");
const forgotPasswordRoutes = require("./routes/forgot-password.routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true,              
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

const connectDB = require("./config/db");
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes);                       
app.use("/api/notes", notesRoutes);                     
app.use("/api/forgot-password", forgotPasswordRoutes);  

app.use(errorHandler);

module.exports = app;