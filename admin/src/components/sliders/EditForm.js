import React, { useContext, useEffect } from 'react';
// Context
import SliderContext from '../../context/slider/sliderContext';
import AuthContext from '../../context/auth/authContext';

import EditSlider from './EditSlider';

const EditForm = ({ slider, current }) => {
    const sliderContext = useContext(SliderContext);
    const authContext = useContext(AuthContext);

    const { clearCurrent } = sliderContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, []);

    const closeModal = () => {
        clearCurrent();
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
                        <a href='#tab'>Edit Slider</a>
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
                            <EditSlider slider={slider} current={current} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditForm;
