import { useState, createContext } from "react";

export const AppContext = createContext();
export const AppProvider = (props)=>{
    const [app, setApp] = useState({
        lang:'fr',
        help:false,
        scroll:0,
        width: window.innerWidth,
        height: window.innerHeight        
    });
    return (
        <AppContext.Provider value={[app, setApp]}>
            {props.children}
        </AppContext.Provider>
    );
}

export const WikiContext = createContext();
export const WikiProvider = (props)=>{
    const [wiki, setWiki] = useState(
        {
            title:'' ,
            summary:'',
            image:'',
            link:''
        }        
    );
    return (
        <WikiContext.Provider value={[wiki, setWiki]}>
            {props.children}
        </WikiContext.Provider>
    );
}

export const ExpansionContext = createContext();
export const ExpansionProvider = (props)=>{
    const [expansion, setExpansion] = useState(
        {
            topn:20,
            suggestions:[]
        }        
    );
    return (
        <ExpansionContext.Provider value={[expansion, setExpansion]}>
            {props.children}
        </ExpansionContext.Provider>
    );
}

export const SearchContext = createContext();
export const SearchProvider = (props)=>{
    const [search, setSearch] = useState(
        {
            species:{},
            checked:true
        }        
    );
    return (
        <SearchContext.Provider value={[search, setSearch]}>
            {props.children}
        </SearchContext.Provider>
    );
}


export const GraphContext = createContext();
export const GraphProvider = (props)=>{
    const [graph, setGraph] = useState(
        {
            nodes:{},
            edges:{}
        }        
    );
    return (
        <GraphContext.Provider value={[graph, setGraph]}>
            {props.children}
        </GraphContext.Provider>
    );
}

export const RasterContext = createContext();
export const RasterProvider = (props)=>{
    const [raster, setRaster] = useState(false)
    return (
        <RasterContext.Provider value={[raster, setRaster]}>
            {props.children}
        </RasterContext.Provider>
    );
}

export const CompatContext = createContext();
export const CompatProvider = (props)=>{
    const [compat, setCompat] = useState(
        {
            species:'',
            processes:'',
            quantities:'',
            ecozones:'',
            value:0,
            words:[]
        }
    )
    return (
        <CompatContext.Provider value={[compat, setCompat]}>
            {props.children}
        </CompatContext.Provider>
    );
}

export const ClimateContext = createContext();
export const ClimateProvider = (props)=>{
    const [climate, setClimate] = useState({})
    return (
        <ClimateContext.Provider value={[climate, setClimate]}>
            {props.children}
        </ClimateContext.Provider>
    );
}

export const BiomigContext = createContext();
export const BiomigProvider = (props)=>{
    const [biomig, setBiomig] = useState({
        checked:false,
        present:false
    })    
    return (
        <BiomigContext.Provider value={[biomig, setBiomig]}>
            {props.children}
        </BiomigContext.Provider>
    );
}