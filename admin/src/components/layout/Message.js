import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg, type }) => {
    return (
        <div className={`notification ${type} closeable`}>
            <p dangerouslySetInnerHTML={{ __html: msg }}></p>
        </div>
    );
};

Message.propTypes = {
    msg: PropTypes.string.isRequired,
};

export default Message;
