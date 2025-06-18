import express from "express"

import protectRoute from "../middleware/protectRoute.js"
import { addDevice, getAllDevice } from "../controllers/deviceController.js"


const router = express.Router()

router.use(protectRoute)

router.post("/addDevice", addDevice)
router.get("/getDevice", getAllDevice)

export default router