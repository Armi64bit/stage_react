import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SignUpBody {
  email?: string;
  password?: string;
  username?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

// Generate JWT token
const generateToken = (payload: any, expiresIn: string): string => {
  return jwt.sign(payload, 'accessTokenSecret', { expiresIn });
};

export const signUp: RequestHandler<unknown, unknown, SignUpBody> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Missing fields");
    }

    const existingUsername = await UserModel.findOne({ username: username }).exec();
    if (existingUsername) {
      throw createHttpError(409, "Username taken");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "A user with this Email already exists. Please login instead");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    const accessToken = generateToken({ userId: newUser._id }, '15m');

    const refreshToken = generateToken({ userId: newUser._id }, '7d');

    res.status(201).json({ user: newUser, tokens: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<unknown, unknown, LoginBody> = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    if (!email || !password) {
      throw new createHttpError.BadRequest("Missing email or password");
    }

    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      throw new createHttpError.Unauthorized("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new createHttpError.Unauthorized("Invalid email or password");
    }

    // Generate access token
    const accessToken = generateToken({ userId: user._id }, '15m');

    // Generate refresh token
    const refreshToken = generateToken({ userId: user._id }, '7d');

    res.json({ user, tokens: { accessToken, refreshToken } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
  
  export const getUserByUsername: RequestHandler = async (req, res, next) => {
    const username = req.params.username;
  
    try {
      const user = await UserModel.findOne({ username }).exec();
  
      if (!user) {
        throw createHttpError(404, "User not found");
      }
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };