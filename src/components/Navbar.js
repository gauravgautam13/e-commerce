'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from 'postcss';
import { MyContext } from '@/pages/api/context/context';


const Navbar = () => {

    const [Open, setOpen] = useState(false);
    const [openUser, setOpenUser ] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const [query, setQuery] = useState('');
    const { setData } = useContext(MyContext);

    const handleSearch = async (event) => {
        setQuery(event.target.value);
        console.log(query);

    };

    const searchQuery = async () => {
        if (query.length >= 3) {


            try {
                const response = await fetch(`http://localhost:5000/api/product?page=${1}&limit=${12}&query=${query}`);
                const jsonData = await response.json();

                // setApiData(jsonData.myData);
                setData(jsonData.myData);
                console.log(jsonData);

            } catch (error) {
                console.log("Error...", error)
            }
        }
    }

    const ToggleMenu = () => {
        setOpen(!Open)
    };
    const ToggleUser = () => {
        setOpenUser(!openUser);
    }
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsLogIn(true);
        } else {
            setIsLogIn(false);
        }
    }, [])

    return (
        <nav className="bg-orange-50 mx-2 lg:mx-16">
            <div className=" lg:flex flex-row  justify-between ">
                <div className=" flex flex-row space-x-8 space-y-2 pt-1">
                    <span>
                        <h1 className="bg-black text-white rounded-lg text-3xl font-extrabold ml-2 px-2 cursor-pointer">Nous.</h1>
                    </span>
                    <span className="flex flex-row space-x-2">
                        <svg className="h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" onClick={searchQuery}><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        <input type="text" placeholder="Search" className="w-3/5 bg-sky-50 h-6 " onChange={handleSearch} />
                    </span>
                </div>
                <div className="my-4 space-x-4  lg:flex flex-row justify-center " >

                    <button className="lg:hidden block absolute top-2 right-4 text-xl" onClick={ToggleMenu} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                    </button>
                    {Open &&
                        <ul className="space-x-4 space-y-2 lg:flex flex-row lg:space-x-7" >
                            <Link href={"/"}><li className="ml-4 text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer lg:pt-2" >Shop All</li></Link>
                            <Link href={`/plpPage/${"mens"}`}><li className="ml-4 text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer lg:pt-2" >Mens</li></Link>
                            <Link href={`/plpPage/${"womens"}`}><li className="ml-4 text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer lg:pt-2" >Womens</li></Link>
                            <li className="text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer" >Sale</li>
                            <li className="text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer" >About</li>
                            <li className="text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer" >Contact</li>
                        </ul>

                    }
                    <ul className="space-x-4 space-y-2 lg:flex flex-row lg:space-x-7 hidden " >
                        <Link href={"/"}><li className="ml-4 text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer lg:pt-2" >Shop All</li></Link>
                        <Link href={`/plpPage/${"mens"}`}><li className="ml-4 text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer " >Mens</li></Link>
                        <Link href={`/plpPage/${"womens"}`}><li className="ml-4 text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer " >Womens</li></Link>
                        <li className="text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer" >Sale</li>
                        <li className="text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer" >About</li>
                        <li className="text-black font-semibold hover:text-blue-400  hover:underline active:text-blue-300 cursor-pointer" >Contact</li>
                    </ul>


                </div>
                <div>
                    <ul className="flex flex-row space-x-4 space-y-2 m-4 py-2">
                        {!isLogIn ? <Link href={"/login"}><li className=" font-semibold text-blue-400  hover:underline active:text-blue-300 cursor-pointer active:border border-opacity-5 rounded-xl hover:bg-orange-200 px-2">LogIn</li></Link> : <Link href={"/userInfo"}><div className="mt-2 cursor-pointer "> <svg xmlns="http://www.w3.org/2000/svg" onClick={ToggleUser} height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg></div></Link>}
                        <Link href={"/productId/checkOut"}><li className=" cursor-pointer "><svg className="h-6 active:bg-sky-200" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg></li></Link>

                    </ul>
                </div>

            </div>

        </nav>

    )
}

export default Navbar;
