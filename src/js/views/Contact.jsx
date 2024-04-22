import React, { useState, useEffect } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// Agrega los iconos que necesitas al library
library.add(faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Loading } from "../component/Loading.jsx";
//import { ContactCard } from '../component/ContactCard.jsx'

export const Contact = () => {
    //LOGICA
    const contactURL = "https://playground.4geeks.com/contact/"

    const [contacts, setContacts] = useState([]);

    const getContact = () => {
        fetch(contactURL + 'agendas/Lola1980/')
            .then(response => response.json())
            .then(data => {
                console.log(data.contacts); // Verifica el valor de data.contacts
                setContacts(data.contacts);
                console.log(contacts); // Verifica el estado contacts después de actualizarlo
            })
            .catch(error => console.error("Error al obtener contactos:", error));
    };

    useEffect(() => {
        getContact();
    }, []);

    return (
        <div className='container'>
            <div className='d-flex justify-content-end mb-3'>
                <Link to="/AddContact">
                    <button className='btn btn-success'>Add new contact</button>
                </Link>

            </div>

            <div>
                {/* Verificar si contacts está vacío antes de mapearlo */}
                {Array.isArray(contacts) && contacts.length > 0 ? (
                    contacts.filter(contact => Object.keys(contact).length > 0)
                        .map((contact, index) => (
                            <div key={index} className='card py-3 px-5'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div className='me-5'>
                                            <img src="https://i.pinimg.com/736x/74/f7/7c/74f77c0410f3aa6be79bda7976e0ed8e.jpg" alt=""
                                                className='rounded-circle'
                                                style={{ width: "130px", height: "150px" }}
                                            />
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
                        ))

                ) : (
                    <Loading />
                )}
            </div>

        </div>
    )

}

