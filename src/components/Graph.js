import { useContext, useEffect, useState } from "react";
import { SearchContext, GraphContext, AppContext } from "../context/Context";
import { saveAs } from "file-saver"; //or require

import Box from "@mui/material/Box";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AllOutIcon from '@mui/icons-material/AllOut';
import { ORDER } from "./Species";

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from "cytoscape";
import COSEBilkent from 'cytoscape-cose-bilkent';
import DagreLayout from 'cytoscape-dagre';
import ColaLayout from 'cytoscape-cola';
import fcose from 'cytoscape-fcose';
import euler from 'cytoscape-euler';
import cise from 'cytoscape-cise';

Cytoscape.use(COSEBilkent);
Cytoscape.use(DagreLayout);
Cytoscape.use(ColaLayout);
Cytoscape.use(fcose);
Cytoscape.use( euler );
Cytoscape.use( cise );


var _ = require("lodash");

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
    style: {
      width: 40,
      height: 40,
      shape: node=>node.data('rank')==='KINGDOM'? 'rectangle':'ellipse',
      label: 'data(id)',
      'font-size':10,
      'background-color':node=>COLORS[node.data('rank')],
    }
  },
  {
    selector: 'edge',
    style: {
      width:1,
    }
  },
  {
    selector:':selected',
    style:{
      'border-width':2
    }
  }
]

const hierarchy = ["kingdom","phylum","class","order","family","genus","species","subspecies"]

const Graph = () => {
  const [cy, setCy] = useState();
  const [app, setApp] = useContext(AppContext)
  const [search, setSearch] = useContext(SearchContext)
  const [graph, setGraph] = useContext(GraphContext)

  const [open, setOpen] = useState(true);

  const formatGraphData = (graph)=>{
    var data = {
      nodes:[],
      edges:[]
    }
    let selected = false
    Object.entries(graph.nodes).forEach(([k,v])=>{
      console.log(search, v)
      if (search.species.key===v.key) {
        selected = true
      } else {
        selected = false
      }
      data.nodes.push({selected:selected, data:{label:k, id:k, rank:v.rank.toUpperCase(), key:v.key}})
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
    setSearch({...search, species:item})
  }

  const resetGraph = ()=>{
    setGraph({
      nodes:{},
      edges:{}
    })
    setSearch({...search})
  }

  const expandGraph = ()=> {
    if ('key' in search.species) {
      if ((ORDER[search.species.rank] || 8)<7) {
        fetch(`https://api.gbif.org/v1/species/${search.species.key}/children?limit=1000`)
        .then(res=>res.json())
        .then(res=>{
          let items = res.results.filter((e)=>Object.keys(COLORS).includes(e.rank.toUpperCase()))
          items = _.shuffle(items)
          items.slice(0,5).forEach(item=>populateGraph(item))
        })
      }      
    }
  }

  useEffect(()=>{
    if (('key' in search.species)&&!(search.species.id in graph.nodes)) {
      fetch(`https://api.gbif.org/v1/species/${search.species.key}`)
      .then(res=>res.json())
      .then(res=>populateGraph(res))
    }
  },[search.species])

  useEffect(()=>{
    if (cy!==undefined) {
      cy.layout({ name: 'cose-bilkent',animate:true}).run()
    }
  },[graph])

  let component
  if (cy===undefined) {
    component =  <CytoscapeComponent 
                  elements={CytoscapeComponent.normalizeElements(formatGraphData(graph))}
                  style={ { width: 0.49*app.width, height: '700px' } } 
                  stylesheet={style}
                  minZoom={0.5}
                  maxZoom={2}
                  panningEnabled={true}
                  userZoomingEnabled={true}
                  cy={(cy=>{
                    setCy(cy)   
                    cy.layout({ name: 'cose-bilkent',animate:false}).run()
                    cy.on("tap", "node", (event) => {
                      nodeFocus(event.target._private.data)
                    });
                    cy.on('mouseover', (event) => {
                      if(event.cy.container()) {
                        event.cy.container().style.cursor = 'pointer';
                      }
                    })
                    cy.on('mouseout', (event) => {
                      if(event.cy.container()) {
                        event.cy.container().style.cursor = 'default';
                      }
                    })             
                })
                }
                />
  } else {
    component =  <CytoscapeComponent 
                  elements={CytoscapeComponent.normalizeElements(formatGraphData(graph))}
                  style={ { width: 0.49*app.width, height: '700px' } } 
                  stylesheet={style}
                  minZoom={0.5}
                  maxZoom={2}
                  panningEnabled={true}
                  userZoomingEnabled={true}
                  cy={(cy=>{
                    setCy(cy)   
                    cy.on("tap", "node", (event) => {
                      nodeFocus(event.target._private.data)
                    });
                    cy.on('mouseover', (event) => {
                      if(event.cy.container()) {
                        event.cy.container().style.cursor = 'pointer';
                      }
                    })
                    cy.on('mouseout', (event) => {
                      if(event.cy.container()) {
                        event.cy.container().style.cursor = 'default';
                      }
                    })             
                })
                }
                />
  }

  return (
    <Box position='relative'>
      {component}
      <Box sx={{position:'absolute', top:5,left:5}}>
        {Object.entries(COLORS).map(([k,v])=>
          <Box key={k} color={v} sx={{fontWeight:'bold', fontSize:12}}>{k}</Box>
        )}
      </Box >

      <Box sx={{position:'absolute', bottom:0}}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'relative', bottom:5}}
        icon={<SpeedDialIcon onClick={(e)=>{e.preventDefault();setOpen(!open)}}/>}
        FabProps={{"size": "small"}}
        open={open}
      >
        <SpeedDialAction
          key="Zoom in"
          icon={<ZoomInIcon/>}
          tooltipTitle="Zoom in"
          onClick={() => {
            cy.zoom(Math.min(2.5,cy.zoom() + 0.25))
          }}
        />
        <SpeedDialAction
          key="Zoom out"
          icon={<ZoomOutIcon/>}
          tooltipTitle="Zoom out"
          onClick={() => {
            cy.zoom(Math.max(0.5,cy.zoom() - 0.25))
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
            saveAs(cy.png(), "graph.png");
          }}
        />        
        <SpeedDialAction
          key="Expand"
          icon={<AllOutIcon/>}
          tooltipTitle="Expand children"
          onClick={() => expandGraph()}
        />        

      </SpeedDial>
      </Box>    
    </Box>
  )
}

export default Graph