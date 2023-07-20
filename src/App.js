import {Box, Stack,Typography} from "@mui/material"
import Navbar from "./components/Navbar";
import Help from "./components/Help";
import About from "./components/About";
import Contact from "./components/Contact";
import Cards from "./components/Cards";
import Landing from "./components/Landing";
import Inspiration from "./components/Inspiration";
import Contextualisation from "./components/Contextualisation";
import { useContext } from "react";
import { AppContext } from "./context/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() { 
  const [app, setApp] = useContext(AppContext)

  const handleResize = () => {
    setApp({...app,width: window.innerWidth,height: window.innerHeight})
  }
  window.onresize=handleResize

 
  return (
    <Box sx={{overflow:'hidden'}}>
      <Router>
        <Navbar/>     
        <Box sx={{display:'flex',alignContent:'center',justifyContent:'center', margin:"5px 5px 0px 5px"}}>     
        <Stack width="100%" p="0px 0px 0px 0px">
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/learn' element={<Cards/>}/>
              <Route path='/explore' element={<Contextualisation/>}/>
              <Route path='/inspire' element={<Inspiration/>}/>
            </Routes>
          <About/>
          <Contact/>
          <Help/>
        </Stack>
        </Box>      
      </Router>      
    </Box>
  );
}

export default App;
