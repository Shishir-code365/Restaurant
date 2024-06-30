import mongoose, { Schema, model } from "mongoose";
import { categoryModel } from "./category.model";
type menuType = {
    name:String,
    price: Number,
    createdBy: String,
    category: mongoose.Schema.Types.ObjectId ,
    imageURL: String
}
const menuSchema = new mongoose.Schema<menuType>({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "category",
         required: true 
        },
    imageURL:{
        type: String
    },
    createdBy:{
        type: String,
    }

},
{timestamps: true}
)

const menuModel = model<menuType>("menu",menuSchema);
export  {menuModel};