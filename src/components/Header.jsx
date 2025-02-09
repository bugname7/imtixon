import React from 'react';
import bgImage from '../assets/images/bgImage.png';
import shape from '../assets/images/shape.svg'
function Header() {
    return (
        <div>
            <header>
                <div className='w-[70px] h-[70px] bg-cover flex justify-center items-center'
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',


                    }}
                >
                    <img src={shape} alt="shape image" className='w-[29px] h-[29px]' />
                </div>
            </header>
        </div>
    );
}

export default Header;
