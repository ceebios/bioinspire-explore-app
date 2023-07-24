import { Typography, Box, Autocomplete, TextField, Tooltip } from "@mui/material"
import { useContext, useState } from "react";
import { SearchContext} from "../context/Context";
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

const Species = ({mode}) => {
    const [search, setSearch] = useContext(SearchContext)
    const [options, setOptions] = useState([])
    const [name, setName] = useState("")
  
    const filterGBIF = (data)=> {
      if (data.length===0) {
        return []
      }
      let res = data.filter(el => (el.rank !== "VARIETY" && el.rank !== undefined && 'canonicalName' in el && el.canonicalName.length>0))
      res = _.uniqBy(res,"canonicalName")
      res = res.filter((el)=>(ORDER[el.rank] || 8)<8)
        .map(el => ({
          label:el.canonicalName,
          rank:el.rank,
          order:ORDER[el.rank] || 8,
          key:el.key
        }))
      return _.sortBy(res,"order")
    }
    

    const getSuggestionsGBIF = (q) => {
      const url_vernacular = `https://api.gbif.org/v1/species/search?q=${encodeURI(q)}&qField=VERNACULAR&status=ACCEPTED&datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&limit=10` //&qField=VERNACULAR &habitat=freshwater/terrestrial/marine
      const url_canonical = `https://api.gbif.org/v1/species/suggest?q=${encodeURI(q)}&status=ACCEPTED&limit=10`
        fetch(url_canonical)
        .then(res=>res.json())
        .then(data=>{
            fetch(url_vernacular)
            .then(vres=>vres.json())
            .then(vdata=>{
              const results = data.concat(vdata.results)
              const entries = filterGBIF(results)
              setOptions(entries) 
            })
        })
      }

    
    const handleChange = (val) => {
      if (val===null) {
        setSearch({...search, species:{}})
      } else {
          setSearch({...search, species:val})
      }      
    }

    const handleName = (e,option) => {
      e.preventDefault()
      fetch(`https://api.gbif.org/v1/species/${option.key}/vernacularNames`)
      .then(res=>res.json())
      .then(res=>{
        let temp = res.results.filter(r=>r.language==='eng').map(r=>r.vernacularName)
        if (temp.length>0) {
          temp = [...new Set(temp)];
          setName(temp.slice(0,2).join(", "))
        } else {
          setName("")
        }
      })
    }

    return (
        <Box>
          <Autocomplete
                filterOptions={(options, state) => options}
                options={options}
                getOptionLabel={(option) => 'label' in option? option.label:''}
                sx={{
                bgcolor:"white",
                width: "300px",
                '& .MuiAutocomplete-input, & .MuiInputLabel-root': {fontSize: 14},
                }}
                onInputChange={(e, val) => {getSuggestionsGBIF(val)}}                
                renderInput={(params) => <TextField {...params} label="Search species"/>}     
                isOptionEqualToValue = {(opt,val)=>opt.key===val.key}           
                renderOption={(props, option) => (
                   <Tooltip title={name}>
                    <Box component="li" {...props} onMouseEnter={(e)=>handleName(e,option)}>
                          <Typography sx={{color:COLORS[option.rank],fontWeight:'bold',fontSize:12}}>
                          {option.label} {option.rank}
                          </Typography>
                    </Box>
                    </Tooltip>
                  )}
                value={search.species}
                onChange={(e,val)=>handleChange(val)}
            />
        </Box>
    )
}

export default Species
