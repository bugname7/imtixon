import React from 'react';
import bgImage from '../assets/images/bgImage.png';
import shape from '../assets/images/shape.svg'
import light from '../assets/images/light.svg'
import brother from '../assets/images/bro.png'
function Header() {
    return (
        <div>
            <header className='bg-slate-800 flex justify-between items-center' >
                <div className='w-[70px] h-[70px] bg-cover flex justify-center items-center'
                    style={{

                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',


                    }}
                >
                    <img src={shape} alt="shape image" className='w-[27px] h-[27px]' />
                </div>
                <div className='flex  items-center gap-5 '>
                    <div className='p-4'>
                        <img src={light} alt="light   image" className='cursor-pointer' />
                    </div>
                    <div className='p-4 border-l border-slate-700'>
                        <img src={brother} alt="brohter image" className='cursor-pointer w-[35px] h-[35px]' />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
