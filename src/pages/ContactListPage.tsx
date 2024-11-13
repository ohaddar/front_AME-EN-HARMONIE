import axios from "axios";
import { useEffect, useState } from "react";
import "../ContactListPage.css";
import { Contact } from "../types/types";

const ContactListPage = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/contact/all");
        setContactList(response.data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contact-list-page">
      <h1 className="page-title">Contact List</h1>
      {contactList && contactList.length > 0 ? (
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Prenom</th>
              <th>Objet</th>
              <th>Sujet</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.email}</td>
                <td>{item.prenom}</td>
                <td>{item.objet}</td>
                <td>{item.sujet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-contacts-message">No contacts found</p>
      )}
    </div>
  );
};

export default ContactListPage;
