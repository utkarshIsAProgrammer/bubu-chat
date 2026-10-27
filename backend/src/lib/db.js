import mongoose from "mongoose";

export const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const localFallbackUri = "mongodb://127.0.0.1:27017/chat_db";

  const isPlaceholder = primaryUri && primaryUri.includes("<db_password>");
  const uriToTry = !primaryUri || isPlaceholder ? localFallbackUri : primaryUri;

  if (isPlaceholder) {
    console.warn("⚠️ Warning: MONGODB_URI contains '<db_password>'. Falling back to local MongoDB:", localFallbackUri);
  }

  try {
    const conn = await mongoose.connect(uriToTry, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    if (uriToTry !== localFallbackUri) {
      console.log(`Attempting fallback to local MongoDB: ${localFallbackUri}...`);
      try {
        const fallbackConn = await mongoose.connect(localFallbackUri, {
          serverSelectionTimeoutMS: 3000,
        });
        console.log(`MongoDB connected via fallback: ${fallbackConn.connection.host}`);
        return fallbackConn;
      } catch (fallbackError) {
        console.error("Fallback MongoDB connection also failed:", fallbackError.message);
      }
    }
  }
};
