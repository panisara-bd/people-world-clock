import express, { Express } from 'express';
import { mongoClient } from './db';
import { logInRoute } from './routes/auth/log-in';
import { signUpRoute } from './routes/auth/sign-up';
import { createPersonRoute } from './routes/people/create';
import { listPeopleRoute } from './routes/people/list';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post('/auth/sign-up', signUpRoute);
app.post('/auth/log-in', logInRoute);

app.post('/people', createPersonRoute);
app.get('/people', listPeopleRoute)

mongoClient.connect().then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
