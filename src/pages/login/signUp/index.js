import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { SignUpSchema } from '@/schemas';
import { useRouter } from 'next/router';

const Index = () => {

  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
     //event.preventDefault();
      fetch("http://localhost:5000/api/user/signUp", {
        method:'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }).then(response => response.json().then(data => {
        if (data.new_User) {
        alert(data.new_User);
        router.push('/login');
        // console.log(data)
     } else{
      alert(data.error);
     }
    }));
      // console.log(values);
    }
  });

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div>
          <form className='border-2 border-black bg-blue-50 p-20 space-y-5 rounded-md shadow-xl' onSubmit={formik.handleSubmit}>
            <div>
              <h1 className='text-2xl font-semibold'>Sign Up</h1>
              <h2 className='text-base font-medium'>Let's get Started!</h2>
            </div>
            <div className='space-x-2'>
              <label htmlFor="name">Name:</label>
              <input className='rounded-md px-2' type="text" placeholder='Enter Your Name' name='name' value={formik.values.name} onChange={formik.handleChange} />
              {formik.touched.name && <p className='ml-20 text-red-400 text-sm font-normal'>{formik.errors.name}</p>}
            </div>
            <div className='space-x-2'>
              <label htmlFor="email">Email:</label>
              <input className='rounded-md px-2' type="email" placeholder='Enter your Email' name='email' value={formik.values.email} onChange={formik.handleChange} />
              {formik.touched.email && <p className='ml-20 text-red-400 text-sm font-normal'>{formik.errors.email}</p>}
            </div>
            <div className='space-x-2'>
              <label htmlFor="password">Password:</label>
              <input className='rounded-md px-2' type="password" placeholder='Password' name='password' value={formik.values.password} onChange={formik.handleChange} />
              {formik.touched.password && <p className='ml-20 text-red-400 text-sm font-normal'>{formik.errors.password}</p>}
            </div>
            <div className='space-x-2'>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input className='rounded-md px-2' type="password" placeholder='Password' name='confirm_password' value={formik.values.confirm_password} onChange={formik.handleChange} />
              {formik.touched.confirm_password && <p className='ml-20 text-red-400 text-sm font-normal'>{formik.errors.confirm_password}</p>}
            </div>
            <div>
              <div>
                <button className='bg-orange-500 px-2 text-white hover:bg-orange-400 active:text-orange-300' type='submit' >Sign Up</button>
              </div>
              <div>
                <p className='text-sm font-medium '>Already have an account? <Link href="/login"><button className='text-blue-500 hover:underline active:text-white'>Log In</button></Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
