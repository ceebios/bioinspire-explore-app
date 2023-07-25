import { Box, Typography, Button, Stack } from "@mui/material"
import ReactPlayer from "react-player"

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import background from '../images/butterfly.jpg'
import InfoBadge from "./InfoBadge";
import bat from "../images/bat.png"
import mushroom from "../images/mushroom.png"
import ant from "../images/ant.png"
import wiki from "../images/wiki.jpg"
import gbif from "../images/gbif.jpg"
import graph from "../images/graph.png"
import map from "../images/map.png"
import eol from "../images/eol.png"
import onezoom from "../images/onezoom.png"
import expansion from "../images/expansion.png"
import article from "../images/article.png"

const inspire = [
  {
    src:bat,
    alt:'Bat',
    top:'0px',
    left:'0px',
    width:'150px',
    height:'100px',
    fit:'cover',
  },
  {
    src:ant,
    alt:'Ant',
    top:'120px',
    left:'20px',
    width:'140px',
    height:'100px',
    fit:'cover'
  },
  {
    src:mushroom,
    alt:'Mushroom',
    top:'50px',
    left:'150px',
    width:'140px',
    height:'100px',
    fit:'cover'
  },
]

const learn = [
  {
    src:graph,
    alt:'Graph',
    top:'0px',
    left:'0px',
    width:'150px',
    height:'100px',
    fit:'cover',
  },
  {
    src:wiki,
    alt:'Wiki',
    top:'120px',
    left:'20px',
    width:'140px',
    height:'100px',
    fit:'cover'
  },
  {
    src:map,
    alt:'Map',
    top:'50px',
    left:'150px',
    width:'140px',
    height:'100px',
    fit:'cover'
  },
  {
    src:gbif,
    alt:'GBIF',
    top:'200px',
    left:'180px',
    width:'100px',
    height:'40px',
    fit:'cover'
  },  
]

const go = [
  {
    src:expansion,
    alt:'Expansion',
    top:'0px',
    left:'0px',
    width:'250px',
    height:'60px',
    fit:'cover',
  },
  {
    src:article,
    alt:'Article',
    top:'120px',
    left:'50px',
    width:'220px',
    height:'90px',
    fit:'cover'
  },
  {
    src:eol,
    alt:'EOL',
    top:'65px',
    left:'10px',
    width:'80px',
    height:'50px',
    fit:'cover'
  },
  {
    src:onezoom,
    alt:'OneZoom',
    top:'65px',
    left:'150px',
    width:'140px',
    height:'50px',
    fit:'cover'
  },  
]


function Landing() {

  return (
    <Box width='100%' height='800px' mt={9} position={'relative'} sx={{display:'flex', justifyContent:'center'}}>
      <Box sx={{
          position:'absolute',
          height:'100%',
          width:'100%',
          overflow:'hidden'
      }}>
      <img src={background} alt='Leaf' style={{
          objectPosition: "bottom",
          objectFit: "cover",
          width:'100%',
          height:'100%'
      }}/>
      </Box>
      <Stack width='90%' height='100%' position='relative' justifyContent='center'>
        <Box mt={3} sx={{display:'flex', justifyContent:'center'}}>
            <Box textAlign={'left'}>
              <Typography variant='span' fontSize={28} mr={1}>Welcome to</Typography>  
              <Typography color={'rgb(22,86,165)'} fontSize={28} variant='span' fontFamily='sans-serif' mb={3}>Bioinspire-explore</Typography>
            </Box>
        </Box>
        <Stack direction='row' justifyContent={'center'} mt={2} spacing={3}>
          <InfoBadge title="Bio–Inspirations" desc="Discover species through examples of existing bio-inspired projects" target="/learn" icon={<LocalLibraryIcon/>} images={[]}/>
          <InfoBadge title="Learn from Biodiversity" desc="Get familiar with a species of your choice" target="/explore" icon={<TravelExploreIcon/>}  fit='scale-down' images={[]}/>
          <InfoBadge title="Go further" desc="Explore the scientific literature, videos, and naturalist sites related to your species of interest" target="/inspire" icon={<EmojiNatureIcon/>}  fit='scale-down' images={[]}/>
        </Stack>
        <Box sx={{display:'flex',justifyContent:'center', mt:8}}>
            <ReactPlayer  url={"https://youtu.be/blnYA5BGCaA"}/>
          </Box>        
      </Stack>    
    </Box>
  )
}

export default Landing