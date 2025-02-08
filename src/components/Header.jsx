import React from 'react';
import bgImage from '../assets/images/bgImage.png';
import shake from '../assets/images/shape.svg';

function Header() {
    return (
        <div>
            <header className="bg-slate-800 w-[85px] h-[800px] rounded-r-2xl rounded-t-2xl ">
                <div
                    className="w-[85px] h-[85px] bg-cover bg-center flex items-center justify-center cursor-pointer w"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <img src={shake} alt="shake image" className="w-[40px] h-[40px]" />
                </div>
            </header>
        </div>
    );
}

export default Header;
