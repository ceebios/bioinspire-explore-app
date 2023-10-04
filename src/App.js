import { Box, Stack } from "@mui/material"
import Navbar from "./components/Navbar";
import Help from "./components/Help";
import Contact from "./components/Contact";
import Cards from "./components/Cards";
import Landing from "./components/Landing";
import Inspiration from "./components/Inspiration";
import Contextualisation from "./components/Contextualisation";
import { useContext } from "react";
import { AppContext } from "./context/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import butterfly from "./images/butterfly.jpg"
import AboutDialog from "./components/AboutDialog";

function App() {
  const [app, setApp] = useContext(AppContext)

  const handleResize = () => {
    setApp({ ...app, width: window.innerWidth, height: window.innerHeight })
  }
  window.onresize = handleResize


  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ zIndex: -100, position: 'absolute', backgroundImage: `url(${butterfly})`, backgroundSize: "cover", backgroundPosition: "center center", height: '100vh', overflow: "hidden", width: "100%", opacity: 0.3 }}>
      </Box>
      <Router>
        <Navbar />
        <Stack sx={{ height: '100vh', overflowy: 'auto', display: 'flex' }}>
          <Box height={'80px'}></Box>
          <Box sx={{ height: "max(100px, calc(100vh - 150px))", overflowY: 'auto' }}>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/learn' element={<Cards />} />
              <Route path='/explore' element={<Contextualisation />} />
              <Route path='/inspire' element={<Inspiration />} />
            </Routes>
          </Box>
          <Contact />
          <Help />
          <AboutDialog />
        </Stack>
      </Router>

    </Box>
  );
}

export default App;
