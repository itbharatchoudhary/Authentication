import { Router } from "express";
import * as AuthController from "../Controllers/Auth.controller.js";

const authRouter = Router();

/**
 * @route POST api/auth/register
 */
authRouter.post("/register", AuthController.register);

export default authRouter