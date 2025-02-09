import React, { useState } from 'react';
import bgImage from '../assets/images/bgImage.png';
import shape from '../assets/images/shape.svg';
import light from '../assets/images/light.svg';
import brother from '../assets/images/bro.png';
import dark from '../assets/images/dark.svg';

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const darkLight = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <header className='bg-slate-800 md:fixed top-0 left-0 w-full lg:justify-between flex justify-between items-center md:flex-col md:w-[70px] md:rounded-t-xl md:rounded-r-xl md:h-screen'>

                <div className='w-[70px] h-[70px] bg-cover flex justify-center items-center'
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                    }}
                >
                    <img src={shape} alt="shape image" className='w-[27px] h-[27px]' />
                </div>
                <div className='flex items-center gap-5 md:flex-col'>
                    <div className='p-3 cursor-pointer' onClick={darkLight}>
                        <img src={isDarkMode ? dark : light} alt="Toggle image" />
                    </div>
                    <div className='p-4 border-l border-slate-700 md:border-t border-l-none'>
                        <img src={brother} alt="brohter image" className='cursor-pointer w-[35px] h-[35px]' />
                    </div>
                </div>
            </header>

        </div>
    );
}

export default Header;
