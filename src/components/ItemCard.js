import { Box, Typography, IconButton, Tooltip,Stack, Card} from "@mui/material"
import { useState } from "react"
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { ORDER } from "./Species";
import { useContext } from "react";
import { SearchContext, RasterContext,CardContext } from "../context/Context";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AspectRatio from '@mui/joy/AspectRatio';
import ReactPlayer from "react-player"
export const cardSize = 400

export const ItemCard = ({item,index}) => {
  const [component, setComponent] = useState(null)
  const [search, setSearch] = useContext(SearchContext)
  const [raster, setRaster] = useContext(RasterContext)
  const [cards, setCards] = useContext(CardContext)

  const handleSpecies = (x)=> {
    fetch(`https://api.gbif.org/v1/species?name=${x}&limit=1`)
    .then(res=>res.json())
    .then(res=>{
      if (res.results.length>0) {
        const el = res.results[0]
        const spec = {
          label:el.canonicalName,
          rank:el.rank,
          order:ORDER[el.rank] || 8,
          key:el.key            
        }
        setRaster(false)
        setSearch({...search, species:spec})
      }
    })
  }

  const getComponent = () => {
    var comp
    if (component===null) {
      comp = 
        <Box sx={{position:'relative'}}>
          <Box sx={{position:'absolute',display:'flex',justifyContent:'center', width:"100%",backgroundColor:"rgba(200,200,200,0.75)"}}>
            <Typography sx={{fontWeight:'semibold',width:"95%"}}>{item.title}</Typography>
          </Box>
        </Box>        
    }
    if (component==='text') {
      comp = <Box sx={{position:'relative'}}
      >
        <Box sx={{overflowY:'auto',position:'absolute',display:'flex', height:`${cardSize-50}px`,justifyContent:'center', width:"100%", backgroundColor:"rgba(30,30,30,0.7)"}}>
          <Typography sx={{color:'white',width:"95%"}}>{item.text}</Typography>
        </Box>
      </Box>        
    }  
    if (component==='author') {
      comp = <Box sx={{position:'relative'}}
      >
        <Box sx={{
          overflowY:'auto',position:'absolute',display:'flex', height:`${cardSize-50}px`,justifyContent:'center', width:"100%", backgroundColor:"rgba(30,30,30,0.7)"
          }}>
          <Typography sx={{color:'white',width:"95%",}}>{item.author}</Typography>
        </Box>
      </Box>        
    }  
    if (component==='species') {
      comp = <Box sx={{position:'relative'}}
      >
        <Stack alignItems="center" justifyContent="center" spacing={2}
        sx={{
          overflowY:'auto',position:'absolute',top:0,left:0,backgroundColor:"rgba(30,30,30,0.7)",height:`${cardSize-50}px`, width:"100%",
        }}>
          {item.species.map(x=><Typography key={x} onClick={(e)=> {e.preventDefault();handleSpecies(x)}} sx={{cursor:"pointer",color:'white',"&:hover":{color:'lightcoral'}}}>{x}</Typography>)}
        </Stack>
      </Box>        
    }  
    if (component==='video') {
      comp = <Box sx={{position:'relative'}}
      >
        <Box sx={{position:'absolute',top:0,left:0,backgroundColor:"rgba(30,30,30,0.7)",height:`${cardSize-50}px`, width:"100%"}}>
        <ReactPlayer width={`${cardSize}px`}
          url={item.vid}
        />
        </Box>
      </Box>        
    }     
    return comp
  }

  return (
    <Box sx={{width:`${cardSize}px`, borderRadius:1, overflow:'hidden'}} 
        onMouseOver={(e)=>{e.preventDefault();console.log(index);setCards({...cards,active:index})}}
        onClick={(e)=>{e.preventDefault();console.log(index);setCards({...cards,active:index})}}>
        {getComponent()}
        <Box sx={{
          display: 'block',
          height: `${cardSize}px`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${item.img})`,
          backgroundSize:'cover'
        }}
        >          
        </Box>
    </Box>
  )
}


/*
        <Box sx={{position:'relative'}}>
          <Box sx={{position:'absolute',display:'flex',bottom:0, justifyContent:'space-between', width:"100%"}}>
            <Tooltip title='Info'>
            <IconButton onClick={(e)=>{e.preventDefault();setComponent('text')}} sx={{borderRadius:1, backgroundColor:"rgba(250,250,250,0.5)", "&:hover":{backgroundColor:"rgba(250,250,250,0.8)"}}}><QuestionMarkIcon/></IconButton>
            </Tooltip>
            <Tooltip title='Species'>
            <IconButton onClick={(e)=>{e.preventDefault();setComponent('species')}} sx={{borderRadius:1, backgroundColor:"rgba(250,250,250,0.5)", "&:hover":{backgroundColor:"rgba(250,250,250,0.8)"}}}><EmojiNatureIcon/></IconButton>
            </Tooltip>
            <Tooltip title='Open reference'>
            <IconButton onClick={(e)=>{e.preventDefault();window.open(item.source)}} sx={{borderRadius:1, backgroundColor:"rgba(250,250,250,0.5)", "&:hover":{backgroundColor:"rgba(250,250,250,0.8)"}}}><FileOpenIcon/></IconButton>
            </Tooltip>            
          </Box>
        </Box>        
        
*/