/* global db */
db.createUser({
  user: 'paniClock',
  pwd: 'Greeting',
  roles: [
    {
      role: 'readWrite',
      db: 'greeting_clock',
    },
  ],
});

db.getSiblingDB('greeting_clock').users.createIndex(
  { username: 1 },
  { unique: true }
);
