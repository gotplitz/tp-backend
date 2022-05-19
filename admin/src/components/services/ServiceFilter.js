import React, { useContext, useRef, useEffect } from 'react';
import ServiceContext from '../../context/service/serviceContext';

const ServiceFilter = () => {
    const serviceContext = useContext(ServiceContext);
    const { filterServices, clearFilter, filtered } = serviceContext;
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterServices(e.target.value);
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
                                Find Services...
                            </label>
                            <input
                                id='intro-keywords'
                                ref={text}
                                type='text'
                                placeholder='Filter by title or service body'
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

export default ServiceFilter;
