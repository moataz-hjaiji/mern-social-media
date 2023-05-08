import jwt from 'jsonwebtoken';
import asyncHandler from './../helpers/asyncHandler';

export const verifyToken = asyncHandler(async (req: any, res, next) => {
  let token = ' ';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401).json({
      status: 'failed',
      message: 'You are not logged in! Please log in to get access.',
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  req.user = decoded;
  next();
});
