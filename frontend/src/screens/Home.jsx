import React from 'react';
import { UserContext } from '../context/user.context';
import { useContext } from 'react';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">{JSON.stringify(user)}</h1>
    </div>
  );
};

export default Home;