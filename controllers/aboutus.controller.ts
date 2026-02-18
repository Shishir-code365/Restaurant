//About us
import { Request,Response,NextFunction } from "express";
import { aboutusModel } from "../models/aboutus.model";



const aboutusCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
      const existingAboutUs = await aboutusModel.findOne();

    if (existingAboutUs) {
      return res.status(400).json({ success: false, message: "About Us entry already exists" });
    }

      const { title, description, images } = req.body;

      const aboutusCreated = await aboutusModel.create({
        title,
        description,
        images,
      });
  
      if (!aboutusCreated) {
        return res.status(403).json({ success: false, message: "Cannot create aboutus" });
      }

      res.status(200).json({
        success: true,
        message: "About Us created successfully!",
        aboutusCreated,
      });
  
    } catch (error) {
      console.error("Error creating about us:", error);
      next(error);
    }
  };

  const aboutusUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { titleIndex, title, descriptionIndex, description, imageIndex, image } = req.body;

      if ((title !== undefined && titleIndex === undefined) ||
          (description !== undefined && descriptionIndex === undefined) ||
          (image !== undefined && imageIndex === undefined)) {
        return res.status(400).json({ success: false, message: "Both index and value are required for update" });
      }

      const aboutusEntry = await aboutusModel.findById(id);
  
      if (!aboutusEntry) {
        return res.status(404).json({ success: false, message: "About Us entry not found" });
      }

      if (titleIndex !== undefined && title !== undefined) {
        if (aboutusEntry.title && aboutusEntry.title.length > titleIndex) {
          aboutusEntry.title[titleIndex] = title;
        } else {
          return res.status(400).json({ success: false, message: "Invalid title index" });
        }
      }

      if (descriptionIndex !== undefined && description !== undefined) {
        if (aboutusEntry.description && aboutusEntry.description.length > descriptionIndex) {
          aboutusEntry.description[descriptionIndex] = description;
        } else {
          return res.status(400).json({ success: false, message: "Invalid description index" });
        }
      }

      if (imageIndex !== undefined && image !== undefined) {
        if (aboutusEntry.images && aboutusEntry.images.length > imageIndex) {
          aboutusEntry.images[imageIndex] = image;
        } else {
          return res.status(400).json({ success: false, message: "Invalid image index" });
        }
      }

      const aboutusUpdated = await aboutusEntry.save();
  
      res.status(200).json({
        success: true,
        message: "About Us updated successfully!",
        aboutusUpdated,
      });
    } catch (error) {
      console.error("Error updating about us entry:", error);
      next(error);
    }
  };
  
  
  const getAboutUs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aboutusEntries = await aboutusModel.find();
      res.status(200).json({
        success: true,
        aboutusEntries,
      });
    } catch (error) {
      console.error("Error reading about us entries:", error);
      next(error);
    }
  };

const aboutusDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aboutusEntry = await aboutusModel.deleteOne();
  
      if (!aboutusEntry) {
        return res.status(404).json({ success: false, message: "About Us entry not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "About Us entry deleted successfully!",
        aboutusEntry,
      });
    } catch (error) {
      console.error("Error deleting about us entry:", error);
      next(error);
    }
  };

  export {aboutusCreate,aboutusUpdate,getAboutUs,aboutusDelete};