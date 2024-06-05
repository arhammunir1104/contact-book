import React, {useState} from 'react'
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
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
  
function Logout({i}) {

    let navigate = useNavigate();
async function handleLogout(e){
    e.preventDefault();
    let t= localStorage.getItem("token")
    let d= {
      token : t,
    }
        try{
          let data = await fetch("https://contact-book-apis.vercel.app/logout",{
            method : "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(d)
          })
          console.log(data);
          if(data.ok){
            localStorage.removeItem("token")
            let res= await data.json();
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
            handleClose();
            navigate("/")

          }
          else{
            toast.warn("Account Error, Login Again", {
                          position: "top-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          });
            handleClose();
            localStorage.removeItem("token")
            window.location.reload();
            navigate("/login");
            window.location.reload();
          }
          
        }
        catch(e){
          console.log("Updating user data error", e)
        }
}

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
    <Button onClick={handleOpen} style={{color: "#F5F5F5", backgroundColor : "#00B906", textTransform :"capitalize"}} className='text-custom_white text-[.9rem] bg-custom_dark_green px-[10px] py-[2px] rounded-[5px] cursor-pointer duration-[.4s] ease-in-out hover:bg-custom_green'>Logout</Button>
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
        <div className=''>
            <p className='text-[1.2rem] text-custom_grey font-bold'>Logout</p>
            <p className='text-[.9rem] text-custom_grey'>Are you sure you want to Logout?</p>
        </div>

        <div className='mt-[10%] mb-[5%] flex justify-end gap-3'>
      <Button variant="outlined" style={{color: "#31363F", border: ".5px solid #31363F"}} onClick={handleClose}>No </Button>
      <Button variant="contained" style={{backgroundColor: "red"}} onClick={function(e){handleLogout(e)}}>Yes</Button>
        </div>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export {Logout}