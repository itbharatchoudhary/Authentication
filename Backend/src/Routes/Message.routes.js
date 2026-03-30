import { Router } from "express";
import {
  createMessage,
  getAllMessages,
  getMyMessages,
  toggleLike,
} from "../Controllers/Message.controller.js";

import { authenticate } from "../Middleware/Auth.middleware.js"; // your auth middleware

const router = Router();

router.post("/", authenticate, createMessage);
router.get("/", authenticate, getAllMessages);
router.get("/my", authenticate, getMyMessages);
router.post("/:id/like", authenticate, toggleLike);

export default router;