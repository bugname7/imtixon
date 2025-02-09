import React, { useState } from "react";
import { useDarkMode } from "../context/DarkLightMode";
import new1 from "../assets/images/new1.svg";
import invois from "../assets/images/invois.png";

import data from "../assets/data.json";

function Home() {
    const { darkMode } = useDarkMode();
    const bgClass = darkMode ? "bg-slate-950" : "bg-slate-200";

    const [filterStatus, setFilterStatus] = useState("Filter by status");

    const filtereddata =
        filterStatus === "Filter by status"
            ? data
            : data.filter((invoice) => invoice.status === filterStatus.toLowerCase());

    return (
        <div
            className={`${bgClass} min-h-screen flex flex-col items-center justify-start pt-12 pl-6 pb-6 pr-6`}
        >
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <div>
                    <h1
                        className={`${darkMode ? "text-white" : "text-black"
                            } sm:text-3xl font-spartan font-bold text-gray-900 xl:text-2xl`}
                    >
                        Invoices
                    </h1>
                    <p
                        className={`${darkMode ? "text-slate-300" : ""
                            } font-spartan font-medium text-slate-400 md:text-xs sm:text-xl`}
                    >
                        {filtereddata.length} invoices
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <select
                        id="status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={`${darkMode ? "bg-slate-950 text-white" : ""
                            } font-spartan font-bold block lg:w-[170px] md:w-[150px] bg-slate-200 text-gray-700 focus:outline-none`}
                    >
                        <option value="Filter by status" className="font-spartan font-bold">
                            Filter by status
                        </option>
                        <option value="Draft" className="font-spartan font-bold">
                            Draft
                        </option>
                        <option value="Pending" className="font-spartan font-bold">
                            Pending
                        </option>
                        <option value="Paid" className="font-spartan font-bold">
                            Paid
                        </option>
                    </select>

                    <div className="flex items-center justify-center gap-2 bg-purple-600 rounded-3xl p-2 cursor-pointer w-fit max-w-[160px] sm:max-w-[100px]">
                        <img src={new1} alt="New Invoice" className="w-5 h-5 object-contain" />
                        <h3 className="text-white font-spartan font-bold text-sm whitespace-nowrap">
                            New
                        </h3>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-4xl grid gap-4">
                {filtereddata.length > 0 ? (
                    filtereddata.map((invoice) => (
                        <div
                            key={invoice.id}
                            className={`cursor-pointer hover:border-2 border-purple-600 flex justify-between items-center p-4 rounded-lg shadow-md ${darkMode ? "bg-slate-800 text-white" : "bg-white"
                                }`}
                        >
                            <div className="">
                                <h3 className="text-lg font-bold"> <span className="text-slate-400">#</span>{`${invoice.id}`}</h3>
                                <p className="text-sm text-gray-500">
                                    Due{" "}
                                    {new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-xl font-bold">{`£${invoice.total.toFixed(2)}`}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium mb-6 font-spartan text-slate-400">{invoice.clientName}</p>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm ${invoice.status === "paid"
                                        ? "bg-green-100 text-green-600"
                                        : invoice.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    ● {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center text-center mt-12">
                        <img src={invois} alt="No Invoices" className="w-64 h-64 object-contain mb-6" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            There is nothing here
                        </h2>
                        <p className="text-gray-500">
                            Create an invoice by clicking the{" "}
                            <span className="font-bold text-purple-600">New</span> button and get started
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
