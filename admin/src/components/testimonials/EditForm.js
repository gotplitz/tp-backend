import React, { Fragment, useState, useContext, useEffect } from 'react';

// Context
import TestimonialContext from '../../context/testimonial/testimonialContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Spinning from '../extras/Spinning';

const EditForm = () => {
    const testimonialContext = useContext(TestimonialContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);
    const authContext = useContext(AuthContext);

    const {
        clearPcurrent,
        updateTestimonial,
        pcurrent,
        loading,
    } = testimonialContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        if (pcurrent && pcurrent !== null && loading === false) {
            setNewtestimonial(pcurrent);
            setNewCat(pcurrent.testimonialcat);
        }

        // eslint-disable-next-line
    }, [testimonialContext, pcurrent]);

    const [newcat, setNewCat] = useState([]);
    const [newtestimonial, setNewtestimonial] = useState({
        testimonialstatus: false,
        testimonialtitle: '',
        testimonialcat: '',
        testimonialbody: '',
    });

    const {
        testimonialstatus,
        testimonialtitle,
        testimonialcat,
        testimonialbody,
    } = newtestimonial;

    const onClick = (e) => {
        let index;

        if (e.target.checked && !testimonialcat.includes(e.target.value)) {
            newcat.push(e.target.value);
        } else {
            index = newcat.indexOf(e.target.value);
            newcat.splice(index, 1);
        }

        // sort the array
        setNewCat(newcat.sort());
    };

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
                    'One or more fields were empty when the user tried to add a new testimonial',
                type: 'error',
            });
        } else {
            setAlert('Testimonial Updated', 'success');
            setLog({ msg: 'A new Service was added', type: 'success' });
            updateTestimonial(newtestimonial);
        }

        setNewtestimonial({
            testimonialstatus: false,
            testimonialtitle: '',
            testimonialcat: '',
            testimonialbody: '',
        });
        if (pcurrent) {
            var closemodal = document.getElementById('small-dialog');
            closemodal.classList.toggle('mfp-hide');
        }
        clearAll();
    };

    const clearAll = () => {
        clearPcurrent();
    };

    return loading && pcurrent && pcurrent === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='content with-padding'>
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
                                            checked={
                                                testimonialcat &&
                                                testimonialcat.includes('Home')
                                                    ? true
                                                    : false
                                            }
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
                                            checked={
                                                testimonialcat &&
                                                testimonialcat.includes(
                                                    'Services'
                                                )
                                                    ? true
                                                    : false
                                            }
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
                                            checked={
                                                testimonialcat &&
                                                testimonialcat.includes(
                                                    'Promos'
                                                )
                                                    ? true
                                                    : false
                                            }
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
                                            checked={
                                                testimonialcat &&
                                                testimonialcat.includes(
                                                    'Contact Page'
                                                )
                                                    ? true
                                                    : false
                                            }
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
                                            id='ports'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='Blog Posts'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                            checked={
                                                testimonialcat &&
                                                testimonialcat.includes(
                                                    'Blog Posts'
                                                )
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label
                                            htmlFor='ports'
                                            className='ripple-effect-dark'
                                        >
                                            Blog Posts
                                        </label>
                                    </div>
                                    <div className='account-type col-xl-4'>
                                        <input
                                            id='gov'
                                            className='account-type-radio'
                                            type='checkbox'
                                            name='newcat'
                                            value='About Page'
                                            onClick={(e) => onClick(e)}
                                            onChange={(e) => onChange(e)}
                                            checked={
                                                testimonialcat &&
                                                testimonialcat.includes(
                                                    'About Page'
                                                )
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <label
                                            htmlFor='gov'
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
                                        title='Paste testimonial here'
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
                                <i className='icon-feather-plus'></i> Submit
                                Updates
                            </button>
                        </div>
                        <div className='col-xl-6'>
                            {pcurrent && (
                                <Fragment>
                                    <button
                                        type='submit'
                                        className='button gray ripple-effect big'
                                        onClick={clearAll}
                                    >
                                        <i className='icon-feather-delete'></i>{' '}
                                        <span style={{ marginLeft: 10 }}>
                                            Clear Form
                                        </span>
                                    </button>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default EditForm;
