import React from 'react';
import Link from 'react-router-dom/Link';

const NotFound = () => {
    return (
        <div className="text-center">
            <div className="error-template">
                <h1>
                    Oops!</h1>
                <h2>404 Not Found</h2>
                <div className="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                   
                    <Link to={`/`} className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                    Take Me Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound