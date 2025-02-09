import React from 'react';
import MainLayouts from './layouts/MainLayouts';
import { DarkModeProvider } from './context/DarkLightMode.jsx';

function App() {
  return (
    <DarkModeProvider>
      <MainLayouts>

      </MainLayouts>
    </DarkModeProvider>
  );
}

export default App;
