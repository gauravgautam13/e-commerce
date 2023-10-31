import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link';
import React from 'react';


const index = () => {
  return (
    <> 
    <Navbar/>
        <center>
         <main className='mx-16 bg-orange-50 p-20'>
              <h1 className='text-2xl font-bold' >Congratulations!</h1>
              <p className='text-lg font-semibold'>Your order placed SuccessesFully. </p>

              <div>
                <Link href="/"><button className='text-blue-400 underline hover:to-blue-300 active:text-white mt-5'>Continue Shoping</button></Link>
              </div>
         </main>
        </center>
      <Footer />
    </>
  )
}

export default index
