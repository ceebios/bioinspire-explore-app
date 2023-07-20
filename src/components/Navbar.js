import { AppBar, Toolbar, styled, Typography,Tooltip, Stack, Button} from "@mui/material"
import HelpOutline from "@mui/icons-material/HelpOutline";
import Lang from "./Lang"
import { useContext } from "react";
import { AppContext } from "../context/Context";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { blue,red } from "@mui/material/colors";

var path = process.env.PUBLIC_URL

const StyledToolbar = styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
    backgroundColor:'white',
    //backgroundImage:`url(${path+"/navbar.jpg"})`,
    backgroundSize:"cover"
})

const Navbar = () => {
    const [app, setApp] = useContext(AppContext)
    const [anchor, setAnchor] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (e,target) =>{
        e.preventDefault()
        navigate(target)
    }

    const handleMenu = (event) => {
        setAnchor(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchor(null);
      };
    
    const active = {
        textDecoration:'underline', textDecorationColor:'purple',color:blue[800],
        '&:hover':{
            color:blue[800]
        }
    }
    const passive = {
        color:blue[500],
        '&:hover':{
            color:blue[800]
        }
    }

    return (
    <AppBar  position="fixed" sx={{typography: 'body1'}}>
        <StyledToolbar>
            <Stack direction='row' spacing={2}>
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
            <Stack direction={'row'} spacing={2}>
                <Button onClick={(e)=>handleClick(e,"/")} sx={location.pathname==='/'?active:passive}>Home</Button>
                <Tooltip title="Discover species of existing bio-inspired projects">
                <Button onClick={(e)=>handleClick(e,"/learn")} sx={location.pathname==='/learn'?active:passive}>Bio-inspiration</Button>
                </Tooltip>
                <Tooltip  title="Get familiar with a species of your choice">
                <Button onClick={(e)=>handleClick(e,"/explore")} sx={location.pathname==='/explore'?active:passive}>Biodiversity</Button>
                </Tooltip>
                <Tooltip  title="AI for bio-inspiration and external ressources of biodiversity data">
                <Button onClick={(e)=>handleClick(e,"/inspire")} sx={location.pathname==='/inspire'?active:passive}>Go Further</Button>
                </Tooltip>                
            </Stack>
            <Button onClick={(e)=>{e.preventDefault();setApp({...app, help:true})}} sx={{color:blue[800]}} startIcon={<HelpOutline fontSize="small" sx={{color:blue[800] }}/>}>Help</Button>
            {/*
            <Box>
                <IconButton
                    size="large"
                    aria-label="help"
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={(e)=>handleMenu(e)}
                    color="inherit"
                >
                    <MenuIcon sx={{color:'#039be5'}}/>
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={anchor}
                    keepMounted
                    open={Boolean(anchor)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={(e)=>{e.preventDefault();setApp({...app, help:true})}}>
                        <ListItemIcon>
                            <HelpOutline fontSize="small" sx={{color:'#039be5' }} />
                        </ListItemIcon>
                        <ListItemText>Help</ListItemText>
                    </MenuItem>
                    
                    <MenuItem>
                        <ListItemIcon>
                            <LanguageIcon fontSize="small" sx={{color:'#039be5' }}/>
                        </ListItemIcon>
                        <ListItemText><Lang/></ListItemText>                        
                    </MenuItem>
                </Menu>
            </Box>             
            */}
    

        </StyledToolbar>
    </AppBar>
  )
}

export default Navbar

/*

*/