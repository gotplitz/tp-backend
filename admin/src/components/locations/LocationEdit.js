import React, { useContext, useEffect } from 'react';
import EditForm from './EditForm';
import LocationContext from '../../context/location/locationContext';
import AuthContext from '../../context/auth/authContext';

const LocationEdit = ({ location, dcurrent }) => {
    const locationContext = useContext(LocationContext);
    const authContext = useContext(AuthContext);

    const { clearPcurrent } = locationContext;
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
                        <a href='#tab'>Edit Location</a>
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
                            <EditForm location={location} dcurrent={dcurrent} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationEdit;
