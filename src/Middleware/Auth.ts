import jwt from 'jsonwebtoken';
import asyncHandler from './../helpers/asyncHandler';

export const verifyToken = asyncHandler(async (req: any, res, next) => {
  let token = ' ';
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log({ token });
  }
  if (!token) {
    res.status(401).json({
      status: 'failed',
      message: 'You are not logged in! Please log in to get access.',
    });
  }
  console.log({secretKey:process.env.JWT_SECRET});
  const verified = jwt.verify(token, 'THIS_is_0321654016545646532_VERY_strong_KEY');
  console.log({ verified });
  if (verified) {
    req.user.verified = verified;
  }
  next();
});
