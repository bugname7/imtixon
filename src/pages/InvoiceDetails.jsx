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
  const statusColors = {
    paid: "bg-green-200 text-green-600",
    pending: "bg-yellow-200 text-yellow-600",
    draft: "bg-gray-200 text-gray-400",
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
      className={`${bgClass}  flex flex-col items-center justify-start px-6  md:pl-24 sm:pl-8`}
    >
      <div className="  sm:p-6 lg:p-4 w-full min-h-screen flex justify-center">
        <div
          className={`w-full max-w-4xl rounded-lg shadow-xl transition-colors ${
            darkMode ? "bg-[#1E2139] text-white" : "bg-white text-gray-800"
          }`}
        >
          {/* Status & Actions */}
          <div className="flex  sm:flex-row justify-between items-center  p-4 sm:p-6  ">
          <div className="flex items-center gap-2 ">

          <p className="text-gray-500 font-medium inline-block">Status</p>
              <p
                className={`inline-block px-4 py-2 text-sm font-bold rounded-lg ${
                  darkMode ? "bg-opacity-10" : "bg-opacity-40"
                } ${
                  statusColors[invoice.status?.toLowerCase()] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                ●{" "}
                {invoice.status?.charAt(0).toUpperCase() +
                  invoice.status?.slice(1)}
              </p>
            </div>

            <div className="flex gap-1 sm:gap-4 mt-4 sm:mt-0">
              <Link
                to={`/invoice-edit/${invoice.id}`}
                className="px-4 hidden md:block xs:block    md:px-6 sm:px-3  py-2 md:py-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 hidden md:block xs:block    md:px-6 sm:px-3  py-2 md:py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={handleInvoiceStatusNew}
                className="px-4 hidden md:block xs:block    md:px-6 sm:px-3  py-2 md:py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
              >
                Mark as Paid
              </button>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="p-4  md:p-6">
            <h1 className="text-2xl font-bold mb-2">
              <span className="text-gray-500">#</span>
              {invoice.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {invoice.description}
            </p>

            <div className=" gap-6 mb-8">
              <div>
                <p className="text-gray-500 mb-1">Invoice Date</p>
                <p className="font-bold">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment Due</p>
                <p className="font-bold">
                  {new Date(invoice.paymentDue).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-red-500 mb-1">Bill To</p>
                <p className="font-bold">{invoice.clientName}</p>
                {invoice.clientAddress && (
                  <>
                    <p>{invoice.clientAddress.street}</p>
                    <p>
                      {invoice.clientAddress.city},{" "}
                      {invoice.clientAddress.postCode}
                    </p>
                    <p>{invoice.clientAddress.country}</p>
                  </>
                )}
              </div>
              <div>
                <p className="text-gray-500 mb-1">Sent to</p>
                <p className="font-bold">{invoice.clientEmail}</p>
              </div>
            </div>

            {/* Items Table */}
            <div
              className={`rounded-lg overflow-hidden ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="hidden sm:flex justify-between p-4 bg-gray-300 dark:bg-gray-700 font-medium">
                <span>Item Name</span>
                <div className="flex gap-6">
                  <span>QTY.</span>
                  <span>Price</span>
                  <span>Total</span>
                </div>
              </div>
              <div>
                {invoice.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 border-b border-gray-300 dark:border-gray-600"
                  >
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

            {/* Grand Total */}
            <div
              className={`flex justify-between items-center py-6 px-4 mt-6 rounded-b-md ${
                darkMode ? "bg-black" : "bg-gray-800"
              }`}
            >
              <span className="text-gray-300 font-medium">Grand Total</span>
              <span className="text-2xl font-bold text-white">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
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
