
import { Box } from "@mui/material"
import { host } from "./Config"
import { useState, useContext,useEffect, useRef } from "react"
import { RasterContext, ClimateContext } from "../context/Context"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import {Typography, Stack} from "@mui/material";
import {BsThermometerSnow, BsThermometerSun, BsCloudRainHeavy, BsWind,BsSun } from 'react-icons/bs'
import {GiMountains, GiDesert} from 'react-icons/gi'
import CircularProgress from '@mui/material/CircularProgress';

const Climate = () => {
  const [loading, setLoading] = useState(false)
  const [raster, setRaster] = useContext(RasterContext)
  const [climate, setClimate] = useContext(ClimateContext)
  const firstUpdate = useRef(true);
  
  const units = {
    'tmax':['C',<BsThermometerSun/>,'Maximum monthly temperature'],
    'tmin':['C',<BsThermometerSnow/>, 'Minimum monthly temperature'],
    'precmin':['mm',<GiDesert/>, 'Minimum monthly rainfall'],
    'precmax':['mm',<BsCloudRainHeavy/>, 'Maximum monthly rainfall'],
    'wind':['m/s',<BsWind/>, 'Maximum monthly wind speed'],
    'srad':['kJ/m2',<BsSun/>, 'Maximum monthly solar irradiance'],
    'elev':['m',<GiMountains/>, 'Elevation']
  }

  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }    
    if (raster) {
      console.log("Climate")
      setLoading(true)
      fetch(`${host}/climate`)
      .then(res=>res.json())
      .then(data=>{setClimate(data); setLoading(false)})
    }
  },[raster])


  return (
    <Box height={'650px'}>
      <Stack >
        <Typography>
          Climate statistics over the species' distribution range. 
        </Typography>
        <Typography>
          Data sources: WordClim and GBIF.
        </Typography>
        <Box sx={{display:'flex',justifyContent:'center'}}>
          <List>
            {loading?<CircularProgress/>:
                Object.entries(climate).length===0?<Typography>No species selected</Typography>:
                <>
                  {Object.entries(climate).map(([k,v])=>(
                    <Tooltip key={units[k][2]} title={units[k][2]} placement="left">
                      <ListItem disablePadding>
                        <ListItemIcon>
                          {units[k][1]}
                        </ListItemIcon>
                        <ListItemText primary={`${v.toFixed(1)} ${units[k][0]}`}/>
                      </ListItem>
                    </Tooltip>
                  ))}              
                </>  
            }
          </List>
        </Box>
      </Stack>
    </Box>
  )
}

export default Climate
