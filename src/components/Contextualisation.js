import { Box, Stack, Typography, Divider } from "@mui/material"
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
import { ImWikipedia, ImEarth } from "react-icons/im"
import { TfiGallery } from "react-icons/tfi"
import { TiWeatherPartlySunny } from "react-icons/ti"
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";
import { SearchContext } from "../context/Context";
import Species from "./Species";
import LinkIcon from '@mui/icons-material/Link';
import SmartLinks from "./SmartLinks"
import Biomig from "./Biomig"
import { blue } from "@mui/material/colors"

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
  const [height, setHeight] = useState(100)
  const ref = useRef()

  useEffect(() => {
    if (ref !== null) {
      setHeight(ref.current.clientHeight)
    }
  }, [])
  console.log(height)
  return (
    <Box height={'100%'} width='98%' ml="1%" >
      <Box ref={ref} textAlign={'center'} pb={3}>
        <Typography variant='h5' color={blue[700]}>Learn from biodiversity</Typography>
        <Typography color='text.secondary'>Search for a species in the “Search species” box (e.g. Canis lupus) and find information about its taxonomy, where it’s found, what it looks like, and its climatic niche.</Typography>
      </Box>
      <Stack direction={'row'} spacing={1} display={'flex'} divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Species mode={'gbif'} />
          </Box>
          <Graph height={height} />
        </Box>
        <Box sx={{ flex: 1, maxWidth: '49%' }}>
          {'key' in search.species ?
            <TabContext size='small' value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" >
                  <StyledTab value="wiki" label="Wikipedia" icon={<ImWikipedia />} iconPosition="start" />
                  <StyledTab value="map" label="Distribution" icon={<ImEarth />} iconPosition="start" />
                  <StyledTab value="gallery" label="Gallery" icon={<TfiGallery />} iconPosition="start" />
                  <StyledTab value="climate" label="Climate" icon={<TiWeatherPartlySunny />} iconPosition="start" />
                  <StyledTab value="links" label="Links" icon={<LinkIcon />} iconPosition="start" />
                </TabList>
              </Box>
              <TabPanel value="wiki"><Wiki search={search} /></TabPanel>
              <TabPanel value="map"><Map search={search} /></TabPanel>
              <TabPanel value="gallery"><Gallery search={search} /></TabPanel>
              <TabPanel value="climate"><Climate search={search} /></TabPanel>
              <TabPanel value="links">
                <Stack spacing={2}>
                  <Biomig selected={{ type: "taxon", name: search.species.label }} />
                  <Divider sx={{ pt: 4 }} />
                  <Box pl={1} pt={4}>
                    <SmartLinks selected={{ type: "taxon", name: search.species.label }} />
                  </Box>
                </Stack>
              </TabPanel>
            </TabContext > : <></>}
        </Box >
      </Stack >
    </Box >
  )
}

export default Contextualisation
