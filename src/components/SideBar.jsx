import React from 'react'

import { SlCalender } from "react-icons/sl";
import FacebookPosts from './FacebookPosts';

const SideBar = () => {  
  return (
    <div style={{width: "100%",gap: "30px", display: "flex", flexDirection: "column"}}>
        <div>
            <FacebookPosts />
        </div>
    </div>
  )
}

export default SideBar