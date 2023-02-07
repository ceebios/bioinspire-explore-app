import { Box, Stack, Paper} from "@mui/material"
import {ItemCard} from "./ItemCard";

const itemData = [
  {
    img: 'https://www.publicdomainpictures.net/pictures/20000/velka/shark-jaws-8712975160110gd.jpg',
    vid:'https://www.youtube.com/watch?v=_5aHb0h2bvs',
    title: 'Paleo-bioinspiration and the jaws of fish',
    text: `In a 2012 paper in Scientific Reports, Grubich et al. describe the clamping forces exerted by the jaws of two Miocene-era piranha relatives, one present and one extinct. These clamping forces, among the most important developed by Life, functionally demonstrate, through measurements and simulations, the extraordinary efficiency of the bite of these past and present Amazonian fishes, and provide a mechanistic justification for their predatory dominance.`,
    author:'Skull anatomy of S. rhombeus (photo by SH) and fossil teeth of M. paranensis (inset). © Cione et al.',
    species:["Serrasalmus rhombeus", "Megapiranha paranensis", "Carcharodon megalodon"],
    source:'http://doi.org/10.1038/srep01009',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2018/08/11/05/13/desert-3598089__480.jpg',
    vid:'https://www.youtube.com/watch?v=IqrLxtpk7YY',
    title: 'AntBot, the ant robot',
    text: `Desert ants are able to explore their environment randomly over several hundred metres and then return to their starting point in a straight line with great precision.     They are the inspiration for Antbot, a six-legged robot that can walk to explore its environment. As it travels, a rotating sensor records the variations in polarised UV rays in the sky. This 'optical compass' consists of just two rotating pixels and two polarising filters, which are enough to guide the robot back to its starting point with an accuracy of about 10cm, a fraction of the robot's size. Antbot's guidance system does not require satellite geolocation, and continues to work under more or less cloudy skies, or even under trees or buildings.`,
    author:'No copyright info',
    species:["Cataglyphis", "Cataglyphis fortis", "Melophorus bagoti", "Cataglyphis bicolor"],
    source:'https://www.science.org/doi/10.1126/scirobotics.aau0307',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2014/03/24/22/05/mushrooms-295823_1280.jpg',
    vid:'https://www.youtube.com/watch?v=Bz1A9Jb7J10',
    title: 'Mycorremediation of polluted soils',
    text: `In the ecosystem, fungi play a crucial role in the decomposition and recycling of organic matter. Mycoremediation is the decontamination of an environment, such as soil, by fungi. By introducing one or more species of fungi into a polluted site, polluting molecules such as hydrocarbons or heavy metals can be removed from the soil. Unlike conventional remediation techniques, which often rely on thermal desorption and "burn" the soil to degrade or extract the pollutants, mycoremediation allows microbial and plant life to be maintained throughout the remediation process, and avoids moving large volumes of soil to a reprocessing plant.`,
    author:'No copyright info',
    species:["Fusarium solani" , "Pleurotus ostreatus", "Rhizopus arrhizus", "Phanerochaete chrysosporium", "Phanerochaete sordida", "Tramates hirsuta", "Tramates versicolor", "Lentinus edodes"],
    source:'http://link.springer.com/10.1007/978-3-319-99398-0_3',
  },
  {
    img: 'https://specials-images.forbesimg.com/imageserve/5da853decd594c00062148a1/960x0.jpg',
    vid:'https://www.youtube.com/watch?v=o1TS2nsGzSI',
    title: 'The Blob: optimised decisions, anticipation and knowledge sharing',
    text: `The Blob Physarum polycephalum is able to learn from its physical environment to adapt its development strategy and efficiently recover resources.     Physarum polycephalum is a unicellular being measuring a few centimetres to several metres in diameter. Although it does not have a brain as such, it is capable of learning from its past and solving problems related to its environment. For example, a blob can be trained to recognise table salt as "non-toxic", which enables it to learn to traverse salty environments to find food. The "blob" can pass on this knowledge to its fellow creatures by simple contact.`,
    author:'No copyright info',
    species:["Physarum polycephalum"],
    source:'http://dx.doi.org/10.1098/rstb.2018.0368',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rhinolophus_smithersi.jpg/580px-Rhinolophus_smithersi.jpg',
    vid:'https://www.youtube.com/watch?v=uaf10UP5ij8',
    title: `Echolocation: Seeing like bats`,
    text: `Bats have the ability to locate themselves thanks to the echo of the ultrasounds that they emit and analyse very precisely. This enables them to hunt at night. Based on this property, known as echolocation, researchers have invented a high-performance cane for the blind.`,
    author:'No copyright info',
    species:["Glauconycteris superba", "Nyctalus lasiopterus", "Melophorus bagoti"],
    source:'https://doi.org/10.3161/15081109ACC2016.18.2.014',
  }  ,
  {
    img: 'https://cdn.pixabay.com/photo/2013/06/30/18/56/butterfly-142506_1280.jpg',
    vid:'https://www.youtube.com/watch?v=j625EAuCb2M',
    title: `Butterfly Wings and Radiation Management`,
    text: `The strategy of the Morpho butterfly, whose wings absorb heat by radiation, can be used to make photovoltaic panels that are more resistant and better suited to the very high temperatures in the desert.`,
    author:'No copyright info',
    species:["Morpho", "Morpho menelaus", "Greta", "Morpho luna", "Archaeoprepona meander"],
    source:'https://doi.org/10.1007/s00339-004-3185-x',
  }  
];

function Cards() {

  return (
    <Stack mt={9} height='800px' justifyContent={'center'}>
      <Box id='cards' sx={{ 
          mt:1, 
          mb:1,
          overflowX:'scroll', 
          position:"relative",
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
          <Stack direction='row' spacing={1}>
            {itemData.map((item, index) => (
              <Paper elevation={1} key={index}>
                <ItemCard item={item}/>
              </Paper>
            ))}
          </Stack>
      </Box>
      
    </Stack>
  )
}

export default Cards
