import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { Logout } from './Logout'


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

function Header() {
    let [isLoggedIn, setIsLoggedIn] = useState();
    useEffect(()=>{
        async function userLoggedOut(){
            try{
                let token = localStorage.getItem("token");
                if(!token || token === null){
                    setIsLoggedIn(false);
                }
                else{
                    let data = await fetch("https://contact-book-apis.vercel.app/verify",{
                    method : "POST",
                    headers: {
                    "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({token})
                })
                    let res= await data.json();
                    if(res.verified || res.verified === true){
                        setIsLoggedIn(true)
                    }
                    else{
                        setIsLoggedIn(false)
                    }
                }
            }
            catch(e){
                console.log("User logging out Error", e);
            }
        };
        userLoggedOut();
    }, [])
  return (
    <div>
        <div className='container w-[80vw] ml-[10vw] grid grid-flow-col grid-cols-2 border-custom_white border-b-2 py-[.8%] relative' >
            <div>
                <NavLink to={"/"}><p className='text-[1.5rem] text-custom_dark font-bold'>Contact<span className='text-custom_dark_green'>Book</span></p></NavLink>
            </div>
            <div className='flex justify-end items-center gap-[5%] pr-[5vw] py-[1%]' >
                <NavLink to='/contact' className='text-custom_grey text-[.9rem]' ><p>Contact</p></NavLink>
                {(isLoggedIn)
                ?
                    <Logout />
                :
                <NavLink to='/login' className='text-custom_white text-[.9rem] bg-custom_dark_green px-[15px] py-[5px] rounded-[5px] cursor-pointer duration-[.4s] ease-in-out hover:bg-custom_green shadow-custom_dark shadow-2xl'><p>Login</p></NavLink>
                }
            </div>
        </div>
    </div>
  )
}

export {Header}