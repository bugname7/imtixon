import React, { useState, useEffect } from "react";
import MainLayouts from "./layouts/MainLayouts.jsx";
import { DarkModeProvider, useDarkMode } from "./context/DarkLightMode.jsx"; 
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import InvoiceDetails from "./pages/InvoiceDetails.jsx";
import NewInvoice from "./pages/NewInvoic.jsx";
import InvoiceEdit from "./pages/InvoiceEdit.jsx";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loading.jsx"; 

function App() {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500); 
  }, []);

  if (loading) {
    return <Loader />; 
  }

  return (
    <DarkModeProvider>
      <MainLayouts>
        <ToasterConfig />
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

const ToasterConfig = () => {
  const { darkMode } = useDarkMode(); 

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: darkMode ? "#333" : "#fff",
          color: darkMode ? "#fff" : "#333",
        },
      }}
    />
  );
};
