//Event Model
import mongoose, {model} from "mongoose";

export type eventType = {
    title: string;
    description: string;
    date: Date;
    imageUrl: string;
    details: string;
}

const eventSchema = new mongoose.Schema<eventType>({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true },
    imageUrl: {
         type: String, 
          },
    details: { 
        type: String, 
        required: true 
    },
}, { timestamps: true }
)

const eventModel = model <eventType>("event",eventSchema);

export {eventModel};