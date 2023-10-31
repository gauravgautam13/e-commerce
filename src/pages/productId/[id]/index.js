import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { MyContext } from '@/pages/api/context/context';
// import { MyContext } from '@/pages/api/context/context';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react';

const index = () => {
    const [myDataById, setMyDataById] = useState([]);
    const [ relatedData, setRelatedData] = useState([]);
    const [imgeUrl, setImageUrl] = useState('');
    const router = useRouter();
    const id = router.query.id;
    // console.log(id);
    let [category , setCategory] = useState('');

    const { checkOutCart, setCheckOutCart} = useContext(MyContext);
    //console.log(checkOutCart)


    const fetchDataById = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/product?_id=${id}`);
        if (response.ok) {
          const filteredResponseById = await response.json();
          setMyDataById(filteredResponseById.myData);
          setCategory(filteredResponseById.myData.category);
          setImageUrl(filteredResponseById.myData.image[0]);
          //console.log(filteredResponseById);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const setProductToCheckOutCart = (prod) =>{
      let data = prod;
      data["quantity"] = 1;
      prod = data
      // console.log(prod)
      setCheckOutCart([...checkOutCart, prod]);
    }
    
  const fetchDataByCategory = async (category) => {
    console.log('category' , myDataById.category)
    try {
      const response = await fetch(`http://localhost:5000/api/product?category=${category}&limit=4`);
      const relatedDataJson = await response.json();
      setRelatedData(relatedDataJson.myData);
      console.log(relatedDataJson);

    } catch (error) {
      
    }
  }

    useEffect (() => {
      if (id || category) {
      fetchDataById(id);
      fetchDataByCategory(category);

    }}, [id, category]);
    

    return (
        <>
        <Navbar />
        <div className='mx-2 lg:mx-16 bg-orange-50 pb-10 shadow-lg'>
        {myDataById?.map ((curElem) => {
            if (curElem._id == id){
             category = curElem.category;
             console.log(category)
            return(
                <>
        
            <h1 className='text-lg lg:text-4xl font-bold text-center line-through decoration-orange-500'>ProductDetails
            </h1>
            <hr />
            <h2>Home/ProductId/{id}</h2>
            <h1 className='font-bold text-lg text-center my-5'>{curElem.name}</h1>
            <div>
                <div key={id} className='lg:flex col-span-2 justify-evenly'>
                  <div className=' space-y-2 w-1/2 ml-10'>
                    <img src={imgeUrl || curElem.image[0]} alt={curElem.title} className='lg:w-1/2 w-4/5 h-auto lg:h-3/4 rounded-lg mx-auto' />
                    <span className='flex col-span-4 space-x-4 ml-5 place-content-center ' >
                      <img src={curElem.image[0]} className='w-10 h-20 hover:border-2 active:border-4 border-orange-500  ' onClick={() => setImageUrl(curElem.image[0])}/>
                      <img src={curElem.image[1]} className='w-10 h-20 hover:border-2 active:border-4 border-orange-500  '  onClick={() => setImageUrl(curElem.image[1])}/>
                      <img src={curElem.image[2]} className='w-10 h-20 hover:border-2 active:border-4 border-orange-500  '  onClick={() => setImageUrl(curElem.image[2])}/>
                      <img src={curElem.image[3]} className='w-10 h-20 hover:border-2 active:border-4 border-orange-500  ' onClick={() => setImageUrl(curElem.image[3])} />
                  </span>
                   
                  </div>
                 <div className='w-1/2 place-content-around space-y-5'>
                    <div>
                    <h3 className='text-orange-500 font-bold text-lg line-through decoration-orange-500'>${((curElem.price)+(curElem.price*10/100)).toFixed(2)}</h3>
                    <h4  className='text-orange-500 font-bold text-lg'>${curElem.price}</h4>
                    </div>
                    <select className='w-1/6 rounded-sm border border-black'  name="size" id="size">
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                    <div className='space-x-2'> 
                      <h1 className='font-semibold text-lg'>Color:-</h1>
                      <button className='rounded-full bg-red-600 border border-black w-7 h-7 hover:bg-red-500 active:border-2 '></button>
                      <button className='rounded-full bg-gray-700 border border-orange-500 w-7 h-7 hover:bg-gray-500 active:border-2 '></button>
                    </div>
                    <div><input type="number" min="0" step="1" className="form-control pl-2 w-14 border border-black rounded-lg " /></div>
                    <span className='flex col-span-2 space-x-2'>
                      <Link href={"/productId/checkOut"}><button onClick ={() => setProductToCheckOutCart(curElem)} className='bg-orange-500 px-2 rounded-md border text-white font-semibold border-black hover:bg-orange-400 active:border-2'>Add to Cart</button></Link>
                      <button className='bg-orange-500 px-2 rounded-sm border text-white font-semibold border-black hover:bg-orange-400 active:border-2'><svg xmlns="http://www.w3.org/2000/svg" className='text-white' height="1em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg></button>
                    </span>
                    <button className='w-1/4 border-2 border-white text-white font-semibold  px-2 bg-gray-600 hover:bg-gray-500 active:border-4'>Buy Now!</button>
                    <div className='pt-10 space-y-4'>
                    <hr className='w-2/5 bg-black border-2'/>
                    <div className='flex col-span-2 cursor-pointer'>
                      <p className='text-xs lg:text-base lg:font-semibold'>Product Deatils & Refund Policy </p>
                      <svg className=' text-xs lg:text-base ml-6 pt-1' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </div>
                    <hr className='w-2/5 bg-black border-2'/>
                    <div className='flex col-span-2 cursor-pointer'>
                      <p className='text-xs lg:text-base lg:font-semibold'>Shiping Info </p>
                      <svg className='lg:ml-40 ml-6 text-xs lg:text-base pt-1' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </div>
                    </div>
                  </div>
                </div>

                <p className='lg:w-3/5 w-4/5 mx-auto'> Description :- {curElem.description}</p>
            </div>
      
        </>
            )}
         })}
         <hr className='mx-5 my-5'/>
         <h1 className='text-lg lg:text-2xl font-bold text-center line-through decoration-orange-500'>Related Product's
            </h1>
         
         <div className='flex col-span-4 mx-32 space-x-8 justify-center mt-5'>
          <button className='text-orange-500 font-semibold text-2xl hover:bg-orange-40000 active:text-orange-200'>{"<"}</button>
         
         {relatedData?.map((curElem
         ) =>{
          if (curElem.category === category){
            return(
              <>
              <div key={curElem.id} >
                <div >
                <Link href={`/productId/${curElem._id}`}>
                  <img src={curElem.image} className='w-44 h-36 lg:h-72' /> </Link>
                  <h2 className='font-semibold'>{curElem.category}</h2>
                  <p className='font-semibold text-orange-500'>rating :- {curElem.rating.rate}</p>
                </div>

              </div>
              </>
            )
          }
         })}
          <button className='text-orange-500 font-semibold text-2xl hover:bg-orange-40000 active:text-orange-200'>{">"}</button>
         </div>
         </div>
        <Footer />
        </>
    )
}

export default index;
