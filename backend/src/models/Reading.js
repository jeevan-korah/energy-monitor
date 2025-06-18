import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  timestamp: { type: Date, default: Date.now },
  voltage: { type: Number, required: true },
  current: { type: Number, required: true },
  power: { type: Number, required: true },
  energy: { type: Number, required: true },
  cost: { type: Number, required: true }
}, {
  versionKey: false
});

// Use existing time-series collection called "readings"
export default mongoose.model("Reading", readingSchema, "readings");
