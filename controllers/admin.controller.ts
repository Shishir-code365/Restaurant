//Admin 
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from "../models/admin.model";
const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let passwordHash: string;

  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  const admin = await adminModel.find({});

  if (admin.length > 0) {
    return res.status(403).json({ error: "Admin User already exists!" });
  }

  adminModel.findOne({ email }).then((admin) => {
    if (admin)
      return res.status(403).json({ error: "Admin User already exists!" });

    bcrypt
      .hash(password, 10)
      .then((hash) => {
        passwordHash = hash;
        new adminModel({
          email,
          passwordHash,
        })
          .save()
          .then((savedAdmin) => {
            return res.status(201).json({
              message: "Admin user created successfully!",
              user: savedAdmin,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ error: "Invalid user credentials!" });
  }
  adminModel.findOne({ email: email }).then((admin) => {
    if (!admin) {
      return res.status(422).json({ error: "Admin User not found!" });
    }
    bcrypt
      .compare(password, admin.passwordHash)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.ACCESS_SECRET as string
          );
          res.status(201).json({
            message: "Logged In Successfully!",
            token,
          });
        } else {
          return res.status(403).json({ error: "Invalid password!" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

 export { login, register };
