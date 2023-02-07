import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Typography, Stack } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../context/Context';
import HelpIcon from '@mui/icons-material/Help';

const About = () => {
  const [app, setApp] = useContext(AppContext)
    
    return (
    <Box mt={1}>
      <Box sx={{borderTop:2,width:"90%",borderColor:'lightgray',ml:'5%'}}></Box>
      <Stack direction={'row'} justifyContent={'center'}>
        <HelpIcon sx={{fontSize:28, pt:'6px',pr:1}}/>
        <Typography sx={{fontSize:28}}> About Bioinspire-Explore </Typography>         
      </Stack>
      <Box width='60%' ml='20%'>
        <Typography color={'text.secondary'} fontSize={20}>
          Bioinspire-Explore is a project co-piloted by MNHN and Ceebios.
          Its objective is to ...
        </Typography>        
      </Box>
    </Box>
    );
  }

export default About