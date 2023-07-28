import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import uuid from "react-native-uuid";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContacts from "./AddContacts";
// import ClassAddContacts from './ClassAddContactsAddContacts'
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";

function App() {
	const LOCAL_STORAGE_KEY = "contacts";
	const [contacts, setContacts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	// Retrieve Contacts from JSON Server
	const retrivedContacts = async () => {
		const response = await api.get("/contacts");
		return response.data;
	};

	const addContactHandler = async (contact) => {
		// console.log(contact)
		const request = {
			id: uuid.v4(),
			...contact,
		};

		// adding from json server
		const response = await api.post("/contacts", request);
		setContacts([...contacts, response.data]);

		setContacts([...contacts, { id: uuid.v4(), ...contact }]); // used to add a uninque id with every addition of contact
	};

	const updateContactHandler = async ({ id, name, email }) => {
		const response = await api.put(`/contacts/${id}`, { id, name, email });
		const newData = response.data;
		setContacts(
			contacts.map((contact) => {
				return contact.id === newData.id ? { ...newData } : contact;
			})
		);
	};

	const removeContactHandler = async (id) => {
		await api.delete(`/contacts/${id}`);

		const newContactList = contacts.filter((contact) => {
			return contact.id !== id; // returns all the contacts who's id is not equal to the id given in the parameter
		});

		setContacts(newContactList);
	};

	const searchHandler = (searchTerm) => {
		setSearchTerm(searchTerm);
		if (searchTerm !== "") {
			const newContactList = contacts.filter((contact) => {
				return Object.values(contact)
					.join("")
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			});
      setSearchResults(newContactList)
		} else {
      setSearchResults(contacts)
    }
	};

	useEffect(() => {
		// retriving the contacts from the local storage and displaying it onto the screen making it persist from refreshing the screen.
		// const retrivedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		// if(retrivedContacts) setContacts(retrivedContacts)

		// not from local storage, rather from json server
		const getAllContacts = async () => {
			const allContacts = await retrivedContacts();
			if (allContacts) setContacts(allContacts);
		};

		getAllContacts();
	}, []);

	useEffect(() => {
		// storing the contacts array in the local storage so that refreshing the page does not delete the contacts listed
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
	}, [contacts]);

	return (
		<div className="ui container">
			<Router>
				<Header />
				<Routes>
					<Route
						path="/"
						// render={(props) => (
						//   <ContactList
						//     {...props}
						//     contacts={contacts}
						//     getContactId={removeContactHandler}
						//   />)}
						element={
							<ContactList
								contacts={searchTerm.length < 1 ? contacts : searchResults}
								getContactId={removeContactHandler}
								term={searchTerm}
								searchKeyword={searchHandler}
							/>
						}
					/>
					<Route
						path="/add"
						// render={(props) => (
						//   <AddContacts
						//     {...props}
						//     addContactHandler={addContactHandler}
						//   />
						// )}
						element={<AddContacts addContactHandler={addContactHandler} />}
					/>
					<Route path={"/contact/:id"} element={<ContactDetails />} />

					{/* <Route
            path={'/contact/delete/:id'}
            element={ <DeleteContact /> }
          /> */}

					<Route
						path="/edit"
						element={
							<EditContact updateContactHandler={updateContactHandler} />
						}
					/>
				</Routes>

				{/* <AddContacts addContactHandler={addContactHandler} /> */}
				{/* <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
			</Router>
		</div>
	);
}

export default App;
