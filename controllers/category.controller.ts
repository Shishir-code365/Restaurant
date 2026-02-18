//Category
import {Request,Response,NextFunction} from 'express';
import { categoryModel } from '../models/category.model';

const createCategory = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
    
            const newCategory = new categoryModel({
                name,
            });
    
            await newCategory.save();
    
            res.status(201).json({ message: 'Category created successfully', newCategory });
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ message: 'Failed to create category' });
        }}

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Failed to fetch category' });
    }
};

const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

         const findCategory = await categoryModel.findById(id);
         if(!findCategory){
             return res.status(404).json({message:"Category not found"});
         }       
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not updated' });
        }
        res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category' });
    }
};

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};



export {createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory}