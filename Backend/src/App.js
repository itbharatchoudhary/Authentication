import express from "express";
import morgan from "morgan";
import authRouter from "./Routes/User.routes.js";

const App = express();

App.use(express.json());
App.use(morgan("dev"))

App.use("/api/auth", authRouter);

export default App;