import { Router } from "express";
import * as AuthController from "../Controllers/Auth.controller.js";

const authRouter = Router();

/**
 * @route POST api/auth/register
 */
authRouter.post("/register", AuthController.register);

/**
 * @route POST api/auth/login
 */
authRouter.post("/login", AuthController.login);

/**
 * @route GET api/auth/getMe
 */
authRouter.get("/me", AuthController.getMe);

/**
 * @route GET api/auth/refresh-token
 */
authRouter.get("/refresh-token", AuthController.refreshToken);



export default authRouter