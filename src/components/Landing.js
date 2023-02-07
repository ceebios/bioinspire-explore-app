import { Box, Typography, Button, Stack } from "@mui/material"
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate()

  const handleClick = (e,target) => {
    e.preventDefault()
    navigate(target)
  }

  return (
    <Stack width='90%' height='800px' position='relative' mt={9} justifyContent='center'>
      <Box mt={3} sx={{display:'flex', justifyContent:'center'}}>
          <Box textAlign={'left'}>
            <Typography variant='span' fontSize={28} mr={1}>Welcome to</Typography>  
            <Typography color={'rgb(62,126,205)'} fontSize={28} variant='span' fontFamily='sans-serif' mb={3}>Bioinspire-explore</Typography>
          </Box>
        </Box>
        <Stack direction='row' justifyContent={'center'} mt={2} spacing={3}>
          <Button onClick={(e)=>handleClick(e,"/learn")} variant="contained" startIcon={<LocalLibraryIcon/>}>Learn</Button>
          <Button onClick={(e)=>handleClick(e,"/explore")} variant="contained" startIcon={<TravelExploreIcon/>}>Explore</Button>
          <Button onClick={(e)=>handleClick(e,"/inspire")} variant="contained" startIcon={<EmojiNatureIcon/>}>Inspire</Button>
        </Stack>
    </Stack>
  )
}

export default Landing