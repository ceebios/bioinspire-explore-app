import { Box } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css"
import 'leaflet/dist/leaflet.css';
import {  memo } from "react";

const makeUrl = (taxonKey) => {
    return `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@2x.png?srs=EPSG:3857&bin=hex&hexPerTile=50&year=1961,2020&taxonKey=${taxonKey}&style=classic.poly`
  }

const Map = ({search}) => {

    return (
      <Box width="100%" height="650px">
        <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {'key' in search.species?<TileLayer key={search.species.key} url={makeUrl(search.species.key)}/>:<></>}
            
        </MapContainer>             
      </Box>
    )
}

Map.defaultProps = {
    taxonKey: 1311527
  };

  
export default memo(Map)