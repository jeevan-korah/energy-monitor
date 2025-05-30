import mongoose from "mongoose";

const readingSchema = mongoose.Schema({
    deviceId :{type: mongoose.Schema.Types.ObjectId, ref : "Device"},
    voltage:{type: Float32Array, required : true},
    current:{type: Float32Array, required : true},
    power:{type: Float32Array, required : true},
    energy:{type: Float32Array, required : true},
    cost:{type: Float32Array, required : true},
},{
    timestamps: true
})

export default mongoose.model("Reading", readingSchema)