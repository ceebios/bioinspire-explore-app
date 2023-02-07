import { useContext, useRef, useEffect, useState } from "react";
import { SearchContext, GraphContext, RasterContext, AppContext } from "../context/Context";
import { saveAs } from "file-saver"; //or require

import Box from "@mui/material/Box";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from "cytoscape";
import COSEBilkent from 'cytoscape-cose-bilkent';
import DagreLayout from 'cytoscape-dagre';
import ColaLayout from 'cytoscape-cola';
Cytoscape.use(COSEBilkent);
Cytoscape.use(DagreLayout);
Cytoscape.use(ColaLayout);

const COLORS = {
  SPECIES:"#fb2056",
  GENUS:"#fc8f5b",
  FAMILY:"#ffd055",
  ORDER:"#8dd58c",
  CLASS:"#38c9b1",
  PHYLUM:"#1798c3",
  KINGDOM:"#182573",
}

const style = [
  {
    selector: 'node',
    style: {width: 40,height: 40,shape: 'ellipse',label: 'data(id)','font-size':10}
  },
  {
    selector: 'node[rank="SPECIES"]',
    style: {'background-color': '#fb2056','border-width':0,'border-color':'SteelBlue'}//"https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg"}
  },  
  {
    selector: 'node[rank="GENUS"]',
    style: {'background-color': '#fc8f5b','border-width':0,'border-color':'SteelBlue'}
  },  
  {
    selector: 'node[rank="FAMILY"]',
    style: {'background-color': '#ffd055','border-width':0,'border-color':'SteelBlue'}
  },  
  {
    selector: 'node[rank="ORDER"]',
    style: {'background-color': '#8dd58c','border-width':0,'border-color':'SteelBlue'}
  },  
  {
    selector: 'node[rank="CLASS"]',
    style: {'background-color': '#38c9b1','border-width':0,'border-color':'SteelBlue'}
  },  
  {
    selector: 'node[rank="PHYLUM"]',
    style: {'background-color': '#1798c3','border-width':0,'border-color':'SteelBlue'}
  },  
  {
    selector: 'node[rank="KINGDOM"]',
    style: {shape: 'rectangle','background-color': '#182573','border-width':0,'border-color':'SteelBlue'}
  }, 
  {
    selector: 'edge',
    style: {
      width:1,
    }
  },  
  {
    selector:'node:selected',
    style:{'border-width':3}
  },
]

const hierarchy = ["kingdom","phylum","class","order","family","genus","species","subspecies"]

const Graph = () => {
  const firstUpdate = useRef(true);
  const [app, setApp] = useContext(AppContext)
  const [search, setSearch] = useContext(SearchContext)
  const [graph, setGraph] = useContext(GraphContext)
  const [raster, setRaster] = useContext(RasterContext)
  const cyRef = useRef(null);  
  const [zoom, setZoom] = useState(1)

  const formatGraphData = (graph)=>{
    var data = {
      nodes:[],
      edges:[]
    }
    Object.entries(graph.nodes).forEach(([k,v])=>{
      data.nodes.push({data:{label:k, id:k, rank:v.rank.toUpperCase(), key:v.key}})
    })
    Object.entries(graph.edges).forEach(([k,v])=>{
      v.forEach(iv=>{
        data.edges.push({data:{source:k, target:iv}})
      })      
    })
    return data
  }

  const populateGraph = (item)=>{
    var G = {...graph}
    let itemname = item[item.rank.toLowerCase()]
    G.nodes[itemname] = {key:item.key,label:itemname, rank:item.rank}
    const ix = hierarchy.indexOf(item.rank.toLowerCase())
    for (var i=ix-1;i>=0;i--) {
      if (hierarchy[i] in item) {
        // Add node
        G.nodes[item[hierarchy[i]]] = {key:item[hierarchy[i]+'Key'],label:item[hierarchy[i]],rank:hierarchy[i]}
        // Add edge
        if (item[hierarchy[i]] in G.edges) {
          if (!G.edges[item[hierarchy[i]]].includes(itemname)) {
            G.edges[item[hierarchy[i]]].push(itemname)
          }        
        }
        else {
          G.edges[item[hierarchy[i]]] = [itemname]
        }           
        // Update name
        itemname = item[hierarchy[i]]
      }
    }
    setGraph(G)
  }

  const nodeFocus = (item)=>{
    setRaster(false)
    setSearch({...search, species:item})
  }

  const resetGraph = ()=>{
    setRaster(false)
    setGraph({
      nodes:{},
      edges:{}
    })
    setSearch({...search})
  }


  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }    
    if ('key' in search.species) {
      console.log('Graph')
      fetch(`https://api.gbif.org/v1/species/${search.species.key}`)
      .then(res=>res.json())
      .then(res=>populateGraph(res))
    }
  },[search.species])

  useEffect(() => {
    if (cyRef.current) {
      let cy = cyRef.current._cy;

      // Animate layout
      cy.layout({ name: 'dagre',animate:false}).run()    

      // Capture node focus
      cy.on("tap", "node", (event) => {
        nodeFocus(event.target._private.data)
      });                 
    }
  })

  return (
    <Box position='relative'>
      <CytoscapeComponent 
        elements={CytoscapeComponent.normalizeElements(formatGraphData(graph))}
        style={ { width: 0.49*app.width, height: '700px' } } 
        stylesheet={style}
        minZoom={0.5}
        maxZoom={2}
        ref={cyRef}
        panningEnabled={true}
        userZoomingEnabled={false}
      />
      <Box sx={{position:'absolute', top:5,left:5}}>
        {Object.entries(COLORS).map(([k,v])=>
          <Box key={k} color={v} sx={{fontWeight:'bold', fontSize:12}}>{k}</Box>
        )}
      </Box >

      <Box sx={{position:'absolute', bottom:0}}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'relative', bottom:5}}
        icon={<SpeedDialIcon />}
        FabProps={{"size": "small"}}
      >
        <SpeedDialAction
          key="Zoom in"
          icon={<ZoomInIcon/>}
          tooltipTitle="Zoom in"
          onClick={() => {
            cyRef.current._cy.zoom(Math.min(2.5,cyRef.current._cy.zoom() + 0.25))
          }}
        />
        <SpeedDialAction
          key="Zoom out"
          icon={<ZoomOutIcon/>}
          tooltipTitle="Zoom out"
          onClick={() => {
            cyRef.current._cy.zoom(Math.max(0.5,cyRef.current._cy.zoom() - 0.25))
          }}
        />
        <SpeedDialAction
          key="Clear"
          icon={<DeleteOutlineIcon/>}
          tooltipTitle="Clear"
          onClick={() => resetGraph()}
        />
        <SpeedDialAction
          key="Save copy"
          icon={<SaveAltIcon/>}
          tooltipTitle="Save copy"
          onClick={() => {
            saveAs(cyRef.current._cy.png(), "graph.png");
          }}
        />        
      </SpeedDial>
      </Box>    
    </Box>
  )
}

export default Graph