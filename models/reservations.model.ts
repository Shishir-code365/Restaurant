import mongoose,{model} from "mongoose"

type reservationsType = {
    name: String,
    email: String,
    date: Date,
    time: String,
    noOfPersons: Number,
    reservedBy: mongoose.Schema.Types.ObjectId
}

const reservationSchema = new mongoose.Schema<reservationsType>({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true   
    },
    date:{
        type: Date,
        require: true
    },
    time:{
        type: String,
        require: true
    },
    noOfPersons:{
        type: Number,
        require: true
    },
    reservedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},  
{timestamps: true}
)

const reservationModel = model <reservationsType>("reservation", reservationSchema);

export {reservationModel};