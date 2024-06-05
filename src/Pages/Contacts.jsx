import { Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { CreateContact } from '../Components/CreateContact'
import {MoreOptions} from '../Components/MoreOptions'
// import { Table } from '../Components/Table'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
  let border_bottom_input = {
    borderBottom: ".5px solid #424242"
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


function Contacts() {

    let [showOpt, setShowOpt] = useState(false);
    let [contactData, setContactData] = useState([]);
    let navigate = useNavigate();
    useEffect(()=>{
        setShowOpt(false)
        let token = localStorage.getItem("token");
        // console.log(token);
        async function v(){
            try{
                let data = await fetch("https://contact-book-apis.vercel.app/verify",{
                method : "POST",
                headers: {
                "Content-Type" : "application/json"
                },
                body: JSON.stringify({token})
            })
                let res= await data.json();
                // console.log(data);
                // console.log(res);

                if(!res.verified || res.verified === false){
                    alert("Login First");
                    navigate("/login");
                }
                else{
                    let data = await fetch("https://contact-book-apis.vercel.app//getContacts",{
                      method : "POST",
                      headers: {
                        "Content-Type" : "application/json"
                      },
                      body: JSON.stringify({token: token})
                    })
                    // console.log(data);
                    let res = await data.json();
                    // console.log(res.data.contacts); showing contacts data
                    let d = res.data.contacts;
                    setContactData(d)
                    setShowOpt(true);
                }
            }
            catch(e){
                console.log("Verification failed", e);
            }
        };
        v();
    }, [])
    
  function optionBarHandle(e){
    console.log(e.target.firstElementChild.classList);
    e.target.firstElementChild.classList.toggle("hidden")
  }
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

  return (
    <div className='h-[100vh] relative'>
        <div className='md:w-[70%] md:mx-[15%] w-[90%] mx-[5%] my-[3%]' >
            <div className='flex justify-between px-[3%] items-center ' >
                <div>
                    <p className='md:text-[1.5rem] text-[1.2rem] text-custom_dark font-bold'>Your Contacts</p>
                </div>

                <div >
                    <CreateContact />
                    {/* <button className='bg-custom_dark_green text-custom_white px-[13px] py-[5px] rounded-[3px] cursor-pointer duration-[.4s] ease-in-out hover:bg-custom_green shadow-custom_dark shadow-2xl'>Create Contact</button> */}
                </div>
            </div>
 
            <div className='my-[3%] relative z-[-10]'>
                <input type="text" placeholder='Filter names...' style={border_input} className='w-[30%] p-[.6%] ' />
            </div>

            <div>
                {/* <table style={border_input} className='w-[100%] h-2'>
                    <thead>
                    <tr className='' style={border_bottom_input}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody> */}

                    
                        <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Phone No</StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            (!showOpt)
                            ?   
                                <p className='text-center text-custom_dark py-[10px]'  >Loading...</p>
                            :
                            
                            (!contactData.length>0)
                            ?
                            
                            <p className='text-center text-custom_dark py-[10px]'>No Contacts Found!</p>
                            :
                            // contactData.map((val, i)=>{
                            //     return(
                            //         <>
                            //             <tr className='text-custom_grey w-[100%] text-center text-[.9rem]' key={i}>
                            //             <td>{val.name}</td>
                            //             <td>{val.email}</td>
                            //             <td>{val.phone}</td>
                            //             <MoreOptions data={val} i={i} />
                            //             </tr>
                            //         </>
                            //     )

                            contactData.map((val, i) => (
                                    <StyledTableRow key={i}>
                                      <StyledTableCell component="th" scope="row" align="left">
                                        {val.name}
                                      </StyledTableCell>
                                      <StyledTableCell align="left">{val.email}</StyledTableCell>
                                      <StyledTableCell align="left">{val.phone}</StyledTableCell>
                                      <StyledTableCell align="left"><MoreOptions data={val} i={i} /></StyledTableCell>
                                    </StyledTableRow>
                                  ))
                            // })

                        }
                            
                        
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {/* </tbody>
                </table> */}
            </div>
        </div>
        

    </div>
  )
}

export {Contacts}