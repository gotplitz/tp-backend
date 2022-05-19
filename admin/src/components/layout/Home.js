import React from 'react';
import './home.css';

const bgImage = require('../../assets/images/ferocious-media-wallpaper.jpg');

const Home = () => {
    return (
        <div className='intro-banner'>
            <div className='container'>
                <div className='banner-headline'>
                    <h1>
                        <strong>
                            Welcome to TP Detailing <br /> Website Dashboard
                        </strong>
                    </h1>
                </div>
            </div>
            <div
                className='background-image-container'
                style={{
                    backgroundImage: `url(
            ${bgImage}
          )`,
                }}
            ></div>
        </div>
    );
};

export default Home;
