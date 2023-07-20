import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Box, IconButton, Stack } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useContext } from 'react';
import { AppContext } from '../context/Context';

const Help = () => {
  const [app, setApp] = useContext(AppContext)

  const getHelp = () => (<>
  <DialogTitle id="alert-dialog-title">
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <Typography fontSize={22}>Guide</Typography>
      <IconButton onClick={(e)=>{e.preventDefault();setApp({...app,help:false})}}><HighlightOffIcon/></IconButton>
    </Box>
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      <Stack direction="row" spacing={1} justifyContent="center">
        <Box>
        <h4>Bio-inspirations</h4>
        <p>Scroll through the images to see how organisms in nature have been a source of inspiration for solving various complex challenges.</p>
        <p>To explore further an organism of interest click on the taxon link provided in the details. This would bring you to the Biodiversity page.</p>    
        </Box>
        <Box>
        <h4>Biodiversity</h4>
        <p>Search for organisms in the provided Search box and explore the contextual information about it. This includes its place in the taxonomy, Wikipedia articles, distribution range, image gallery and climate data.</p>
        <p>Selecting different nodes on the taxonomy tree will focus the data on the selected taxon. You can also explore the taxonomy tree directly by interacting with it via the provided buttons.</p>
        </Box>
        <Box>
        <h4>Go further</h4>
        <p>See an example of how AI algorithms (<a href='https://en.wikipedia.org/wiki/Word2vec' target='_blank' rel="noreferrer">Word2Vec</a>) can help with the challenging task of bio-inspiration. </p>
        <p>Being trained on a corpus of biomimetic scientific articles the algorithm has learned to associate organisms to various natural processes, habitats and physical measurements.</p>
        <p>Start by searching in the provided search box and then expand the folder structure to see the <a href="https://en.wikipedia.org/wiki/Semantic_similarity"  target='_blank' rel="noreferrer">semantic proximity</a> between tha various entities.</p>
        <p>Finally, on the right-hand panel you can consult various external sources of Biodiversity data.</p>
        </Box>
      </Stack>
    </DialogContentText>
  </DialogContent>      
  </>)

  return (
      <div>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={app.help}
        onClose={(e)=>{e.preventDefault();setApp({...app, help:false})}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {getHelp()}
      </Dialog>
    </div>
    );
  }

export default Help
 
