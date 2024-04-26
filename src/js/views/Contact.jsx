import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// Agrega los iconos que necesitas al library
library.add(faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Loading } from "../component/Loading.jsx";


export const Contact = () => {
    //LOGICA
    const contactURL = "https://playground.4geeks.com/contact/agendas/"

    const { store, actions } = useContext(Context); // Obtén el estado global y las acciones del contexto

    const [contacts, setContacts] = useState([]); // Define un estado local para los contactos

    /*const getContact = () => {
            fetch(contactURL + 'Lola1980/')
                .then(response => response.json())
                .then(data => {
                    console.log(data.contacts); // Verifica el valor de data.contacts
                    setContacts(data.contacts);
                    console.log(contacts); // Verifica el estado contacts después de actualizarlo
                })
                .catch(error => console.error("Error al obtener contactos:", error));
        };*/

    /*const deleteContact = index => {
        //Obtener el ID del TODO a eliminar
        const contactId = contacts[index].id;
        //Realizar la solicitud DELETE a la API
        fetch(contactURL + 'Lola1980/contacts/' + contactId, {
            method: "DELETE"
        })
            .then(response => {
                //Verificar si la solicitud fue exitosa
                if (!response.ok) {
                    throw new Error("Error al eliminar el TODO")
                }
                //Actualizar el estado eliminando el TODO del array
                setContacts(contacts.filter((_, idx) => idx !== index));
                console.log("Contact eliminado exitosamente");
            })
            .catch(error => console.log("Error al eliminar el TODO:", error));
    };*/

    useEffect(() => {
        actions.getContact();
        console.log(store.contacts); // Imprime los contactos en la consola
        //getContact();
    }, []);

    const deleteContact = index => {
        actions.deleteContact(index);
    };



    return (
        <div className='container'>
            <div className='d-flex justify-content-end mb-3'>
                <Link to="/AddContact">
                    <button className='btn btn-success'>Add new contact</button>
                </Link>

            </div>

            <div>
                {/* Verificar si contacts está vacío antes de mapearlo */}
                {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                    store.contacts.filter(contact => Object.keys(contact).length > 0)
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
                                        <Link to={`/EditContact/${contact.id}`}>
                                            <FontAwesomeIcon icon="pencil" className='me-5' />
                                        </Link>
                                        <FontAwesomeIcon icon="trash-can" onClick={() => deleteContact(index)} />
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

