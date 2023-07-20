import { Box, Typography, Stack } from '@mui/material';
const About = () => {
    
    return (
    <Box mt={1}>
      <Box sx={{borderTop:2,width:"90%",borderColor:'lightgray',ml:'5%'}}></Box>
      <Stack direction={'row'} justifyContent={'center'} mt={2}>
        <Box>
          <Typography sx={{fontSize:24,textDecoration:'underline',textDecorationColor:'pink'}}>About Bioinspire-Explore</Typography>
        </Box>  
      </Stack>
      <Box width='80%' ml='10%'>
        <Typography m={1} color={'text.secondary'} fontSize={16}>
        Bioinspire-Explore supports bioinspired innovation by providing accessible and in-depth information about the biological world.
        </Typography>        
        <Typography m={1} color={'text.secondary'} fontSize={16}>
        Developed by CEEBIOS and the MNHN using Computer-Aided Biomimetics, Bioinspire-Explore is a free tool providing biological inspiration applicable to a wide range of fields, including design and engineering and even artistic endeavours.        </Typography>        
        <Typography m={1} color={'text.secondary'} fontSize={16}>
        Get inspired by biodiversity with Bioinspire-Explore!
        </Typography>        
      </Box>
    </Box>
    );
  }

export default About