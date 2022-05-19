import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

// Contexts
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';
import ProfileContext from '../../context/profile/profileContext';

const NewProfile = ({ history }) => {
    const logContext = useContext(LogContext);
    const profileContext = useContext(ProfileContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { createProfile } = profileContext;
    const { setLog } = logContext;

    const [newcomp, setNewComp] = useState([]);

    const [formData, setFormData] = useState({
        departments: [],
        title: '',
        bio: '',
        skills: '',
        certifications: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
    });

    const onClick = (e) => {
        let index;

        if (e.target.checked) {
            newcomp.push(e.target.value);
        } else {
            index = newcomp.indexOf(e.target.value);
            newcomp.splice(index, 1);
        }

        // sort the array
        setNewComp(newcomp.sort());
    };

    const {
        title,
        bio,
        skills,
        certifications,
        linkedin,
        twitter,
        facebook,
        instagram,
    } = formData;

    const areaChange = (e) => {
        setFormData({
            ...formData,
            bio: e,
        });
    };

    const onChange = (e) =>
        setFormData({
            ...formData,
            departments: newcomp.sort(),
            [e.target.name]: e.target.value,
        });

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === '') {
            setAlert(
                'Please add departments, Title, Bio, Skills and Certifications',
                'error'
            );
            setLog({
                msg: 'Some fields were empty when creating profile',
                type: 'error',
            });
        } else {
            setAlert('Thanks for creating your profile', 'success');
            setLog({ msg: 'This user created a profile', type: 'success' });
            createProfile(formData, history);
        }
    };

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className='content'>
                <div className='row'>
                    <div className='col-xl-12'>
                        <div className='submit-field'>
                            <h5>Area or Department</h5>
                            <div className='row'>
                                <div className='account-type col-xl-4'>
                                    <input
                                        id='ag'
                                        className='account-type-radio'
                                        type='checkbox'
                                        name='newcomp'
                                        value='Administration'
                                        onClick={(e) => onClick(e)}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <label
                                        htmlFor='ag'
                                        className='ripple-effect-dark'
                                    >
                                        Administration
                                    </label>
                                </div>
                                <div className='account-type col-xl-4'>
                                    <input
                                        id='ae'
                                        className='account-type-radio'
                                        type='checkbox'
                                        name='newcomp'
                                        value='Operations'
                                        onClick={(e) => onClick(e)}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <label
                                        htmlFor='ae'
                                        className='ripple-effect-dark'
                                    >
                                        Operations
                                    </label>
                                </div>
                                <div className='account-type col-xl-4'>
                                    <input
                                        id='at'
                                        className='account-type-radio'
                                        type='checkbox'
                                        name='newcomp'
                                        value='Other'
                                        onClick={(e) => onClick(e)}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <label
                                        htmlFor='at'
                                        className='ripple-effect-dark'
                                    >
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-4'>
                        <div className='submit-field'>
                            <h5>Title</h5>
                            <small>e.g. CEO or CFO</small>
                            <input
                                name='title'
                                type='text'
                                className='with-border'
                                value={title}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>

                    <div className='col-xl-4'>
                        <div className='submit-field'>
                            <h5>Skills</h5>
                            <small>Add skills separated by a comma</small>
                            <input
                                name='skills'
                                type='text'
                                className='with-border'
                                value={skills}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>

                    <div className='col-xl-4'>
                        <div className='submit-field'>
                            <h5>Certifications</h5>
                            <small>
                                Add Certifications separated by a comma
                            </small>
                            <input
                                name='certifications'
                                type='text'
                                className='with-border'
                                value={certifications}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </div>

                    <div className='col-xl-12'>
                        <div className='submit-field'>
                            <h5>Your Bio</h5>
                            <ReactQuill
                                theme='snow'
                                modules={NewProfile.modules}
                                formats={NewProfile.formats}
                                className='with-border'
                                value={bio}
                                onChange={(e) => areaChange(e)}
                            />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xl-6'>
                        <div className='submit-field'>
                            <h5>LinkedIn</h5>
                            <div className='input-with-icon'>
                                <input
                                    type='text'
                                    name='linkedin'
                                    className='with-border'
                                    value={linkedin}
                                    onChange={(e) => onChange(e)}
                                />
                                <i className='icon-brand-linkedin'></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6'>
                        <div className='submit-field'>
                            <h5>Twitter</h5>
                            <div className='input-with-icon'>
                                <input
                                    type='text'
                                    name='twitter'
                                    className='with-border'
                                    value={twitter}
                                    onChange={(e) => onChange(e)}
                                />
                                <i className='icon-brand-twitter'></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6'>
                        <div className='submit-field'>
                            <h5>Facebook</h5>
                            <div className='input-with-icon'>
                                <input
                                    type='text'
                                    name='facebook'
                                    className='with-border'
                                    value={facebook}
                                    onChange={(e) => onChange(e)}
                                />
                                <i className='icon-brand-facebook'></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6'>
                        <div className='submit-field'>
                            <h5>Instagram</h5>
                            <div className='input-with-icon'>
                                <input
                                    type='text'
                                    name='instagram'
                                    className='with-border'
                                    value={instagram}
                                    onChange={(e) => onChange(e)}
                                />
                                <i className='icon-brand-instagram'></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-xl-12'>
                    <button
                        type='submit'
                        className='button ripple-effect big margin-top-30'
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
NewProfile.modules = {
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
NewProfile.formats = [
    'bold',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
];

NewProfile.propTypes = {
    placeholder: PropTypes.string,
};

export default withRouter(NewProfile);
