// import React, { useEffect, useState } from 'react'
// // import { MyContext } from '../api/context/context'
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import Link from 'next/link';
// import { useRouter } from 'next/router';






// const index = () => {

//  const [myCatData, setMyCatData]= useState([]);
//  const router = useRouter({});
//   const {category} = router.query;
//  //console.log(category);
 
//    const fetchDataByFilter = async (cate) => {
//     try {
//       const filteredResponce = await fetch (`http://localhost:5000/api/product?category=${cate}`).then((res)=> res.json())//.then((res)=>{console.log(res)})
//       // console.log(filteredResponce);
//        await setMyCatData(filteredResponce);
      
      
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchDataByFilter(category);

//  }, [])
// console.log(myCatData)

// return (
//   <>
//   <div className='mx-16 bg-orange-50 space-y-2 shadow-lg'>
//   <Navbar />
//   <div>
//       <h1 className='font-extrabold text-4xl text-center line-through decoration-orange-500 '>Mens</h1>
//       <hr className='font-bold' />


//       <div className='grid grid-cols-3 mt-16 space-y-5 '>

//       {myCatData.map((curElem) =>{
//           {
//               return(
//                   <>
//                   <div key={curElem.id}>
//                     <img src={curElem.image} className='w-7/12 h-3/4 m-auto' />
//                     <div className='text-center font-semibold'>{curElem.title}</div>
//                     <span className='flex justify-evenly mt-5'>
//                     <div className='text-base font-medium text-orange-400 ml-10 mt-1'> Price :- ${curElem.price}</div>
//                     <Link href={`/productId/${curElem._id}`}> <button className='text-white bg-orange-500 rounded-md px-2 hover:bg-orange-400 active:text-orange-200  '>Go to Product</button></Link>
//                     </span>
//                   </div>
//                 </>
//               )
//           };

//       })};
//       </div>
  
    
//   </div>
//   <Footer />
//   </div>
//   </>
// )


// }


// export default index;



import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Index = () => {
  const [myCatData, setMyCatData] = useState([]);
  const router = useRouter();
  const { category } = router.query;

  const fetchDataByFilter = async (cate) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product?category=${cate}`);
      if (response.ok) {
        const filteredResponse = await response.json();
        setMyCatData(filteredResponse.myData);
        console.log(filteredResponse)
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (category) {
      fetchDataByFilter(category);
    }
  }, [category]);

  return (
    <>
      <div className='mx-16 bg-orange-50 space-y-2 shadow-lg'>
        <Navbar />
        <div>
          <h1 className='font-extrabold text-4xl text-center line-through decoration-orange-500'>{category}</h1>
          <hr className='font-bold' />

          <div className='grid grid-cols-3 mt-16 space-y-5 '>
            {myCatData?.map((curElem) => (
              <div key={curElem.id}>
                <img src={curElem.image[0]} className=' w-1/2 h-auto lg:w-2/3 lg:h-4/6 m-auto' alt={curElem.title} />
                <div className='text-center font-semibold'>{curElem.name}</div>
                <span className='flex justify-evenly mt-5'>
                  <div className='text-base font-medium text-orange-400 ml-10 mt-1'> Price: ${curElem.price}</div>
                  <Link href={`/productId/${curElem._id}`}>
                    <button className='text-white bg-orange-500 rounded-md px-2 hover:bg-orange-400 active:text-orange-200'>
                      Go to Product
                    </button>
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;



