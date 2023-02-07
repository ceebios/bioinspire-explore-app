import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BiomigProvider, ClimateProvider, CompatProvider, AppProvider, SearchProvider, WikiProvider, ExpansionProvider, GraphProvider, RasterProvider } from './context/Context';

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
                      <App/>  
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

