import Fastify from "fastify";
import cors from "@fastify/cors";

import jwtPlugin from "./plugins/jwt";

// Create Fastify instance
const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty"
    }
  }
});

// Register plugins
const registerPlugins = async () => {
  // Enable CORS
  await app.register(cors, {
    origin: true // allow all (for now)
  });

  // JWT plugin
  await app.register(jwtPlugin);
};

// Register routes
const registerRoutes = async () => {
  // Health check route
  app.get("/", async (request, reply) => {
    return {
      status: "success",
      message: "T1 Backend Running 🚀"
    };
  });

  // Future routes will go here
};

// Initialize app
const init = async () => {
  await registerPlugins();
  await registerRoutes();
};

init();

export default app;
