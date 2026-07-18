import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();
