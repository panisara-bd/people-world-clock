import { Request, Response } from 'express';
import { createUser } from '../../db';
import argon2 from 'argon2';

export const signUpRoute = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    res
      .status(400)
      .json({ message: 'username and password strings are required' });
    return;
  }

  try {
    await createUser({ username, password: await argon2.hash(password) });
    res.status(201).json(null);
  } catch (e) {
    if (
      e instanceof Error &&
      'code' in e &&
      e.name === 'MongoServerError' &&
      e.code === 11000
    ) {
      res.status(400).json({ message: 'username is already registered' });
      return;
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
};
