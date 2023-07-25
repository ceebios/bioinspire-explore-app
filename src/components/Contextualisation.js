import { Box, Button, Stack, Typography } from "@mui/material"
import Wiki from "./Wiki";
import Map from "./Map";
import Climate from "./Climate";
import Graph from "./Graph";
import Gallery from "./Gallery";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import {ImWikipedia, ImEarth} from "react-icons/im"
import {TfiGallery} from "react-icons/tfi"
import {TiWeatherPartlySunny} from "react-icons/ti"
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/Context";
import Species from "./Species";

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none'
  }),
);

function Contextualisation() {
  const navigate = useNavigate()
  const [search, setSearch] = useContext(SearchContext)
  const [value, setValue] = useState('wiki');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box sx={{width:"100%", mt:9, height:'800px'}}>
        <Stack direction={'row'} spacing={1} mt={1}>
            <Box width='50%' sx={{boxShadow:0}}>
              <Box sx={{color:'text.secondary',ml:1,mb:2, mr:1,textAlign:"center"}}>
                    <Typography variant="h6">Explore <b>biodiversity</b> data</Typography>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center'}}>
                  <Species mode={'gbif'}/>
              </Box>
              <Graph/>   
            </Box>
            <Box sx={{width:'50%',boxShadow:1}}>
              {'key' in search.species?
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                  <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" >
                    <StyledTab value="wiki" label="Wikipedia" icon={<ImWikipedia/>} iconPosition="start" />
                    <StyledTab value="map" label="Distribution" icon={<ImEarth/>} iconPosition="start" />
                    <StyledTab value="gallery" label="Gallery" icon={<TfiGallery/>} iconPosition="start"/>
                    <StyledTab value="climate" label="Climate" icon={<TiWeatherPartlySunny/>} iconPosition="start"/>
                    <Button onClick={(e)=>{e.preventDefault();navigate('/inspire')}} startIcon={<EmojiNatureIcon/>}>Go further</Button>
                  </TabList>
                </Box>
                <TabPanel value="wiki"><Wiki search={search}/></TabPanel>
                <TabPanel value="map"><Map search={search}/></TabPanel>
                <TabPanel value="gallery"><Gallery search={search}/></TabPanel>
                <TabPanel value="climate"><Climate search={search}/></TabPanel>
              </TabContext>:<></>}
            </Box>    
        </Stack>
    </Box>    
  )
}

export default Contextualisation
