import React, { useContext, useRef, useEffect } from 'react';
import PromoContext from '../../context/promo/promoContext';

const PromoFilter = () => {
    const promoContext = useContext(PromoContext);
    const { filterPromos, clearFilter, filtered } = promoContext;
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterPromos(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <div className='row filter-on-top'>
                <div className='col-md-12'>
                    <div className='intro-banner-search-form'>
                        <div className='intro-search-field with-label'>
                            <label
                                htmlFor='intro-keywords'
                                className='field-title ripple-effect'
                            >
                                Find Promo...
                            </label>
                            <input
                                id='intro-keywords'
                                ref={text}
                                type='text'
                                placeholder='Filter by title or location'
                                onChange={onChange}
                            />
                        </div>

                        <div className='intro-search-button'>
                            <button
                                onClick={() => clearFilter()}
                                className='button gray ripple-effect'
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PromoFilter;
