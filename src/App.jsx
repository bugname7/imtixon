import React from 'react';
import MainLayouts from './layouts/MainLayouts';
import { DarkModeProvider } from './context/DarkLightMode.jsx';

function App() {
  return (
    <DarkModeProvider>
      <MainLayouts>
        <h1 className="text-center mt-10">Bosh Sahifa</h1>
      </MainLayouts>
    </DarkModeProvider>
  );
}

export default App;
