import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

const saltRounds = 10;

export default async (req: Request, res: Response, next: NextFunction) => {
  let data = req.body;
  let errors = [];

  if (!data.password) {
    errors.push('The password is missing.');
  } else {
    data.password = await bcrypt.hash(data.password, saltRounds);
  }

  if (errors.length > 0) {
    return res.status(422).json({ hasError: 1, error: errors.toString() });
  }
  next();
};
