import { Request,Response,NextFunction } from "express"
import { userModel } from "../models/user.model";
import { reservationModel } from "../models/reservations.model";
import { adminModel } from "../models/admin.model";


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

const getAllReservation = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const reservations = await reservationModel.find({});
    if(reservations.length>0)
        {
            return res.status(200).json({reservations})
        }
    return res.status(403).json("No reservations to show")
    }
    catch(error)
    {
        return res.status(404).json("error")
    }
}

const deleteReservation  = async (req:any, res:Response, next:NextFunction)=>{
    const userID = req.user.id;
    const reservationID = req.params.id;

    const user = await userModel.findById(userID);

    if(!user)
        {
            return res.status(404).json("Cannot find user")
        }
    
    const checkReservation = await reservationModel.findById(reservationID);
    if(!checkReservation)
        {
            return res.status(404).json("Cannot find reservation")
        }
    // console.log(checkReservation.reservedBy.toString());
    if(checkReservation.reservedBy.toString()!==userID)
        {
            return res.status(404).json("Not authorized to delete the reservation!!!")
        }
    if(checkReservation.approved)
        {
            return res.status(403).json({ message: "Cannot delete an approved reservation" });
        }
    const reservationDelete = await reservationModel.findByIdAndDelete(reservationID);
    if(!reservationDelete)
        {
            return res.status(404).json("Cannot delete reservation")
        }
    return res.status(200).json({message:"Reservation Deleted Successfully!!",reservationID});

}

const adminApprove = async(req:any,res:Response,next:NextFunction)=>{
    const adminID = req.admin.id;
    const reservationID = req.params.id;
    const admin = await adminModel.findById(adminID);
    if(!admin)
        {
            return res.status(404).json("Admin doesnot exist!!")
        }
    
        const reservation = await reservationModel.findById(reservationID)
        if(!reservation)
            {
                return res.status(404).json("Reservation not found")
            }
    
        reservation.approved = true;
        await reservation.save();

        return res.status(200).json({ message: "Reservation approved", reservation });
        
    
}

const approvedReservations = async (req: Request,res:Response,next:NextFunction)=>{
    try {
        const approvedReservations = await reservationModel.find({ approved: true });
        res.status(200).json(approvedReservations);
      } catch (error) {
        console.error("Error retrieving approved reservations:", error);
        res.status(500).json({ message: "An error occurred while retrieving approved reservations" });
      }
}

const updateReservation = async (req:any,res:Response,next:NextFunction)=>{
    try{
        const reservationID = req.params.id;
        const userID = req.user.id;
        const {name,email,date,time,noOfPersons} = req.body;
        const user = await userModel.findById(userID);

        if(!user)
            {
                return res.status(404).json("Cannot find user")
            }
        
        const checkReservation = await reservationModel.findById(reservationID);
        if(!checkReservation)
            {
                return res.status(404).json("Cannot find reservation")
            }
        if(checkReservation.reservedBy.toString()!==userID)
            {
                return res.status(404).json("Not authorized to update the reservation!!!")
            }
        if(checkReservation.approved)
            {
                return res.status(403).json({ message: "Cannot update an approved reservation" });
            }

        const reservationUpdate = await reservationModel.updateOne(
            {_id: reservationID},
            {name,email,date,time, noOfPersons}
        );
        if(reservationUpdate.modifiedCount>0)
            {
                return res.status(200).json({message: "Reservation updated",reservationUpdate})
            }
            else if (reservationUpdate.modifiedCount === 0) {
                return res.status(404).json({ message: "No changes made" });}

        return res.status(404).json("Cannot update reservation")
    }
    catch (error)
    {
        console.error("Error", error);
        res.status(500).json({ message: "An error occurred" });
    }
}

export {reservation, getAllReservation,deleteReservation,adminApprove,approvedReservations,updateReservation};