import { useEffect, useState } from "react";
import Form from "../components/form";
import Grid from "../components/grid";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getContacts = async (): Promise<void> => {
        const response = await fetch('http://localhost:5143/api/contacts');
        const data = await response.json();
        setContacts(data);
    }

    useEffect(() => {
        getContacts();
    }, [setContacts]);

    return (
        <>
            <Form onEdit={onEdit} setOnEdit={setOnEdit} getContacts={getContacts} />
            <Grid contacts={contacts} setContacts={setContacts} setOnEdit={setOnEdit} />
        </>
    );
}