import { Request, Response } from 'express';
import { createPerson, findUser } from '../../db';

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

  const { name, city, country, timeZoneId } = req.body;
  if (
    !name ||
    !city ||
    !country ||
    !timeZoneId ||
    typeof name !== 'string' ||
    typeof city !== 'string' ||
    typeof country !== 'string' ||
    typeof timeZoneId !== 'string'
  ) {
    return res
      .status(400)
      .json({
        message: 'name, city, country, and timeZoneId strings are required',
      });
  }

  const person = await createPerson({
    username,
    name,
    city,
    country,
    timeZoneId,
  });
  res.status(201).json(person);
};
