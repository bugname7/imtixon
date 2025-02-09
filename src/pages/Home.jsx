import React from 'react';
import { useDarkMode } from '../context/DarkLightMode';
import invois from '../assets/images/invois.png'
function Home() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    const bgClass = darkMode ? 'bg-slate-950' : 'bg-slate-200';
    return (
        <div className={`${bgClass} min-h-screen  flex flex-col items-center justify-start pt-12    pl-6 pb-6 pr-6 `}>
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <div>
                    <h1 className={`${darkMode ? 'text-white' : 'text-black'} text-3xl font-spartan font-bold text-gray-900`}>Invoices</h1>
                    <p className={`${darkMode ? 'text-slate-300' : ''} font-spartan font-medium text-slate-400`}>No invoices</p>

                </div>
                <div className="flex items-center gap-4">
                    <select
                        id="status"
                        class="block w-full p-2 border  rounded-md shadow-sm focus:outline-none  text-gray-700"
                    >
                        <option value="Draft">
                            <input type="checkbox" name="" id="" /> Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>

                </div>

            </div>






            <div className="flex flex-col items-center mt-16">
                <img
                    src={invois}
                    alt="No invoices illustration"
                    className="w-64 h-64 mb-8"
                />
                <h2 className={`${darkMode ? 'text-slate-50' : ''}  text-[30px] font-bold text-slate-950 mb-4 font-spartan`}>

                    There is nothing here
                </h2>
                <p className={`${darkMode ? 'text-slate-300' : ''} text-gray-500 text-center w-[290px] font-spartan font-medium text-[20px]`}>
                    Create an invoice by clicking the
                    <span className={`${darkMode ? 'text-slate-200' : ''} font-bold font-spartan`}> New</span> button and get started
                </p>
            </div>
        </div >
    );
}

export default Home;
