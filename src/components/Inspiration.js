import { Box, Stack, Typography, Tooltip } from "@mui/material"
import { useState, useContext, useEffect } from "react";
import SmartLinks from "./SmartLinks"
import ExpansionView from "./ExpansionView";
import Biomig from "./Biomig";
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { COLORS } from "./ExpansionView";
import AutocompleteW2V from "./AutocompleteW2V";
import { BSearchContext, SelectedContext} from "../context/Context";

const Inspiration = () => {
    const [selected, setSelected] = useContext(SelectedContext)
    const [bsearch, setBSearch] = useContext(BSearchContext)

    const modes = [
        ['taxon','Organism in nature'],
        ['process', 'Natural process'],
        ['habitat', 'Habitat of an organism'],
        ['measurement', 'Measurement of a physical quantity'],
    ] //,'word'

    const handleMode = (event, newMode) => {
        event.preventDefault()
        if (newMode!==null) {
            setBSearch({...bsearch, mode:newMode});
        }
      };

    return (
    <Box sx={{width:"100%", mt:9, height:'800px'}}>
        <Stack direction={'row'} spacing={1} mt={1} divider={<Divider orientation="vertical" flexItem />}>
            <Box width='50%' sx={{boxShadow:0}} position='relative' height='770px'>
                <Box sx={{color:'text.secondary',ml:1,mb:2, mr:1,textAlign:"center"}}>
                    <Typography variant="h6">Explore the <b>semantic proximity</b> between various entities</Typography>
                </Box>
                <Box sx={{width:"98%", ml:"1%",textAlign:"center"}}>
                    <Typography color="text.secondary">
                            Search entity to start exploration
                    </Typography>                    
                    <ToggleButtonGroup
                    value={bsearch.mode}
                    exclusive
                    onChange={handleMode}
                    aria-label="expansion mode"
                    >
                        {modes.map(item=>
                                <ToggleButton key={item[0]} size='small' value={item[0]} aria-label={item[0]} sx={{fontSize:11, color:COLORS[item[0].toUpperCase()]}} >
                                    <Tooltip title={item[1]}>
                                        <div>{item[0]}</div>
                                    </Tooltip>
                                </ToggleButton>                
                            )}
                    </ToggleButtonGroup>
                    <Box width="344px" margin={"auto"}>
                        <AutocompleteW2V setSelected={setSelected}/>
                    </Box>
                </Box>
                {(bsearch.search!==undefined)&&(bsearch.search!==null)?
                <Box sx={{mt:1, width:'100%', display:"flex", justifyContent:"center"}}>
                    <ExpansionView search={bsearch}/>
                </Box>:<></>}
                <Box sx={{color:'text.secondary',m:1,position:'absolute', bottom:'0px'}}>
                    <Typography fontSize={12}>The metric at the end of each line (ex: 80.4%) quantifies whether the selected entities are mentioned in similar biomimicry context. </Typography>
                    <Typography fontSize={12}>To learn more about semantic proximity please visit the <a href='https://en.wikipedia.org/wiki/Semantic_similarity' target='_blank' rel="noreferrer" >Wikipedia</a> page. </Typography>
                </Box>              
            </Box>
            {(selected!==undefined)&&(selected!==null)?
            <Stack sx={{width:'50%'}} spacing={2}>
                <Biomig selected={selected}/>
                <Divider sx={{pt:4}}/>
                <Box pl={1} pt={4}>
                    <SmartLinks selected={selected}/>
                </Box>                
            </Stack>
            :<></>         
            }
        </Stack>
    </Box>
  )
}

export default Inspiration