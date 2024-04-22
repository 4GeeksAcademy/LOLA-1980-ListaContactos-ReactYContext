import React from 'react'
import { Link, useParams } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// Agrega los iconos que necesitas al library
library.add(faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ContactCard = ({ contact }) => {
    const params = useParams();
    console.log(params);

    return (
        <div className='container'>
            <div className='d-flex justify-content-end mb-3'>
                <button className='btn btn-success'>Update contact</button>
            </div>
            <p className='card-text'>El ID que recibi por medio de los params fue: {params.idContact}</p>
            <div className='card py-3 px-5'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-row align-items-center'>
                        <div className='me-5'>
                            <img src={contact.image} alt="Contact" className='rounded-circle' style={{ width: "130px", height: "150px" }} />
                        </div>
                        <div>
                            <h4>{contact.name}</h4>
                            <div>
                                <FontAwesomeIcon icon="location-dot" className='me-3' />
                                <span>{contact.address}</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon="phone-flip" className='me-3' />
                                <span>{contact.phone}</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon="envelope" className='me-3' />
                                <span>{contact.email}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FontAwesomeIcon icon="pencil" className='me-5' />
                        <FontAwesomeIcon icon="trash-can" />
                    </div>
                </div>
            </div>
            <Link to="/">
                <div className='d-flex justify-content-center mb-3'>
                    <button className='btn btn-primaty'>Go Home</button>
                </div>
            </Link>
        </div>
    )
}

//export default ContactCard