import { Request,Response,NextFunction } from "express"
import { userModel } from "../models/user.model";
import { reservationModel } from "../models/reservations.model";


const reservation = async (req:any,res:Response, next:NextFunction)=>{
    const userID = req.user.id;

    const user = await userModel.findById(userID);

    if(!user)
        {
            return res.status(400).json("Cannot find the user")
        }
    
    const {name,email,date,time,noOfPersons} = req.body;

    const makeReservation = await reservationModel.create({
        name,
        email,
        date,
        time,
        noOfPersons,
        reservedBy: userID
    });
    if(!makeReservation)
        {
            return res.status(403).json("Cannot make reservation")
        }
    return res.status(200).json("Reservation made successfully!!")
}

export {reservation};