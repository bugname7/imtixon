import React from 'react';
import MainLayouts from './layouts/MainLayouts';
import { DarkModeProvider } from './context/DarkLightMode.jsx';
import { Route, Routes, Router } from 'react-router-dom';
import Home from './pages/Home.jsx';
import InvoiceDetails from './pages/InvoiceDetails.jsx'
import NewInvoice from './pages/NewInvoic.jsx';
import InvoiceEdit from './pages/Invoice-Edit.jsx';
function App() {
  return (
    <DarkModeProvider>
      {/* <Routes>
        <Route path="/" element={
          <MainLayouts>
            <Home />
          </MainLayouts>
        } />

        <Route path="/invoice/:id" element={
          <MainLayouts>
            <InvoiceDetails />
          </MainLayouts>
        } />
        <Route path='/new' element={<MainLayouts>
          <NewInvoic />
        </MainLayouts>} />
      </Routes> */}

      <MainLayouts>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-invoice" element={<NewInvoice />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
          <Route path="/invoice-edit/:id" element={<InvoiceEdit />} />
        </Routes>
      </MainLayouts>


    </DarkModeProvider>
  );
}

export default App;
