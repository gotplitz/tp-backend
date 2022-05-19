import React, { useContext, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

// Context
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';
import PageContext from '../../context/page/pageContext';
import NoticiaContext from '../../context/noticia/noticiaContext';
import TestimonialContext from '../../context/testimonial/testimonialContext';
import EmailContext from '../../context/email/emailContext';
import SliderContext from '../../context/slider/sliderContext';
import ServiceContext from '../../context/service/serviceContext';
import LocationContext from '../../context/location/locationContext';

const DashNav = () => {
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);
    const pageContext = useContext(PageContext);
    const noticiaContext = useContext(NoticiaContext);
    const testimonialContext = useContext(TestimonialContext);
    const emailContext = useContext(EmailContext);
    const sliderContext = useContext(SliderContext);
    const serviceContext = useContext(ServiceContext);
    const locationContext = useContext(LocationContext);

    const { logout, loadUser, user } = authContext;
    const { getProfiles, getCurrentProfile, profiles } = profileContext;
    const { getPages, pages } = pageContext;
    const { getNoticias, noticias } = noticiaContext;
    const { getTestimonials, testimonials } = testimonialContext;
    const { getEmails, emails } = emailContext;
    const { getSliders, sliders } = sliderContext;
    const { getServices, services } = serviceContext;
    const { getLocations, locations } = locationContext;

    useEffect(() => {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = '/js/custom.js';
        script.async = true;

        document.body.insertBefore(script, document.body.children[4]);

        var page = window.location.href.indexOf('page') > -1;
        var testimonial = window.location.href.indexOf('testimonial') > -1;
        var news = window.location.href.indexOf('news') > -1;
        var email = window.location.href.indexOf('email') > -1;
        var slider = window.location.href.indexOf('slider') > -1;
        var service = window.location.href.indexOf('service') > -1;
        var location = window.location.href.indexOf('location') > -1;
        var i = null;

        if (page) {
            var elements = document.getElementsByClassName('page');

            for (i = 0; i < elements.length; i++) {
                elements[i].classList.add('active-submenu');
            }
        }

        if (testimonial) {
            var elements0 = document.getElementsByClassName('testimonial');

            for (i = 0; i < elements0.length; i++) {
                elements0[i].classList.add('active-submenu');
            }
        }

        if (news) {
            var elements1 = document.getElementsByClassName('news');

            for (i = 0; i < elements1.length; i++) {
                elements1[i].classList.add('active-submenu');
            }
        }

        if (email) {
            var elements2 = document.getElementsByClassName('email');

            for (i = 0; i < elements2.length; i++) {
                elements2[i].classList.add('active-submenu');
            }
        }

        if (slider) {
            var elements3 = document.getElementsByClassName('slider');

            for (i = 0; i < elements3.length; i++) {
                elements3[i].classList.add('active-submenu');
            }
        }

        if (service) {
            var elements4 = document.getElementsByClassName('service');

            for (i = 0; i < elements4.length; i++) {
                elements4[i].classList.add('active-submenu');
            }
        }

        if (location) {
            var elements5 = document.getElementsByClassName('location');

            for (i = 0; i < elements5.length; i++) {
                elements5[i].classList.add('active-submenu');
            }
        }

        return () => {
            document.body.removeChild(script);
            document
                .querySelectorAll('.dashboard-nav ul .has-submenu')
                .forEach((el) =>
                    el.querySelector('a').removeEventListener('click', el)
                );
        };

        // eslint-disable-next-line
    });

    document
        .querySelectorAll('.dashboard-nav .dashboard-nav-inner ul .has-submenu')
        .forEach((el) => {
            el.querySelector('li a').addEventListener('click', (e) => {
                e.preventDefault();

                if (e.target.classList.contains('active-submenu')) {
                    el.classList.remove('active-submenu');
                } else {
                    el.classList.add('active-submenu');
                }

                if (
                    el.previousSibling &&
                    el.previousSibling.classList.contains('active-submenu')
                ) {
                    el.previousSibling.classList.remove('active-submenu');
                }

                if (
                    el.nextSibling &&
                    el.nextSibling.classList.contains('active-submenu')
                ) {
                    el.nextSibling.classList.remove('active-submenu');
                }
            });
        });

    document
        .querySelectorAll('.dashboard-responsive-nav-trigger')
        .forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                if (
                    el.classList.contains(
                        'dashboard-responsive-nav-trigger active'
                    )
                ) {
                    el.classList.remove('active');
                } else {
                    el.classList.add('active');
                }

                const element = document.querySelector('.dashboard-nav');
                element.classList.add('active');

                const element2 = document.querySelector('.hamburger');
                element2.classList.add('is-active');
            });
        });

    const onClick = (e) => {
        e.preventDefault();
        const navTrigger = document.querySelector(
            '.dashboard-responsive-nav-trigger'
        );
        navTrigger.classList.remove('active');

        const dashNav = document.querySelector('.dashboard-nav');
        dashNav.classList.remove('active');

        const hamburgerTrigger = document.querySelector('.hamburger');
        hamburgerTrigger.classList.remove('is-active');
    };

    useEffect(() => {
        loadUser();
        getProfiles();
        getPages();
        getNoticias();
        getCurrentProfile();
        getTestimonials();
        getEmails();
        getSliders();
        getServices();
        getLocations();

        // eslint-disable-next-line
    }, []);

    const onLogout = () => {
        logout();
        return <Redirect to='/' />;
    };

    return user && user.userrole === 'appadmin' ? (
        <div className='dashboard-sidebar'>
            <div className='dashboard-sidebar-inner' data-simplebar>
                <div className='dashboard-nav-container'>
                    <a href='/#!' className='dashboard-responsive-nav-trigger'>
                        <span className='hamburger hamburger--collapse'>
                            <div
                                className='close-area-mob'
                                onClick={(e) => onClick(e)}
                            ></div>
                            <span className='hamburger-box'>
                                <span className='hamburger-inner'></span>
                            </span>
                        </span>
                        <span className='trigger-title'>
                            Dashboard Navigation
                        </span>
                    </a>

                    <div className='dashboard-nav'>
                        <div className='dashboard-nav-inner'>
                            <ul data-submenu-title='Start'>
                                <li id='dashdash'>
                                    <NavLink
                                        to='/dashboard'
                                        activeClassName='active'
                                    >
                                        <i className='icon-material-outline-dashboard'></i>{' '}
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/all-profiles'
                                        activeClassName='active'
                                    >
                                        <i className='icon-feather-users'></i>{' '}
                                        All Users{' '}
                                        <span className='nav-tag'>
                                            {profiles && profiles.length}
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/history-logs'
                                        activeClassName='active'
                                    >
                                        <i className='icon-line-awesome-history'></i>{' '}
                                        History Logs{' '}
                                    </NavLink>
                                </li>
                            </ul>

                            <ul data-submenu-title='Front-End Items'>
                                <li id='slider' className='has-submenu slider'>
                                    <a href='/#!'>
                                        <i className='icon-feather-airplay'></i>{' '}
                                        Hero Sliders
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/add-slider'
                                                activeClassName='active'
                                            >
                                                Add Slide
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/sliders'
                                                activeClassName='active'
                                            >
                                                See/Edit Slides{' '}
                                                <span className='nav-tag'>
                                                    {sliders && sliders.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li id='page' className='has-submenu page'>
                                    <a href='/#!'>
                                        <i className='icon-feather-layers'></i>{' '}
                                        Pages
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/add-page'
                                                activeClassName='active'
                                            >
                                                Add Page
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/pages'
                                                activeClassName='active'
                                            >
                                                See/Edit Pages{' '}
                                                <span className='nav-tag'>
                                                    {pages && pages.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    id='service'
                                    className='has-submenu service'
                                >
                                    <a href='/#!'>
                                        <i className='icon-feather-list'></i>{' '}
                                        Services
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/add-service'
                                                activeClassName='active'
                                            >
                                                Add Service Page
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/services'
                                                activeClassName='active'
                                            >
                                                See/Edit Services{' '}
                                                <span className='nav-tag'>
                                                    {services &&
                                                        services.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    id='location'
                                    className='has-submenu location'
                                >
                                    <a href='/#!'>
                                        <i className='icon-feather-map-pin'></i>{' '}
                                        Locations
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/add-location'
                                                activeClassName='active'
                                            >
                                                Add Location Page
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/locations'
                                                activeClassName='active'
                                            >
                                                See/Edit Locations{' '}
                                                <span className='nav-tag'>
                                                    {locations &&
                                                        locations.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li id='news' className='has-submenu news'>
                                    <a href='/#!'>
                                        <i className='icon-feather-file-text'></i>{' '}
                                        News &amp; Blog
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/add-news'
                                                activeClassName='active'
                                            >
                                                Add New{' '}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/news'
                                                activeClassName='active'
                                            >
                                                See and Update{' '}
                                                <span className='nav-tag'>
                                                    {noticias &&
                                                        noticias.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    id='testimonial'
                                    className='has-submenu testimonial'
                                >
                                    <a href='/#!'>
                                        <i className='icon-feather-thumbs-up'></i>{' '}
                                        Testimonials
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/add-testimonial'
                                                activeClassName='active'
                                            >
                                                Add New Testimonial
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/testimonials'
                                                activeClassName='active'
                                            >
                                                See/Edit Testimonials{' '}
                                                <span className='nav-tag'>
                                                    {testimonials &&
                                                        testimonials.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul data-submenu-title='Forms Submissions'>
                                <li id='email' className='has-submenu email'>
                                    <a href='/#!'>
                                        <i className='icon-feather-inbox'></i>{' '}
                                        Email Submissions
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/emails'
                                                activeClassName='active'
                                            >
                                                List of Inquiries{' '}
                                                <span className='nav-tag'>
                                                    {emails && emails.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul data-submenu-title='Account'>
                                <li>
                                    <NavLink
                                        to='/my-profile'
                                        activeClassName='active'
                                    >
                                        <i className='icon-feather-user-check'></i>{' '}
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard-settings'
                                        activeClassName='active'
                                    >
                                        <i className='icon-material-outline-settings'></i>{' '}
                                        Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <a onClick={onLogout} href='/#!'>
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
    ) : (
        <div className='dashboard-sidebar'>
            <div className='dashboard-sidebar-inner' data-simplebar>
                <div className='dashboard-nav-container'>
                    <a href='/#!' className='dashboard-responsive-nav-trigger'>
                        <span className='hamburger hamburger--collapse'>
                            <span className='hamburger-box'>
                                <span className='hamburger-inner'></span>
                            </span>
                        </span>
                        <span className='trigger-title'>
                            Dashboard Navigation
                        </span>
                    </a>

                    <div className='dashboard-nav'>
                        <div className='dashboard-nav-inner'>
                            <ul data-submenu-title='Start'>
                                <li>
                                    <NavLink
                                        to='/dashboard'
                                        activeClassName='active'
                                    >
                                        <i className='icon-material-outline-dashboard'></i>{' '}
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/all-profiles'
                                        activeClassName='active'
                                    >
                                        <i className='icon-feather-users'></i>{' '}
                                        All Users{' '}
                                        <span className='nav-tag'>
                                            {profiles && profiles.length}
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>

                            <ul data-submenu-title='Forms Submissions'>
                                <li id='email' className='has-submenu email'>
                                    <a href='/#!'>
                                        <i className='icon-feather-inbox'></i>{' '}
                                        Email Submissions
                                    </a>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to='/emails'
                                                activeClassName='active'
                                            >
                                                List of Inquiries{' '}
                                                <span className='nav-tag'>
                                                    {emails && emails.length}
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul data-submenu-title='Account'>
                                <li>
                                    <NavLink
                                        to='/my-profile'
                                        activeClassName='active'
                                    >
                                        <i className='icon-feather-user-check'></i>{' '}
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/dashboard-settings'
                                        activeClassName='active'
                                    >
                                        <i className='icon-material-outline-settings'></i>{' '}
                                        Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <a onClick={onLogout} href='/#!'>
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
    );
};

export default DashNav;
