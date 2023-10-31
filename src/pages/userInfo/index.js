import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Index = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser({ name: '', email: '' });
  };

  return (
    <>
    <div className='bg-orange-50 w-1/4 space-y-3 '>
      <h1 className='font-bold text-lg '>Hello! {user.name} </h1>
      <p >You are Logged In!</p>
      <h2 className='font-semibold text-lg cursor-pointer'>Your Email is: {user.email}</h2>
      <Link href={"/"}><button className="text-blue-500 font-bold hover:underline underline-offset-2 mt-2 bg-orange-200 active:text-blue-200" onClick={handleLogout}>Log Out</button></Link>
    </div>
    </>
  );
};

export default Index;
