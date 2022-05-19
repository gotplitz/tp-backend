import React, { useContext, useEffect, Fragment } from 'react';

// Context
import TestimonialContext from '../../context/testimonial/testimonialContext';

// Parts
import TestimonialItem from './TestimonialItem';
import TestimonialEdit from './TestimonialEdit';
import Spinning from '../extras/Spinning';

const Testimonials = (props) => {
    const testimonialContext = useContext(TestimonialContext);

    const {
        testimonials,
        filtered,
        getTestimonials,
        loading,
    } = testimonialContext;

    useEffect(() => {
        getTestimonials();
        // eslint-disable-next-line
    }, []);
    return testimonials !== null && testimonials.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i>{' '}
                                Testimonials List
                            </h3>
                        </div>

                        <div className='content'>
                            <h4
                                style={{
                                    margin: '30px auto 0',
                                    textAlign: 'center',
                                    paddingBottom: 30,
                                }}
                            >
                                You don't have Testimonials yet
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <div className='row'>
            <div className='col-xl-12'>
                <TestimonialEdit pcurrent={props.pcurrent} />
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-folder'></i> Testimonials
                            List
                        </h3>
                    </div>

                    <div className='content'>
                        {testimonials && testimonials !== null && !loading ? (
                            <ul className='dashboard-box-list'>
                                {filtered && filtered !== null
                                    ? filtered
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((testimonial) => (
                                              <TestimonialItem
                                                  key={testimonial._id}
                                                  testimonial={testimonial}
                                              />
                                          ))
                                    : testimonials
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((testimonial) => (
                                              <TestimonialItem
                                                  key={testimonial._id}
                                                  testimonial={testimonial}
                                              />
                                          ))}
                            </ul>
                        ) : (
                            <Spinning />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
