import { Typography, Box, Autocomplete, TextField } from "@mui/material"
import { useState, useEffect, useContext } from "react";
import { W2VValueContext, ExpansionContext } from "../context/Context";
import { host } from "./Config";

const AutocompleteW2V = ({ mode, setSelected }) => {
  const [expansion, setExpansion] = useContext(ExpansionContext)
  const [options, setOptions] = useState([])
  const [value, setValue] = useContext(W2VValueContext)



  useEffect(() => {
    if ((value !== null) && (value.length > 2)) {
      console.log('value')
      fetch(`${host}/autocomplete/${value.toLowerCase()}/${modeMap[mode.toLowerCase()]}`)
        .then(res => res.json())
        .then(res => {
          setOptions(res)
          if (res.length > 0) {
            handleChange(value)
          } else {
            handleChange(null)
          }

        })

    } else {
      setOptions([])
    }
  }, [])

  const modeMap = {
    taxon: "species",
    process: "processes",
    habitat: "ecozones",
    measurement: "quantities",
    word: "word"
  }

  const getAutocomplete = (q) => {
    if (q.length > 2) {
      fetch(`${host}/autocomplete/${q.toLowerCase()}/${modeMap[mode.toLowerCase()]}`)
        .then(res => res.json())
        .then(res => {
          setOptions(res)
        })
    }
  }

  const handleChange = (val) => {
    if (val !== null) {
      const node = { name: val, type: mode }
      setExpansion({ ...expansion, nodes: [{ ...node, score: 1 }], expanded: [node.name], expansions: [] })
      setSelected(node)
      setValue(val)
    } else {
      setExpansion({ ...expansion, nodes: [], expanded: [], expansions: [] })
      setValue(null)

    }
  }

  return (
    <Autocomplete
      freeSolo
      value={value}
      options={options}
      sx={{
        bgcolor: "white",
        width: "100%",
        '& .MuiAutocomplete-input, & .MuiInputLabel-root': { fontSize: 14 },
      }}
      onInputChange={(e, val) => { getAutocomplete(val) }}
      onChange={(e, val) => handleChange(val)}
      renderInput={(params) => <TextField {...params} placeholder={`Search ${mode}`} />}
      getOptionLabel={(option) => Array.isArray(option) ? option[0] : option}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Typography key={Array.isArray(option) ? option.join() : option} sx={{ fontSize: 12 }}>
            {Array.isArray(option) ? option[0] : option}
          </Typography>
        </Box>
      )}
      noOptionsText={value === "" ? "Type to search" : `No such ${mode} in BiOMIg database`}
    />
  )
}

export default AutocompleteW2V