import React from 'react'

const Footer = () => {
  return (
    <>
      <div>
      <footer className='mx-2 lg:mx-16'>
        <div className="bg-black lg:flex justify-evenly text-center h-2/4">
          <div className="text-white mt-4">
            <a href="#">Shop All</a><br />
            <a href="#">About</a><br />
            <a href="#">Contact</a><br />
            <a href="#">Stock_list</a>
          </div>
          <div className="text-white mt-4">
            <a href="#">FAQ</a> <br />
            <a href="#">Shiping And Return</a> <br />
            <a href="#">Store Policy</a><br />
            <a href="#">payment Method</a>
          </div>
          <div className="text-white mt-4">
            <a href="#">Instagram</a><br />
            <a href="#">Facebook</a><br />
            <a href="#">Twitter</a><br />
            <a href="#">LinkedIn</a>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-xl text-white">Join Our MemberShip</h1>
            <p className="font-medium text-sm text-gray-400">
              And get 10% Extra Discount
            </p>
            <br />
            <input
              type="text"
              placeholder="Enter Your Email"
              className="bg-black text-white border border-white"
            /><br />
            <button
              className="bg-orange-500 text-white font-bold hover:bg-orange-700 active:text-gray-500 my-2"
            >
              Subscribe Now!
            </button>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}

export default Footer
