import { useContext, useEffect, useState } from "react"
import { SearchContext } from "../context/Context"
import { Box, Typography } from "@mui/material"
import Masonry from '@mui/lab/Masonry';

const Gallery = () => {
  const [cols, setCols] = useState(3)
  const [impercol, setImpercol] = useState(4)
  const [search, setSearch] = useContext(SearchContext)
  const [images, setImages] = useState([])

  useEffect(()=>{
    if ('key' in search.species) {
      console.log('Gallery')
      const url = `https://api.gbif.org/v1/occurrence/search?limit=${cols*impercol}&media_type=stillImage&taxon_key=${search.species.key}`
      fetch(url)
      .then(results => results.json())
      .then(data => setImages(data.results.map((el)=>el.media[0])))
    }
  },[search.species])

  return (
    <Box 
      sx={{ width: "100%", height:'650px', overflowY:'scroll',
        scrollbarColor: "rgba(46,54,69,0.5) rgba(210,210,210,0.5)",
        scrollbarWidth: "thin",
        '&::-webkit-scrollbar': {
          width: '0.4em'
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
      {search.species.label===undefined? <Typography>No species selected</Typography>:    
        <Masonry columns={cols} spacing={1} >
          {images.map((item, index) => (
            <Box key={index} sx={{cursor:'pointer'}} 
            onClick={(e)=>window.open(item.references)}> 
              <img
                src={item.identifier}
                alt={item.title}
                loading="lazy"      
                onError={(event) => event.target.style.display = 'none'}        
                style={{
                  display: 'block',
                  width: '100%',
                }}
              />
            </Box>
          ))}
        </Masonry>
      }
    </Box>
  )
}

export default Gallery