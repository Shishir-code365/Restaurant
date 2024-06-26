import mongoose, { model } from "mongoose";

type menuType = {
    name:String,
    price: Number,
    createdBy: String,
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