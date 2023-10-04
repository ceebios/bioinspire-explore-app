import { Box, Typography, Link } from '@mui/material';
const About = () => {

  return (
    <Box mt={5}>
      <Box sx={{ borderTop: 2, width: "100%", borderColor: 'darkgray' }}></Box>
      <Box width='100%' ml='0%'>
        <Typography m={1} color={'text.secondary'} fontSize={16}>
          Bioinspire-Explore supports bioinspired innovation by providing accessible information about the biological world.
        </Typography>
        <Typography m={1} color={'text.secondary'} fontSize={16}>
          Developed by the  <Link target="_blank" rel="noopener" href="https://www.mnhn.fr/en/bioinspire-museum">French Museum of Natural History</Link> and <Link target="_blank" rel="noopener" href='https://ceebios.com/'>CEEBIOS</Link> using Computer-Aided Biomimetics, Bioinspire-Explore is a free tool offering biological inspiration applicable to a wide range of fields.
        </Typography>
        <Typography m={1} color={'text.secondary'} fontSize={16}>
          Get inspired by biodiversity with Bioinspire-Explore!
        </Typography>
      </Box>
    </Box>
  );
}

export default About