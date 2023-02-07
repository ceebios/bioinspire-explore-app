import { Box, Stack, Typography, Button } from "@mui/material"
import Expansion from "./Expansion";
import Compatibility from "./Compatibility";
import { host } from "./Config";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import {SiSemanticrelease} from "react-icons/si"
import {FaMagic} from "react-icons/fa"
import { SearchContext,BiomigContext } from "../context/Context";
import { useContext, useState, useEffect, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Species from "./Species";
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SendIcon from '@mui/icons-material/Send';
import {TextField} from "@mui/material";

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none'
    }),
  );

const Inspiration = () => {
    const firstUpdate = useRef(true);
    const [value, setValue] = useState('expansion');
    const [search, setSearch] = useContext(SearchContext)
    const [biomig, setBiomig] = useContext(BiomigContext)
    const [loading, setLoading] = useState(false)
    const [question,setQuestion] = useState("")

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
          }        
        if (search.species.label!==undefined) {
            console.log("Inspiration")
            setLoading(true)
            fetch(`${host}/present/${search.species.label.toLowerCase()}`)
            .then(res=>res.json())
            .then(res=>{
                setBiomig({...biomig,present:res})
                setLoading(false)
            })
        }
    },[search.species])

    const handleQuestion = ()=> {
        const url = encodeURI(`https://biomig-search.com/search/${question}`)
        window.open(url, '_blank')
    }

    const getMessage = ()=>{
        if (search.species.label===undefined) {
            return (
                <Box height='120px'>
                <Typography>
                    {`No species selected.`}
                </Typography>
            </Box>                
            )
        }
        return (
            <Stack spacing={1} mt={2} ml={1}>
                <Typography>
                    {`Ask a question about ${search.species.label} and get answers on Biomig-search.`}
                </Typography>            
                <List>
                    <ListItem>
                        <ListItemIcon>
                        <SendIcon />
                        </ListItemIcon>
                        <a target='_blank' rel="noreferrer" 
                            href={encodeURI(`https://biomig-search.com/search/Where does ${search.species.label} live?`)}>
                                {`Where does ${search.species.label} live?`}
                        </a>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                        <SendIcon />
                        </ListItemIcon>
                        <a target='_blank' rel="noreferrer" 
                            href={encodeURI(`https://biomig-search.com/search/What biomimetic processes is ${search.species.label} studied for?`)}>
                                {`What biomimetic processes is ${search.species.label} studied for?`}
                        </a>
                    </ListItem>                        
                </List> 
                <Typography mt={2}>
                    Or ask your own question and get answers on Biomig-search:                        
                </Typography>                
                <Stack ml={'5%'} width='95%' direction={'column'} justifyContent={'center'}>
                    <TextField value={question} onChange={(e)=>setQuestion(e.target.value)} sx={{width:'100%'}}/>
                    <Box sx={{mt:1,display:'flex',justifyContent:'center'}}>
                    <Button onClick={handleQuestion} variant="contained">Get Answer</Button>
                    </Box>
                </Stack>        
            </Stack>

        )

    }

    return (
    <Box sx={{width:"100%", mt:9, height:'800px'}}>
        <Stack direction={'row'} spacing={1} mt={1}>
            <Box width='50%' sx={{boxShadow:1}}>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Species mode={'biomig'}/>
                </Box>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    {loading?<CircularProgress/>:<></>}
                </Box>         
                {getMessage()}
            </Box>
            <Box sx={{width:'50%',boxShadow:1}}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" >
                        <StyledTab value="expansion" label="Expansion" icon={<SiSemanticrelease/>} iconPosition="start"/>
                        <StyledTab value="compat" label="Compatibility" icon={<FaMagic/>} iconPosition="start"/>
                    </TabList>
                </Box>
                <TabPanel value="expansion"><Expansion/></TabPanel>
                <TabPanel value="compat"><Compatibility/></TabPanel>
                </TabContext>
            </Box>    
        </Stack>
    </Box>
  )
}

export default Inspiration