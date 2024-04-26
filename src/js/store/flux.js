const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			newContactLabels:{ name: "", phone: "", email: "", address: "" },
			
			contacts: [], // Agrega un array vacío para almacenar los contactos

			contactDetails: {} // Agrega un objeto vacío para almacenar los detalles del contacto
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: function ()  {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			 addContact: (contact) => {
				const contactURL = "https://playground.4geeks.com/contact/agendas/Lola1980/contacts";
				fetch(contactURL, {
					method: "POST",
					body: JSON.stringify(contact),
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
						//setNewContactLabels({ name: "", phone: "", email: "", address: "" });
						setStore({newContactLabels:data}) 
					})
					.catch(error => console.error("Error añadido:", error));
			},

			getContact: () => {
				const contactURL = "https://playground.4geeks.com/contact/agendas/"
                fetch(contactURL + 'Lola1980/')
                    .then(response => response.json())
                    .then(data => {
                        setStore({ contacts: data.contacts });
                    })
                    .catch(error => console.error("Error al obtener contactos:", error));
            },

			// Agrega un método para eliminar un contacto
            deleteContact: index => {
				//Obtener el ID del TODO a eliminar
                const contactId = getStore().contacts[index].id;
				const contactURL = "https://playground.4geeks.com/contact/agendas/"
                fetch(contactURL + 'Lola1980/contacts/' + contactId, {
                    method: "DELETE"
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error al eliminar el contacto");
                        }
                        const updatedContacts = getStore().contacts.filter((_, idx) => idx !== index);
                        setStore({ contacts: updatedContacts });
                        console.log("Contacto eliminado exitosamente");
                    })
                    .catch(error => console.error("Error al eliminar el contacto:", error));
            },

			 //Realizar la solicitud PUT a la API
			updateContact: (id, updatedContact) => {
				const contactURL = "https://playground.4geeks.com/contact/agendas/"
				fetch(contactURL + 'Lola1980/contacts/' + id, {
					method: "PUT",
					body: JSON.stringify(updatedContact),
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
			},

		}
	};
};

export default getState;
