import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Box, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useContext } from 'react';
import { AppContext } from '../context/Context';

const Help = () => {
  const [app, setApp] = useContext(AppContext)

  const getHelp = () => (<>
  <DialogTitle id="alert-dialog-title">
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <Typography fontSize={28}>Guide</Typography>
      <IconButton onClick={(e)=>{e.preventDefault();setApp({...app,help:false})}}><HighlightOffIcon/></IconButton>
    </Box>
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
        HELP
    </DialogContentText>
  </DialogContent>      
  </>)

  return (
      <div>
      <Dialog
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
 
