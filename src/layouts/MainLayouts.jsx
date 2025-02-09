import React from 'react'
import Header from '../components/Header'

function MainLayouts({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default MainLayouts
