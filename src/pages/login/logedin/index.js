import React, { useContext } from 'react'
import { MyContext } from '@/pages/api/context/context';
import Link from 'next/link';

const LogedIn = () => {
  const{userName, password} = useContext(MyContext)
  return (
  <center>
     <div className= 'bg-violet-100 w-screen min-h-screen space-y-10 pt-10'>
      <h1 className='font-bold text-3xl'>Hello {userName}!</h1>
      <p className='font-medium text-orange-300 text-xl'>You are Loged In Now!</p>
      <Link href={'/'} ><button className='underline underline-offset-4 text-blue-300 mt-5'>Continue Shoping</button> </Link>
      <p>Your Password is {password}</p>
    </div>
    </center>
    
  )
}

export default LogedIn
