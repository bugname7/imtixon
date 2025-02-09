import React, { useState } from "react";
import { useDarkMode } from "../context/DarkLightMode";
import new1 from "../assets/images/new1.svg";

import data from '../assets/data.json'

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
                            } text-3xl font-spartan font-bold text-gray-900`}
                    >
                        Invoices
                    </h1>
                    <p
                        className={`${darkMode ? "text-slate-300" : ""
                            } font-spartan font-medium text-slate-400`}
                    >
                        {filtereddata.length}  invoices
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <select
                        id="status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={`${darkMode ? "bg-slate-950 text-white" : ""} font-spartan font-bold block w-[150px] bg-slate-200 text-gray-700  pr-0 focus:outline-none`}
                    >
                        <option value="Filter by status" className="font-spartan font-bold">Filter by status</option>
                        <option value="Draft" className="font-spartan font-bold">Draft</option>
                        <option value="Pending" className="font-spartan font-bold">Pending</option>
                        <option value="Paid" className="font-spartan font-bold">Paid</option>
                    </select>


                    <div className="flex gap-3 bg-purple-600 w-[100px] rounded-3xl p-2 cursor-pointer">
                        <img src={new1} alt="New Invoice" />
                        <h3 className="text-white font-spartan font-bold flex gap-2 text-center items-center">
                            New
                        </h3>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-4xl grid gap-4 ">
                {filtereddata.map((invoice) => (
                    <div
                        key={invoice.id}
                        className={`cursor-pointer hover:border-2 border-purple-600 flex justify-between items-center p-4 rounded-lg shadow-md ${darkMode ? "bg-slate-800 text-white" : "bg-white"
                            }`}
                    >
                        <div className="">
                            <h3 className="text-lg font-bold">{`#${invoice.id}`}</h3>
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
                            <p className="font-medium">{invoice.clientName}</p>
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
                ))}
            </div>
        </div>
    );
}

export default Home;
