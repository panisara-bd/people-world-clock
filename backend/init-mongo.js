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
