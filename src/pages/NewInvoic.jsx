import React, { useState } from "react";
import { useDarkMode } from "../context/DarkLightMode";
import clearImage from '../assets//images/delete.svg'
function NewInvoice() {
    const { darkMode } = useDarkMode();
    const bgClass = darkMode ? "bg-slate-950 text-white" : "bg-slate-200 text-black";

    const [items, setItems] = useState([

    ]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
        if (field === "quantity" || field === "price") {
            newItems[index].total = newItems[index].quantity * newItems[index].price;
        }
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <div className={`${bgClass} min-h-screen px-4 py-8 container`}>
            <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8">New Invoice</h1>

                <div className="mb-8">
                    <h2 className={` text-[rgba(124, 93, 250, 1)] text-lg font-bold mb-4 text-purple-500 font-spartan`}>Bill From</h2>
                    <div className="mb-4">
                        <label className=" block text-sm font-medium font-spartan mb-1 text-[rgba(126,136,195,1)]">Street Address</label>
                        <input type="text" className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full  border   rounded py-3 px-2 outline-none border-[rgba(55,59,83,1)] `} />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/3">
                            <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} outline-0 ${darkMode ? 'border-black' : ''} outline-none border border-[rgba(55,59,83,1)]  rounded py-3 px-2 w-full`}
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan outline-none border-[rgba(55,59,83,1)] mb-1">
                                Post Code
                            </label>
                            <input
                                type="text"
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} border-[rgba(55,59,83,1)] outline-none $ border rounded py-3 px-2 w-full`}
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''}  outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2 w-full`}
                            />
                        </div>
                    </div>

                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4 text-purple-500 font-spartan">Bill To</h2>

                    <div className="mb-4">
                        <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                            Client's Name
                        </label>
                        <input
                            type="text"
                            className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full  outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                            Client's Email
                        </label>
                        <input
                            type="email"
                            className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full  outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                            Street Address
                        </label>
                        <input
                            type="text"
                            className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full  outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2`}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/3">
                            <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''}  outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2 w-full`}
                            />
                        </div>

                        <div className="w-1/3">
                            <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                                Post Code
                            </label>
                            <input
                                type="text"
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''}  outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2 w-full`}
                            />
                        </div>

                        <div className="w-1/3">
                            <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''}  outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2 w-full`}
                            />
                        </div>
                    </div>
                </div>


                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2 mb-3">

                        <div className="mb-2">
                            <label className="text-[rgba(126,136,195,1)] block text-xs font-medium font-spartan mb-1">Invoice Date</label>
                            <input
                                type="date"
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full  outline-none border-[rgba(55,59,83,1)] border rounded py-2 px-1 text-xs`}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-[rgba(126,136,195,1)] block text-xs font-medium font-spartan mb-1">Payment Terms</label>
                            <select
                                className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full  outline-none border-[rgba(55,59,83,1)] border rounded py-2 px-1 text-xs`}
                            >
                                <option value="Net 30 Days">Net 1 Days</option>
                                <option value="Net 60 Days">Net 7 Days</option>
                                <option value="Net 90 Days">Net 14 Days</option>
                                <option value="Net 90 Days">Net 30 Days</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="text-[rgba(126,136,195,1)] block text-xs font-medium font-spartan mb-1">Project Description</label>
                        <input
                            type="text"
                            className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full  outline-none border-[rgba(55,59,83,1)] border rounded py-2 px-1 text-xs`}
                        />
                    </div>
                </div>



                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4 text-[rgba(119,127,152,1)]">Item List</h2>
                    {items.length > 0 && items.map((item, index) => (
                        <div key={index} className="mb-4 flex flex-wrap gap-4">
                            <div className="mb-2 w-full ">
                                <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">Item Name</label>
                                <input
                                    type="text"
                                    className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2`}
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4 w-full md:flex-nowrap">
                                <div className="w-1/3">
                                    <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">Qty.</label>
                                    <input
                                        type="number"
                                        className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2`}
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                    />
                                </div>
                                <div className="w-1/3">
                                    <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">Price</label>
                                    <input
                                        type="number"
                                        className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full outline-none border-[rgba(55,59,83,1)] border rounded py-3 px-2`}
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, "price", e.target.value)}
                                    />
                                </div>
                                <div className="w-1/3">
                                    <label className="text-[rgba(126,136,195,1)] block text-sm font-medium font-spartan mb-1">Total</label>
                                    <input
                                        type="number"
                                        className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full border border-[rgba(55,59,83,1)] rounded py-3 px-2`}
                                        value={item.total}
                                        readOnly
                                    />
                                </div>
                                <img
                                    src={clearImage}
                                    alt="Remove item"
                                    onClick={() => removeItem(index)}
                                    className="rounded-full mt-4 cursor-pointer"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addItem}
                        className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} bg-gray-100 font-bold font-spartan text-[rgba(126,136,195,1)] px-4 py-2 w-full rounded-full mt-4`}
                    >
                        + Add New Item
                    </button>
                </div>



                <div className="flex sm:flex-col md:justify-between md:flex-row gap-4 ">
                    <button className="flex-2 bg-gray-100 font-bold font-spartan text-[rgba(126,136,195,1)] px-3 sm:px-5 py-2 sm:py-3 rounded-full">
                        Discard
                    </button>

                    <div className="flex gap-2">
                        <button className="flex-2 bg-gray-800 text-gray-300 px-4 sm:px-6 py-2 sm:py-4 rounded-full hover:bg-gray-700 font-bold font-spartan">
                            Save as Draft
                        </button>
                        <button className="flex-2 bg-purple-600 text-gray-200 px-4 sm:px-6 py-2 sm:py-4 rounded-full hover:bg-purple-500 font-bold font-spartan">
                            Save & Send
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NewInvoice;
