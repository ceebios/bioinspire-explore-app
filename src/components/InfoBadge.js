import React from 'react'
import {Box, Typography, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

const InfoBadge = ({title, desc, images, target, icon, fit}) => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        navigate(target)
    }

    
    return (
    <Box sx={{backgroundColor:"rgba(250,250,250,0.66)", borderRadius:10, padding:3, width:'300px', minWidth:'300px', textAlign:'center'}}>        
        <Button onClick={(e)=>handleClick(e,target)} variant="contained" startIcon={icon}>{title}</Button>
        <Typography sx={{mt:3,mb:3}}>
            {desc}
        </Typography>
        <Box sx={{position:'relative', width:'90%', maxHeight:'200px'}}>
        {
            images.map((image,i)=>(
                    <Box key={image.alt} sx={{                        
                        position:'absolute',
                        width:image.width,
                        height:image.height,
                        overflow:'hidden',
                        top:image.top,
                        left:image.left,
                        borderRadius:3,
                        zIndex:10-i,
                    }}>
                    <img src={image.src} alt={image.alt} style={{
                        objectPosition: "center",
                        objectFit: image.fit,
                        width:'100%',
                        height:'100%'
                    }}/>
                    </Box>  
            ))
        }
        </Box>
    </Box>
    )
}

export default InfoBadge