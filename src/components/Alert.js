import React, { useEffect, useState } from 'react';
// import React from 'react'

const Alert = (props) => {
    const [isAlertVisible, setIsAlertVisible] = useState(true);

    useEffect(() => {
        // Set showAlert to false after 2 seconds
        const timer = setTimeout(() => { setIsAlertVisible(false) }, props.timeout)
    });

    return (
        <div className="con">
            {isAlertVisible &&
                <div className="alert alert-primary" role="alert" id='myDiv'>
                    {props.message}
                </div>}
        </div>
    )
}



export default Alert
