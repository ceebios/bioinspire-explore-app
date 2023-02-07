import { Box, Stack, Typography} from "@mui/material"
import { useContext } from "react";
import { CardContext, RasterContext, SearchContext } from "../context/Context";
import ReactPlayer from "react-player"
import { useNavigate } from "react-router-dom";
import { ORDER } from "./Species";
import { blue, purple } from "@mui/material/colors";

function Cards() {
  const [cards, setCards] = useContext(CardContext)
  const [search, setSearch] = useContext(SearchContext)
  const [raster, setRaster] = useContext(RasterContext)  
  const cardSize = 400
  const navigate = useNavigate()


  const getCardImage = (item,index)=> (
    <Box sx={{width:`${cardSize}px`, borderRadius:1, overflow:'hidden'}} 
        onMouseOver={(e)=>{e.preventDefault();setCards({...cards,active:index})}}
        onClick={(e)=>{e.preventDefault();setCards({...cards,active:index})}}>
        <Box sx={{position:'relative'}}>
          <Box sx={{position:'absolute',display:'flex',justifyContent:'center', width:"100%",backgroundColor:"rgba(200,200,200,0.75)"}}>
            <Typography sx={{fontWeight:'semibold',width:"95%"}}>{item.title}</Typography>
          </Box>
        </Box>             
        <Box sx={{
          display: 'block',
          height: `${cardSize}px`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${item.img})`,
          backgroundSize:'cover'
        }}
        >          
        </Box>
    </Box>    
  )

  const handleSpecies = (x)=> {
    fetch(`https://api.gbif.org/v1/species?name=${x}&limit=1`)
    .then(res=>res.json())
    .then(res=>{
      if (res.results.length>0) {
        const el = res.results[0]
        const spec = {
          label:el.canonicalName,
          rank:el.rank,
          order:ORDER[el.rank] || 8,
          key:el.key            
        }
        setRaster(false)
        setSearch({...search, species:spec})
      }
    })

    navigate('/explore')
  }

  const getCardContent = ()=> {
    const item = cards.cards[cards.active]
    return (
      <Box position='relative' width='90%' ml='5%' height='800px'>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <ReactPlayer  url={item.vid}/>
          </Box>
          <Box mt={1} color={'text.secondary'}>
            <Typography>{item.text}</Typography>
          </Box>
          <Box mt={2}>
            <Typography color={blue[500]} variant='span'>Species:</Typography>
            {item.species.map(x=>
              <>
              <Typography variant='span'>{` `}</Typography>
              <Typography variant='span' key={x} onClick={(e)=> {e.preventDefault();handleSpecies(x)}}
                sx={{cursor:"pointer",color:purple[500],"&:hover":{color:purple[800], textDecoration:'underline'}}}>
                  {`${x};`}
              </Typography>
              </>
              )}
          </Box>
          <Box position='absolute' sx={{bottom:'10px'}} >
            <Typography variant='span' color='text.secondary'>{`Source: `}</Typography>
            <Typography variant='span' onClick={(e)=> {e.preventDefault();window.open(item.source,'_blank')}}
                sx={{cursor:"pointer",color:purple[500],"&:hover":{color:purple[800], textDecoration:'underline'}}}>
                  {`Link`}
              </Typography>
          </Box>
      </Box>
    )
  }

  return (
    <Stack mt={9} height='800px' justifyContent={'center'} direction={'row'}>
        <Box sx={{ 
            width:'410px',
            overflowY:'scroll', 
            position:"relative",
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
            <Stack direction='column' spacing={1}>
              {cards.cards.map((item, index) => (
                  getCardImage(item,index)
              ))}
            </Stack>
        </Box>
        <Box sx={{width:"calc(100% - 410px)"}}>
          {getCardContent()}
        </Box>
    </Stack>
  )
}

export default Cards
