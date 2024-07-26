import mongoose, { Schema } from "mongoose";

const blogModel = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
}, {timestamps: true})

const blogs = mongoose.model("Blogs", blogModel)

export default blogs