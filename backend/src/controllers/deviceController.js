import Device from "../models/Device.js";

export const addDevice = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    const newDevice = new Device({
      userId,
      name,
    });
    await newDevice.save();

    return res
      .status(201)
      .json({ message: "New device added", device: newDevice });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error, event could not be created",
    });
  }
};

export const getAllDevice = async (req,res) =>{
    const userId = req.user._id;
    try {
      const devices = await Device.find({userId}).select("name")
      console.log(devices)
      res.status(201).json(devices);
    } catch (error) {
      res.status(500).json({message : error.message});
      
      
    }
}
