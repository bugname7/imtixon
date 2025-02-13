import React, { useState, useEffect } from "react";
import { useDarkMode } from "../context/DarkLightMode";
import { Link, useNavigate } from "react-router-dom";
import new1 from "../assets/images/new1.svg";
import invois from "../assets/images/invois.png";
import arrow from "../assets/images/arrow.svg";
import useInvoiceStore from "../store/store.js";

function Home() {
  const { darkMode } = useDarkMode();
  const bgClass = darkMode ? "bg-slate-950" : "bg-slate-200";
  const { isLoading, fetchInvoices, invoices } = useInvoiceStore();

  const [filterStatus, setFilterStatus] = useState("Filter by status");

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filteredData =
    filterStatus === "Filter by status"
      ? invoices
      : invoices.filter(
          (invoice) =>
            invoice.status?.toLowerCase() === filterStatus.toLowerCase()
        );

  const statusColors = {
    paid: "bg-green-200 text-green-600",
    pending: "bg-yellow-200 text-yellow-600",
    draft: "bg-gray-200 text-gray-400",
  };

  return (
    <div
      className={`${bgClass} min-h-screen flex flex-col items-center justify-start px-6 pb-6 md:pl-24 sm:pl-8`}
    >
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div>
          <h1
            className={`${
              darkMode ? "text-white" : "text-black"
            } sm:text-4xl font-spartan font-bold text-2xl`}
          >
            Invoices
          </h1>
          <p
            className={`${
              darkMode ? "text-slate-300" : ""
            } font-spartan font-medium text-slate-400`}
          >
            {filteredData.length} invoices
          </p>
        </div>

        <div className="flex items-center gap-2 ">
          <select
            id="status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={` px-4 py-3 rounded-lg font-bold font-spartan outline-none cursor-pointer
    ${
      darkMode
        ? "bg-slate-950 text-white border-gray-600"
        : "bg-slate-200 text-gray-700 border-gray-300"
    }`}
          >
            <option
              value="Filter by status"
              className={`${
                darkMode ? "bg-slate-950 text-white" : "bg-white text-black"
              } font-spartan font-bold shadow-sm`}
            >
              Filter by status
            </option>
            <option
              value="Draft"
              className={`${
                darkMode ? "bg-slate-950 text-white" : "bg-white text-black"
              } font-spartan font-bold`}
            >
              Draft
            </option>
            <option
              value="Pending"
              className={`${
                darkMode ? "bg-slate-950 text-white" : "bg-white text-black"
              } font-spartan font-bold `}
            >
              Pending
            </option>
            <option
              value="Paid"
              className={`${
                darkMode ? "bg-slate-950 text-white" : "bg-white text-black"
              } font-spartan font-bold`}
            >
              Paid
            </option>
          </select>

          <Link
            to={"/newInvoice"}
            className="flex items-center justify-center gap-2 hover:bg-purple-500 bg-purple-600 rounded-3xl p-2 cursor-pointer w-fit"
          >
            <img
              src={new1}
              alt="New Invoice"
              className="sm:w-7 sm:h-8 w-4 h-4 object-contain"
            />
            <h3 className="hidden md:block sm:hidden text-white font-spartan font-bold ">
              New
            </h3>
            <h3 className="hidden lg:block text-white font-spartan font-bold ">
              Invoice
            </h3>
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
              <Link key={invoice.id} to={`invoice/${invoice.id}`}>
                <div
                  className={`cursor-pointer border-2 border-transparent hover:border-purple-600 p-4 rounded-lg shadow-md flex justify-between gap-4 sm:items-center transition-all duration-200 ${
                    darkMode ? "bg-slate-800 text-white" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:gap-2 md:gap-16">
                    <h3 className="text-lg font-bold font-spartan md:mb-0 mb-2">
                      <span className="text-slate-400">#</span>
                      {`${invoice.id}`}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : ""
                      } mt-1 text-sm text-gray-500 md:mb-0 mb-2 font-spartan font-medium `}
                    >
                      Due{" "}
                      {new Date(invoice.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xl font-bold font-spartan">
                      {`£${invoice.total?.toFixed(2).slice(0, 6)}`}
                    </p>
                  </div>

                  <div className="text-center sm:text-right flex gap-3 items-center flex-col sm:flex-row">
                    <p className="font-medium text-left font-spartan text-slate-400 mb-4 lg:mb-0 md:mb-0">
                      {invoice.clientName}
                    </p>

                    <span
                      className={`inline-block ${
                        darkMode ? "bg-opacity-10" : "bg-opacity-40"
                      } px-3 py-2 font-spartan w-24 font-bold rounded-md items-center text-center  ${
                        statusColors[invoice.status?.toLowerCase()] ||
                        "bg-gray-100 text-gray-200"
                      }`}
                    >
                      ●{" "}
                      {invoice.status?.charAt(0).toUpperCase() +
                        invoice.status?.slice(1)}
                    </span>

                    <span className={`hidden sm:inline`}>
                      <img src={arrow} alt="arrow image" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center text-center mt-12 ">
              <img
                src={invois}
                alt="No Invoices"
                className="w-64 h-64 object-contain mb-6"
              />
              <h2
                className={`${
                  darkMode ? "text-slate-100" : "text-slate-900"
                } text-[25px]  mb-2 font-spartan font-bold`}
              >
                There is nothing here
              </h2>
              <p
                className={` ${
                  darkMode ? "text-slate-100" : "text-gray-500"
                } w-[250px] font-spartan font-medium `}
              >
                Create an invoice by clicking the{" "}
                <span
                  className={` ${
                    darkMode ? "text-slate-100" : "text-gray-600"
                  } w-[250px] font-spartan font-bold `}
                >
                  New Invoice
                </span>{" "}
                button and get started
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
