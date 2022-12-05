import {Box, Stack,Typography, Autocomplete, TextField, Paper} from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    options:[],
    type:'species',
    topn:20,
    suggestions:[],
    term:''
  })

  const host = "https://itn5back-y5c3h4ocuq-wl.a.run.app"
  //const host = "http://localhost:8000"

  const getAutocomplete = (term) => {
    setState({...state, term:term})
    if (term.length>2) {
      fetch(`${host}/autocomplete/${term}`)
      .then(res=>res.json())
      .then(res=>setState({...state, options:res,term:term}))  
    }
  }

  const getSuggestions = (val) => {
    fetch(`${host}/suggest/${val}/${state.type}/${state.topn}`)
    .then(res=>res.json())
    .then(res=>setState({...state, suggestions:res, term:val}))  
  }

  const handleChange = (event) => {
    setState({...state, type:event.target.value});
    if (state.term.length>3) {
      fetch(`${host}/suggest/${state.term}/${event.target.value}/${state.topn}`)
      .then(res=>res.json())
      .then(res=>setState({...state, suggestions:res, type:event.target.value}))
    }
  };

  const formatTable = () => {
    return (
      <TableContainer component={Paper} sx={{width:'400px'}}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table" size="small" >
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>Term</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Proximity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.suggestions.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{(100*row.value).toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

  return (
    <Box>
      <Box m={5}>
        <Box sx={{display:'flex',justifyContent:'center'}}>
          <Typography color='primary' variant="h4" mb={2}>Entities semantic expansion</Typography>
        </Box>
        
        <Stack>
          <Typography variant="h6" mb={2}>Choose term you want to expand on:</Typography>
          <Autocomplete
              inputValue={state.term}                            
              options={state.options}
              onInputChange={(e, val)=>getAutocomplete(val)}                
              renderInput={(params) => <TextField {...params} label="Start typing ..."/>}     
              onChange={(e,val)=>getSuggestions(val)}

          />
        <Typography variant="h6" mt={4} mb={2}>Select target entity type:</Typography>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Target entity type</FormLabel>
          <RadioGroup row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={state.type}
            onChange={handleChange}
          >
            <FormControlLabel value="processes" control={<Radio />} label="Processes" />
            <FormControlLabel value="species" control={<Radio />} label="Species" />
            <FormControlLabel value="quantities" control={<Radio />} label="Quantities" />
            <FormControlLabel value="ecozones" control={<Radio />} label="Ecological regions" />
          </RadioGroup>
        </FormControl>        
        </Stack>
        <Typography variant="h6" mt={4} mb={2}>Suggestions:</Typography>
        {formatTable()}

      </Box>
    </Box>
  );
}

export default App;

