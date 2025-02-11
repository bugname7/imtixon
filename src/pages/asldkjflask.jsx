import React, { useState } from "react";
import { useDarkMode } from "../context/DarkLightMode";
import clearImage from '../assets/images/delete.svg';
import { Link } from "react-router-dom";

function NewInvoice() {
    const { darkMode } = useDarkMode();
    const bgClass = darkMode ? "bg-slate-950 text-white" : "bg-slate-200 text-black";

    const [invoice, setInvoice] = useState({
        senderAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        clientAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        clientName: "",
        clientEmail: "",
        invoiceDate: "",
        paymentTerms: "Net 1 Days",
        description: "",
        items: [],
        status: "draft",
    });

    const handleInputChange = (field, value, isNested, key) => {
        if (isNested) {
            setInvoice((prev) => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    [key]: value,
                },
            }));
        } else {
            setInvoice((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...invoice.items];
        updatedItems[index][field] = field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
        if (field === "quantity" || field === "price") {
            updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
        }
        setInvoice((prev) => ({ ...prev, items: updatedItems }));
    };

    const addItem = () => {
        setInvoice((prev) => ({
            ...prev,
            items: [...prev.items, { name: "", quantity: 0, price: 0, total: 0 }],
        }));
    };

    const removeItem = (index) => {
        const updatedItems = invoice.items.filter((_, i) => i !== index);
        setInvoice((prev) => ({ ...prev, items: updatedItems }));
    };

    const saveInvoice = (status) => {
        const finalInvoice = { ...invoice, status };
        localStorage.setItem("invoice", JSON.stringify(finalInvoice));
        alert(`Invoice saved as ${status}`);
    };

    return (
        <div className={`${bgClass} px-4 py-8 container`}>
            <Link
                to={'/'}
                className={`${darkMode ? 'text-purple-400' : ''} max-w-xl w-full mx-auto mb-8 text-black hover:underline font-spartan font-bold block text-start`}
            >
                🔙 Go Back
            </Link>

            <div className="max-w-xl w-full mx-auto bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8">New Invoice</h1>

                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4 text-purple-500 font-spartan">Bill From</h2>
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={invoice.senderAddress.street}
                        onChange={(e) => handleInputChange("senderAddress", e.target.value, true, "street")}
                        className={`${darkMode ? 'bg-[rgba(37,41,69,1)]' : ''} w-full border rounded py-3 px-2 mb-4`}
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="City"
                            value={invoice.senderAddress.city}
                            onChange={(e) => handleInputChange("senderAddress", e.target.value, true, "city")}
                            className="w-1/3 border rounded py-3 px-2"
                        />
                        <input
                            type="text"
                            placeholder="Post Code"
                            value={invoice.senderAddress.postCode}
                            onChange={(e) => handleInputChange("senderAddress", e.target.value, true, "postCode")}
                            className="w-1/3 border rounded py-3 px-2"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={invoice.senderAddress.country}
                            onChange={(e) => handleInputChange("senderAddress", e.target.value, true, "country")}
                            className="w-1/3 border rounded py-3 px-2"
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4 text-purple-500 font-spartan">Bill To</h2>
                    <input
                        type="text"
                        placeholder="Client's Name"
                        value={invoice.clientName}
                        onChange={(e) => handleInputChange("clientName", e.target.value)}
                        className="w-full border rounded py-3 px-2 mb-4"
                    />
                    <input
                        type="email"
                        placeholder="Client's Email"
                        value={invoice.clientEmail}
                        onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                        className="w-full border rounded py-3 px-2 mb-4"
                    />
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={invoice.clientAddress.street}
                        onChange={(e) => handleInputChange("clientAddress", e.target.value, true, "street")}
                        className="w-full border rounded py-3 px-2 mb-4"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="City"
                            value={invoice.clientAddress.city}
                            onChange={(e) => handleInputChange("clientAddress", e.target.value, true, "city")}
                            className="w-1/3 border rounded py-3 px-2"
                        />
                        <input
                            type="text"
                            placeholder="Post Code"
                            value={invoice.clientAddress.postCode}
                            onChange={(e) => handleInputChange("clientAddress", e.target.value, true, "postCode")}
                            className="w-1/3 border rounded py-3 px-2"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={invoice.clientAddress.country}
                            onChange={(e) => handleInputChange("clientAddress", e.target.value, true, "country")}
                            className="w-1/3 border rounded py-3 px-2"
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4 text-[rgba(119,127,152,1)]">Item List</h2>
                    {invoice.items.map((item, index) => (
                        <div key={index} className="flex gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                className="w-1/4 border rounded py-3 px-2"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                className="w-1/4 border rounded py-3 px-2"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                                className="w-1/4 border rounded py-3 px-2"
                            />
                            <input
                                type="number"
                                placeholder="Total"
                                value={item.total}
                                readOnly
                                className="w-1/4 border rounded py-3 px-2"
                            />
                            <img
                                src={clearImage}
                                alt="Remove"
                                onClick={() => removeItem(index)}
                                className="cursor-pointer mt-3"
                            />
                        </div>
                    ))}
                    <button onClick={addItem} className="w-full bg-gray-100 py-2 px-4 rounded hover:bg-gray-200">
                        + Add New Item
                    </button>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => saveInvoice("draft")}
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={() => saveInvoice("pending")}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500"
                    >
                        Save & Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewInvoice;
