import React, { useContext, useEffect } from 'react';

// Context
import NoticiaContext from '../../context/noticia/noticiaContext';
import AuthContext from '../../context/auth/authContext';

import EditForm from './EditForm';

const NoticiaEdit = ({ noticia, ncurrent }) => {
    const noticiaContext = useContext(NoticiaContext);
    const authContext = useContext(AuthContext);

    const { clearNcurrent } = noticiaContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, []);

    const closeModal = () => {
        clearNcurrent();
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
                        <a href='#tab'>Edit Post</a>
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
                            <EditForm noticia={noticia} ncurrent={ncurrent} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticiaEdit;
