import { Dispatch, SetStateAction } from "react";
import { Contact } from "../lib/contact";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { contactsApiUrl } from "../api/contactsApi";
import { convertDate } from "../lib/utils";

interface Props {
    contacts: Array<Contact>,
    setContacts: Dispatch<SetStateAction<Contact[]>>,
    setOnEdit: Dispatch<SetStateAction<Contact | undefined>>
}

export default function Grid({ contacts, setContacts, setOnEdit }: Props) {
    const handleEdit = (item: Contact) => {
        setOnEdit(item);
    };

    const handleDelete = async (id: string) => {
        await fetch(`${contactsApiUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                const newArray = contacts.filter((contact) => contact.id !== id)
                setContacts(newArray);
            })
            .then(() => alert('Contato excluído com sucesso!'))
            .catch((error) => alert('Erro ao cadastrar contato!'));

        setOnEdit(undefined);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((item, i) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{convertDate(item.registrationDate)}</td>
                            <td width="5%">
                                <FaPencil style={{ cursor: "pointer" }} onClick={() => handleEdit(item)} />
                            </td>
                            <td width="5%">
                                <FaTrash style={{ cursor: "pointer" }} onClick={() => handleDelete(item.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}