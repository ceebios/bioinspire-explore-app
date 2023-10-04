import { AppBar, Toolbar, styled, Typography, Tooltip, Stack, Button } from "@mui/material"
import HelpOutline from "@mui/icons-material/HelpOutline";
import { useContext } from "react";
import { AppContext } from "../context/Context";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

var path = process.env.PUBLIC_URL

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: 'white',
    backgroundSize: "cover"
})

const Navbar = () => {
    const [app, setApp] = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (e, target) => {
        e.preventDefault()
        navigate(target)
    }

    const active = {
        textDecoration: 'underline', textDecorationColor: 'purple', color: blue[800],
        '&:hover': {
            color: blue[800]
        }
    }
    const passive = {
        color: blue[500],
        '&:hover': {
            color: blue[800]
        }
    }

    return (
        <AppBar position="fixed" sx={{ typography: 'body1' }}>
            <StyledToolbar>
                <Stack direction='row' spacing={2}>
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
                    <Tooltip title='Ceebios'>
                        <Typography
                            noWrap
                            component="a"
                            href="https://ceebios.com/" // "https://ceebios.com/wp-content/uploads/2022/01/Biomig-Ceebios-web.pdf"
                            target="_blank"
                            marginRight={1}
                        >
                            <img style={{ height: "46px" }} src={path + "/powered1.png"} alt="BioMIg" />
                        </Typography>
                    </Tooltip>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                    <Button onClick={(e) => handleClick(e, "/")} sx={location.pathname === '/' ? active : passive}>Home</Button>
                    <Tooltip title="Innovations inspired by various species">
                        <Button onClick={(e) => handleClick(e, "/learn")} sx={location.pathname === '/learn' ? active : passive}>Bioinspiration</Button>
                    </Tooltip>
                    <Tooltip title="Species taxonomy, distribution and climate">
                        <Button onClick={(e) => handleClick(e, "/explore")} sx={location.pathname === '/explore' ? active : passive}>Biodiversity</Button>
                    </Tooltip>
                    <Tooltip title="Scientific literature and other online ressources">
                        <Button onClick={(e) => handleClick(e, "/inspire")} sx={location.pathname === '/inspire' ? active : passive}>Go Further</Button>
                    </Tooltip>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                    <Button onClick={(e) => { e.preventDefault(); setApp({ ...app, help: true }) }} sx={{ color: blue[800] }} startIcon={<HelpOutline fontSize="small" sx={{ color: blue[800] }} />}>Help</Button>
                    <Button onClick={(e) => { e.preventDefault(); setApp({ ...app, about: true }) }} sx={{ color: blue[800] }} startIcon={<InfoOutlinedIcon fontSize="small" sx={{ color: blue[800] }} />}>About</Button>
                </Stack>
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar

/*

*/