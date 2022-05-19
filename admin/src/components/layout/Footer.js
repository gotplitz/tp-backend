import React, { Fragment } from 'react';

import './footer.css';

const logoPlitz = require('../../assets/images/ferocious-media.png');

const Footer = () => {
    return (
        <Fragment>
            <div className='dashboard-footer-spacer'></div>
            <div className='small-footer'>
                <div className='small-footer-copyrights'>
                    <strong>Ferocious Media </strong> © 2021
                </div>
                <ul className='footer-social-links'>
                    <li>
                        <a
                            href='https://ferociousmedia.com'
                            target='_blank'
                            title='Ferocious Media'
                            data-tippy-placement='top'
                            rel='noopener noreferrer'
                        >
                            <img src={logoPlitz} alt='Ferociosu Media' />
                        </a>
                    </li>
                </ul>

                <div className='clearfix'></div>
            </div>
        </Fragment>
    );
};

export default Footer;
