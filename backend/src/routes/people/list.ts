import { Request, Response } from 'express';
import { listPeople, findUser } from '../../db';

export const listPeopleRoute = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization?.replace('Bearer ', '');
  if (!authorization) {
    return res.status(401).json({ message: 'You need to be authenticated' });
  }
  const [username, token] = authorization.split(':');
  const user = await findUser(username);
  if (!user || !user.tokens?.includes(token)) {
    return res.status(401).json({ message: 'You need to be authenticated' });
  }

  const people = await listPeople(username);
  return res.status(200).json(people);
};
