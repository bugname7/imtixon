import { useParams, useNavigate, Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkLightMode";
import useInvoiceStore from "../store/store.js";
import { useEffect, useState } from "react";

const InvoiceDetails = () => {
  const { fetchInvoiceById, deleteInvoice, updateInvoiceStatus } =
    useInvoiceStore();
  const [invoice, setInvoice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      const data = await fetchInvoiceById(id);
      setInvoice(data);
    };
    fetchInvoice();
  }, [id, fetchInvoiceById]);

  const handleInvoiceStatusNew = async () => {
    try {
      await updateInvoiceStatus(id, "paid");
      const updatedInvoice = await fetchInvoiceById(id);
      setInvoice(updatedInvoice);
    } catch (error) {
      console.error("Xatolik mavjudga oxshaydi", error);
    }
  };

  if (!invoice) {
    return (
      <div className="p-8 text-center text-red-500 text-xl">
        Invoice not found
      </div>
    );
  }

  const handleDelete = async () => {
    setIsModalOpen(false);
    try {
      await deleteInvoice(id);

      navigate("/");
    } catch (error) {
      console.error("Xatolik mavjudga oxshaydi", error);
    }
  };

  const bgClass = darkMode
    ? "bg-slate-950 text-white"
    : "bg-slate-200 text-black";

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount || 0);

  return (
    <div
      className={`w-[70vw] h-[50vh] mx-auto sm:px-8 ${bgClass} mt-0 md:pl-24`}
    >
      <div
        className={`mb-4 p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-[#1E2139]" : "bg-slate-100"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-gray-400 font-medium">Status</span>
            <span
              className={`px-4 py-2 rounded-md font-bold ${
                darkMode ? "bg-[#252945]" : "bg-gray-200"
              } text-[#FF8F00]`}
            >
              ● {invoice?.status ?? "Unknown"}
            </span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Link
              to={`/invoice-edit/${invoice.id}`}
              className="bg-slate-200 text-slate-400 px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium"
            >
              Edit
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#EC5757] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#FF9797]"
            >
              Delete
            </button>
            <button
              onClick={handleInvoiceStatusNew}
              className="bg-[#7C5DFA] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#9277FF]"
            >
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      <div
        className={`p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-[#1E2139]" : "bg-[#F9FAFE]"
        }`}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          <span className="text-slate-400">#</span>
          {invoice.id}
        </h1>
        <p className="mb-6">{invoice.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-400 mb-1">Invoice Date</p>
            <p className="font-bold">
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Payment Due</p>
            <p className="font-bold">
              {new Date(invoice.paymentDue).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-red-400 mb-1">Bill To</p>
            <p className="font-bold">{invoice.clientName}</p>
            {invoice.clientAddress && (
              <>
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </>
            )}
          </div>
          <div>
            <p className="text-gray-400 mb-1">Sent to</p>
            <p className="font-bold">{invoice.clientEmail}</p>
          </div>
        </div>

        <div
          className={`rounded-lg overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-[#373b53]"
          }`}
        >
          <div className="hidden sm:flex justify-between p-4">
            <span>Item Name</span>
            <div className="flex gap-6">
              <span>QTY.</span>
              <span>Price</span>
              <span>Total</span>
            </div>
          </div>
          <div>
            {invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between p-4">
                <span>{item.name}</span>
                <div className="flex gap-6">
                  <span>{item.quantity}</span>
                  <span>{formatCurrency(item.price)}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex justify-between items-center py-6 px-4 mt-6 rounded-b-md ${
            darkMode ? "bg-black" : "bg-[#373b53]"
          }`}
        >
          <span className="text-slate-300 font-medium">Grand Total</span>
          <span className="text-2xl font-bold text-white">
            {formatCurrency(invoice.total)}
          </span>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-0">
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-md sm:max-w-lg w-full">
            <h2 className="text-2xl sm:text-3xl font-bold font-spartan mb-4 leading-[32px]">
              Ochirishni tasdiqlang
            </h2>
            <p className="text-slate-400 mb-6 font-spartan font-normal leading-[22px]">
              {`Haqiqatan ham ${invoice.id} hisob-fakturasini ochirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo‘lmaydi.`}
            </p>
            <div className="flex  sm:flex-row justify-end  gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-100 text-slate-500 px-6 hover:bg-slate-200 py-3 rounded-full font-medium font-spartan w-[100px]   sm:w-auto"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-slate-100 font-medium font-spartan   px-6 py-3 rounded-full w-[100px] sm:w-auto"
              >
                Ochirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
