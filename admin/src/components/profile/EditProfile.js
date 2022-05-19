import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';

// Contexts
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';
import ProfileContext from '../../context/profile/profileContext';

const EditProfile = ({ history }) => {
    const logContext = useContext(LogContext);
    const profileContext = useContext(ProfileContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const {
        getCurrentProfile,
        createProfile,
        profile,
        loading,
    } = profileContext;
    const { setLog } = logContext;

    const [newcomp, setNewComp] = useState(profile.departments);
    const [formData, setFormData] = useState({
        departments: '',
        title: '',
        bio: '',
        skills: '',
        certifications: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
    });

    useEffect((e) => {
        getCurrentProfile();

        setFormData({
            departments:
                (profile && loading) || !profile.departments
                    ? newcomp.sort()
                    : profile.departments,
            title: (profile && loading) || !profile.title ? '' : profile.title,
            bio: (profile && loading) || !profile.bio ? '' : profile.bio,
            skills:
                (profile && loading) || !profile.skills
                    ? ''
                    : profile.skills.join(', '),
            certifications:
                (profile && loading) || !profile.certifications
                    ? ''
                    : profile.certifications.join(', '),

            linkedin:
                (profile && loading) || !profile.social
                    ? ''
                    : profile.social.linkedin,
            twitter:
                (profile && loading) || !profile.social
                    ? ''
                    : profile.social.twitter,
            facebook:
                (profile && loading) || !profile.social
                    ? ''
                    : profile.social.facebook,
            instagram:
                (profile && loading) || !profile.social
                    ? ''
                    : profile.social.instagram,
        });

        // eslint-disable-next-line
    }, []);

    const {
        departments,
        title,
        bio,
        skills,
        certifications,
        linkedin,
        twitter,
        facebook,
        instagram,
    } = formData;

    const onClick = (e) => {
        let index;

        if (e.target.checked && !departments.includes(e.target.value)) {
            newcomp.push(e.target.value);
        } else {
            index = newcomp.indexOf(e.target.value);
            newcomp.splice(index, 1);
        }

        // sort the array
        setNewComp(newcomp.sort());
    };

    const areaChange = (e) =>
        setFormData({
            ...formData,
            bio: e,
        });

    const onChange = (e) => {
        setFormData({
            ...formData,
            departments: newcomp,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setAlert('Your profile has been updated', 'success');
        setLog({ msg: 'Profile has been updated', type: 'success' });
        createProfile(formData, history);
    };

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className='content'>
                <div className='row'>
                    <div
                        className='submit-field'
                        style={{
                            width: '100%',
                            display: 'block',
                            margin: '25px auto 15px',
                        }}
                    >
                        <h5>Area or Department</h5>
                    </div>

                    <div className='account-type col-xl-4'>
                        <input
                            id='ae'
                            className='account-type-radio'
                            type='checkbox'
                            name='newcomp'
                            value='Administration'
                            checked={
                                departments[0] === 'Administration'
                                    ? true
                                    : false
                            }
                            onClick={(e) => onClick(e)}
                            onChange={(e) => onChange(e)}
                        />
                        <label htmlFor='ae' className='ripple-effect-dark'>
                            Administration
                        </label>
                    </div>

                    <div className='account-type col-xl-4'>
                        <input
                            id='ag'
                            className='account-type-radio'
                            type='checkbox'
                            name='newcomp'
                            value='Operations'
                            checked={
                                departments[0] === 'Operations' ||
                                departments[1] === 'Operations'
                                    ? true
                                    : false
                            }
                            onClick={(e) => onClick(e)}
                            onChange={(e) => onChange(e)}
                        />
                        <label htmlFor='ag' className='ripple-effect-dark'>
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
                            checked={
                                departments[0] === 'Other' ||
                                departments[1] === 'Other' ||
                                departments[2] === 'Other'
                                    ? true
                                    : false
                            }
                            onClick={(e) => onClick(e)}
                            onChange={(e) => onChange(e)}
                        />
                        <label htmlFor='at' className='ripple-effect-dark'>
                            Other
                        </label>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xl-12'>
                        <div className='submit-field'>
                            <div className='row'>
                                <div className='col-xl-6'>
                                    <div className='submit-field'>
                                        <h5>Your Department</h5>
                                        <small>
                                            Change this field with buttons above
                                        </small>
                                        {departments && (
                                            <input
                                                type='text'
                                                className='with-border'
                                                value={newcomp}
                                                onChange={(e) => onChange(e)}
                                                disabled
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className='col-xl-6'>
                                    <div className='submit-field'>
                                        <h5>Title</h5>
                                        <small>e.g. CEO or CFO</small>
                                        <input
                                            type='text'
                                            className='with-border'
                                            name='title'
                                            value={title}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-6'>
                        <div className='submit-field'>
                            <h5>Skills</h5>
                            <small>
                                Edit your skills. Remember to separate them by a
                                comma
                            </small>
                            <input
                                name='skills'
                                type='text'
                                className='with-border'
                                value={skills}
                                onChange={(e) => onChange(e)}
                            />
                            <div
                                className='keywords-list'
                                style={{ height: '100%', marginBottom: 20 }}
                            >
                                {profile &&
                                    profile.skills
                                        .slice(0, 7)
                                        .map((skill, index) => (
                                            <span
                                                key={index}
                                                className='keyword'
                                            >
                                                <span
                                                    className='keyword-text'
                                                    style={{ paddingLeft: 15 }}
                                                >
                                                    {skill}
                                                </span>
                                            </span>
                                        ))}
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-6'>
                        <div className='submit-field'>
                            <h5>Certifications</h5>
                            <small>
                                Edit your certification. Remember to separate
                                them by a comma
                            </small>
                            <input
                                name='certifications'
                                type='text'
                                className='with-border'
                                value={certifications}
                                onChange={(e) => onChange(e)}
                            />
                            <div
                                className='keywords-list'
                                style={{ height: '100%', marginBottom: 20 }}
                            >
                                {profile &&
                                    profile.certifications
                                        .slice(0, 7)
                                        .map((certification, index) => (
                                            <span
                                                key={index}
                                                className='keyword'
                                            >
                                                <span
                                                    className='keyword-text'
                                                    style={{ paddingLeft: 15 }}
                                                >
                                                    {certification}
                                                </span>
                                            </span>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-12'>
                        <div className='submit-field'>
                            <h5>Edit your Bio</h5>
                            {bio && (
                                <ReactQuill
                                    theme='snow'
                                    modules={EditProfile.modules}
                                    formats={EditProfile.formats}
                                    className='with-border'
                                    value={bio}
                                    onChange={(e) => areaChange(e)}
                                />
                            )}
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
                                    value={linkedin || ' '}
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
                                    value={twitter || ' '}
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
                                    value={facebook || ' '}
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
                                    value={instagram || ' '}
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
EditProfile.modules = {
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
EditProfile.formats = [
    'bold',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
];

export default withRouter(EditProfile);
