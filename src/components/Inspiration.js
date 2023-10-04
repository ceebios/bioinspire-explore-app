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
import { W2VModeContext, SelectedContext, W2VValueContext } from "../context/Context";
import { blue } from "@mui/material/colors"

const Inspiration = () => {
    const [selected, setSelected] = useContext(SelectedContext)
    const [w2vmode, setW2vmode] = useContext(W2VModeContext)
    const [w2vvalue, setW2vvalue] = useContext(W2VValueContext)

    const modes = [
        ['taxon', 'Organism in nature'],
        ['process', 'Natural process'],
        ['habitat', 'Habitat of an organism'],
        ['measurement', 'Measurement of a physical quantity'],
    ] //,'word'

    const handleMode = (event, newMode) => {
        event.preventDefault()
        if (newMode !== null) {
            setW2vmode(newMode);
            setW2vvalue('')
        }
    };

    return (
        <Stack sx={{ width: '98%', ml: "1%", height: '100%' }} flexItem>
            <Box flex={0} textAlign={'center'} pb={3}>
                <Typography variant='h5' color={blue[700]}>Go further</Typography>
                <Typography color='text.secondary'>Ready to dive deeper? On this page, you can explore semantic proximity metrics, scientific literature, videos and other websites about your chosen species.</Typography>
            </Box>

            <Stack flex={1} direction={'row'} spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                <Stack sx={{ display: 'flex', width: '50%', boxShadow: 0, height: '100%' }} position='relative'>
                    <Box flex={1}>
                        <Box sx={{ color: 'text.secondary', m: 1, textAlign: "center" }}>
                            <Typography>Explore connections between various entities in the living world</Typography>
                        </Box>
                        <Box sx={{ width: "98%", ml: "1%", textAlign: "center" }}>
                            <ToggleButtonGroup
                                value={w2vmode}
                                exclusive
                                onChange={handleMode}
                                aria-label="expansion mode"
                            >
                                {modes.map(item =>
                                    <ToggleButton key={item[0]} size='small' value={item[0]} aria-label={item[0]} sx={{ fontSize: 11, color: COLORS[item[0].toUpperCase()] }} >
                                        <Tooltip title={item[1]}>
                                            <div>{item[0]}</div>
                                        </Tooltip>
                                    </ToggleButton>
                                )}
                            </ToggleButtonGroup>
                            <Box width="344px" margin={"auto"}>
                                <AutocompleteW2V mode={w2vmode} setSelected={setSelected} />
                            </Box>
                        </Box>
                        <Box sx={{ width: "98%", ml: "1%", textAlign: "center" }}>
                            <ExpansionView />
                        </Box>
                    </Box>

                    <Box sx={{ color: 'text.secondary', m: 1, flex: 0 }}>
                        <Typography fontSize={12}>The metric at the end of each line (ex: 80.4%) quantifies whether the selected entities are mentioned in similar biomimicry context. </Typography>
                        <Typography fontSize={12}>To learn more about semantic proximity please visit the <a href='https://en.wikipedia.org/wiki/Semantic_similarity' target='_blank' rel="noreferrer" >Wikipedia</a> page. </Typography>
                    </Box>
                </Stack>
                <Stack sx={{ width: '50%' }} spacing={2}>
                    <Biomig selected={selected} />
                    <Divider sx={{ pt: 4 }} />
                    <Box pl={1} pt={4}>
                        <SmartLinks selected={selected} />
                    </Box>
                </Stack>
            </Stack>
        </Stack >
    )
}

export default Inspiration