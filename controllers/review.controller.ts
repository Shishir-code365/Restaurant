import { Request,Response,NextFunction } from "express";
import { reviewModel } from "../models/review.model";


const reviewCreate = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { firstName,lastName,star,message } = req.body;
        const userID = req.user.id

      const reviewCreated = await reviewModel.create({
        firstName,
        lastName,
        star,
        message,
        createdBy: userID
      });
  
      if (!reviewCreated) {
        return res.status(403).json({ success: false, message: "Cannot create review" });
      }

      res.status(200).json({
        success: true,
        message: "Review created successfully!",
        reviewCreated,
      });
  
    } catch (error) {
      console.error("Error creating review:", error);
      next(error);
    }
  };

  const getAllReviews = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const reviews = await reviewModel.find().sort({ createdAt: -1 });
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
      res.status(500).json({ message: 'Failed to fetch reviews' });
    }
  };

  const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id;
        const review = await reviewModel.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'An error occurred while fetching the review' });
    }
};

const updateReview = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { firstName,lastName,star,message} = req.body;
      const reviewID = req.params.id;
      const userID = req.user.id;

      const findReview = await reviewModel.findById(reviewID)
      if(!findReview)
        {
            return res.status(404).json("No review with that id exists!!")
        }
        if (findReview.createdBy.toString() !== userID) {
            return res.status(403).json({ message: 'You are not authorized to update this review' });
        }

      const updateResult = await reviewModel.updateOne(
        { _id: reviewID },
        { firstName,lastName,star,message}
      );
  
      if (updateResult.modifiedCount > 0) {
        return res
          .status(200)
          .json({ message: "Review updated successfully", updateResult });
      } else if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: "No changes made" });
      } else {
        return res.status(403).json({ message: "Cannot update review" });
      }
    } catch (error) {
      console.error("Error updating review:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating review" });
    }
  };

  const deleteReview  = async (req:any, res:Response, next:NextFunction)=>{
    const userID = req.user.id;
    const reviewID = req.params.id;

    const checkReview = await reviewModel.findById(reviewID);
    if(!checkReview)
        {
            return res.status(404).json("Cannot find review")
        }

    if(checkReview.createdBy.toString()!==userID)
        {
            return res.status(404).json("Not authorized to delete the review!!!")
        }

    const reviewDelete = await reviewModel.findByIdAndDelete(reviewID);
    if(!reviewDelete)
        {
            return res.status(404).json("Cannot delete review")
        }
    return res.status(200).json({message:"Review Deleted Successfully!!",reviewID});

}

export {reviewCreate, getAllReviews,getReviewById,updateReview,deleteReview};