import { Typography, Box, Autocomplete, TextField } from "@mui/material"
import {useState, useEffect, useContext } from "react";
import { BSearchContext, ExpansionContext } from "../context/Context";
import { host } from "./Config";

const AutocompleteW2V = ({setSelected}) => {
    const [search, setSearch] = useContext(BSearchContext)
    const [expansion, setExpansion] = useContext(ExpansionContext)
    const [options, setOptions] = useState([])

    useEffect(()=>{
      setOptions([])
    },[search.mode])

    const modeMap = {
        taxon:"species",
        process:"processes",
        habitat:"ecozones",
        measurement:"quantities",
        word:"word"
    }

    const getAutocomplete = (q) => {
        if (q.length>2) {
          fetch(`${host}/autocomplete/${q}/${modeMap[search.mode.toLowerCase()]}`)
          .then(res=>res.json())
          .then(res=>setOptions(res))
        }
      }

    const handleChange = (val)=> {
        let node = null
        if (val!==null) {
            node = {name:val,id:val,type:search.mode}
            setExpansion({...expansion, nodes:[{...node,score:1}], expanded:[node.name], expansions:[]})
            setSelected(node)
            console.log(node)
          }
        setSearch({...search, search:node})
        setExpansion({...expansion, nodes:[], expanded:[], expansions:[]})
    }

    return (
        <Autocomplete
        options={options}
        sx={{
        bgcolor:"white",
        width: "100%",
        '& .MuiAutocomplete-input, & .MuiInputLabel-root': {fontSize: 14},
        }}
        onInputChange={(e, val) => {getAutocomplete(val)}}                
        renderInput={(params) => <TextField {...params} placeholder={`Search ${search.mode}`} />}     
        getOptionLabel={(option) => Array.isArray(option)?option[0]:option}     
        renderOption={(props, option) => (
            <Box component="li" {...props}>
                <Typography key={Array.isArray(option)?option.join():option} sx={{fontSize:12}}>
                {Array.isArray(option)?option[0]:option}
                </Typography>
            </Box>
          )}
        onChange={(e,val)=>handleChange(val)}
        value={((search.search!==null)&&(search.search!==undefined))?search.search.name:''}
    />
    )
}

export default AutocompleteW2V