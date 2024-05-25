import React from 'react'
import { NavLink } from 'react-router-dom'
let b1 = {
  border : "5px solid red",
}
let b2 = {
  border : "5px solid blue",
}
let b3 = {
  border : "5px solid green",
}
let b4 = {
  border : "5px solid pink",
}
function Home() {
  return (
    <div className='py-[10%]'>
      <div className='md:w-[50%] md:mx-[25%] w-[80%] mx-[10%] '>
        <div className='md:my-[2.5%] my-[15%]'>
          <p className='md:text-[3rem] text-[2rem] text-center font-bold text-custom_dark'>Manage Your Contacts with <span className='text-custom_dark_green'>Contact Book</span></p>
        </div>
        <div className='md:my-[2.5%] my-[15%]'>
          <p className='text-custom_grey text-center md:text-[.9rem] text-[.7rem]'>Streamline your Contacts with our user-friendly Contact Management System. Authenticate, create and access your contacts effortlessly for efficient organization.</p>
        </div>
        <div className='flex items-center justify-center'>
          
          <NavLink to='/contact' className='text-center bg-custom_dark_green px-[15px] text-custom_white py-[7px] duration-[.4s] ease-in-out hover:bg-custom_green shadow-custom_dark rounded-[2px]'>See Contacts</NavLink>
        </div>
      </div>
    </div>
  )
}

export {Home}