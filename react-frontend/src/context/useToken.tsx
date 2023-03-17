import { useState } from 'react';

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString!);
    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken: any) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };
  const clearToken = () => {
    localStorage.clear();
    setToken(undefined);
  };
  return {
    setToken: saveToken,
    token,
    clearToken,
  };
};

export default useToken;
