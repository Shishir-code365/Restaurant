
import mongoose,{model} from "mongoose"

export type categoryType = {
    name:String
}

const categorySchema = new mongoose.Schema<categoryType>({
    name:{
        type: String,
        require: true
    }
},
{ timestamps: true }
)

const categoryModel = model<categoryType>("category",categorySchema);
export {categoryModel};