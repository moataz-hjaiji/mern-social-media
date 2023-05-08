import { Request as ExpressRequest, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from './../helpers/asyncHandler';
import UserRepo from './../db/repository/user';
import userModel from './../db/repository/user';
import { generateToken } from './../helpers/generateToken';

interface Request extends ExpressRequest {
  user?: userModel;
}
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      status: 'failed',
      message: 'Please provide name ,  email and password!',
    });
  }
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = await UserRepo.createUser({
    name,
    email,
    password: passwordHash,
  });
  const token = generateToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserRepo.findByObj({ email });

  if (!user || !user.password) {
    return res.status(400).json({
      status: 'failed',
      message: 'email or password is invalid',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid credentials',
    });
  }
  const token = jwt.sign(
    { id: user._id },
    'THIS_is_0321654016545646532_VERY_strong_KEY' as string,
    { expiresIn: '2d' }
  );
  req.user = user;
  res.status(200).json({
    status: 'success',
    token,
    data: { user: user },
  });
});
