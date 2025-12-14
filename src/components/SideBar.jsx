import React from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

import { SlCalender } from "react-icons/sl";
import useMediaQuery from './MediaQuery';
import FacebookPosts from './FacebookPosts';

const SideBar = () => {  
//   const isMobile = useMediaQuery('(maxWidth: 175px)')
  return (
    <div style={{width: "100%",gap: "30px", display: "flex", flexDirection: "column"}}>
        {/* <div>
            <p>Upcoming Events</p>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
            <div style={{justifyContent: "center"}}><SlCalender size={25}/></div>
            <div><span style={{marginLeft: "10px", fontSize: "12px"}}>There are no upcoming events</span></div>
        </div> */}
        <div>
            {/* <FacebookWidget /> */}
            <FacebookPosts />
        </div>
    </div>
  )
}

export default SideBar