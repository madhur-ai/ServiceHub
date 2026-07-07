import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Load app AFTER dotenv.config()
    const { default: app } = await import("./app.js");

    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

startServer();