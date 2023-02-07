import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useContext } from 'react';
import { AppContext } from '../context/Context';

const Lang = () => {
    const [app, setApp] = useContext(AppContext)

    const handleLang = (event, newLang)=> {
      if (newLang!==null) {
        setApp({...app, lang:newLang})
      }      
    }
  
    return (
      <ToggleButtonGroup
      value={app.lang}
      exclusive
      onChange={handleLang}
    >
      <ToggleButton value="fr" disabled={app.lang==='fr'}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/fr.png`}
            alt=""
          />
      </ToggleButton>
      <ToggleButton value="en" disabled={app.lang==='en'}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/us.png`}
            alt=""
          />
      </ToggleButton>
    </ToggleButtonGroup>  
    )
  }

  export default Lang