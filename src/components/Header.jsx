import React from 'react';
import bgImage from '../assets/images/bgImage.png';
import shake from '../assets/images/shape.svg';
import dark from '../assets/images/dark.svg';
import brother from '../assets/images/brother.png';

function Header() {
    return (
        <div>
            <header className="bg-slate-800 fixed top-0 left-0 w-[85px] h-full rounded-r-2xl flex flex-col justify-between items-center z-50">
                <div
                    className="w-[85px] h-[85px] bg-cover bg-center flex items-center justify-center cursor-pointer"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <img src={shake} alt="shake image" className="w-[40px] h-[40px]" />
                </div>

                <div className="w-full flex flex-col items-center">
                    <div><img src={dark} alt="dark image" className="mt-4 cursor-pointer mb-4" />
                    </div>
                    <div className="w-full border-t border-slate-700 mt-4">
                        <img src={brother} alt="brother image" className="mb-5 mt-8 w-[33px] mx-auto cursor-pointer" />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
