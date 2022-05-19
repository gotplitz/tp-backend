import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerting = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext;

    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div
                key={alert.id}
                className={`snackbar-container snackbar-pos top-center notification closeable ${alert.type}`}
            >
                <p dangerouslySetInnerHTML={{ __html: alert.msg }}></p>
            </div>
        ))
    );
};

export default Alerting;
