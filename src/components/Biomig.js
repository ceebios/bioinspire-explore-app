import React from 'react'
import { Box, Stack, Typography, Button  } from "@mui/material"
import { useState, useContext, useEffect } from "react";
import {TextField} from "@mui/material";
import { blue } from '@mui/material/colors';
import { ExpansionContext } from '../context/Context';
import { biomig } from './Config';

const Biomig = ({selected}) => {
    const [expansion, setExpansion] = useContext(ExpansionContext)
    const [question,setQuestion] = useState()

    useEffect(()=>{
        setQuestion(expansion.nodes.map(n=>n.name).join(', '))
    },[expansion])

    const name = selected.name

    const handleQuestion = ()=> {
        const url = encodeURI(`${biomig}/?query=${question}`)
        window.open(url, '_blank')
    }
    
    
    return (
    <Stack spacing={1} mt={1} ml={1}>
        <Typography color="text.secondary">
            <Typography variant="span" color={blue[600]} fontWeight={"bold"} >Biomig _Search </Typography>
            is a scholar search engine developped by Ceebios and specialized in biomimetic and biodiversity articles.
        </Typography> 

        <Typography color="text.secondary" variant='span'>
            {`Search about `}
            <Typography variant="span" color="text.secondary" fontWeight={"bold"}>{name}</Typography>
            {` on `}
            <Typography variant="span" color={blue[600]} fontWeight={"bold"} >Biomig _Search</Typography>
            :
        </Typography>                        
    <Stack ml={'5%'} width='95%' direction={'column'} justifyContent={'center'}>
        <TextField value={question} onChange={(e)=>setQuestion(e.target.value)} sx={{width:'100%'}}/>
        <Box sx={{mt:1,display:'flex',justifyContent:'center'}}>
        <Button onClick={handleQuestion} variant="contained">Search</Button>
        </Box>
    </Stack>        
</Stack>
  )
}

export default Biomig