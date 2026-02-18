//Review Model
import mongoose, { model } from "mongoose";
export type reviewType = {
    firstName: String,
    lastName: String,
    star: Number,
    message: String,
    createdBy : mongoose.Schema.Types.ObjectId
};

const reviewSchema = new mongoose.Schema<reviewType>({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    star:{
        type: Number,
        require: true,
        min: 1, max: 5
    },
    message:{
        type: String,
        require: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
    }
},
{timestamps: true},
)

const reviewModel =  model <reviewType>("review",reviewSchema);

export {reviewModel};