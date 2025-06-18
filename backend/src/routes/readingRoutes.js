import express from "express"

import protectRoute from "../middleware/protectRoute.js"
import { addReading } from "../controllers/readingController.js"



const router = express.Router()

router.use(protectRoute)

router.post("/addReading", addReading)

export default router