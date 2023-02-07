import { Typography, Box, Switch, Autocomplete, TextField, Stack } from "@mui/material"
import { styled } from '@mui/material/styles';
import { host } from "./Config";
import { useContext, useEffect, useState , useRef} from "react";
import { SearchContext, RasterContext } from "../context/Context";
import React from "react";

var _ = require('lodash')

const COLORS = {
    SPECIES:"#fb2056",
    GENUS:"#fc8f5b",
    FAMILY:"#ffd055",
    ORDER:"#8dd58c",
    CLASS:"#38c9b1",
    PHYLUM:"#1798c3",
    KINGDOM:"#182573",
  }
  
export const ORDER = {
    KINGDOM:1,
    PHYLUM:2,
    CLASS:3,
    ORDER:4,
    FAMILY:5,
    GENUS:6,
    SPECIES:7,
    SUBSPECIES:8,
    VARIETY:9,
  }

const VSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  marginTop:0,
  transform:'rotate(90deg)',
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(8px)',
    '&.Mui-checked': {
      transform: 'translateX(33px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#039be5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: 'rgb(220,220,220)',
    width: 16,
    height: 16,
    transform: 'translateY(8px)',
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#2e7d32',
    borderRadius: 20 / 2,
  },
}));


const Species = ({mode}) => {
    const [search, setSearch] = useContext(SearchContext)
    const [raster, setRaster] = useContext(RasterContext)    
    const firstUpdate = useRef(true);

    const [options, setOptions] = useState([])
  
    useEffect(()=>{
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      if ('key' in search.species) {
        console.log('Search')
        fetch(`${host}/downloadmap/${search.species.key}`)
        .then(res=>res.json())
        .then(data=>setRaster(true))
      }
    },[search.species])

    const handleAutocomplete = (q) => {
      if (mode==='biomig') {
        getAutocomplete(q)
      } else {
        getSuggestionsGBIF(q)
      }
    }
    const getAutocomplete = (q) => {
      if (q.length>2) {
        fetch(`${host}/autocomplete/${q}/species`)
        .then(res=>res.json())
        .then(res=> {
                  const opts = res.map(x=> ({
                    label:x[0],
                    rank:'',
                    order:8,
                    key:x[1]          
                  }))
                  setOptions(opts)
                }        
              )
      }
    }
    

    const getSuggestionsGBIF = (q) => {
        fetch(`https://api.gbif.org/v1/species/suggest?q=${encodeURI(q)}`)
        .then(res=>res.json())
        .then(data=>{
            let res = data.filter(el => el.rank !== "VARIETY" && el.rank !== undefined && !("taxonID" in el) && el.status==="ACCEPTED")
            res = _.uniqBy(res,"canonicalName")
            let results = res.filter(el=>el.canonicalName.length>0).map(el => ({
                label:el.canonicalName,
                rank:el.rank,
                order:ORDER[el.rank] || 8,
                key:el.key
              }))
            results = _.sortBy(results,"order")
            setOptions(results)
            })
      }

    
    const handleChange = (val) => {
      if (val===null) {
        setRaster(false)
        setSearch({...search, species:{}})
      } else {
        if (mode==='biomig') {
          fetch(`https://api.gbif.org/v1/species/${val.key}`)
          .then(res=>res.json())
          .then(res=>{
                        const spec = {
                          label:res.canonicalName,
                          rank:res.rank,
                          order:ORDER[res.rank] || 8,
                          key:res.key
                        }         
                        setRaster(false)
                        setSearch({...search, species:spec})
                      }
          )
        } else {
          setRaster(false)
          setSearch({...search, species:val})
        }
      }      
    }

    const defaultProps = {
      options: options,
      getOptionLabel: (option) => 'label' in option? option.label:''
    };    

    return (
        <Box>
          <Stack direction='row'>
          <Autocomplete
                {...defaultProps}
                sx={{
                bgcolor:"white",
                width: "300px",
                '& .MuiAutocomplete-input, & .MuiInputLabel-root': {fontSize: 14},
                }}
                onInputChange={(e, val) => {handleAutocomplete(val)}}                
                renderInput={(params) => <TextField {...params} label="Search species"/>}     
                isOptionEqualToValue = {(opt,val)=>opt.key===val.key}           
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                        <Typography sx={{color:COLORS[option.rank],fontWeight:'bold',fontSize:12}}>
                        {option.label} {option.rank}
                        </Typography>
                    </Box>
                  )}
                value={search.species}
                onChange={(e,val)=>handleChange(val)}
            />
          </Stack>
        </Box>
    )
}

export default Species
