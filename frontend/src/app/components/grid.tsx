import { Dispatch, SetStateAction } from "react";
import { Contact } from "../lib/contact";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { contactsApiUrl } from "../api/contactsApi";
import { convertDate } from "../lib/utils";
import Search from "./search";

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
        <div className="w-full">
        <h1 className="mb-8 text-xl md:text-2xl">
          Lista de Contatos
        </h1>
        <Search setContacts={setContacts} />
            <table className="hidden min-w-full rounded-md text-gray-900 md:table mt-5">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-3 py-5 font-medium">Nome</th>
                        <th scope="col" className="px-3 py-5 font-medium">Email</th>
                        <th scope="col" className="px-3 py-5 font-medium">Data de Registro</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                    {contacts.map((item, i) => (
                        <tr key={item.id} className="group">
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{item.name}</td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{item.email}</td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{convertDate(item.registrationDate)}</td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm" width="5%">
                                <FaPencil style={{ cursor: "pointer" }} onClick={() => handleEdit(item)} />
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm" width="5%">
                                <FaTrash style={{ cursor: "pointer" }} onClick={() => handleDelete(item.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}