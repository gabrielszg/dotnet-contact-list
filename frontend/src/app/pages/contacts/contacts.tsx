'use client'
import { useEffect, useState } from "react";
import Form from "@/app/components/form";
import Grid from "@/app/components/grid";
import { Contact } from "@/app/lib/contact";
import { contactsApiUrl } from "@/app/api/contactsApi";

export default function Contacts() {
    const [contacts, setContacts] = useState(Array<Contact>);
    const [onEdit, setOnEdit] = useState<Contact | undefined>();

    const getContacts = async () => {
        const response = await fetch(contactsApiUrl);
        const data: Contact[] = await response.json();
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