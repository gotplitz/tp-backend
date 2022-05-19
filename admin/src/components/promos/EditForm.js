import React, { useContext, useEffect } from 'react';
// Context
import PromoContext from '../../context/promo/promoContext';
import AuthContext from '../../context/auth/authContext';

import EditPromo from './EditPromo';

const EditForm = ({ promo, pcurrent }) => {
    const promoContext = useContext(PromoContext);
    const authContext = useContext(AuthContext);

    const { clearCurrent } = promoContext;
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
                        <a href='#tab'>Edit Promo</a>
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
                            <EditPromo promo={promo} pcurrent={pcurrent} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditForm;
