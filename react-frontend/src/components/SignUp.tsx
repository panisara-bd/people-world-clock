import React, { FormEvent, useState } from 'react';
import { UserType } from '../types';
import { API_BASE_URL } from '../config';

const signUpUser = async (user: UserType) => {
  const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const status = response.status;
  const data = await response.json();
  return { status, data };
};

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsRegistered(false);
    setError(null);

    const { status, data } = await signUpUser({
      username,
      password,
    });

    if (status >= 400) {
      setError(data.message);
    } else {
      setIsRegistered(true);
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div className="signUp-wrapper">
      <h2>Sign Up</h2>
      <form>
        <label>
          <p>Create Username</p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label>
          <p>Create Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <div>
          <button
            className="login-signup__button"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
          {isRegistered && (
            <p className="text-success">You Are Registered Successfully</p>
          )}
          {error && <p className="text-error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
