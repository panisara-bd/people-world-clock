import React, { FormEvent, useState } from 'react';
import { UserType } from '../types';

const logInUser = async (credentials: UserType) => {
  const response = await fetch('http://localhost:8080/auth/log-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const status = response.status;
  const data = await response.json();
  return { status, data };
};

type Props = {
  setToken: (token: string) => void;
};

const LogIn: React.FC<Props> = ({ setToken }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError(null);

    const { status, data } = await logInUser({
      username,
      password,
    });
    if (status >= 400) {
      setError(data.message);
    } else {
      setToken(data.token);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <div>
          <button className="login-signup__button" type="submit">
            Log In
          </button>
          {error && <p className="text-error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default LogIn;
