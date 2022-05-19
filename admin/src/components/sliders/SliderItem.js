import React, { useContext, Fragment } from 'react';

import PropTypes from 'prop-types';
import SliderContext from '../../context/slider/sliderContext';
import './sliders.css';

const SliderItem = ({ slider }) => {
    const sliderContext = useContext(SliderContext);
    const { deleteSlider, setCurrent, clearCurrent } = sliderContext;

    const { _id, order, title, subtitle, img, moredetails } = slider;

    const onDelete = () => {
        deleteSlider(_id);
        clearCurrent();
    };

    const openModal = () => {
        setCurrent(slider);
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
                            <h5
                                dangerouslySetInnerHTML={{ __html: subtitle }}
                            ></h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: moredetails,
                                }}
                                className='post-types-listing-extra'
                            ></div>
                        </div>
                    </div>
                </div>

                <ul className='dashboard-task-info'>
                    <li>
                        <strong>{order}</strong>
                        <span>Slider Position</span>
                    </li>
                    <li>
                        <div className='slider-image-preview'>
                            <img src={`/uploads/${img}`} alt={title} />
                        </div>
                    </li>
                </ul>

                <div className='buttons-to-right always-visible'>
                    <button
                        className='popup-with-zoom-anim button dark ripple-effect ico'
                        title='Edit Slider'
                        data-tippy-placement='top'
                        onClick={() => openModal()}
                    >
                        <i className='icon-feather-edit'></i>
                    </button>
                    <button
                        className='button red ripple-effect ico'
                        title='Remove Slider'
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

SliderItem.propTypes = {
    slider: PropTypes.object.isRequired,
};

export default SliderItem;
