import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';

const VerifyEmail = () => {
    return (
        <div style={{ width: '100%' }}>
            <div id='titlebar' className='gradient'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h2>Welcome!</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-6 offset-xl-3'>
                        <div className='login-register-page'>
                            <div className='welcome-text'>
                                <h3>
                                    Thank you for registering! We will review
                                    your registration and verify your accont
                                </h3>
                                <span>
                                    Were you approved already?{' '}
                                    <Link to='/login'>Log In!</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default VerifyEmail;
