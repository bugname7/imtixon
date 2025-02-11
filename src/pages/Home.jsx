// import React, { useState } from "react";
// import { useDarkMode } from "../context/DarkLightMode";
// import { Link, useNavigate } from "react-router-dom";
// import new1 from "../assets/images/new1.svg";
// import invois from "../assets/images/invois.png";
// import data from "../assets/data.json";
// import arrow from "../assets/images/arrow.svg";

// function Home() {
//     const { darkMode } = useDarkMode();
//     const bgClass = darkMode ? "bg-slate-950" : "bg-slate-200";
//     const navigate = useNavigate();

//     const [filterStatus, setFilterStatus] = useState("Filter by status");

//     const filteredData = filterStatus === "Filter by status"
//         ? data
//         : data.filter((invoice) => invoice.status.toLowerCase() === filterStatus.toLowerCase());

//     const handleNavigate = (invoiceId) => {
//         navigate(`/invoice/${invoiceId}`);
//     };

//     const statusColors = {
//         paid: "bg-green-100 text-green-600",
//         pending: "bg-yellow-100 text-yellow-600",
//         draft: "bg-gray-100 text-gray-600"
//     };

//     return (
//         <div className={`${bgClass} min-h-screen flex flex-col items-center justify-start px-6 pb-6 md:pl-24 sm:pl-8`}>
//             <div className="w-full max-w-4xl flex justify-between items-center mb-8">
//                 <div>
//                     <h1 className={`${darkMode ? "text-white" : "text-black"} sm:text-3xl font-spartan font-bold`}>
//                         Invoices
//                     </h1>
//                     <p className={`${darkMode ? "text-slate-300" : ""} font-spartan font-medium text-slate-400`}>
//                         {filteredData.length} invoices
//                     </p>
//                 </div>

//                 <div className="flex items-center gap-8">
//                     <select
//                         id="status"
//                         value={filterStatus}
//                         onChange={(e) => setFilterStatus(e.target.value)}
//                         className={`${darkMode ? "bg-slate-950 text-white" : "bg-slate-200"} font-spartan font-bold block text-gray-700 focus:outline-none sm:text-base text-sm`}
//                     >
//                         <option value="Filter by status" className="font-spartan font-bold sm:text-base text-sm">
//                             Filter by status
//                         </option>
//                         <option value="Draft" className="font-spartan font-bold sm:text-base text-sm">
//                             Draft
//                         </option>
//                         <option value="Pending" className="font-spartan font-bold sm:text-base text-sm">
//                             Pending
//                         </option>
//                         <option value="Paid" className="font-spartan font-bold sm:text-base text-sm">
//                             Paid
//                         </option>
//                     </select>

//                     <Link to={"/new"} className="flex items-center justify-center gap-2 hover:bg-purple-500 bg-purple-600 rounded-3xl p-2    cursor-pointer w-fit">
//                         <img src={new1} alt="New Invoice" className="sm:w-7 sm:h-8 w-4 h-4 object-contain" />
//                         <h3 className="hidden md:block sm:hidden text-white font-spartan font-bold ">New</h3>
//                         <h3 className="hidden lg:block text-white font-spartan font-bold ">Invoice</h3>
//                     </Link>
//                 </div>
//             </div>

//             <div className="w-full max-w-4xl gap-4 grid">
//                 {filteredData.length > 0 ? (
//                     filteredData.map((invoice) => (
//                         <div
//                             key={invoice.id}
//                             onClick={() => handleNavigate(invoice.id)}
//                             className={`cursor-pointer hover:border-2 border-purple-600 p-4 rounded-lg shadow-md flex justify-between gap-4 sm:items-center ${darkMode ? "bg-slate-800 text-white" : "bg-white"
//                                 }`}
//                         >
//                             <div className="flex flex-col sm:flex-row sm:gap-2 md:gap-16">
//                                 <h3 className="text-lg font-bold font-spartan md:mb-0 mb-2">
//                                     <span className="text-slate-400">#</span>{`${invoice.id}`}
//                                 </h3>
//                                 <p className={`${darkMode ? "text-gray-300" : ""} mt-1 text-sm text-gray-500 md:mb-0 mb-2 font-spartan font-medium text-center`}>
//                                     Due {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
//                                         day: "2-digit",
//                                         month: "short",
//                                         year: "numeric"
//                                     })}
//                                 </p>
//                                 <p className="text-xl font-bold font-spartan">{`£${invoice.total.toFixed(2)}`}</p>
//                             </div>

//                             <div className="text-center sm:text-right flex gap-3 items-center flex-col sm:flex-row">
//                                 <p className="font-medium flex text-left items-start font-spartan text-slate-400 mb-4 lg:mb-0 md:mb-0">{invoice.clientName}</p>
//                                 <span
//                                     className={`inline-block ${darkMode ? 'bg-opacity-10' : 'bg-opacity-40'}  px-3 py-2 font-spartan w-24 text-center font-bold rounded-md text-sm ml-auto ${statusColors[invoice.status.toLowerCase()]
//                                         }`}
//                                 >
//                                     ● {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//                                 </span>
//                                 <span className={`hidden sm:inline`}>
//                                     <img src={arrow} alt="arrow image" />
//                                 </span>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="flex flex-col items-center text-center mt-12">
//                         <img src={invois} alt="No Invoices" className="w-64 h-64 object-contain mb-6" />
//                         <h2 className="text-xl font-bold text-gray-900 mb-2">There is nothing here</h2>
//                         <p className="text-gray-500">
//                             Create an invoice by clicking the <span className="font-bold text-purple-600">New</span> button and get started
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Home;





import React, { useState, useEffect } from "react";
import { useDarkMode } from "../context/DarkLightMode";
import { Link, useNavigate } from "react-router-dom";
import new1 from "../assets/images/new1.svg";
import invois from "../assets/images/invois.png";
import arrow from "../assets/images/arrow.svg";
import useInvoiceStore from "../store/store";

function Home() {
    const { darkMode } = useDarkMode();
    const bgClass = darkMode ? "bg-slate-950" : "bg-slate-200";
    const { isLoading, fetchInvoices, invoices } = useInvoiceStore();

    const [filterStatus, setFilterStatus] = useState("Filter by status");

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    const filteredData = filterStatus === "Filter by status"
        ? invoices
        : invoices.filter((invoice) => invoice.status.toLowerCase() === filterStatus.toLowerCase());



    const statusColors = {
        paid: "bg-green-100 text-green-600",
        pending: "bg-yellow-100 text-yellow-600",
        draft: "bg-gray-100 text-gray-600"
    };

    return (
        <div className={`${bgClass} min-h-screen flex flex-col items-center justify-start px-6 pb-6 md:pl-24 sm:pl-8`}>
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <div>
                    <h1 className={`${darkMode ? "text-white" : "text-black"} sm:text-3xl font-spartan font-bold`}>
                        Invoices
                    </h1>
                    <p className={`${darkMode ? "text-slate-300" : ""} font-spartan font-medium text-slate-400`}>
                        {filteredData.length} invoices
                    </p>
                </div>

                <div className="flex items-center gap-8">
                    <select
                        id="status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={`${darkMode ? "bg-slate-950 text-white" : "bg-slate-200"} font-spartan font-bold block text-gray-700 focus:outline-none sm:text-base text-sm`}
                    >
                        <option value="Filter by status">Filter by status</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>

                    <Link to={"/new-invoice"} className="flex items-center justify-center gap-2 hover:bg-purple-500 bg-purple-600 rounded-3xl p-2 cursor-pointer w-fit">
                        <img src={new1} alt="New Invoice" className="sm:w-7 sm:h-8 w-4 h-4 object-contain" />
                        <h3 className="hidden    sm:hidden text-white font-spartan font-bold ">New</h3>
                        <h3 className="hidden lg:block text-white font-spartan font-bold ">Invoice</h3>
                    </Link>
                </div>
            </div>


            {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <p className="text-lg text-gray-500">Loading</p>
                </div>
            ) : (
                <div className="w-full max-w-4xl gap-4 grid">
                    {filteredData.length > 0 ? (
                        filteredData.map((invoice) => (

                            <Link key={invoice.id} to={`invoice/${invoice.id}`}> <div
                                key={invoice.id}

                                className={`cursor-pointer hover:border-2 border-purple-600 p-4 rounded-lg shadow-md flex justify-between gap-4 sm:items-center ${darkMode ? "bg-slate-800 text-white" : "bg-white"}`}
                            >
                                <div className="flex flex-col sm:flex-row sm:gap-2 md:gap-16">
                                    <h3 className="text-lg font-bold font-spartan md:mb-0 mb-2">
                                        <span className="text-slate-400">#</span>{`${invoice.id}`}
                                    </h3>
                                    <p className={`${darkMode ? "text-gray-300" : ""} mt-1 text-sm text-gray-500 md:mb-0 mb-2 font-spartan font-medium `}>
                                        Due {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </p>
                                    <p className="text-xl font-bold font-spartan">£{invoice.total?.toFixed(2)}</p>
                                </div>

                                <div className="text-center sm:text-right flex gap-3 items-center flex-col sm:flex-row">
                                    <p className="font-medium flex text-left items-start font-spartan text-slate-400 mb-4 lg:mb-0 md:mb-0">{invoice.clientName}</p>
                                    <span className={`inline-block px-3 py-2 font-spartan w-24 text-center font-bold rounded-md text-sm ml-auto ${statusColors[invoice.status?.toLowerCase()]}`}>
                                        ● {invoice.status?.charAt(0).toUpperCase() + invoice.status?.slice(1)}
                                    </span>
                                    <span className="hidden sm:inline">
                                        <img src={arrow} alt="arrow image" />
                                    </span>
                                </div>
                            </div></Link>

                        ))
                    ) : (
                        <div className="flex flex-col items-center text-center mt-12">
                            <img src={invois} alt="No Invoices" className="w-64 h-64 object-contain mb-6" />
                            <h2 className="text-xl font-bold text-gray-900 mb-2">There is nothing here</h2>
                            <p className="text-gray-500">Create an invoice by clicking the <span className="font-bold text-purple-600">New</span> button and get started</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;