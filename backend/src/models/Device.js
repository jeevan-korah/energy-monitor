import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
    name: {type : String, required: true},
},{
    timestamps: true
})

export default mongoose.model("Device", deviceSchema)
