import app from "./src/App.js";
import connectDB from "./src/Config/Database.js";
import logger from "./src/utils/logger.js";
import config from "./src/Config/Index.js";


const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.server.port, () => {
      logger.info(
        `Server running on port ${config.server.port} [${config.server.env}]`
      );
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();