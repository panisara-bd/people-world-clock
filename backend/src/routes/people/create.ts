import { Request, Response } from 'express';
import { createPerson, findUser } from '../../db';

const ALLOWED_ICONS = ['x', 'y'];

export const createPersonRoute = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization?.replace('Bearer ', '');
  if (!authorization) {
    return res.status(401).json({ message: 'You need to be authenticated' });
  }
  const [username, token] = authorization.split(':');
  const user = await findUser(username);
  if (!user || !user.tokens?.includes(token)) {
    return res.status(401).json({ message: 'You need to be authenticated' });
  }

  const { name, lat, long, icon } = req.body;
  if (
    !name ||
    !lat ||
    !long ||
    !icon ||
    typeof name !== 'string' ||
    typeof lat !== 'string' ||
    typeof long !== 'string' ||
    !ALLOWED_ICONS.includes(icon)
  ) {
    return res
      .status(400)
      .json({ message: 'name, lat, long and icon strings are required' });
  }

  try {
    const person = await createPerson({ username, name, lat, long, icon });
    res.sendStatus(201).json(person);
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
