import React from 'react';
import MainLayouts from './layouts/MainLayouts';
import { DarkModeProvider } from './context/DarkLightMode.jsx';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path='/' element={<DarkModeProvider>
        <MainLayouts>

        </MainLayouts>
      </DarkModeProvider>} />
    </Routes>
  );
}

export default App;
