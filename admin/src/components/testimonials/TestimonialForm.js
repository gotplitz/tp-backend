import React, { Fragment, useState, useContext, useEffect } from 'react';

// Context
import TestimonialContext from '../../context/testimonial/testimonialContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const TestimonialForm = () => {
    const testimonialContext = useContext(TestimonialContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { addTestimonial } = testimonialContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    useEffect(() => {
        authContext.loadUser();

        // eslint-disable-next-line
    }, []);

    const [newcat, setNewCat] = useState([]);
    const [newtestimonial, setNewtestimonial] = useState({
        testimonialstatus: false,
        testimonialtitle: '',
        testimonialcat: '',
        testimonialbody: '',
    });

    const onClick = (e) => {
        let index;

        if (e.target.checked) {
            newcat.push(e.target.value);
        } else {
            index = newcat.indexOf(e.target.value);
            newcat.splice(index, 1);
        }

        // sort the array
        setNewCat(newcat.sort());
    };

    const {
        testimonialstatus,
        testimonialtitle,
        testimonialcat,
        testimonialbody,
    } = newtestimonial;

    const onChange = (e) => {
        setNewtestimonial({
            ...newtestimonial,
            testimonialcat: newcat.sort(),
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            testimonialtitle === '' ||
            testimonialbody === '' ||
            testimonialcat === ''
        ) {
            document.querySelectorAll('.with-border').forEach((el) => {
                el.classList.add('required');
            });
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'One or more fields were empty when the user tried to add a new short service',
                type: 'error',
            });
        } else {
            setAlert('New Short Service Added', 'success');
            setLog({ msg: 'A new short service was added', type: 'success' });
            addTestimonial(newtestimonial);

            setNewtestimonial({
                testimonialstatus: false,
                testimonialtitle: '',
                testimonialcat: '',
                testimonialbody: '',
            });
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='content with-padding padding-bottom-10'>
                    <div className='row'>
                        <div className='col-xl-4'>
                            <div className='submit-field'>
                                <h5>Visibility Status</h5>
                                <div className='switches-list'>
                                    <div className='switch-container'>
                                        <label className='switch'>
                                            <input
                                                type='checkbox'
                                                name='testimonialstatus'
                                                checked={testimonialstatus}
                                                value={testimonialstatus}
                                                onChange={() => {
                                                    setNewtestimonial({
                                                        ...newtestimonial,
                                                        testimonialstatus: !testimonialstatus,
                                                    });
                                                }}
                                            />
                                            <span className='switch-button'></span>{' '}
                                            {testimonialstatus
                                                ? 'Published'
                                                : 'Draft'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-8'>
                            <div className='submit-field'>
                                <h5>Client's Name</h5>
                                <input
                                    type='text'
                                    className='with-border'
                                    name='testimonialtitle'
                                    value={testimonialtitle}
                                    onChange={(e) => onChange(e)}
                                    placeholder='Name L.'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>
                                    Where you want this testimonial to be
                                    featured
                                </h5>
                                <div className='row'>
                                    <div className='account-type col-xl-4'>
                                        <input
                                            id='ret'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='Home'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            htmlFor='ret'
                                            className='ripple-effect-dark'
                                        >
                                            Home
                                        </label>
                                    </div>
                                    <div className='account-type col-xl-4'>
                                        <input
                                            id='hl'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='Services'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            htmlFor='hl'
                                            className='ripple-effect-dark'
                                        >
                                            Services
                                        </label>
                                    </div>
                                    <div className='account-type col-xl-4'>
                                        <input
                                            id='com'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='Promos'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            htmlFor='com'
                                            className='ripple-effect-dark'
                                        >
                                            Promos
                                        </label>
                                    </div>
                                    <div className='account-type col-xl-4'>
                                        <input
                                            id='hot'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='Contact Page'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            htmlFor='hot'
                                            className='ripple-effect-dark'
                                        >
                                            Contact Page
                                        </label>
                                    </div>

                                    <div className='account-type col-xl-4'>
                                        <input
                                            id='commi'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='Blog Posts'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            htmlFor='commi'
                                            className='ripple-effect-dark'
                                        >
                                            Blog Posts
                                        </label>
                                    </div>
                                    <div className='account-type col-xl-4'>
                                        <input
                                            id='consult'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='About Page'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <label
                                            htmlFor='consult'
                                            className='ripple-effect-dark'
                                        >
                                            About Page
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>
                                    Testimonial{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='Paste the testimonial here'
                                    ></i>
                                </h5>
                                <div className='input-with-icon'>
                                    <div id='autocomplete-container'>
                                        <textarea
                                            id='autocomplete-input'
                                            className='with-border'
                                            name='testimonialbody'
                                            value={testimonialbody}
                                            onChange={(e) => onChange(e)}
                                            placeholder='Client Statement'
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-6'>
                            <button
                                type='submit'
                                className='button ripple-effect big'
                            >
                                <i className='icon-feather-plus'></i> Add Item
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default TestimonialForm;
