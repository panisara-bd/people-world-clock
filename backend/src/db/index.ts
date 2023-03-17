import { MongoClient, ObjectId } from 'mongodb';

type User = {
  username: string;
  password: string;
  tokens?: string[];
};

type Person = {
  _id?: ObjectId;
  username: User['username'];
  name: string;
  city: string;
  country: string;
  timeZoneId: string;
};

export const mongoClient: MongoClient = new MongoClient(
  'mongodb://paniClock:Greeting@127.0.0.1:27017'
);

export const createUser = (user: User) =>
  mongoClient.db('greeting_clock').collection('users').insertOne(user);

export const findUser = (username: string) =>
  mongoClient
    .db('greeting_clock')
    .collection('users')
    .findOne<User>({ username });

export const saveToken = (username: string, token: string) =>
  mongoClient
    .db('greeting_clock')
    .collection('users')
    .updateOne(
      { username },
      {
        $push: {
          tokens: token,
        },
      }
    );

export const createPerson = (person: Person) =>
  mongoClient.db('greeting_clock').collection('people').insertOne(person);

export const listPeople = async (username: string): Promise<Person[]> =>
  await mongoClient
    .db('greeting_clock')
    .collection('people')
    .find<Person>({ username })
    .toArray();

export const deletePerson = (username: string, personId: string) =>
  mongoClient
    .db('greeting_clock')
    .collection('people')
    .deleteOne({ _id: new ObjectId(personId), username });
