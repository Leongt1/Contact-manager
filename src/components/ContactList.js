import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

function ContactList(props) {
	const inputRef = useRef("");

	const deleteContactHandler = (id) => {
		props.getContactId(id);
	};

	const renderContactList = props.contacts.map((contact) => {
		return (
			<ContactCard
				contact={contact}
				clickHandler={deleteContactHandler}
				key={contact.id}
			/>
		);
	});

	const getSearchTerm = () => {
    // console.log(inputRef.current.value)
    props.searchKeyword(inputRef.current.value)
  };

	return (
		<div className="main">
			<h2>
				Contact list
				<Link to="/add">
					<button className="ui button blue right">Add Contact</button>
				</Link>
			</h2>
			<div className="ui search">
				<div className="ui icon input">
					<input
            ref={inputRef}
						type="text"
						placeholder="Search Contact"
						className="prompt"
						value={props.term}
						onChange={getSearchTerm}
					/>
					<i className="search icon"></i>
				</div>
			</div>
			<div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No Contacts Found"}</div>
		</div>
	);
}

export default ContactList;
