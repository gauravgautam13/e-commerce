import { useFormik } from 'formik'
import React from 'react';
import { LogInSchema } from '@/schemas';
import Link from 'next/link';
import { useRouter } from 'next/router';


const index = () => {
  const router = useRouter();
  const initialValues = {
    email: "",
    password: ""
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LogInSchema,
    onSubmit: (values) => {
      fetch("http://localhost:5000/api/user/logIn", {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }).then(response => response.json().then(data => {
        if (data.message === "Login Successfull!") {
          router.push("/");
          localStorage.setItem("user",JSON.stringify(data))

        } else {
          alert("Authentication Failed");
        }

       }))
     // console.log(values);
    }
  })



  return (
    <><div className="flex justify-center items-center h-screen ">

      <form className='border-2 border-black p-20 rounded-lg shadow-2xl space-y-5 bg-blue-50 ' onSubmit={formik.handleSubmit}>
        <h1 className='text-2xl font-bold'>LogIn</h1 >
        <p className='font-medium'>Welcome Back!</p>
        <div className='space-x-4'>
          <label htmlFor="email">Email:</label>
          {/* <input className='px-2 rounded-md' type="email" placeholder='abc@gmail.com' name='email' autoComplete='off' id='email' /> */}
          <input
            className='px-2 rounded-md'
            type="email"
            placeholder='abc@gmail.com'
            name='email'
            autoComplete='off'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && <p  className='ml-20 text-red-400 text-sm font-normal'>{formik.errors.email}</p>}

        </div>
        <div className='space-x-4'>
          <label htmlFor="password">Password:</label>
          {/* <input  className='px-2 rounded-md' type="password" placeholder='Password' name='password' autoComplete='off' id='password' /> */}
          <input
            className='px-2 rounded-md'
            type="password"
            placeholder='password'
            name='password'
            autoComplete='off'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && <p  className='ml-20 text-red-400 text-sm font-normal'>{formik.errors.password }</p>}
        </div>
        {/* <input type="checkbox" className="checkbox " /> Remember Me! */}
        <input
          type="checkbox"
          className="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formik.values.rememberMe}
          onChange={formik.handleChange}
        />
        Remember Me!

        <div>
          <button className='bg-orange-500 px-2 text-white hover:bg-orange-400 active:text-orange-300' type='submit'> LogIn</button>
        </div>
        <div>
          <p className='text-sm font-medium '>Don't have an accout? <Link href="./login/signUp"><button className='text-blue-500 hover:underline active:text-white'>Sign up</button></Link></p>
        </div>
      </form>
    </div>
    </>
  )
}

export default index
