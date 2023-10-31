import React, { useContext, useEffect, useState } from 'react';
// import Image from 'next/image';
import { MyContext } from '../pages/api/context/context';
import Link from 'next/link';

const Myhome = () => {

  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const {data} = useContext(MyContext);


  const incrementPages = () => {
    if (page < 4) {
      setPage(page + 1);
      console.log(page)
    }
  };

  const incrementLimit = () => {
    if (limit < 40) {
      setLimit(limit + 12)
    }
  }
 


  const fetchData = async () => {

    try {
      const response = await fetch(`http://localhost:5000/api/product?page=${page}&limit=${limit}&query=${""}`);
      const jsonData = await response.json();

      setApiData(jsonData.myData);
    } catch (error) {
      console.log("Error...", error)
    }

  }


  useEffect(() => {
      fetchData(page, limit);
  }, [page, limit]);
  


  return (
    < >
      <main className=' mx-2 lg:mx-16 shadow-xl bg-orange-50'>
        <div className='bg-orange-500 space-y-6'>
          <h1 className='text-white text-xl font-extrabold text-center lg:text-3xl underline underline-offset-4'>
            Free Shiping
          </h1>
          <p className='text-white text-lg font-semibold text-center lg:text-xl mx-2'>On Order Over $50 - Use Coupan OVER50</p>
          <center className='space-x-10 mt-10 pb-2'>
            <Link href={"/"}><button className='border-2 text-white border-white px-3 hover:bg-orange-300 active:text-orange-400'>Shop All</button></Link>
            <Link href={`/plpPage/${"mens"}`}><button className='border-2 text-white border-white px-3 hover:bg-orange-300 active:text-orange-400' >Mens</button></Link>
            <Link href={`/plpPage/${"womens"}`}><button className='border-2 text-white border-white px-3 hover:bg-orange-300 active:text-orange-400'>Womens</button></Link>
          </center>
        </div>

        <div className="lg:grid grid-cols-3 gap-3 ">
          <img className="w-full h-3/4 object-cover mt-2" src="Image/imgm1.jpg" />
          <img className="w-full h-3/4 object-cover mt-2" src="Image/img6.jpg" />
          <img className="w-full h-3/4 object-cover mt-2" src="Image/imgw4.jpeg" />
        </div>
        <h2 className="text-black text-6xl  text-center font-extrabold line-through decoration-orange-500 ">New Arrivals</h2>
        <hr className='font-bold' />


        <div className='lg:grid grid-cols-3 mt-16 space-y-5 '>
          {data.length === 0? Array.isArray(apiData) && apiData.map((curElem) => {
            return (
              <>
                <div key={curElem.id}>
                  <img src={curElem.image[0]} className='lg:w-3/4 lg:h-3/4 m-auto w-3/4' />
                  <div className='text-center font-semibold'>{curElem.name}</div>
                  <span className='flex justify-evenly mt-5'>
                    <div className='text-base font-medium text-orange-400 ml-10 mt-1'> Price :- ${curElem.price}</div>
                    <Link href={`/productId/${curElem._id}`}> <button className='text-white bg-orange-500 rounded-md px-2 hover:bg-orange-400 active:text-orange-200  '>Go to Product</button></Link>
                  </span>
                </div>
              </>
            )
          }):data.map((curElem) => {
            return (
              <>
                <div key={curElem.id}>
                  <img src={curElem.image[0]} className='lg:w-3/4 lg:h-3/4 m-auto w-3/4' />
                  <div className='text-center font-semibold'>{curElem.name}</div>
                  <span className='flex justify-evenly mt-5'>
                    <div className='text-base font-medium text-orange-400 ml-10 mt-1'> Price :- ${curElem.price}</div>
                    <Link href={`/productId/${curElem._id}`}> <button className='text-white bg-orange-500 rounded-md px-2 hover:bg-orange-400 active:text-orange-200  '>Go to Product</button></Link>
                  </span>
                </div>
              </>
            )
          })}
        </div>
        <center className='space-x-1 py-4'>
          <button className=' bg-white border-2 rounded-md border-orange-500 text-orange-500 mt-5 px-2 hover:bg-orange-300 active:text-orange-200 font-bold' onClick={() => incrementLimit()} >Show More</button>
          <button className='bg-white border-2 rounded-md border-orange-500 text-orange-500 hover:bg-orange-300 active:text-orange-200 font-bold' onClick={() => incrementPages()}>&gt;</button>

        </center>
      </main>
    </>
  )
}

export default Myhome;
