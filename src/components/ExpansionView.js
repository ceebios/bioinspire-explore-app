import React from 'react'
import { Box, Typography,Stack, Tooltip } from '@mui/material'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {  useEffect, useContext, useRef } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ExpansionContext, ExpansionModeContext } from '../context/Context';
import { host } from './Config';

export const COLORS = {
    TAXON:"#fb2056",
    HABITAT:"#8dd58c",
    MEASUREMENT:"#1798c3",
    PROCESS:"rgb(160,100,240)",
    WORD:"rgb(120,120,120)"
  }

const ExpansionView = ({search}) => {
    const [expansion, setExpansion] = useContext(ExpansionContext)
    const [mode, setMode] = useContext(ExpansionModeContext)
    const modes = [
        ['taxon','Organism in nature'],
        ['process', 'Natural process'],
        ['habitat', 'Habitat of an organism'],
        ['measurement', 'Measurement of a physical quantity'],
    ] //,'word'


    const firstUpdate = useRef(true);

    const expand = (data)=>{
        fetch(`${host}/expand`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },   
            body: JSON.stringify({terms:data.nodes, mode:mode})
            })
        .then(res=>res.json())
        .then(res=>
            {        
                const clean = res.filter(item=>!data.nodes.map(x=>x.name.toUpperCase()).includes(item.name.toUpperCase()))                                                
                const G ={...data, expansions:clean.map(x=>({name:x.name,type:mode,score:x.score}))}                         
                setExpansion(G)
            })  
    }

    if ((expansion.nodes.length===0)) {
        const G = {...expansion, nodes:[{...search.search,score:1}], expanded:[search.search.name]}
        expand(G)
    }

    useEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
          }        
        expand(expansion)
    },[mode]) 

    const handleMode = (event, newMode) => {
        event.preventDefault()
        setMode(newMode)
      };    

    const getLabel =(item, last) => (
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Box bgcolor={COLORS[item.type.toUpperCase()]}>
                <Typography sx={{marginLeft:1, marginRight:1,fontSize:12}}>
                    {item.type.toUpperCase()}
                </Typography>
            </Box>
            <Typography sx={{marginLeft:1, fontSize:12}}>
                {item.name}
            </Typography>
            <Box width='100px'>
                <Typography sx={{
                        marginLeft:1, 
                        marginRight:1,
                        fontSize:12, 
                        fontWeight:last===true?'bold':'',
                        color:last===true?'black':'rgb(150,150,150)'
                    }}>
                    {`${(100*item.score).toPrecision(3)}%`}
                </Typography>
            </Box>            
        </Stack>            
    )

    const getTree = (items, children)=> {
        if (items.length===0) {
            return <></>
        }        
        if (items.length===1) {
            return (
                <TreeItem key={items[0].name} nodeId={items[0].name} label={getLabel(items[0],true)}>
                    {children}
                </TreeItem>
            )
        }
        return (
            <TreeItem key={items[0].name} nodeId={items[0].name} label={getLabel(items[0],false)}>
                {getTree(items.slice(1),children)}
            </TreeItem>
        )
    }

    const getItems = ()=> {

        const children = expansion.expansions.map(chunk=>
            <TreeItem key={chunk.name} nodeId={chunk.name} label={getLabel(chunk)}>
            </TreeItem>
            )
        
        return getTree(expansion.nodes, children)
    }

    const handleToggle = (event, nodeIds) => {
        setExpansion({...expansion,expanded:nodeIds})
    };

    const handleSelect = (event, nodeId) => {
        event.preventDefault()
        var G = {...expansion}
        const enames = G.expansions.map(item=>item.name)
        const names = G.nodes.map(item=>item.name)
        const eix = enames.indexOf(nodeId)
        const nix = names.indexOf(nodeId)
        if (eix>-1) {
            G.nodes.push(G.expansions[eix])
            G.expansions = []
            setExpansion(G)
        } else {
            if (nix>-1) {
                if ((G.expanded.includes(nodeId))&&(G.nodes.length>1)) {
                    G.expansions = []
                    G.nodes = G.nodes.slice(0,1+nix)        
                    G.expanded = G.expanded.filter(e=>names.slice(0,nix).includes(e))             
                    setExpansion(G)
                } else {
                    if (nix===G.nodes.length-1) {
                        fetch(`${host}/expand`, {
                            method: "post",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },   
                            body: JSON.stringify({terms:G.nodes, mode:mode})
                            })
                            .then(res=>res.json())
                            .then(res=>
                                {             
                                    if (!G.expanded.includes(nodeId)) {                                        
                                        G.expanded.push(nodeId)
                                    }        
                                    const clean = res.filter(item=>!names.map(x=>x.toUpperCase()).includes(item.name.toUpperCase()))                                                
                                    G.expansions = clean.map(x=>({name:x.name,type:mode,score:x.score}))
                                    setExpansion(G)
                                })   
                    }
                }
            }
        }     
    };      

    return (
        <Box width="100%">
            <Box sx={{display:'flex', justifyContent:'center',mb:2,overflowX:'auto'}}>
                <Stack textAlign={'center'}>
                    <Typography color="text.secondary">
                        Explore related entities
                    </Typography>
                    <ToggleButtonGroup
                    value={mode}
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
                </Stack>
            </Box>
            <TreeView
            aria-label="graph"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            expanded={expansion.expanded}
            sx={{width:'96%'}}
            >
                {getItems()}
            </TreeView>                 
        </Box>
        )
}

export default ExpansionView
