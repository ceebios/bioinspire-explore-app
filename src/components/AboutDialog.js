import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Box, IconButton, Link } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useContext } from 'react';
import { AppContext } from '../context/Context';

const AboutDialog = () => {
  const [app, setApp] = useContext(AppContext)

  const getHelp = () => (<>
    <DialogTitle id="alert-dialog-title">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={22}>About Bioinspire-Explore</Typography>
        <IconButton onClick={(e) => { e.preventDefault(); setApp({ ...app, about: false }) }}><HighlightOffIcon /></IconButton>
      </Box>
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <Typography pb={1}>
          Bioinspire-Explore is an Open-Source biodiversity data exploration tool, designed by the <Link href="https://www.mnhn.fr/en/bioinspire-museum" target="_blank" noopener>MNHN</Link> and<Link href="https://wwwceebios.com" target="_blank" noopener>Ceebios</Link> and funded by the <Link href="https://www.numerique.gouv.fr/dinum/" target="_blank" noopener>French Interministerial Digital Technology Division</Link>.
        </Typography>

        <Typography pb={1}>
          Bioinspiration is a creative approach based on the observation of living systems, from microorganisms to ecosystems. It involves drawing on nature’s “library of ideas” to design and innovate sustainably, as well as to enrich our lives.
        </Typography>

        <Typography pb={1}>
          One of the main challenges in the implementation of bioinspiration is a lack of access to biological data in a usable form.
        </Typography>

        <Typography pb={1}>
          Bioinspire-Explore was created to address this issue, enabling a wide range of users to access biological information both to support “biology-push” bioinspiration approaches and to learn more about biodiversity.
        </Typography>
        <Typography pb={1}>
          Example questions that Bioinspire-Explore can help answer:
        </Typography>
        <li>
          <Typography variant='span'>
            Where does a species fit into the taxonomic “tree of life”?
          </Typography>
        </li>
        <li>
          <Typography variant='span'>
            Where does it live? And in what kind of environment?
          </Typography>
        </li>
        <li>
          <Typography variant='span'>
            Is the species of particular interest in terms of its associated biological processes?
          </Typography>
        </li>
        <li>
          <Typography variant='span'>
            Is there an article or a video available to learn more about it?
          </Typography>
        </li>
        <li>
          <Typography variant='span'>
            Has this species inspired innovations in my field interest?
          </Typography>
        </li>
      </DialogContentText>
    </DialogContent>
  </>)

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={app.about}
        onClose={(e) => { e.preventDefault(); setApp({ ...app, about: false }) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {getHelp()}
      </Dialog>
    </div>
  );
}

export default AboutDialog

