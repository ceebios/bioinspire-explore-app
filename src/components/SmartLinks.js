import { useContext} from "react";
import { Box, Stack, Typography } from "@mui/material"
import { SearchContext, WikiContext } from "../context/Context";
import {GiButterfly} from 'react-icons/gi'

const SmartLinks = () => {
  const [search, setSearch] = useContext(SearchContext)
  const [wiki, setWiki] = useContext(WikiContext)

  const getItem = (url,desc)=> (
    <Typography color='text.primary' 
    onClick={(e)=>{e.preventDefault();window.open(url,'_blank')}}
    sx={{
      cursor:'pointer',
      "&:hover":{
        textDecoration:'underline'
      }
    }}
    >{desc}</Typography>
  )
  
  
    return (
      <Box height={'650px'}>
      {search.species.label!==undefined?
        <Box>
          <Typography color='text.secondary' variant='h6'>Find scientific publications on the species</Typography>
          <ul>
            <li>{getItem(`https://biomig-search.com/search/${search.species.label}`, <><span>Search on Biomig-Search - a </span><GiButterfly color='seagreen'/><span>biomimicry search engine</span></>)}</li>
            <li>{getItem(`https://scholar.google.com/scholar?q=${search.species.label}`, "Search on Google Scholar")}</li>
            <li>{getItem(`https://www.semanticscholar.org/search?q=${search.species.label}`, "Search on Semantic Scholar")}</li>
          </ul>      
          <Typography color='text.secondary' variant='h6'>Learn more about the species</Typography>
          <ul>
            <li>{getItem(`https://www.gbif.org/fr/species/${search.species.key}`, "Open GBIF Page")}</li>
            <li>{getItem(`https://www.gbif.org/fr/occurrence/gallery?taxon_key=${search.species.key}`, "See images on GBIF")}</li>
            <li>{getItem(`https://en.wikipedia.org/wiki/${search.species.label}`, "Search on Wikipedia")}</li>
            <li>{getItem(`https://www.youtube.com/results?search_query=${search.species.label}`, "Search on Youtube")}</li>
          </ul>
          <Typography color='text.secondary' variant='h6'>Explore other interesting sources</Typography>
          <ul>
            <li>{getItem(`https://www.onezoom.org/life.html/@${search.species.label.replace(' ','_')}`, "OneZoom Tree Of Life")}</li>
            <li>{getItem(`https://eol.org/search?q=${search.species.label}`, "Encyclopedia Of Life")}</li>
          </ul>      
        </Box>
        :
        <Typography>No species selected</Typography>
      }
      </Box>
    )
}

export default SmartLinks
