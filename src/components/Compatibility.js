import { Typography, Box, Autocomplete, TextField, Button, Stack} from "@mui/material"
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { useContext, useState } from "react"
import { CompatContext, SearchContext,BiomigContext} from "../context/Context"
import { host } from "./Config"
import GaugeChart from 'react-gauge-chart'

const handleAutocomplete = (setOptions, filter, val) => {
    if (val.length>2) {
        fetch(`${host}/autocomplete/${val}/${filter}`)
        .then(res=>res.json())
        .then(res=> {
            if (filter==='species') {
                setOptions(res.map(el=>el[0]))
            } else {
                setOptions(res)
            }
        })
    } else {
        setOptions([])
    }
}

const Myautocomplete = ({filter, handleChange, value}) => {
    const [options, setOptions] = useState([])
    return (
        <Autocomplete
        options={options}
        sx={{
        bgcolor:"white",
        minWidth: "200px",
        mt:1,
        '& .MuiAutocomplete-input, & .MuiInputLabel-root': {fontSize: 14},
        }}
        onInputChange={(e, val) => {handleAutocomplete(setOptions, filter, val)}}                
        renderInput={(params) => <TextField {...params} label={`Search ${filter}`}/>}     
        onChange={(e,val)=>{e.preventDefault();handleChange(val, filter)}}
        value = {value}
        defaultValue = {''}
        />
    )
}


const Compatibility = () => {
    const [compat, setCompat ] = useContext(CompatContext)
    const [search, setSearch ] = useContext(SearchContext)
    const [biomig, setBiomig] = useContext(BiomigContext)

    if (!biomig.present) {
        return (
            <Box sx={{width:"100%", height:"650px"}}>
                <Box sx={{color:'text.secondary'}}>
                <Typography fontSize={14}>Here we show whether multiple entities are semantically compatible. </Typography>
                <Typography fontSize={14}>This is an extention to the semantic similarity metric to more than two entities. </Typography>
                </Box>                                      
                <Typography mt={1} fontSize={16}>No species selected or species not in Biomig Corpus.</Typography>
                <Typography mt={1} fontSize={16}>In order to use advanced functionalities like semantic compatibility the taxon needs to be in Biomig Corpus.</Typography>
                <Typography mt={1} fontSize={16}>Please search again in the provided 'Search species' box.</Typography>
            </Box>
        )
    }

    const handleChange = (val, filter) => {
        let comp = {...compat}
        if (val===null) {
            comp[filter] = ''
        } else {
            comp[filter] = val
        }        
        setCompat(comp)
    }

    const fetchCompat = () => {
        let load = {
            species:compat.species,
            processes:compat.processes,
            quantities:compat.quantities,
            ecozones:compat.ecozones
        }
        if (search.species.label===undefined) {
            load.root = ''
        } else {
            load.root = search.species.label
        }        
        fetch(`${host}/compatibility`, {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },          
            body: JSON.stringify(load)
          })
          .then(res=>res.json())
          .then(res=>{
            if (res!==0) {
                let newstate = {...compat}
                newstate.value = res.value
                newstate.words = res.words
                console.log(newstate)
                setCompat(newstate)
            } else {
                alert('Species not in Biomig corpus or not enough data')
            }
        })
    }

    let verdict = 'neutral'
    let needleColor = 'rgb(245,205,25)'
    const cvalue = 0.5*(1+compat.value)
    if (cvalue<0.25) {
        needleColor = 'rgb(234,66,40)'
        verdict = <Typography variant = 'span' color={needleColor} fontWeight='bold' textAlign='center'>incompatible</Typography>
    } else if (cvalue<0.75) {
        needleColor = 'rgb(245,205,25)'
        verdict = <Typography variant = 'span' color={needleColor} fontWeight='bold' textAlign='center'>neutral</Typography>
    } else {
        needleColor = 'rgb(91,225,44)'
        verdict = <Typography variant = 'span' color={needleColor} fontWeight='bold' textAlign='center'>compatible</Typography> 
    }

    const getSummary = ()=>{
        let summ = [search.species.label]
        for (var k in compat) {
            if ((compat[k]!=='')&&(!['words','value'].includes(k))) {
                summ.push(compat[k])
            }
        }

        if (summ.length===1) {
            return <Typography>Please select at least one entity from the boxes above</Typography>
        }
        return <Typography>Calculating compatibility between: {summ.join(', ')}</Typography>
    }
       
    return (
        <Box sx={{width:"100%", height:"650px"}}>
            <Stack spacing={1}>
                <Box sx={{color:'text.secondary'}}>
                <Typography fontSize={14}>Here we show whether multiple entities are semantically compatible. </Typography>
                <Typography fontSize={14}>This is an extention to the semantic similarity metric to more than two entities. </Typography>
                </Box>                
                <Stack direction={'row'} justifyContent='space-around'>
                    <Stack direction={'column'} spacing={2} width='180px'>
                        <Myautocomplete filter='species' value={compat.species} handleChange={handleChange}/>
                        <Myautocomplete filter='processes' value={compat.processes} handleChange={handleChange}/>                    
                    </Stack>
                    <Stack direction={'column'} spacing={2} width='180px'>
                        <Myautocomplete filter='quantities' value={compat.quantities} handleChange={handleChange}/>
                        <Myautocomplete filter='ecozones' value={compat.ecozones} handleChange={handleChange}/>
                    </Stack>                
                </Stack>
                <Box sx={{display:'flex', justifyContent:'center', mt:2}}>
                    <Button  onClick={fetchCompat} variant="outlined" endIcon={<TravelExploreIcon color='primary' fontSize="large"/>}>
                        Calculate
                    </Button>                
                </Box>


                <Box  sx={{display:'flex', justifyContent:'center',mt:2}}>
                    {getSummary()}
                </Box>
                <Box  sx={{display:'flex', justifyContent:'center',mt:2}}>
                    {compat.value===0? <></>:
                        <Stack spacing={0}>
                            <GaugeChart id="gauge-chart5"
                                arcsLength={[0.25, 0.5, 0.25]}
                                colors={['rgb(234,66,40)', 'rgb(245,205,25)', 'rgb(91,225,44)']}
                                percent={cvalue}
                                arcPadding={0.01}
                                textColor='rgba(50,50,50)'
                                needleBaseColor='rgba(50,50,50)'
                                needleColor={needleColor}
                                animate={false}
                            />
                            <Typography fontWeight='bold' textAlign='center'>Compatibility: {verdict}</Typography>
                        </Stack>

                    }
                </Box>  
            </Stack>          
        </Box>
    )
}

export default Compatibility