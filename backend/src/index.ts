import express, { Express } from 'express';
import { mongoClient } from './db';
import { logInRoute } from './routes/auth/log-in';
import { signUpRoute } from './routes/auth/sign-up';
import { createPersonRoute } from './routes/people/create';
import { deletePersonRoute } from './routes/people/delete';
import { listPeopleRoute } from './routes/people/list';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post('/auth/sign-up', signUpRoute);
app.post('/auth/log-in', logInRoute);

app.post('/people', createPersonRoute);
app.get('/people', listPeopleRoute);
app.delete('/people/:id', deletePersonRoute);

mongoClient.connect().then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
