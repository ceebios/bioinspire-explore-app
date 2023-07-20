
import { Box, Button } from "@mui/material"
import { useContext, useEffect } from "react"
import { SearchContext, ClimateContext, RasterContext } from "../context/Context"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { blue } from "@mui/material/colors";

import {Typography, Stack} from "@mui/material";
import {BsThermometerSnow, BsThermometerSun, BsCloudRainHeavy, BsWind,BsSun } from 'react-icons/bs'
import {GiMountains, GiDesert} from 'react-icons/gi'
import { host } from "./Config";


const Climate = () => {
  const [climate, setClimate] = useContext(ClimateContext)
  const [search, setSearch] = useContext(SearchContext)
  const [raster, setRaster] = useContext(RasterContext)
  
  const units = {
    'tmax':['C',<BsThermometerSun color={blue[500]} fontSize={18}/>,'MAX Temperature'],
    'tmin':['C',<BsThermometerSnow color={blue[500]} fontSize={18}/>, 'MIN Temperature'],
    'precmin':['mm',<GiDesert color={blue[500]} fontSize={18}/>, 'MIN Rainfall'],
    'precmax':['mm',<BsCloudRainHeavy color={blue[500]} fontSize={18}/>, 'MAX Rainfall'],
    'wind':['m/s',<BsWind color={blue[500]} fontSize={18}/>, 'MAX Wind speed'],
    'srad':['kJ/m2',<BsSun color={blue[500]} fontSize={18}/>, 'MAX Solar irradiance'],
    'elev':['m',<GiMountains color={blue[500]} fontSize={18}/>, 'Elevation']
  }

  useEffect(()=>{
    setRaster(false)
    fetch(`${host}/downloadmap/${search.species.key}`)
    .then(res=>res.json())
    .then(data=>setRaster(true))
  }, [search.species])

  const handleRequest = (event,metric)=> {
    event.preventDefault()
    if (!raster) {
      alert(`Waiting for a background process (Downloading of ${search.species.label} distribution range). Please try again in a few seconds.`)
    }

    fetch(`${host}/climate/${metric}`)
    .then(res=>res.json())
    .then(res=>{
      let clim = {...climate, [search.species.key]:{...climate[search.species.key],[metric]:res}}
      setClimate(clim)
    })
  }

  return (
    <Box height={'650px'}>
      <Stack position={'relative'} height='100%'>
        <Typography>
          {`Climate statistics over ${search.species.label}'s distribution range. `}
        </Typography>
        <Box sx={{display:'flex',justifyContent:'center'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell minWidth="100px"><></></TableCell>
                  <TableCell minWidth="100px">Metric (Monthly)</TableCell>
                  <TableCell minWidth="100px">Value</TableCell>
                  <TableCell minWidth="100px">Range</TableCell>
                  <TableCell minWidth="100px">Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Object.entries(units).map(([k,v])=>(
                    <TableRow key={k}>
                      <TableCell>
                        {(search.species.key in climate)&&((k in climate[search.species.key]))?
                        <>{v[1]}</>:<Button size="small" endIcon={v[1]} onClick={(e)=>handleRequest(e,k)}>Request</Button>}
                      </TableCell>
                      <TableCell>
                      {v[2]}
                      </TableCell>
                      <TableCell>
                        {(search.species.key in climate)&&((k in climate[search.species.key]))?
                        climate[search.species.key][k].value.toFixed(1):<></>}
                      </TableCell>
                      <TableCell>
                        {(search.species.key in climate)&&((k in climate[search.species.key]))?
                        `${climate[search.species.key][k].range[0].toFixed(1)} - ${climate[search.species.key][k].range[1].toFixed(1)}`:<></>}
                      </TableCell>
                      <TableCell>
                      {v[0]}
                      </TableCell>                      
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
        </Box>
        <Typography sx={{position:'absolute', bottom:2, fontSize:12,color:'text.secondary'}}>
          Data sources: WordClim and GBIF
        </Typography>
      </Stack>
    </Box>
  )
}

export default Climate


/*
`${climate[search.species.key][k].range[0].toFixed(1)} - ${climate[search.species.key][k].range[1].toFixed(1)}`:<></>}
*/