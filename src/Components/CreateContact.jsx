import React, {useState} from 'react'
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { toast } from 'react-toastify';

let border_input = {
    border: ".5px solid #424242"
  }
  let border_bottom_input = {
    borderBottom: ".5px solid #424242"
  }

const Fade = React.forwardRef(function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true);
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '.5px solid #000',
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  
function CreateContact() {
    
  let [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone : ""
})

function handleInput(e){
    let name = e.target.name;
    let value = e.target.value;
    setUserInput({
      ...userInput,
        [name] : value
    })
}


  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  async function handleSubmit(e){
    try{
      
      e.preventDefault();
      console.log(userInput);
      let token = localStorage.getItem("token");
      let send = {
        token :token,
        name: userInput.name,
        email: userInput.email,
        phone: userInput.phone
      }
      let data = await fetch("https://contact-book-apis.vercel.app/createContact",{
              method : "POST",
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify(send)
            })
            let res= await data.json();
            console.log(data);
            console.log(res);
            if(data.ok || data.status === 200){
              setUserInput({
                name: "",
                email: "",
                phone : ""
              })
              
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

              handleClose()
              setTimeout(()=>{
              window.location.reload();
              }, 1200);

            }
            else{setUserInput({
              name: "",
              email: "",
              phone : ""
            })
            
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
    catch(e){
      toast.error("Contact Creating Error", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log("Contact Creating Error", e);
    }
  }

  return (
    <div>
    <Button onClick={handleOpen} style={{backgroundColor : "#00B906", color: "#F5F5F5"}}>Create Contact  </Button>
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
        <div className=''></div>
            <div className=''>
                <div className=''>
                    <p className='text-[1.5rem] text-custom_dark font-bold mx-[10%] my-[2%]'>Create Contact</p>
                </div>
                
                <div>
                    <p className='text-[.9rem] text-custom_dark  mx-[10%] my-[2%]'>Add new contact in your contact list</p>
                </div>
                </div>
        <div>
                <form action="" className='flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="name" className='px-[10%] flex flex-col text-custom_grey'  >Name
                        <input type="text" value={userInput.name} onChange={handleInput} name='name' id='name' className='bordr-2 border-black rounded-[3px] my-[3px]  outline-none placeholder:text-custom_grey px-[2%] py-[2%]' placeholder='Enter Name' style={border_input} />
                    </label>
                    
                    <label htmlFor="email" className='px-[10%] flex flex-col text-custom_grey'> Email
                        <input type="email" value={userInput.email} onChange={handleInput} name='email' id='email'  className='bordr-2 border-black rounded-[3px] my-[3px]  outline-none placeholder:text-custom_grey px-[2%] py-[2%]' placeholder='Enter Email' style={border_input} />
                    </label>
                    
                    <label htmlFor="phone" className='px-[10%] flex flex-col text-custom_grey'>Phone no
                        <input type="text" name='phone' value={userInput.phone} onChange={handleInput} id='phone'  className='bordr-2 border-black rounded-[3px] my-[3px]  outline-none placeholder:text-custom_grey px-[2%] py-[2%]' placeholder='Enter Phone no' style={border_input} />
                    </label>
                    <button type='submit' className='mx-[5vw] my-[7%] rounded-[5px] text-custom_white bg-custom_dark_green duration-[.4s] ease-in-out hover:bg-custom_green shadow-custom_dark py-[1%]'>Save</button>
                </form>

                </div>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export {CreateContact}