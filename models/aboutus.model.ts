import mongoose, {model} from "mongoose";


export type aboutusType = {
   title: string[],
   description: string[],
   images: string[]
}

const aboutusSchema = new mongoose.Schema<aboutusType>({
    title: { 
        type: [String], 
        required: true 
    },
    description: { 
        type: [String], 
        required: true 
    },
    images: { 
        type: [String], 
    },  
})


const aboutusModel = model<aboutusType>("aboutus",aboutusSchema);
export {aboutusModel};