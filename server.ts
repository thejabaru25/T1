import "./config/env";

import app from "./app";
import prisma from "./config/db";

const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

// Graceful shutdown (VERY IMPORTANT for production)
const shutdown = async () => {
  try {
    console.log("🛑 Shutting down server...");

    await prisma.$disconnect();
    await app.close();

    console.log("✅ Server closed cleanly");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during shutdown:", err);
    process.exit(1);
  }
};

// Handle termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start server
const start = async () => {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log("✅ Database connected");

    // Start Fastify server
    await app.listen({
      port: PORT,
      host: HOST
    });

    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

start();
