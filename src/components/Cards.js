import { Box, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react";
import { CardContext, RasterContext, SearchContext, W2VValueContext } from "../context/Context";
import ReactPlayer from "react-player"
import { useNavigate } from "react-router-dom";
import { ORDER } from "./Species";
import { blue, purple } from "@mui/material/colors";

function Cards() {
  const [cards, setCards] = useContext(CardContext)
  const [search, setSearch] = useContext(SearchContext)
  const [raster, setRaster] = useContext(RasterContext)
  const [w2vvalue, setW2vvalue] = useContext(W2VValueContext)
  const cardSize = 400
  const navigate = useNavigate()
  const ref = useRef(null);
  const [height, setHeight] = useState(100)


  const getCardImage = (item, index) => (
    <Box key={index} sx={{ width: `${cardSize}px`, borderRadius: 1, overflow: 'hidden' }}
      onMouseOver={(e) => { e.preventDefault(); setCards({ ...cards, active: index }) }}
      onClick={(e) => { e.preventDefault(); setCards({ ...cards, active: index }) }}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: "100%", backgroundColor: "rgba(200,200,200,0.75)" }}>
          <Typography sx={{ fontWeight: 'semibold', width: "95%" }}>{item.title}</Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'block',
        height: `${cardSize}px`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${item.img})`,
        backgroundSize: 'cover'
      }}
      >
      </Box>
    </Box>
  )

  const handleSpecies = (x) => {
    fetch(`https://api.gbif.org/v1/species?name=${x}&limit=1`)
      .then(res => res.json())
      .then(res => {
        if (res.results.length > 0) {
          const el = res.results[0]
          const spec = {
            label: el.canonicalName,
            rank: el.rank,
            order: ORDER[el.rank] || 8,
            key: el.key
          }
          setRaster(false)
          setSearch({ ...search, species: spec })
          setW2vvalue(spec.label)
        }
      })

    navigate('/explore')
  }

  const getCardContent = () => {
    const item = cards.cards[cards.active]
    return (
      <Stack sx={{ display: 'flex', position: 'relative', width: '90%', ml: '5%', height: '100%' }} >
        <Box flex={1}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ReactPlayer url={item.vid} />
          </Box>
          <Box mt={1} color={'text.secondary'}>
            <Typography>{item.text}</Typography>
          </Box>
          <Box mt={2}>
            <Typography color={blue[500]} variant='span'>Species:</Typography>
            {item.species.map(x =>
              <>
                <Typography variant='span'>{` `}</Typography>
                <Typography variant='span' key={x} onClick={(e) => { e.preventDefault(); handleSpecies(x) }}
                  sx={{ cursor: "pointer", color: purple[500], textDecoration: 'underline', "&:hover": { color: purple[900] } }}>
                  {`${x};`}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        <Box flex={0} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} >
          <Box>
            <Typography variant='span' color='text.secondary'>{`Source: `}</Typography>
            <Typography variant='span' onClick={(e) => { e.preventDefault(); window.open(item.source, '_blank') }}
              sx={{ cursor: "pointer", color: purple[500], "&:hover": { color: purple[800], textDecoration: 'underline' } }}>
              {`Link`}
            </Typography>
          </Box>
          <Box>
            <Typography variant='span' color='text.secondary'>{`Author: `}</Typography>
            <Typography variant='span'>
              {item.author}
            </Typography>
          </Box>
        </Box>
      </Stack>
    )
  }

  useEffect(() => {
    if (ref !== null) {
      setHeight(ref.current.clientHeight)
      console.log(height)
    }
  }, [])

  return (
    <Stack height={'100%'} width='98%' ml="1%" >
      <Box ref={ref} textAlign={'center'} pb={3}>
        <Typography variant='h5' color={blue[700]}>Bioinspirations</Typography>
        <Typography color='text.secondary'>To get started, scroll through the selection of species that have inspired innovations in different fields, from robotics to renewable energy!</Typography>
      </Box>
      <Stack justifyContent={'center'} direction={'row'} height={`calc(100% - ${height}px)`}>
        <Box sx={{
          width: '410px',
          overflowY: 'scroll',
          position: "relative",
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
              getCardImage(item, index)
            ))}
          </Stack>
        </Box>
        <Box sx={{ width: "calc(100% - 410px)", overflowY: 'auto' }}>
          {getCardContent()}
        </Box>

      </Stack>

    </Stack>
  )
}

export default Cards
