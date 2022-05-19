import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';

// Main and other necessary css
import './App.css';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import './components/layout/fm-customizations.css';

// Contexts
import NoticiaState from './context/noticia/NoticiaState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import LogState from './context/log/LogState';
import ProfileState from './context/profile/ProfileState';
import PageState from './context/page/PageState';
import TestimonialState from './context/testimonial/TestimonialState';
import EmailState from './context/email/EmailState';
import SliderState from './context/slider/SliderState';
import ServiceState from './context/service/ServiceState';
import LocationState from './context/location/LocationState';

// Components and other resources to load
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import DashboardPage from './components/dashboard/DashboardPage';
import Alerting from './components/layout/Alerting';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AllLogs from './components/layout/AllLogs';
import ProfilePage from './components/profile/ProfilePage';
import UserPage from './components/profile/UserPage';
import ProfilesPage from './components/profiles/ProfilesPage';
import Profile from './components/profile/Profile';
import PagePage from './components/pages/PagePage';
import PagesPage from './components/pages/PagesPage';
import FullPage from './components/pages/FullPage';
import NoticiaPage from './components/noticias/NoticiaPage';
import NoticiasPage from './components/noticias/NoticiasPage';
import FullNoticia from './components/noticias/FullNoticia';
import VerifyEmail from './components/extras/VerifyEmail';
import TestimonialPage from './components/testimonials/TestimonialPage';
import TestimonialsPage from './components/testimonials/TestimonialsPage';
import EmailsPage from './components/emails/EmailsPage';
import SliderPage from './components/sliders/SliderPage';
import SlidersPage from './components/sliders/SlidersPage';
import ServicePage from './components/services/ServicePage';
import ServicesPage from './components/services/ServicesPage';
import FullService from './components/services/FullService';
import LocationPage from './components/locations/LocationPage';
import LocationsPage from './components/locations/LocationsPage';
import FullLocation from './components/locations/FullLocation';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    return (
        <AuthState>
            <ProfileState>
                <PageState>
                    <ServiceState>
                        <TestimonialState>
                            <LocationState>
                                <NoticiaState>
                                    <SliderState>
                                        <EmailState>
                                            <AlertState>
                                                <LogState>
                                                    <Router>
                                                        <Alerting />
                                                        <div id='wrapper'>
                                                            <Navbar />
                                                            <div className='dashboard-container'>
                                                                <Switch>
                                                                    <Route
                                                                        exact
                                                                        path='/'
                                                                        component={
                                                                            Home
                                                                        }
                                                                    />
                                                                    <Route
                                                                        exact
                                                                        path='/login'
                                                                        component={
                                                                            Login
                                                                        }
                                                                    />
                                                                    <Route
                                                                        exact
                                                                        path='/register'
                                                                        component={
                                                                            Register
                                                                        }
                                                                    />
                                                                    <Route
                                                                        exact
                                                                        path='/after-registration'
                                                                        component={
                                                                            VerifyEmail
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/dashboard'
                                                                        component={
                                                                            DashboardPage
                                                                        }
                                                                    />

                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/add-news'
                                                                        component={
                                                                            NoticiaPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/news'
                                                                        component={
                                                                            NoticiasPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/news/:newslink'
                                                                        component={
                                                                            FullNoticia
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/history-logs'
                                                                        component={
                                                                            AllLogs
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/add-page'
                                                                        component={
                                                                            PagePage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/pages'
                                                                        component={
                                                                            PagesPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/pages/:pagelink'
                                                                        component={
                                                                            FullPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/dashboard-settings'
                                                                        component={
                                                                            UserPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/my-profile'
                                                                        component={
                                                                            ProfilePage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/all-profiles'
                                                                        component={
                                                                            ProfilesPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/all-profiles/:id'
                                                                        component={
                                                                            Profile
                                                                        }
                                                                    />

                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/add-testimonial'
                                                                        component={
                                                                            TestimonialPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/testimonials'
                                                                        component={
                                                                            TestimonialsPage
                                                                        }
                                                                    />

                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/emails'
                                                                        component={
                                                                            EmailsPage
                                                                        }
                                                                    />

                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/add-slider'
                                                                        component={
                                                                            SliderPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/sliders'
                                                                        component={
                                                                            SlidersPage
                                                                        }
                                                                    />

                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/add-service'
                                                                        component={
                                                                            ServicePage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/services'
                                                                        component={
                                                                            ServicesPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/services/:servicelink'
                                                                        component={
                                                                            FullService
                                                                        }
                                                                    />

                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/add-location'
                                                                        component={
                                                                            LocationPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/locations'
                                                                        component={
                                                                            LocationsPage
                                                                        }
                                                                    />
                                                                    <PrivateRoute
                                                                        exact
                                                                        path='/locations/:locationlink'
                                                                        component={
                                                                            FullLocation
                                                                        }
                                                                    />
                                                                </Switch>
                                                            </div>
                                                        </div>
                                                    </Router>
                                                </LogState>
                                            </AlertState>
                                        </EmailState>
                                    </SliderState>
                                </NoticiaState>
                            </LocationState>
                        </TestimonialState>
                    </ServiceState>
                </PageState>
            </ProfileState>
        </AuthState>
    );
}

export default App;
