import React, { useEffect, useContext, Fragment } from 'react';

// Contexts
import ServiceContext from '../../context/service/serviceContext';
import TestimonialsContext from '../../context/testimonial/testimonialContext';
import NoticiaContext from '../../context/noticia/noticiaContext';
import PageContext from '../../context/page/pageContext';

const DashboardCounts = () => {
    const serviceContext = useContext(ServiceContext);
    const testimonialContext = useContext(TestimonialsContext);
    const noticiaContext = useContext(NoticiaContext);
    const pageContext = useContext(PageContext);

    const { getServices, services } = serviceContext;
    const { getTestimonials, testimonials } = testimonialContext;
    const { getNoticias, noticias } = noticiaContext;
    const { getPages, pages } = pageContext;

    useEffect(() => {
        getServices();
        getTestimonials();
        getNoticias();
        getPages();

        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <div className='fun-facts-container'>
                <div className='fun-fact' data-fun-fact-color='#6A479c'>
                    <div className='fun-fact-text'>
                        <span>Blog &amp; News</span>
                        <h4>{noticias && noticias.length}</h4>
                    </div>
                    <div className='fun-fact-icon'>
                        <i className='icon-feather-file-text'></i>
                    </div>
                </div>
                <div className='fun-fact' data-fun-fact-color='#b81b7f'>
                    <div className='fun-fact-text'>
                        <span>Services Pages</span>
                        <h4>{services && services.length}</h4>
                    </div>
                    <div className='fun-fact-icon'>
                        <i className='icon-feather-list'></i>
                    </div>
                </div>
                <div className='fun-fact' data-fun-fact-color='#474546'>
                    <div className='fun-fact-text'>
                        <span>Pages</span>
                        <h4>{pages && pages.length}</h4>
                    </div>
                    <div className='fun-fact-icon'>
                        <i className='icon-feather-layers'></i>
                    </div>
                </div>
                <div className='fun-fact' data-fun-fact-color='#b81b7f'>
                    <div className='fun-fact-text'>
                        <span>Testimonials</span>
                        <h4>{testimonials && testimonials.length}</h4>
                    </div>
                    <div className='fun-fact-icon'>
                        <i className='icon-feather-thumbs-up'></i>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardCounts;
