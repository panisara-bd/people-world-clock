import { Request, Response } from 'express';
import { findUser, deletePerson } from '../../db';

export const deletePersonRoute = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization?.replace('Bearer ', '');
  if (!authorization) {
    return res.status(401).json({ message: 'You need to be authenticated' });
  }
  const [username, token] = authorization.split(':');
  const user = await findUser(username);
  if (!user || !user.tokens?.includes(token)) {
    return res.status(401).json({ message: 'You need to be authenticated' });
  }

  const id = req.params.id;
  try {
    await deletePerson(username, id);
    res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error && e.name === 'BSONError') {
      return res.status(400).json({ message: 'Invalid person id' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
