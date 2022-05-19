import React from 'react';

import './extras.css';

const Spinning = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                minHeight: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className='lds-ellipsis'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinning;
