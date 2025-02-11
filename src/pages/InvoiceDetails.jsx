// import { useParams, useNavigate } from "react-router-dom";
// import { useDarkMode } from "../context/DarkLightMode";
// import data from "../assets/data.json";

// const InvoiceDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { darkMode } = useDarkMode();
//     const invoice = data.find((item) => item.id === id);

//     // if (!invoice) {
//     //     return (
//     //         <div className="p-8 text-center text-red-500 text-xl">
//     //             Invoice not found
//     //         </div>
//     //     );
//     // }
//     console.log(invoice)
//     const bgClass = darkMode ? "bg-slate-950 text-white" : "bg-slate-200 text-black";

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat("en-GB", {
//             style: "currency",
//             currency: "GBP",
//         }).format(amount || 0);
//     };

//     const handleDelete = () => {
//         console.log("Invoice deleted:", invoice.id);
//         navigate("/");
//     };

//     const handleEdit = () => navigate(`/edit/${invoice.id}`);

//     const handleMarkAsPaid = () => {
//         console.log("Marking as paid:", invoice.id);
//     };

//     return (
//         <div className={`max-h-xl mx-auto py-8 pt-0  px-4 sm:px-8 ${bgClass} mt-0  md:pl-24     `}>

//             <div className={`max-w-3xl mb-4 mx-auto p-6    rounded-lg ${darkMode ? "bg-[#1E2139]" : "bg-slate-100"} shadow-lg `}>
//                 <div className="status-buttons-container flex flex-col sm:flex-row justify-between items-center mb-2">

//                     <div className="flex items-center gap-2 mb-4 sm:mb-0">
//                         <span className={`${darkMode ? 'text-gray-300' : 'text-gray-400'}  font-spartan font-medium`}>Status</span>
//                         <span
//                             className={`px-4 py-2 rounded-md font-spartan font-bold ${darkMode ? "bg-[#252945]" : "bg-gray-200"} text-[#FF8F00]`}
//                         >
//                             ●  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//                         </span>
//                     </div>


//                     <div className="flex gap-2 sm:gap-4">
//                         <button
//                             onClick={handleEdit}
//                             className={`${darkMode ? 'bg-[#252945]' : ''} bg-slate-200 text-slate-400 px-4 sm:px-5 py-2 sm:py-3 rounded-full font-spartan font-medium`}
//                         >
//                             Edit
//                         </button>
//                         <button
//                             onClick={handleDelete}
//                             className="bg-[#EC5757] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-spartan font-medium hover:bg-[#FF9797]"
//                         >
//                             Delete
//                         </button>
//                         <button
//                             onClick={handleMarkAsPaid}
//                             className="bg-[#7C5DFA] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-spartan font-medium hover:bg-[#9277FF]"
//                         >
//                             Mark as Paid
//                         </button>
//                     </div>

//                 </div>
//             </div>
//             <div className={`max-w-3xl mx-auto p-6 rounded-lg ${darkMode ? "bg-[#1E2139]" : "bg-[#F9FAFE]"} shadow-lg`}>




//                 <div className="p-6 rounded-lg">
//                     <h1 className="text-xl sm:text-2xl font-bold mb-4"><span className="text-slate-400">#</span>{invoice.id}</h1>
//                     <p className="mb-6">{invoice.description}</p>

//                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 mb-8">
//                         <div>
//                             <p className="text-gray-400 mb-1">Invoice Date</p>
//                             <p className="font-bold">{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
//                         </div>
//                         <div>
//                             <p className="text-gray-400 mb-1">Payment Due</p>
//                             <p className="font-bold">{new Date(invoice.paymentDue).toLocaleDateString()}</p>
//                         </div>
//                         <div>
//                             <p className="text-red-400 mb-1">Bill To</p>
//                             <p className="font-bold">{invoice.clientName}</p>
//                             {invoice.clientAddress && (
//                                 <>
//                                     <p>{invoice.clientAddress.street}</p>
//                                     <p>{invoice.clientAddress.city}</p>
//                                     <p>{invoice.clientAddress.postCode}</p>
//                                     <p>{invoice.clientAddress.country}</p>
//                                 </>
//                             )}
//                         </div>
//                         <div>
//                             <p className="text-gray-400 mb-1">Sent to</p>
//                             <p className="font-bold">{invoice.clientEmail}</p>
//                         </div>
//                     </div>

//                     <div>
//                         <div className={`${darkMode ? 'bg-gray-800' : 'bg-[#373b53]'} rounded-lg overflow-hidden `}>
//                             <div className="hidden sm:flex justify-between mb-0 items-center p-4">
//                                 <span>Item Name</span>
//                                 <div className="flex gap-6">
//                                     <span>QTY.</span>
//                                     <span>Price</span>
//                                     <span>Total</span>
//                                 </div>
//                             </div>

//                             <div className="sm:hidden">
//                                 {invoice.items.map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className="flex flex-col gap-2 p-4 "
//                                     >
//                                         <div className="flex justify-between">
//                                             <span className="font-bold">{item.name}</span>
//                                             <span>{formatCurrency(item.price * item.quantity)}</span>
//                                         </div>
//                                         <div className="text-sm">
//                                             {item.quantity} x {formatCurrency(item.price)}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>


//                             <div className="hidden sm:block">
//                                 {invoice.items.map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className="flex justify-between items-center p-4"
//                                     >
//                                         <span>{item.name}</span>
//                                         <div className="flex gap-6">
//                                             <span>{item.quantity}</span>
//                                             <span>{formatCurrency(item.price)}</span>
//                                             <span>{formatCurrency(item.price * item.quantity)}</span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className={`flex justify-between items-center py-6 px-4 mt-6 rounded-b-md ${darkMode ? 'bg-black' : 'bg-[#373b53]'}`}>
//                             <span className="text-slate-300 font-spartan font-medium">Grand Total</span>
//                             <span className="text-2xl font-bold text-white font-spartan">{formatCurrency(invoice.total)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InvoiceDetails;


import { useParams, useNavigate, data, Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkLightMode";
import useInvoiceStore from "../store/store.js";
import { useEffect, useState } from "react";

const InvoiceDetails = () => {
    const { fetchInvoiceById } = useInvoiceStore();
    const [invoice, setInvoice] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();

    useEffect(() => {
        const fetchInvoice = async () => {
            const data = await fetchInvoiceById(id);
            setInvoice(data);

        };
        fetchInvoice();
    }, []);

    if (!invoice) {
        return (
            <div className="p-8 text-center text-red-500 text-xl">
                Invoice not found
            </div>
        );
    }

    const bgClass = darkMode ? "bg-slate-950 text-white" : "bg-slate-200 text-black";

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount || 0);

    const handleDelete = () => {
        console.log("Invoice deleted:", invoice.id);
        navigate("/");
    };

    const handleMarkAsPaid = () => console.log("Marking as paid:", invoice.id);

    return (
        <div className={`max-w-3xl mx-auto py-8 px-4 sm:px-8 ${bgClass} mt-0 md:pl-24`}>
            <div className={`mb - 4 p-6 rounded-lg shadow-lg ${darkMode ? "bg-[#1E2139]" : "bg-slate-100"}`}>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                    <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <span className="text-gray-400 font-medium">Status</span>
                        <span className={`px-4 py-2 rounded-md font-bold ${darkMode ? "bg-[#252945]" : "bg-gray-200"} text-[#FF8F00]`}>
                            ● {invoice?.status ?? "Ma'lumot mavjud emas"}
                        </span>
                    </div >
                    <div className="flex gap-2 sm:gap-4">
                        <Link to={`/invoice-edit/${invoice.id}`} className="bg-slate-200 text-slate-400 px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium">
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="bg-[#EC5757] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#FF9797]">
                            Delete
                        </button>
                        <button onClick={handleMarkAsPaid} className="bg-[#7C5DFA] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#9277FF]">
                            Mark as Paid
                        </button>
                    </div>
                </div >
            </div >

            <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-[#1E2139]" : "bg-[#F9FAFE]"}`}>
                <h1 className="text-xl sm:text-2xl font-bold mb-4">
                    <span className="text-slate-400">#</span>{invoice.id}
                </h1>
                <p className="mb-6">{invoice.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="text-gray-400 mb-1">Invoice Date</p>
                        <p className="font-bold">{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 mb-1">Payment Due</p>
                        <p className="font-bold">{new Date(invoice.paymentDue).toLocaleDateString()}</p>
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
                <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-[#373b53]"}`}>
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
                <div className={`flex justify-between items-center py-6 px-4 mt-6 rounded-b-md ${darkMode ? "bg-black" : "bg-[#373b53]"}`}>
                    <span className="text-slate-300 font-medium">Grand Total</span>
                    <span className="text-2xl font-bold text-white">{formatCurrency(invoice.total)}</span>
                </div>
            </div >
        </div >
    );
};

export default InvoiceDetails;