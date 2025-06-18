import Device from "../models/Device.js";
import Reading from "../models/Reading.js";

export const addReading = async (req, res) => {
  try {
    const { deviceId, voltage, current, power, energy, cost } = req.body;
    const userId = req.user._id;    
    // Optionally check if the device actually belongs to the user

    const device = await Device.findOne({ _id: deviceId, userId });
    if (!device) {
      return res.status(403).json({ error: "Unauthorized device access" });
    }

    const reading = await Reading.create({
      deviceId,
      voltage,
      current,
      power,
      energy,
      cost,
      timestamp: new Date(),
    });

    res.status(201).json({ message: "Reading stored", reading });
  } catch (err) {
    console.error("Reading insert error:", err);
    res.status(500).json({ error: "Failed to store reading" });
  }
};
