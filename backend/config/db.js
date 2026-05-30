
const mongoose = require("mongoose");

if (!process.env.MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

if (!global.mongooseRegistered) {
  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error event:", err.message);
  });
  global.mongooseRegistered = true;
}

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    const opts = {
      bufferCommands: false, 
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
      console.log("MongoDB Connected");
      return mongooseInstance;
    });
  } else {
    console.log("MongoDB connection promise already in progress, awaiting...");
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    cached.promise = null;
    cached.conn = null;
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;