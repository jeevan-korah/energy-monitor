import express from "express"
import { handleRegister } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", handleRegister)

export default router