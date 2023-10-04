import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { W2VModeProvider, W2VValueProvider, SelectedProvider, ExpansionModeProvider, CardProvider, BiomigProvider, ClimateProvider, CompatProvider, AppProvider, SearchProvider, WikiProvider, ExpansionProvider, GraphProvider, RasterProvider } from './context/Context';

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
                        <ExpansionModeProvider>
                          <SelectedProvider>
                            <W2VValueProvider >
                              <W2VModeProvider>
                                <App />
                              </W2VModeProvider>
                            </W2VValueProvider>
                          </SelectedProvider>
                        </ExpansionModeProvider>
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
  </React.StrictMode >
);

