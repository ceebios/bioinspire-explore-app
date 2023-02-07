import {Box, Typography, Button, Stack} from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { host } from "./Config";
import { useContext, useEffect, useState, useRef} from "react";
import { ExpansionContext, SearchContext, BiomigContext } from "../context/Context";
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from "@mui/material/colors";

function Expansion() {
  const [expansion, setExpansion] = useContext(ExpansionContext)
  const [search, setSearch] = useContext(SearchContext)
  const [biomig, setBiomig] = useContext(BiomigContext)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState('processes')
  const fields = {'species':'species','processes':'processes','quantities':'measurements','ecozones':'habitats'}

  const firstUpdate = useRef(true);  

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }    
    if ('label' in search.species) {
      console.log('Expansion')
      setLoading(true)
      const term = search.species.label.toLowerCase();
      fetch(`${host}/proximity/${term}/${expansion.topn}`)
      .then(res=>res.json())
      .then(res=>{
        setExpansion({...expansion, suggestions:res})
        setLoading(false)
      })
    }      
  },[search.species]);     

  const formatTable = (filter,v) => {
    const data = expansion.suggestions[filter]

    return (
      <Box sx={{height:'510px', mt:1, overflowY:'auto', minWidth:'200px',
      scrollbarColor: "rgba(46,54,69,0.5) rgba(210,210,210,0.5)",
      scrollbarWidth: "thin",
      '&::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.50)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.5)',
        outline: '0px solid slategrey',
      }      
      }}>
        {loading?<CircularProgress/>:
          <Table  aria-label="simple table" size="small" stickyHeader >
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:'bold'}}>{v.toUpperCase()}</TableCell>
                <TableCell align="right" sx={{fontWeight:'bold'}}>Similarity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data===undefined?<></>:
              data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{(100*row.proximity).toFixed(1)}%</TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        }
      </Box>
    )
  }

  return (
      <Box id='expansion' width='100%' height='650px'>
        <Box sx={{display:'flex',flexDirection:'row', justifyContent:'space-between',width:'100%', height:'650px',overflowX:'auto',
        scrollbarColor: "rgba(46,54,69,0.5) rgba(210,210,210,0.5)",
        scrollbarWidth: "thin",
        '&::-webkit-scrollbar': {
          height: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.50)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.5)',
          outline: '0px solid slategrey',
        }       
      }}>
          <Stack spacing={1}>
            <Box sx={{color:'text.secondary'}}>
              <Typography fontSize={14}>Here we show entities that are semantically close to the selected taxon. </Typography>
              <Typography fontSize={14}>Our metric of semantic proximity is calculated over the Biomig scholarly publications database. </Typography>
              <Typography fontSize={14}>It quantifies whether different entities are mentioned in similar biomimicry context. </Typography>
              <Typography fontSize={14}>To learn more about semantic proximity please visit the <a href='https://en.wikipedia.org/wiki/Semantic_similarity' target='_blank' rel="noreferrer" >Wikipedia</a> page. </Typography>
            </Box>
            {!biomig.present?
            <>
                <Typography mt={1} fontSize={16}>No species selected or species not in Biomig Corpus.</Typography>
                <Typography mt={1} fontSize={16}>In order to use advanced functionalities like semantic expansion the taxon needs to be in Biomig Corpus.</Typography>
                <Typography mt={1} fontSize={16}>Please search again in the provided 'Search species' box.</Typography>
            </>
            :
            <Box sx={{displa:'flex', justifyContent:'center',width:'100%'}}>
              <Stack direction={'row'} spacing={1} justifyContent='center'>
                {Object.entries(fields).map(([k,v])=>
                  <Button 
                      onClick={(e)=>{e.preventDefault();setVisible(k)}} 
                      size='small' 
                      sx={visible===k?{textDecoration:'underline',color:blue[800]}:{color:blue[500]}}>
                    {v}
                  </Button>
                  )}
              </Stack>
              <Stack justifyContent={'center'} direction={'row'}>
              {Object.entries(fields).map(([k,v])=>
                  <Box hidden={visible===k?false:true} sx={{width:'400px'}}>
                    {formatTable(k,v)}
                  </Box>
                  )}            
              </Stack>
            </Box>
          }
          </Stack>

        </Box>
      </Box>
  );
}

export default Expansion;


