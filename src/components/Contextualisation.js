import { Box, Typography, Stack } from "@mui/material"
import Wiki from "./Wiki";
import Map from "./Map";
import SmartLinks from "./SmartLinks";
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
import {FiExternalLink} from "react-icons/fi"
import Species from "./Species";

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none'
  }),
);

function Contextualisation() {
  const [value, setValue] = useState('wiki');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box sx={{width:"100%", mt:9, height:'800px'}}>
        <Stack direction={'row'} spacing={1} mt={1}>
            <Box width='50%' sx={{boxShadow:1}}>
              <Box sx={{display:'flex', justifyContent:'center'}}>
                <Species mode={'gbif'}/>
              </Box>
              <Graph/>   
            </Box>
            <Box sx={{width:'50%',boxShadow:1}}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                  <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" >
                    <StyledTab value="wiki" label="Wikipedia" icon={<ImWikipedia/>} iconPosition="start" />
                    <StyledTab value="map" label="Distribution" icon={<ImEarth/>} iconPosition="start" />
                    <StyledTab value="gallery" label="Gallery" icon={<TfiGallery/>} iconPosition="start"/>
                    <StyledTab value="climate" label="Climate" icon={<TiWeatherPartlySunny/>} iconPosition="start"/>
                    <StyledTab value="links" label="External Links" icon={<FiExternalLink/>} iconPosition="start"/>
                  </TabList>
                </Box>
                <TabPanel value="wiki"><Wiki/></TabPanel>
                <TabPanel value="map"><Map/></TabPanel>
                <TabPanel value="gallery"><Gallery/></TabPanel>
                <TabPanel value="climate"><Climate/></TabPanel>
                <TabPanel value="links"><SmartLinks/></TabPanel>
              </TabContext>
            </Box>    
        </Stack>
    </Box>    
  )
}

export default Contextualisation

/*

*/ 