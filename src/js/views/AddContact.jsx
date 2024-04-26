import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
    //const contactURL = "https://playground.4geeks.com/contact/agendas/Lola1980/contacts";

    const { store, actions } = useContext(Context);

    const [newContactLabels, setNewContactLabels] = useState({ name: "", phone: "", email: "", address: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContactLabels(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /*const addContact = () => {
        fetch(contactURL, {
            method: "POST",
            body: JSON.stringify(newContactLabels),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add contact");
                }
                return response.json();
            })
            .then(data => {
                console.log("Nuevo Contacto añadido:", data);
                // Limpiar el Input después de una respuesta exitosa
                setNewContactLabels({ name: "", phone: "", email: "", address: "" });
            })
            .catch(error => console.error("Error añadido:", error));
    };*/

    const handleSave = (e) => {
        e.preventDefault(); // Evita que se realice la acción por defecto del formulario (enviarlo)
        actions.addContact(newContactLabels);
        // Limpiar el Input después de una respuesta exitosa
        setNewContactLabels({ name: "", phone: "", email: "", address: "" });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center fw-bold mb-3">Add a new contact</h1>
            <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-12">
                    <label htmlFor="validationCustom01" className="form-label fw-bold">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        name="name"
                        placeholder="Full Name"
                        value={newContactLabels.name}
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
                        value={newContactLabels.email}
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
                        value={newContactLabels.phone}
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
                        value={newContactLabels.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <button className="btn btn-primary" style={{ width: "100%" }} type="submit" onClick={handleSave}>Save</button>
                </div>
                <Link to="/Contact">
                    <span className="text-primary fw-bold">or get back to contacts</span>
                </Link>
            </form>
        </div>
    );
};
