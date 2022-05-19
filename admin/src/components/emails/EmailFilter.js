import React, { useContext, useRef, useEffect } from 'react';
import EmailContext from '../../context/email/emailContext';

const EmailFilter = () => {
    const emailContext = useContext(EmailContext);
    const { filterEmails, clearFilter, filtered } = emailContext;
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterEmails(e.target.value);
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
                                Find Old Submissions...
                            </label>
                            <input
                                id='intro-keywords'
                                ref={text}
                                type='text'
                                placeholder='Filter by name, email, street name or phone'
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

export default EmailFilter;
