//authorization
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

const tokenExtractor = (req: any, res: Response, next: NextFunction) => {
  const token = req.get("authorization");

  if (!token) {
    return res.status(498).json({
      message: "token not found!",
    });
  }

  req.token = token.substring(7);
  next();
};

const adminScope = (req: any, res: Response, next: NextFunction) => {
  let id: string;
  const { role, id: adminId } = jwt.verify(
    req.token,
    process.env.ACCESS_SECRET as string
  ) as {
    role: string;
    id: string;
  };
  id = adminId;
  if (role !== "admin") {
    return res.status(401).json({
      message: "Insufficient scope!",
    });
  }
  req.admin = { id };
  next();
};

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  let id: string;
  try {
    let { id: userId } = jwt.verify(
      req.token,
      process.env.ACCESS_SECRET as string
    ) as {
      id: string;
    };
    id = userId;
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid Token!" });
  }
  // console.log(id);
  if (!id) {
    return res.status(401).json({
      message: "Invalid Token!",
    });
  }
  req.user = { id };
  next();
};

export { tokenExtractor, adminScope, verifyToken};
