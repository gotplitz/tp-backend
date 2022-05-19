import React, { useContext, useEffect } from 'react';
import EditForm from './EditForm';
import TestimonialContext from '../../context/testimonial/testimonialContext';
import AuthContext from '../../context/auth/authContext';

const TestimonialEdit = ({ testimonial, pcurrent }) => {
    const testimonialContext = useContext(TestimonialContext);
    const authContext = useContext(AuthContext);

    const { clearPcurrent } = testimonialContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, []);

    const closeModal = () => {
        clearPcurrent();
        document.querySelectorAll('.with-border').forEach((el) => {
            el.classList.remove('required');
        });
        var showmodal = document.getElementById('small-dialog');
        showmodal.classList.toggle('mfp-hide');
    };

    return (
        <div
            id='small-dialog'
            className='zoom-anim-dialog mfp-hide dialog-with-tabs'
        >
            <div className='sign-in-form'>
                <ul className='popup-tabs-nav'>
                    <li>
                        <a href='#tab'>Edit Testimonial</a>
                    </li>
                </ul>
                <button
                    title='Close'
                    type='button'
                    className='mfp-close'
                    onClick={closeModal}
                ></button>

                <div className='popup-tabs-container'>
                    <div className='popup-tab-content' id='tab'>
                        <div className='bidding-widget'>
                            <EditForm
                                testimonial={testimonial}
                                pcurrent={pcurrent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialEdit;
