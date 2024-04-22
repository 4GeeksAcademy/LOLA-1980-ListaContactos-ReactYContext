import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export const Loading = () => {
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p>Cargando...</p>
        </div>
    )
}

