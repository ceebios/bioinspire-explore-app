import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useContext, useEffect, useState,useRef } from "react";
import { WikiContext, SearchContext } from "../context/Context";

const getQuery = (key)=> {
  const sparql = `SELECT ?item ?itemLabel ?itemDescription ?article ?image
  WHERE 
  {
  ?item wdt:P846 "${key}"
  optional {?item wdt:P18 ?image.}
  OPTIONAL {
      ?article schema:about ?item ;
      schema:isPartOf <https://en.wikipedia.org/> ; 
      schema:name ?sitelink .
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`
  return sparql
}

const Wiki = () => {
    const [search, setSearch] = useContext(SearchContext)
    const [wiki, setWiki] = useContext(WikiContext)
    const [wikidata,setWikidata] = useState({})
    const firstUpdate = useRef(true);

    const fetchLink = async (title)=> {
      let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(title)}&limit=1&format=json&origin=*&redirects=resolve`
      return await fetch(url)
      .then(res=>res.json())
      .then(res=>{return res[3][0]})
    }

    const fetchSummary = async (link)=> {
      let uri = `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${encodeURIComponent(link.split("wiki/")[1])}`
      return await fetch(uri)
      .then(res=>res.json())
      .then(res=>{
        const html_code = res["parse"]["text"]["*"];
        const parser = new DOMParser();
        const html = parser.parseFromString(html_code, "text/html");
        const div = html.querySelector("div.mw-parser-output")
        const children = div.childNodes
        var summary = ""
        var pastTable = false
  
        for (var i=0; i<children.length; i++) {
          if (children[i].localName==='table') {
            pastTable = true
          }
          if ((pastTable)&&(children[i].localName==='p')) {
            summary = children[i].innerText
            break
          }
        }
        return summary
      })
    }

    const fetchImage = async (link)=> {
      let url = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=pageimages|pageterms&piprop=original&titles=${encodeURIComponent(link.split("wiki/")[1])}`
      return await fetch(url)
      .then(res=>res.json())
      .then(res=>{
        if (res.query.pages.length>0) {
          const page = res.query.pages[0]
          if ((page.original!==undefined)&&(page.original.source!==undefined))
            {return page.original.source} 
          else {return ""}
        } else {
          return ""
        }
      })
    }        

    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }      
      if ('key' in search.species) {
        console.log('Wiki/text')
        const sparql = encodeURIComponent(getQuery(search.species.key))
        const url = `https://query.wikidata.org/sparql?query=${sparql}&format=json`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
          if (res.results.bindings.length>0) {
            setWikidata(res.results.bindings[0])
          }
        })
      }
    },[search.species]);    

    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }      
      const fetchWiki = async () => {
        if ('itemLabel' in wikidata) {
          console.log('Wiki/image')
          const desc = 'itemDescription' in wikidata? wikidata.itemDescription.value:""
          const title = `${wikidata.itemLabel.value}: ${desc}`
          var img = 'image' in wikidata? wikidata.image.value:""
          var link = 'article' in wikidata? wikidata.article.value:""
          if (link==="") {
            link = await fetchLink(wikidata.itemLabel.value)
          }
          if (img==="") {
            img = await fetchImage(link)
          }   
          const summary = await fetchSummary(link)       
          setWiki({
            title:title,
            summary:summary,
            image:img,
            link:link        
          })
        }
      }
      fetchWiki(wikidata)
    },[wikidata]);   
   

    const getCard=()=> (
      <Box height='650px'>
      <Card elevation={0} sx={{ maxWidth: '100%', overflowY:'auto',
          scrollbarColor: "rgba(46,54,69,0.5) rgba(210,210,210,0.5)",
          scrollbarWidth: "thin",
          '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.50)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.5)',
            outline: '0px solid slategrey',
          }
          }}>
        <CardMedia
          component="img"
          height="260"
          image={wiki.image}
          alt={wiki.title}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{overflowY:'auto'}}>
          <Typography gutterBottom variant="h6" component="div">
            {wiki.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {wiki.summary}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={wiki.link} target='_blank'>Wikipedia</Button>
        </CardActions>
      </Card>
      </Box>

    )

    return (      
      ('title' in wiki && wiki.title.length>0)?getCard():
      <Box height='650px'>
        <Typography>No species selected</Typography>
      </Box>
    )
}

export default Wiki