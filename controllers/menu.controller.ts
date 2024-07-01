import { Request,Response,NextFunction } from "express";
import { adminModel } from "../models/admin.model";
import { menuModel } from "../models/menu.model";


const menuCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { name, price,imageURL,category } = req.body;
      const adminID = req.admin.id; 
      if (!name || !price) {
        return res.status(400).json({
          success: false,
          message: "Name and price are required",
        });
      }

      const admin = await adminModel.findById(adminID);
      if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }

      const menuCreated = await menuModel.create({
        name,
        price,
        createdBy: adminID,
        imageURL,
        category
      });
  
      if (!menuCreated) {
        return res.status(403).json({ success: false, message: "Cannot create menu" });
      }

      res.status(200).json({
        success: true,
        message: "Menu created successfully!",
        menuCreated,
      });
  
    } catch (error) {
      console.error("Error creating menu:", error);
      next(error);
    }
  };

  const menuUpdate = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { name, price, category,imageURL} = req.body;
      const menuID = req.params.menuID;
        // console.log(menuID);
      const updateResult = await menuModel.updateOne(
        { _id: menuID },
        { name, price, category,imageURL}
      );
  
      if (updateResult.modifiedCount > 0) {
        return res
          .status(200)
          .json({ message: "Menu updated successfully", updateResult });
      } else if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: "No changes made" });
      } else {
        return res.status(403).json({ message: "Cannot update menu" });
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating menu" });
    }
  };

  const menuDelete = async (req:any, res:Response, next:NextFunction) => {
    const menuID = req.params.menuID;
    const adminID = req.admin.id; 
  
    try {
  
      const menu = await menuModel.findById(menuID);
  
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
  
      if (menu.createdBy.toString() !== adminID) {
        return res.status(403).json({ message: "You are not authorized to delete this menu" });
      }
  
      await menuModel.findByIdAndDelete(menuID);
  
      return res.status(200).json({ message: "Menu deleted successfully", MenuID: menuID });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json({ message: "An error occurred while deleting menu" });
    }
  };

  const menuAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllMenu = await menuModel.find({}).populate('category');
      if (getAllMenu.length > 0) {
        return res.status(200).json(getAllMenu);
      } else {
        return res.status(404).json({ message: "No menu to show" });
      } 
    } catch (error) {
      console.log("Error: ", error);
      return res.status(403).json({message: "Error"});
    }
  };

  const menubyID =  async (req: Request, res: Response, next: NextFunction) => {  

    const menuID = req.params.id;

    const findMenu = await menuModel.findById(menuID).populate('category');

    if(!findMenu)
      {
        return res.status(400).json({message:"Cannot find menu with that id"})
      }
    return res.status(200).json({message:"Menu:",findMenu})
  }



  export {menuCreate,menuUpdate,menuDelete,menuAll,menubyID};