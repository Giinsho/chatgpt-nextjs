import React from 'react';
import InfoColumns from './InfoColumns';

function HomePage() {
    return (
        <div className='text-white flex flex-col items-center justify-center h-screen px-2'>
            <h1 className='text-5xl font-bold mb-20'>ChatGPT</h1>
            <InfoColumns></InfoColumns>
        </div>

    )
}

export default HomePage