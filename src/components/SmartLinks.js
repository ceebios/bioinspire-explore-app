import { Box, Typography, Stack } from "@mui/material"
import google from "../images/google.png"
import youtube from "../images/youtube.png"
import semantic from "../images/semantic.png"
import gbif from "../images/gbif.png"
import wiki from "../images/wiki2.png"
import eol from "../images/eol.png"
import onezoom from "../images/onezoom.png"

const getImage = (image, url, alt) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <Box sx={{ height: "40px", borderRadius: 2, p: 0.25, "&:hover": { boxShadow: 1, transform: "scale(1.05)", backgroundColor: 'white' } }}>
      <img src={image} alt={alt} style={{ objectPosition: "center", objectFit: "cover", height: '100%', }} />
    </Box>
  </a>
)

const SmartLinks = ({ selected }) => {
  return (
    <Box>
      <Typography color='text.secondary' >{`Find scientific publications about ${selected.name} using :`}</Typography>
      <Stack direction={"row"} spacing={3} ml={2} mt={1} mb={3}>
        {getImage(google, `https://scholar.google.com/scholar?q=${selected.name}`, "Google Scholar")}
        {getImage(semantic, `https://www.semanticscholar.org/search?q=${selected.name}`, "Semantic Scholar")}
      </Stack>
      <Typography color='text.secondary' >{`Learn more about ${selected.name} on :`}</Typography>
      <Stack direction={"row"} spacing={3} ml={2} mt={1} mb={3}>
        {getImage(wiki, `https://en.wikipedia.org/wiki/${selected.name}`, "Wikipedia")}
        {getImage(youtube, `https://www.youtube.com/results?search_query=${selected.name}`, "YouTube")}
      </Stack>
      {
        selected.type === 'taxon' ?
          <>
            <Typography color='text.secondary'>{`Explore biodiversity data about ${selected.name} :`}</Typography>
            <Stack direction={"row"} spacing={3} ml={2} mt={1} mb={3}>
              {getImage(gbif, `https://www.gbif.org/species/search?q=${selected.name}`, "GBIF")}
              {getImage(onezoom, `https://www.onezoom.org/life.html/@${selected.name.replace(' ', '_')}`, "Onezoom")}
              {getImage(eol, `https://eol.org/search?q=${selected.name}`, "EOL")}
            </Stack>
          </>
          : <></>
      }
    </Box>
  )
}

export default SmartLinks
