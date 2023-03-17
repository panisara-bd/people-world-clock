import { Request, Response } from 'express';
import { findUser, saveToken } from '../../db';
import argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

export const logInRoute = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return res
      .status(400)
      .json({ message: 'username and password strings are required' });
  }

  const user = await findUser(username);
  if (user && (await argon2.verify(user.password, password))) {
    const token = uuidv4();
    await saveToken(username, token);
    return res.status(200).json({ token: `${username}:${token}` });
  } else {
    return res.status(401).json({ message: 'Wrong username or password' });
  }
};
