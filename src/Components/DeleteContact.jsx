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
  
function DeleteContact({i}) {
    
async function handleDelete(e){
  console.log(e);
  console.log(i);
    console.log("Reached");
    e.preventDefault();
    let t= localStorage.getItem("token")
    let d= {
      token : t,
      id: i,
    }
        try{
          let data = await fetch("https://contact-book-apis.vercel.app/deleteContact",{
            method : "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(d)
          })
          console.log(data);
          let res= await data.json();
          if(data.ok || data.status === 200){
            
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
            setTimeout(()=>{
            window.location.reload();
            }, 1200);
  
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
        catch(e){
          toast.error("Deleting user data error", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log("Deleting user data error", e)
        }
}

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
    <Button onClick={handleOpen} style={{color: "#31363F"}}>Delete </Button>
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
            <p className='text-[1.2rem] text-custom_grey font-bold'>Delet Contact</p>
            <p className='text-[.9rem] text-custom_grey'>This action cannot be undo.</p>
        </div>

        <div className='mt-[10%] mb-[5%] flex justify-end gap-3'>
      <Button variant="outlined" style={{color: "#31363F", border: ".5px solid #31363F"}} onClick={handleClose}>Cancel</Button>
      <Button variant="contained" style={{backgroundColor: "red"}} onClick={function(e){handleDelete(e)}}>Delete</Button>
        </div>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export {DeleteContact}