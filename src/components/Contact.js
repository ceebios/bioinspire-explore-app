import { Box, Tooltip, Stack, Typography, Button } from "@mui/material"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

var path = process.env.PUBLIC_URL
const logos = () => {
  return (
    <Stack direction='row' spacing={2} margin='auto' justifyContent='center' alignItems='center' >
      <Tooltip title='MNHN'>
        <Typography
          noWrap
          component="a"
          href="https://www.mnhn.fr/en/bioinspire-museum"
          target="_blank"
        >
          <img style={{ height: "46px" }} src={path + "/mnhn.svg"} alt="MNHN" />
        </Typography>
      </Tooltip>
      <Tooltip title='BioMIg'>
        <Typography
          noWrap
          component="a"
          href="https://ceebios.com/biomig/"
          target="_blank"
          marginRight={1}
        >
          <img style={{ height: "46px" }} src={path + "/powered1.png"} alt="BioMIg" />
        </Typography>
      </Tooltip>
      <Tooltip title='Ceebios'>
        <Typography
          noWrap
          component="a"
          href="https://ceebios.com/"
          target="_blank"
          marginRight={1}
        >
          <img style={{ height: "46px" }} src={path + "/ceebios.png"} alt="Ceebios" />
        </Typography>
      </Tooltip>
      <Tooltip title='Myceco'>
        <Typography
          noWrap
          component="a"
          href="https://www.myceco.com/"
          target="_blank"
          marginRight={1}
        >
          <img style={{ height: "46px" }} src={path + "/myceco.png"} alt="Myceco" />
        </Typography>
      </Tooltip>
      <Tooltip title='France Relance'>
        <Typography
          noWrap
          component="a"
          href="https://www.economie.gouv.fr/plan-de-relance"
          target="_blank"
          marginRight={1}
        >
          <img style={{ height: "46px" }} src={path + "/relance.png"} alt="France Relance" />
        </Typography>
      </Tooltip>
      <Tooltip title='NextGenEU'>
        <Typography
          noWrap
          component="a"
          href="https://next-generation-eu.europa.eu/index_en#make-it-green"
          target="_blank"
          marginRight={1}
        >
          <img style={{ height: "46px" }} src={path + "/nextgen.png"} alt="NextGenEU" />
        </Typography>
      </Tooltip>
    </Stack>
  )
}
function Contact() {
  const handleContact = () => {

  }

  return (
    <Stack sx={{ width: '98%', height: '60px', ml: '1%', justifyContent: 'center', alignItems: 'center', borderTop: 'solid 2px darkgrey' }} spacing={2}>
      <Stack direction={'row'} width='100%' justifyContent={'space-between'}>
        <div></div>
        {logos()}
        <Button href="mailto:bioinspire-explore@mnhn.fr" endIcon={<AlternateEmailIcon />}>Contact us</Button>
      </Stack>

    </Stack>
  )
}

export default Contact