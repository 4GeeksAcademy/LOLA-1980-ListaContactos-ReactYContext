import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// Agrega los iconos que necesitas al library
library.add(faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrashCan);


export const EditContact = () => {

    const contactURL = "https://playground.4geeks.com/contact/agendas/";

    const { idContact } = useParams(); // Obtener el id del contacto de la URL

    const { store, actions } = useContext(Context);

    // Inicializa el estado contacts con un objeto vacío
    const [contacts, setContacts] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setContacts({
            ...contacts,
            [name]: value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault(); // Evita que se realice la acción por defecto del formulario (enviarlo)
        actions.updateContact(idContact, contacts); // Llama al método updateContact del contexto
        //updateContact();
    };

    const fetchContactDetails = () => {
        fetch(contactURL + 'Lola1980/')
            .then(response => response.json())
            .then(data => {
                const contact = data.contacts.find(contact => contact.id === parseInt(idContact));
                if (contact) {
                    // Actualiza el estado con los detalles del contacto
                    setContacts(contact);
                } else {
                    throw new Error('User not found');
                }
            })
            .catch(error => console.error("Error al obtener los detalles del contacto:", error));
    };

    useEffect(() => {
        // Llama a una función que obtenga los detalles del contacto por su ID
        fetchContactDetails(idContact);
    }, [idContact]);



    //Realizar la solicitud PUT a la API
    /*const updateContact = () => {
        fetch(contactURL + 'Lola1980/contacts/' + idContact, {
            method: "PUT",
            body: JSON.stringify(contacts),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(response => {
                console.log('Contacto actualizado con éxito:', response);
                // Redirecciona de vuelta a la lista de contactos después de la edición
                window.location.href = "/Contact";
            })
            .catch(error => console.log('Error al actualizar el contacto:', error));
    };*/



    return (
        <div className="container mt-5">
            <h1 className="text-center fw-bold mb-3">Update a contact</h1>
            <form className="row g-3">
                <div className="col-md-12">
                    <label htmlFor="validationCustom01" className="form-label fw-bold">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        name="name"
                        placeholder="Full Name"
                        value={contacts.name || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <label htmlFor="validationCustom02" className="form-label fw-bold">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        name="email"
                        placeholder="Email"
                        value={contacts.email || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <label htmlFor="validationCustom03" className="form-label fw-bold">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom03"
                        name="phone"
                        placeholder="Phone"
                        value={contacts.phone || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <label htmlFor="validationCustom04" className="form-label fw-bold">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom04"
                        name="address"
                        placeholder="Address"
                        value={contacts.address || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <button className="btn btn-primary" style={{ width: "100%" }} type="submit" onClick={handleUpdate}>Update Contact</button>
                </div>
                <Link to="/Contact">
                    <span className="text-primary fw-bold">or get back to contacts</span>
                </Link>
            </form>
        </div>
    )
};

