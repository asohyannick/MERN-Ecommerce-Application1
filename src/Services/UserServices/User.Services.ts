import User from "../../Models/Users/User.model";
import HttpStatus from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check first if the user already exist
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "User already exist" });
    }
    // save the already existed user
    user = new User(req.body);
    await user.save();
    // create now a new user
    const access_token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res
      .status(HttpStatus.CREATED)
      .json({ message: "User has been created successfully!!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({message: "Something is broken"});
  }
};

export default registerUser;
