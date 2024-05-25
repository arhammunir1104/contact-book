import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  let border_input = {
    border: ".5px solid #424242"
  }


function Register() {
    let [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password : ""
    })
    let navigate = useNavigate();

    function handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setUserInput({
          ...userInput,
            [name] : value
        })
    }

    async function handleSubmit(e){
      try{
        console.log(userInput);
          e.preventDefault();
          let data = await fetch("https://contact-book-apis.vercel.app/register",{
            method : "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(userInput)

          })
          let res= await data.json();
          
          // console.log(data);
          // console.log(res);

          if(data.ok){
            if((res.verified && res.cause) ||(res.verified === true && res.cause === true) ){
                localStorage.setItem("token", res.token);

                toast.success(res.msg, {
                              position: "top-center",
                              autoClose: 1000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              });
                navigate("/login");       

            }
            else if(res.verified === false && res.cause === true){
              toast.warn(res.msg, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            }
            else{
              toast.warn(res.msg, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            }
          }
          else{

          }
   

      }
      catch(e){
        console.log("Data Submitting Error", e);
      }
    }

  return (
    <div className='py-[3%] h-[fit-content] md:my-[0%] my-[15%]'> 
        <div  className='md:w-[40%] md:mx-[30%] w-[80%] mx-[10%]'>
            <div>
               <p className='md:text-[2rem]  my-[2%] text[1.5rem] text-center text-custom_dark font-bold'>Create a <span className='text-custom_dark_green'>free</span> account</p>
            </div>

            <div style={border_input} className='pt-[5%] rounded-[10px]'>
                <form action="" className='flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="name" className='px-[10%] flex flex-col text-custom_grey'  >Name
                        <input type="text" value={userInput.name} onChange={handleInput} name='name' id='name' className='bordr-2 border-black rounded-[3px] my-[3px]  outline-none placeholder:text-custom_grey px-[2%] py-[2%]' placeholder='Enter your Name' style={border_input} />
                    </label>
                    
                    <label htmlFor="email" className='px-[10%] flex flex-col text-custom_grey'> Email
                        <input type="email" value={userInput.email} onChange={handleInput} name='email' id='email'  className='bordr-2 border-black rounded-[3px] my-[3px]  outline-none placeholder:text-custom_grey px-[2%] py-[2%]' placeholder='Enter your Email' style={border_input} />
                    </label>
                    
                    <label htmlFor="password" className='px-[10%] flex flex-col text-custom_grey'>Password
                        <input type="password" name='password' value={userInput.password} onChange={handleInput} id='password'  className='bordr-2 border-black rounded-[3px] my-[3px]  outline-none placeholder:text-custom_grey px-[2%] py-[2%]' placeholder='Enter your Password' style={border_input} />
                    </label>

                    <button type='submit' className='mx-[5vw] my-[7%] rounded-[5px] text-custom_white bg-custom_dark_green duration-[.4s] ease-in-out hover:bg-custom_green shadow-custom_dark py-[1%]'>Register</button>
                </form>

                <div>
                    <p className='text-[.9rem] text-center mb-[3%]'>Already have an account? <NavLink to="/login" className='text-blue-500 underline'>Login</NavLink></p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export {Register}