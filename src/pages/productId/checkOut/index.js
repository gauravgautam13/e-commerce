import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Symbol from '@/components/Symbol';
import { MyContext } from '@/pages/api/context/context';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const [Open, setOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const { checkOutCart, setCheckOutCart } = useContext(MyContext);
  const [total, setTotal] = useState(0);
  let initialState = 0;
  const router = useRouter();

  const ToggleMenu = () => {
    setOpen(!Open);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = checkOutCart.filter(item => item._id !== itemId);
    setCheckOutCart(updatedCart);
  };
    const IncrementQunt = (id) => {
    const newData = checkOutCart.map((item) => {
      if (item._id === id) {
        item.quantity += 1;
        // console.log(item.quantity);
      }
      return item;
    });


    setCheckOutCart(newData);
  }
    const decrementQunt = (id) => {
    const newData = checkOutCart.map((item) => {
      if (item._id === id) {
        item.quantity = (item.quantity > 1 && item.quantity - 1);

        //console.log(item.quantity);
      }
      return item;
    });


    setCheckOutCart(newData);
  }

  useEffect(() => {
    let newTotal = 0;

    checkOutCart.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal);
  }, [checkOutCart]);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
      alert("Login First To access cart"); 
      router.push('/login');
    }
  }, []);

  if (isLogIn) {
      return (
      <>
        <div className='mx-2 lg:mx-16 bg-orange-50'>
          <Navbar />
          <Symbol />

          <div className='flex col-span-2 justify-between mx-40 mb-4'>
            <span>
              <h1 className='font-bold text-xl'>My Cart</h1>
              <hr className='border-2 border-orange-500 mb-5 ' />
            </span>
            <span>
              <h1 className='font-bold text-xl'>Order Summery</h1>
              <hr className='border-2 border-orange-500 mb-5 ' />
              <div>
                <h4 className='text-sm text-orange-500 font-medium'>Shiping Charge:- $50</h4>
                <h1 className='text-xl font-bold'>Total:- ${(total + 50).toFixed(2)}</h1>
                <Link href={"/productId/checkOut/orderPlaced"}><button className='bg-orange-500 mt-2 px-2 rounded-md border text-white font-semibold border-black hover:bg-orange-400 active:border-2'>CheckOut!</button></Link>

              </div>
            </span>
          </div>
          <hr />
          {checkOutCart?.map((curElem) => {
            return (
              <>
                <div className=' '>
                  <div className='lg:flex justify-between mr-40 '>
                    <img src={curElem.image[0]} className='w-36 h-48 ml-20 border-2 border-orange-500' />
                    <div className='space-y-3'>
                      <h1 className='w-60 font-semibold'>{curElem.name}</h1>
                      <h2 className='text-orange-500 font-semibold'>Price:- $ {curElem.price}</h2>
                      <p className='text-xs'> Size: Medium </p>
                    </div>

                    <div className='flex col-span-3 w-24'>
                      <button className='border-2 h-6 w-6 border-black hover:border-orange-400 text-lg font-semibold px-1 active:bg-orange-100 ' onClick={() => IncrementQunt(curElem._id)}>+</button>
                      <h1 className='border-2 h-6 w-10 border-black px-2 text center'>{curElem.quantity}</h1>
                      <button className='border-2 h-6 w-6 text-lg font-semibold px-1 border-black hover:border-orange-400 active:bg-orange-100' onClick={() => decrementQunt(curElem._id)}>-</button>
                    </div>
                    <button className=' text-white px-2 h-6 bg-red-900 rounded-md hover:bg-red-800 active:text-orange-300' onClick={() => removeFromCart(curElem._id)}>Remove From Cart</button>
                    <h3 className='font-semibold'>SubTotal:- ${(curElem.quantity * curElem.price).toFixed(2)}</h3>
                  </div>
                  <hr className='mx-40' />


                </div>

              </>
            )
          })}

        </div>
        <Footer />
      </>


    );
  } else {
    return null; 
  }
};

export default Index;
