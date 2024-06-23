import mongoose, { model } from "mongoose";

type menuType = {
    name:String,
    price: Number,
    createdBy: String
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
    createdBy:{
        type: String,
    }

},
{timestamps: true}
)

const menuModel = model<menuType>("menu",menuSchema);
export  {menuModel};