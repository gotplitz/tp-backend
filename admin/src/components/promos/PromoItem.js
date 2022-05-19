import React, { useContext, Fragment } from 'react';

import PropTypes from 'prop-types';
import PromoContext from '../../context/promo/promoContext';
import './promo.css';

const PromoItem = ({ promo }) => {
    const promoContext = useContext(PromoContext);
    const { deletePromo, setCurrent, clearCurrent } = promoContext;

    const { _id, order, title, img, amount, expiration } = promo;

    const onDelete = () => {
        deletePromo(_id);
        clearCurrent();
    };

    const openModal = () => {
        setCurrent(promo);
        var showmodal = document.getElementById('small-dialog');
        showmodal.classList.toggle('mfp-hide');
    };

    return (
        <Fragment>
            <li>
                <div className='post-types-listing width-adjustment'>
                    <div className='post-types-listing-details'>
                        <div className='post-types-listing-description'>
                            <h3
                                className='post-types-listing-title'
                                dangerouslySetInnerHTML={{ __html: title }}
                            ></h3>
                            <p dangerouslySetInnerHTML={{ __html: amount }}></p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: expiration,
                                }}
                                className='post-types-listing-extra'
                            ></div>
                        </div>
                    </div>
                </div>

                <ul className='dashboard-task-info'>
                    <li>
                        <strong>{order}</strong>
                        <span>Promo Position</span>
                    </li>
                    <li>
                        <div className='promo-image-preview'>
                            <img src={`/uploads/${img}`} alt={title} />
                        </div>
                    </li>
                </ul>

                <div className='buttons-to-right always-visible'>
                    <button
                        className='popup-with-zoom-anim button dark ripple-effect ico'
                        title='Edit Promo'
                        data-tippy-placement='top'
                        onClick={() => openModal()}
                    >
                        <i className='icon-feather-edit'></i>
                    </button>
                    <button
                        className='button red ripple-effect ico'
                        title='Remove Promo'
                        data-tippy-placement='top'
                        onClick={onDelete}
                    >
                        <i className='icon-feather-trash-2'></i>
                    </button>
                </div>
            </li>
        </Fragment>
    );
};

PromoItem.propTypes = {
    promo: PropTypes.object.isRequired,
};

export default PromoItem;
