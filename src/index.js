import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SelectedProvider, ExpansionModeProvider,BSearchProvider,CardProvider, BiomigProvider, ClimateProvider, CompatProvider, AppProvider, SearchProvider, WikiProvider, ExpansionProvider, GraphProvider, RasterProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <SearchProvider>
        <WikiProvider>
          <ExpansionProvider>
            <GraphProvider>
              <RasterProvider>
                <CompatProvider>
                  <ClimateProvider>
                    <BiomigProvider>
                      <CardProvider>
                        <BSearchProvider>
                          <ExpansionModeProvider>
                            <SelectedProvider>
                              <App/>  
                            </SelectedProvider>                          
                          </ExpansionModeProvider>                          
                        </BSearchProvider>                          
                      </CardProvider>                      
                    </BiomigProvider>                    
                  </ClimateProvider>                  
                </CompatProvider>
              </RasterProvider>              
            </GraphProvider>            
          </ExpansionProvider>
        </WikiProvider>
      </SearchProvider>
    </AppProvider>
  </React.StrictMode>
);

