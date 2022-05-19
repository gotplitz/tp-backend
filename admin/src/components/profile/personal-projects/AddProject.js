import React, { useContext, Fragment, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';

// Contexts
import ProfileContext from '../../../context/profile/profileContext';
import AlertContext from '../../../context/alert/alertContext';
import LogContext from '../../../context/log/logContext';
import AuthContext from '../../../context/auth/authContext';

// Page parts
import Footer from '../../layout/Footer';
import DashNav from '../../layout/DashNav';

const AddProject = ({ history }) => {
    const profileContext = useContext(ProfileContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const { addPersonalPage, getCurrentProfile } = profileContext;
    const { loadUser } = authContext;

    useEffect(() => {
        getCurrentProfile();
        loadUser();

        // eslint-disable-next-line
    }, []);

    const [formData, setFormData] = useState({
        propertyname: '',
        propertiesubt: '',
        propertydetails: '',
        from: '',
        to: '',
        current: false,
    });

    const [toDateDisable, toggleDisable] = useState(false);

    const {
        propertyname,
        propertiesubt,
        propertydetails,
        from,
        to,
        current,
    } = formData;

    const areaChange = (e) =>
        setFormData({
            ...formData,
            propertydetails: e,
        });

    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            propertyname === '' ||
            propertiesubt === '' ||
            propertydetails === '' ||
            from === ''
        ) {
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'User tried to add a personal property but fields were empty',
                type: 'error',
            });
        } else {
            setAlert('Personal Page Added', 'success');
            setLog({
                msg: `The user added a new personal property`,
                type: 'success',
            });
            addPersonalPage(formData, history);
        }
    };

    /*
     * Quill modules to attach to editor
     * See https://quilljs.com/docs/modules/ for complete options
     */
    AddProject.modules = {
        toolbar: [
            ['bold', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    AddProject.formats = [
        'bold',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
    ];

    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>My Pages</h3>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='dashboard-box margin-top-0'>
                                <div className='headline'>
                                    <h3>
                                        <i className='icon-feather-folder-plus'></i>{' '}
                                        Add a personal property
                                    </h3>
                                </div>
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className='content with-padding padding-bottom-10'>
                                        <div className='row'>
                                            <div className='col-xl-6'>
                                                <div className='submit-field'>
                                                    <h5>Page Name</h5>
                                                    <input
                                                        type='text'
                                                        className='with-border'
                                                        name='propertyname'
                                                        value={propertyname}
                                                        onChange={onChange}
                                                        placeholder='Name of property'
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-xl-6'>
                                                <div className='submit-field'>
                                                    <h5>Address or Location</h5>
                                                    <input
                                                        type='text'
                                                        className='with-border'
                                                        name='propertiesubt'
                                                        value={propertiesubt}
                                                        onChange={onChange}
                                                        placeholder='Address or Location'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-xl-5'>
                                                <div className='submit-field'>
                                                    <h5>From</h5>
                                                    <DatePicker
                                                        className='with-border'
                                                        dateFormat='MMMM dd, yyyy'
                                                        selected={from}
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                from: e,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-xl-2'>
                                                <div className='submit-field'>
                                                    <h5>Check if current</h5>
                                                    <div className='switches-list'>
                                                        <div className='switch-container'>
                                                            <label className='switch'>
                                                                <input
                                                                    type='checkbox'
                                                                    name='current'
                                                                    checked={
                                                                        current
                                                                    }
                                                                    value={
                                                                        current
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setFormData(
                                                                            {
                                                                                ...formData,
                                                                                current: !current,
                                                                            }
                                                                        );
                                                                        toggleDisable(
                                                                            !toDateDisable
                                                                        );
                                                                    }}
                                                                />
                                                                <span className='switch-button'></span>{' '}
                                                                Current
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-xl-5'>
                                                <div className='submit-field'>
                                                    <h5>To</h5>
                                                    <DatePicker
                                                        className='with-border'
                                                        dateFormat='MMMM dd, yyyy'
                                                        selected={to}
                                                        disabled={
                                                            toDateDisable
                                                                ? 'disabled'
                                                                : ''
                                                        }
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                to: e,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-xl-12'>
                                                <div className='submit-field'>
                                                    <h5>Page Details</h5>
                                                    <ReactQuill
                                                        theme='snow'
                                                        modules={
                                                            AddProject.modules
                                                        }
                                                        formats={
                                                            AddProject.formats
                                                        }
                                                        className='with-border'
                                                        value={propertydetails}
                                                        onChange={(e) =>
                                                            areaChange(e)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-xl-12'>
                                                <button
                                                    type='submit'
                                                    className='button ripple-effect big'
                                                >
                                                    <i className='icon-feather-plus'></i>{' '}
                                                    Post Personal Page
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default AddProject;
