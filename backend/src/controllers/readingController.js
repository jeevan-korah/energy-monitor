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

export const getLatestReadings = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get all devices for this user with optimized fields
    const devices = await Device.find({ userId })
      .select("_id name")
      .lean();
    
    if (!devices.length) {
      return res.json([]);
    }
    
    // Extract device IDs for bulk query
    const deviceIds = devices.map(device => device._id);
    
    // Get latest readings for all devices in a single aggregation query
    const latestReadings = await Reading.aggregate([
      {
        $match: {
          deviceId: { $in: deviceIds }
        }
      },
      {
        $sort: { deviceId: 1, timestamp: -1 }
      },
      {
        $group: {
          _id: "$deviceId",
          latestReading: { 
            $first: {
              // _id: "$_id",
              // deviceId: "$deviceId",
              timestamp: "$timestamp",
              voltage: "$voltage",
              current: "$current",
              power: "$power",
              energy: "$energy",
              cost: "$cost"
            }
          }
        }
      }
    ]);
    
    // Create a map for O(1) lookup
    const readingsMap = new Map(
      latestReadings.map(item => [
        item._id.toString(), 
        item.latestReading
      ])
    );
    
    // Combine device info with readings
    const results = devices.map(device => ({
      deviceId: device._id,
      name: device.name,
      latestReading: readingsMap.get(device._id.toString()) || null
    }));
    
    res.json(results);
    
  } catch (error) {
    console.error('Error fetching latest readings:', error);
    res.status(500).json({ 
      error: "Failed to fetch latest readings",
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};