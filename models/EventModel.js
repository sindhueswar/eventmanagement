import mongoose from "mongoose";


const EventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}, { timestamps: true })



const Event = mongoose.model("Event", EventSchema)

export default Event