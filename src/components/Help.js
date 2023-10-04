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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={22}>Guide</Typography>
        <IconButton onClick={(e) => { e.preventDefault(); setApp({ ...app, help: false }) }}><HighlightOffIcon /></IconButton>
      </Box>
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <Stack direction="row" spacing={1} justifyContent="center">
          <Box>
            <h4>Bioinspirations</h4>
            <p>Scroll through the images to see how organisms in nature have been a source of inspiration for solving various complex challenges.</p>
            <p>To explore further an organism of interest click on the taxon link provided in the details. This would bring you to the Biodiversity page.</p>
          </Box>
          <Box>
            <h4>Biodiversity</h4>
            <p>Explore your taxon of interest via the Search box and gather more information: where it’s found, what it looks like, and its climatic niche. </p>
            <p>Selecting different nodes on the taxonomic “tree of life” will give you information about the selected taxon.</p>
            <p>You can also explore the taxonomic “tree” directly using the buttons on the right hand side.</p>
            <p>Don't forget to hit the 'Clear' button on the graph controls to delete the history.</p>
          </Box>
          <Box>
            <h4>Go further</h4>
            <p>Discover how organisms, biological processes, habitats and physical measurements are connected using the concept of semantic proximity as measured by <a href='https://en.wikipedia.org/wiki/Word2vec' target='_blank' rel="noreferrer">Word2Vec</a> distances.</p>
            <p>Being trained on a corpus of biomimetic scientific articles this AI algorithm can be used to calculate compatibility between the different entities in a biomimetic context.</p>
            <p>Start by searching in the provided search box and then expand the folder structure to see the <a href="https://en.wikipedia.org/wiki/Semantic_similarity" target='_blank' rel="noreferrer">semantic proximity</a> between tha various entities.</p>
            <p>In addition, on the right-hand panel you can consult various external sources of Biodiversity data.</p>
            <p>Technical note: the compatibility score (eg. 68%)  measures how closely the terms are mentioned in a biomimetic context. 100% means excellent alignement and 0 or negative numbers mean that the concepts are not aligned.</p>
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
        onClose={(e) => { e.preventDefault(); setApp({ ...app, help: false }) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {getHelp()}
      </Dialog>
    </div>
  );
}

export default Help

