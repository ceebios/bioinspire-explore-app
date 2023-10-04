import { Box, Typography, Button, Stack } from "@mui/material"
import ReactPlayer from "react-player"

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import InfoBadge from "./InfoBadge";
import bat from "../images/bat.png"
import mushroom from "../images/mushroom.png"
import ant from "../images/ant.png"
import wiki from "../images/wiki.png"
import gbif from "../images/gbif.png"
import graph from "../images/graph.png"
import map from "../images/map.png"
import eol from "../images/eol.png"
import onezoom from "../images/onezoom.png"
import expansion from "../images/expansion.png"
import article from "../images/article.png"
import About from "./About";
import { blue } from "@mui/material/colors"

const inspire = [
  {
    src: bat,
    alt: 'Bat',
    top: '0px',
    left: '0px',
    width: '150px',
    height: '100px',
    fit: 'cover',
  },
  {
    src: ant,
    alt: 'Ant',
    top: '120px',
    left: '20px',
    width: '140px',
    height: '100px',
    fit: 'cover'
  },
  {
    src: mushroom,
    alt: 'Mushroom',
    top: '50px',
    left: '150px',
    width: '140px',
    height: '100px',
    fit: 'cover'
  },
]

const learn = [
  {
    src: graph,
    alt: 'Graph',
    top: '0px',
    left: '0px',
    width: '150px',
    height: '100px',
    fit: 'cover',
  },
  {
    src: wiki,
    alt: 'Wiki',
    top: '120px',
    left: '20px',
    width: '140px',
    height: '100px',
    fit: 'cover'
  },
  {
    src: map,
    alt: 'Map',
    top: '50px',
    left: '150px',
    width: '140px',
    height: '100px',
    fit: 'cover'
  },
  {
    src: gbif,
    alt: 'GBIF',
    top: '200px',
    left: '180px',
    width: '100px',
    height: '40px',
    fit: 'cover'
  },
]

const go = [
  {
    src: expansion,
    alt: 'Expansion',
    top: '0px',
    left: '0px',
    width: '250px',
    height: '60px',
    fit: 'cover',
  },
  {
    src: article,
    alt: 'Article',
    top: '120px',
    left: '50px',
    width: '220px',
    height: '90px',
    fit: 'cover'
  },
  {
    src: eol,
    alt: 'EOL',
    top: '65px',
    left: '10px',
    width: '80px',
    height: '50px',
    fit: 'cover'
  },
  {
    src: onezoom,
    alt: 'OneZoom',
    top: '65px',
    left: '150px',
    width: '140px',
    height: '50px',
    fit: 'cover'
  },
]


function Landing() {

  return (
    <Stack height={'100%'} width='98%' ml="1%" >
      <Stack width='100%' position='relative' justifyContent='center'>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box textAlign={'left'}>
            <Typography variant='span' fontSize={28} mr={1}>Welcome to</Typography>
            <Typography color={blue[700]} fontSize={28} variant='span' fontFamily='sans-serif' mb={3}>Bioinspire-Explore</Typography>
          </Box>
        </Box>
        <Stack direction='row' justifyContent={'center'} mt={1} spacing={2} flexWrap="wrap" useFlexGap >
          <InfoBadge title="Bioinspirations" desc="Discover innovations inspired by a range of different species" target="/learn" icon={<LocalLibraryIcon />} images={[]} />
          <InfoBadge title="Learn from Biodiversity" desc="Find out more about a species: its taxonomy, where it’s found, what it looks like, and its climatic niche" target="/explore" icon={<TravelExploreIcon />} fit='scale-down' images={[]} />
          <InfoBadge title="Go further" desc="Explore scientific literature, videos and other websites about your chosen species" target="/inspire" icon={<EmojiNatureIcon />} fit='scale-down' images={[]} />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <ReactPlayer url={"https://youtu.be/blnYA5BGCaA"} />
        </Box>
      </Stack>
      <About />
    </Stack>
  )
}

export default Landing