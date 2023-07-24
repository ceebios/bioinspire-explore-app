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

export const ExpansionContext = createContext();
export const ExpansionProvider = (props)=>{
    const [expansion, setExpansion] = useState(
        {
            nodes:[],
            expansions:[],
            expanded:[],
            mode:'word',
            searchmode:'taxon',
            search:undefined
        }        
    );
    return (
        <ExpansionContext.Provider value={[expansion, setExpansion]}>
            {props.children}
        </ExpansionContext.Provider>
    );
}

export const ExpansionModeContext = createContext();
export const ExpansionModeProvider = (props)=>{
    const [mode, setMode] = useState('process');
    return (
        <ExpansionModeContext.Provider value={[mode, setMode]}>
            {props.children}
        </ExpansionModeContext.Provider>
    );
}

export const BSearchContext = createContext();
export const BSearchProvider = (props)=>{
    const [search, setSearch] = useState(
        {
            search:
            {
                id:"Mollusca",
                name:"Mollusca",
                type:"taxon"
            },
            mode:'taxon',
        }        
    );
    return (
        <BSearchContext.Provider value={[search, setSearch]}>
            {props.children}
        </BSearchContext.Provider>
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

export const CardContext = createContext();
export const CardProvider = (props)=>{
    const [card, setCard] = useState({
        active:0,
        cards:[
            {
                img: 'https://www.publicdomainpictures.net/pictures/20000/velka/shark-jaws-8712975160110gd.jpg',
                vid:'https://www.youtube.com/watch?v=_5aHb0h2bvs',
                title: 'Paleo-bioinspiration and the jaws of fish',
                text: `In a 2012 paper in Scientific Reports, Grubich et al. describe the clamping forces exerted by the jaws of two Miocene-era piranha relatives, one present and one extinct. These clamping forces, among the most important developed by Life, functionally demonstrate, through measurements and simulations, the extraordinary efficiency of the bite of these past and present Amazonian fishes, and provide a mechanistic justification for their predatory dominance.`,
                author:'Ceebios',
                species:["Serrasalmus rhombeus", "Megapiranha paranensis", "Carcharodon megalodon"],
                source:'http://doi.org/10.1038/srep01009',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2018/08/11/05/13/desert-3598089__480.jpg',
                vid:'https://www.youtube.com/watch?v=IqrLxtpk7YY',
                title: 'AntBot, the ant robot',
                text: `Desert ants are able to explore their environment randomly over several hundred metres and then return to their starting point in a straight line with great precision.     They are the inspiration for Antbot, a six-legged robot that can walk to explore its environment. As it travels, a rotating sensor records the variations in polarised UV rays in the sky. This 'optical compass' consists of just two rotating pixels and two polarising filters, which are enough to guide the robot back to its starting point with an accuracy of about 10cm, a fraction of the robot's size. Antbot's guidance system does not require satellite geolocation, and continues to work under more or less cloudy skies, or even under trees or buildings.`,
                author:'Ceebios',
                species:["Cataglyphis", "Cataglyphis fortis", "Melophorus bagoti", "Cataglyphis bicolor"],
                source:'https://www.science.org/doi/10.1126/scirobotics.aau0307',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2014/03/24/22/05/mushrooms-295823_1280.jpg',
                vid:'https://www.youtube.com/watch?v=Bz1A9Jb7J10',
                title: 'Mycorremediation of polluted soils',
                text: `In the ecosystem, fungi play a crucial role in the decomposition and recycling of organic matter. Mycoremediation is the decontamination of an environment, such as soil, by fungi. By introducing one or more species of fungi into a polluted site, polluting molecules such as hydrocarbons or heavy metals can be removed from the soil. Unlike conventional remediation techniques, which often rely on thermal desorption and "burn" the soil to degrade or extract the pollutants, mycoremediation allows microbial and plant life to be maintained throughout the remediation process, and avoids moving large volumes of soil to a reprocessing plant.`,
                author:'Ceebios',
                species:["Fusarium solani" , "Pleurotus ostreatus", "Rhizopus arrhizus", "Phanerochaete chrysosporium", "Phanerochaete sordida", "Tramates hirsuta", "Tramates versicolor", "Lentinus edodes"],
                source:'http://link.springer.com/10.1007/978-3-319-99398-0_3',
              },
              {
                img: 'https://specials-images.forbesimg.com/imageserve/5da853decd594c00062148a1/960x0.jpg',
                vid:'https://www.youtube.com/watch?v=o1TS2nsGzSI',
                title: 'The Blob: optimised decisions, anticipation and knowledge sharing',
                text: `The Blob Physarum polycephalum is able to learn from its physical environment to adapt its development strategy and efficiently recover resources.     Physarum polycephalum is a unicellular being measuring a few centimetres to several metres in diameter. Although it does not have a brain as such, it is capable of learning from its past and solving problems related to its environment. For example, a blob can be trained to recognise table salt as "non-toxic", which enables it to learn to traverse salty environments to find food. The "blob" can pass on this knowledge to its fellow creatures by simple contact.`,
                author:'Ceebios',
                species:["Physarum polycephalum"],
                source:'http://dx.doi.org/10.1098/rstb.2018.0368',
              },
              {
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rhinolophus_smithersi.jpg/580px-Rhinolophus_smithersi.jpg',
                vid:'https://www.youtube.com/watch?v=uaf10UP5ij8',
                title: `Echolocation: Seeing like bats`,
                text: `Bats have the ability to locate themselves thanks to the echo of the ultrasounds that they emit and analyse very precisely. This enables them to hunt at night. Based on this property, known as echolocation, researchers have invented a high-performance cane for the blind.`,
                author:'Nature=Futur, Ceebios',
                species:["Glauconycteris superba", "Nyctalus lasiopterus", "Melophorus bagoti"],
                source:'https://doi.org/10.3161/15081109ACC2016.18.2.014',
              }  ,
              {
                img: 'https://cdn.pixabay.com/photo/2013/06/30/18/56/butterfly-142506_1280.jpg',
                vid:'https://www.youtube.com/watch?v=j625EAuCb2M',
                title: `Butterfly Wings and Radiation Management`,
                text: `The strategy of the Morpho butterfly, whose wings absorb heat by radiation, can be used to make photovoltaic panels that are more resistant and better suited to the very high temperatures in the desert.`,
                author:'Nature=Futur, Ceebios',
                species:["Morpho", "Morpho menelaus", "Greta", "Morpho luna", "Archaeoprepona meander"],
                source:'https://doi.org/10.1007/s00339-004-3185-x',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2017/09/06/16/28/wal-2722172_1280.jpg',
                vid:'https://www.youtube.com/watch?v=QUtSAIkdFS4',
                title: `More efficient wind turbine inspired by the Humpback whale`,
                text: `Wind turbines are mainly reserved for rural use because of their large size, the noise they generate and their physical appearance. The study of marine organisms has led to propose alternative designs of wind turbines or tidal turbines, their blades, their texture, to limit the nuisance and optimize the dynamics of fluids that pass through them. `,
                author:'PicaPicaTV, Ceebios',
                species:["Megaptera", "Megaptera novaeangliae"],
                source:'https://ijmme.springeropen.com/articles/10.1186/s40712-017-0085-3',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2016/04/21/15/56/diatom-1343736_1280.jpg',
                vid:'https://youtu.be/8_cIt_M2g2s',
                title: `Diatoms-made glass`,
                text: `Diatoms, single-celled microalgae, make and live in a porous shell made of porous silica. This bio-mineralization, which takes place under mild conditions, at near-ambient temperature, could inspire us to create resistant, light, non-opaque materials and architectures, at different scales.`,
                author:'Nature = Futur, Ceebios',
                species:["Achnanthes","Bacillariophyceae","Nitzschia","Coscinodiscus radiatus"],
                source:'https://pubs.rsc.org/en/content/articlelanding/2011/cs/c0cs00122h/unauth',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2014/02/15/14/59/termite-hill-266587_1280.jpg',
                vid:'https://www.youtube.com/watch?v=7aQVNx_1OGg',
                title: `Bio-inspired architecture`,
                text: `The design of architectural elements, buildings or neighborhoods can be influenced by organic forms of animals/plants organic forms of animals/plants - without necessarily taking into account the ecological stake. This architectural biomorphism can go further, and serve issues of resistance of structures, saving materials or energy, thermoregulation of habitats, integration into the ecosystem, issues that we find in the living world.`,
                author:'Ceebios',
                species:["Euplectella","Argyroneta aquatica","Lithops"],
                source:'https://www.sciencedirect.com/science/article/abs/pii/S0378778821003182',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2017/04/23/16/22/duck-2254227_1280.jpg',
                vid:'https://www.youtube.com/watch?v=AFzWJ6P2iyY',
                title: `Waterless cleaning`,
                text: `Many animals use behavioral strategies to stay clean, and rid their skins, fur, cuticles, integuments of particles that accede to them. These stereotyped movements have been studied by researchers at the Georgia Institute of Technology, Atlanta, and could serve as inspiration for waterless cleaning and material expulsion processes.`,
                author:'Ceebios',
                species:["Mus musculus","Canis lupus","Amblonyx cinereus"],
                source:'https://royalsocietypublishing.org/doi/10.1098/rsif.2012.0429',
              },
              {
                img: 'http://commons.wikimedia.org/wiki/Special:FilePath/Dionaea%20muscipula%201.jpg',
                vid:'https://www.youtube.com/watch?v=O7eQKSf0LmY',
                title: `Closing Fast`,
                text: `The speed of movement in the living world, including plants, is a source of wonder. Based on mechanical instability, the closing mechanism of the Venus flycatcher takes place in a few hundred milliseconds. This mechanism, the morphology of the plant, as well as its rearmament by pressure changes in the cells, serve as inspiration on various scales ranging from robotics to biochemistry.`,
                author:'Ceebios',
                species:["Dionaea muscipula"],
                source:'http://www.nature.com/articles/nature03185',
              }                    
        ]
    })    
    return (
        <CardContext.Provider value={[card, setCard]}>
            {props.children}
        </CardContext.Provider>
    );
}