import React, { Fragment, useContext, useEffect } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';

// Contexts
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';

import CurrentWork from '../logs/CurrentWork';
import './navbar.css';

import logo from '../../assets/images/TP-logo.png';
import placeh from '../../assets/images/placeholder.png';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);

    const { isAuthenticated, logout, user } = authContext;
    const { getCurrentProfile, profile } = profileContext;

    const onLogout = () => {
        logout();
        return <Redirect to='/' />;
    };

    useEffect(() => {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = '/js/custom.js';
        script.async = true;

        document.body.insertBefore(script, document.body.children[4]);

        document.querySelectorAll('.header-notifications').forEach((el) => {
            el.querySelector('button').addEventListener('click', (e) => {
                e.preventDefault();

                if (e.target.classList.contains('active')) {
                    el.classList.remove('active');
                } else {
                    el.classList.add('active');
                }
            });
        });

        return () => {
            document.body.removeChild(script);
        };

        // eslint-disable-next-line
    });

    useEffect(() => {
        getCurrentProfile();

        // eslint-disable-next-line
    }, [user]);

    const closeMenu = () => {
        const getthemenu = document.querySelectorAll('.user-menu');

        getthemenu.forEach((el) => {
            if (el.classList.contains('active')) {
                el.classList.remove('active');
            }
        });
    };

    const authLinks = (
        <Fragment>
            <header
                id='header-container'
                className='fullwidth dashboard-header not-sticky'
            >
                <div id='header'>
                    <div className='container'>
                        <div className='left-side'>
                            <Link to='/dashboard'>
                                <div id='logo'>
                                    <img src={logo} alt='' />
                                </div>
                            </Link>

                            <div className='clearfix'></div>
                        </div>

                        <div className='right-side'>
                            {user && user.userrole === 'appadmin' && (
                                <div className='header-widget hide-on-mobile'>
                                    <CurrentWork />
                                </div>
                            )}

                            <div className='header-widget'>
                                <div className='header-notifications user-menu'>
                                    <div className='header-notifications-trigger'>
                                        <button>
                                            <div className='user-avatar'>
                                                <img
                                                    src={
                                                        user &&
                                                        user.photo ===
                                                            'placeholder.png'
                                                            ? placeh
                                                            : `/uploads/${
                                                                  user &&
                                                                  user.photo
                                                              }`
                                                    }
                                                    alt={user && user.name}
                                                />
                                            </div>
                                        </button>
                                    </div>

                                    <div className='header-notifications-dropdown'>
                                        <div className='user-status'>
                                            <div className='user-details'>
                                                <div className='user-avatar'>
                                                    <img
                                                        src={
                                                            user &&
                                                            user.photo ===
                                                                'placeholder.png'
                                                                ? placeh
                                                                : `/uploads/${
                                                                      user &&
                                                                      user.photo
                                                                  }`
                                                        }
                                                        alt={user && user.name}
                                                    />
                                                </div>
                                                <div className='user-name'>
                                                    {user && user.name}{' '}
                                                    {user && user.lastname}{' '}
                                                    <span>
                                                        {profile &&
                                                            profile.title}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='status-switch'>
                                                {user &&
                                                user.userrole === 'appadmin' ? (
                                                    <label
                                                        className='user-online current-status'
                                                        style={{
                                                            backgroundColor:
                                                                '#47bb67',
                                                        }}
                                                    >
                                                        <Link
                                                            style={{
                                                                display:
                                                                    'block',
                                                                width: '100%',
                                                                color: '#fff',
                                                            }}
                                                            to='/my-profile'
                                                        >
                                                            User Profile
                                                        </Link>
                                                    </label>
                                                ) : (
                                                    <label
                                                        className='user-invisible'
                                                        style={{
                                                            backgroundColor:
                                                                '#383838',
                                                        }}
                                                    >
                                                        <Link
                                                            style={{
                                                                display:
                                                                    'block',
                                                                width: '100%',
                                                                color: '#fff',
                                                            }}
                                                            to='/my-profile'
                                                        >
                                                            User Profile
                                                        </Link>
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        <ul className='user-menu-small-nav'>
                                            <li
                                                className='user-m-close-open'
                                                onClick={closeMenu}
                                            >
                                                <Link to='/dashboard'>
                                                    <i className='icon-material-outline-dashboard'></i>{' '}
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to='/dashboard-settings'
                                                    onClick={closeMenu}
                                                >
                                                    <i className='icon-material-outline-settings'></i>{' '}
                                                    User Settings
                                                </Link>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={onLogout}
                                                    href='/#!'
                                                >
                                                    <i className='icon-material-outline-power-settings-new'></i>{' '}
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <header
                id='header-container'
                className='fullwidth dashboard-header not-sticky'
            >
                <div id='header'>
                    <div className='container navbar-loggedout'>
                        <div className='left-side'>
                            <div id='logo'>
                                <Link to='/'>
                                    <img src={logo} alt='' />
                                </Link>
                            </div>

                            <nav id='navigation'>
                                <ul id='responsive'>
                                    <li>
                                        <NavLink
                                            to='/login'
                                            activeClassName='current'
                                        >
                                            Login
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/register'
                                            activeClassName='current'
                                        >
                                            Register Account
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <div className='clearfix'></div>
                        </div>

                        <div className='right-side'>
                            <span className='mmenu-trigger'>
                                <button
                                    className='hamburger hamburger--collapse'
                                    type='button'
                                >
                                    <span className='hamburger-box'>
                                        <span className='hamburger-inner'></span>
                                    </span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );

    return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
};

export default Navbar;
