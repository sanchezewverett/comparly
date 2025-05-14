import React from 'react';

const AppLogo = () => {
    return (
        <svg width='200' height='40' viewBox='0 0 200 40' fill='none'>
            <circle cx='20' cy='20' r='10' stroke='#3B82F6' strokeWidth='3'/>
            <line x1='26' y1='26' x2='34' y2='34' stroke='#3B82F6' strokeWidth='3' strokeLinecap='round'/>

            <text x='45' y='30' fontFamily='Arial, sans-serif' fontSize='24' fill='#111827'
                  fontWeight='bold'>Comparly
            </text>
        </svg>
    );
};

export default AppLogo;