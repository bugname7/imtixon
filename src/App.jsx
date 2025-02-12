import React from "react";
import MainLayouts from "./layouts/MainLayouts";
import { DarkModeProvider } from "./context/DarkLightMode.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import InvoiceDetails from "./pages/InvoiceDetails.jsx";
import NewInvoice from "./pages/NewInvoic.jsx";
import InvoiceEdit from "./pages/InvoiceEdit.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <DarkModeProvider>
      <MainLayouts>
        <Toaster position="top-right" reverseOrder={false} />

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
