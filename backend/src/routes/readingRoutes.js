import express from "express"

import protectRoute from "../middleware/protectRoute.js"
import { addReading, getLatestReadings } from "../controllers/readingController.js"



const router = express.Router()

router.use(protectRoute)

router.post("/addReading", addReading)
router.get("/latest", getLatestReadings)

export default router