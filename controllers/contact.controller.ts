
import { Request, Response } from 'express';
import { contactModel } from '../models/contact.model';

const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    const newContact = new contactModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully', newContact });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
};

const getAllContactForms = async (req: Request, res: Response) => {
    try {
      const contactForms = await contactModel.find().sort({ createdAt: -1 });
      res.status(200).json(contactForms);
    } catch (error) {
      console.error('Error fetching contact forms:', error);
      res.status(500).json({ message: 'Failed to fetch contact forms' });
    }
  };

export { submitContactForm,getAllContactForms };
