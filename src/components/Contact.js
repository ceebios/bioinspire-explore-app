import { Box, Tooltip, Stack, Typography } from "@mui/material"
var path = process.env.PUBLIC_URL

function Contact() {
  return (
    <Stack sx={{width:'100%', minHeight:'200px', justifyContent:'center',alignItems:'center'}} spacing={2} mt={1}>
      <Box sx={{borderTop:2,width:"90%",borderColor:'lightgray'}}>
      </Box>
        <Box>
          <Typography sx={{fontSize:28,textDecoration:'underline',textDecorationColor:'pink'}}>Contact</Typography>
        </Box>
        <Stack direction='row' spacing={2} margin='auto'>
            <Tooltip title='MNHN'>
                <Typography
                    noWrap
                    component="a"
                    href="https://www.mnhn.fr/fr"
                    target="_blank"
                    >
                    <img style={{height:"46px"}} src={path+"/mnhn.svg"} alt="MNHN"/>
                </Typography>  
            </Tooltip>                         
            <Tooltip title='Ceebios'>
                <Typography
                    noWrap
                    component="a"
                    href="https://ceebios.com/" // "https://ceebios.com/wp-content/uploads/2022/01/Biomig-Ceebios-web.pdf"
                    target="_blank"
                    marginRight={1}
                    >
                    <img style={{height:"46px"}} src={path+"/powered1.png"} alt="BioMIg"/>
                </Typography>
            </Tooltip>
        </Stack>
    </Stack>
  )
}

export default Contact