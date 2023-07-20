import { Box, Tooltip, Stack, Typography } from "@mui/material"
var path = process.env.PUBLIC_URL

function Contact() {
  return (
    <Stack sx={{width:'100%', minHeight:'200px', justifyContent:'center',alignItems:'center'}} spacing={2} mt={1}>
      <Box sx={{borderTop:2,width:"90%",borderColor:'lightgray'}}>
      </Box>
        <Box>
          <Typography sx={{fontSize:24,textDecoration:'underline',textDecorationColor:'pink'}}>Collaborators</Typography>
        </Box>
        <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
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
            <Tooltip title='BioMIg'>
                <Typography
                    noWrap
                    component="a"
                    href="https://ceebios.com/biomig/" 
                    target="_blank"
                    marginRight={1}
                    >
                    <img style={{height:"46px"}} src={path+"/powered1.png"} alt="BioMIg"/>
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
                    <img style={{height:"46px"}} src={path+"/ceebios.png"} alt="Ceebios"/>
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
                    <img style={{height:"46px"}} src={path+"/myceco.png"} alt="Myceco"/>
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
                    <img style={{height:"46px"}} src={path+"/relance.jpg"} alt="France Relance"/>
                </Typography>
            </Tooltip>                                    
          </Stack>
        </Box>
    </Stack>
  )
}

export default Contact