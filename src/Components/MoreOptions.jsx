import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Update } from './Update';
import { DeleteContact } from './DeleteContact';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function MoreOptions({data, i}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Button aria-describedby={id}  onClick={handleClick}>
         <MoreHorizIcon style={{color : "#31363F"}}/>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Update data={data} i={i} />
        <DeleteContact i={i} />
      </Popover>
    </div>
  )
}

export {MoreOptions}