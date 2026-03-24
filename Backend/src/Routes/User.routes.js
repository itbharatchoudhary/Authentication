import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Protected: any authenticated user
router.get("/me", authenticate, userController.getMe);

// Admin only
router.get("/", authenticate, authorize("admin"), userController.getAllUsers);
router.delete("/:id", authenticate, authorize("admin"), userController.deleteUser);

export default router;