//events
import { Request,Response,NextFunction, } from "express";
import { eventModel } from "../models/events.model";

const createEventPromotion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, date, imageUrl, details } = req.body;

        const newEventPromotion = new eventModel({
            title,
            description,
            date,
            imageUrl,
            details
        });

        await newEventPromotion.save();

        res.status(201).json({ message: 'Event or Promotion created successfully', newEventPromotion });
    } catch (error) {
        console.error('Error creating Event or Promotion:', error);
        res.status(500).json({ message: 'An error occurred while creating Event or Promotion', error });
    }
};

const getAllEventPromotions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventsPromotions = await eventModel.find();
        res.status(200).json(eventsPromotions);
    } catch (error) {
        console.error('Error fetching Events and Promotions:', error);
        res.status(500).json({ message: 'An error occurred while fetching Events and Promotions', error });
    }
};

const getEventPromotionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const eventPromotion = await eventModel.findById(id);

        if (!eventPromotion) {
            return res.status(404).json({ message: 'Event or Promotion not found' });
        }

        res.status(200).json(eventPromotion);
    } catch (error) {
        console.error('Error fetching Event or Promotion by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching Event or Promotion', error });
    }
};

const eventUpdate = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { title, description, date, imageUrl, details } = req.body;
      const eventID = req.params.id;

      const event = await eventModel.findById(eventID);
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      const updateResult = await eventModel.updateOne(
        { _id: eventID },
        { title, description, date, imageUrl, details}
      );
  
      if (updateResult.modifiedCount > 0) {
        return res
          .status(200)
          .json({ message: "Event updated successfully", updateResult });
      } else if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: "No changes made" });
      } else {
        return res.status(403).json({ message: "Cannot update event" });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating event" });
    }
  };

  const eventDelete = async (req:any, res:Response, next:NextFunction) => {
    const eventID = req.params.id;
  
    try {
  
      const event = await eventModel.findById(eventID);
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      await eventModel.findByIdAndDelete(eventID);
  
      return res.status(200).json({ message: "Event deleted successfully", eventID: eventID });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json({ message: "An error occurred while deleting event" });
    }
  };

export {createEventPromotion,getAllEventPromotions,getEventPromotionById,eventUpdate,eventDelete}
