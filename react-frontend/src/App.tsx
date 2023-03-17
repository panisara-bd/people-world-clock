import React, { useEffect, useState } from 'react';
import './App.css';
import AddPerson from './components/AddPerson';
import Card from './components/Card';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import useToken from './context/useToken';
import { PersonType } from './types';

function App() {
  const { token, setToken, clearToken } = useToken();
  const [people, setPeople] = useState<PersonType[]>([]);

  const fetchPeople = () =>
    fetch('http://localhost:8080/people', {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPeople(data));

  useEffect(() => {
    if (token) {
      fetchPeople();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="login-signup">
        <h1>Welcome to an awesome World Clock!</h1>
        <Login setToken={setToken} />
        <p>Don't have account yet? Sign Up ⬇</p>
        <SignUp />
      </div>
    );
  }

  return (
    <div className="app">
      <p className="app__greeting">Hello, {token.split(':')[0]}!</p>
      <button className="app__log-out" onClick={clearToken}>
        Log out
      </button>
      <AddPerson fetchPeople={fetchPeople} />
      <div className="card-gallery">
        {people.map((person) => (
          <Card key={person._id} person={person} fetchPeople={fetchPeople} />
        ))}
      </div>
    </div>
  );
}

export default App;
