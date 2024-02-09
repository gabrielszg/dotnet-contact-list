import { Dispatch, SetStateAction, useState } from "react";
import { Contact } from "../lib/contact";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { contactsApiUrl } from "../api/contactsApi";
import { convertDate } from "../lib/utils";
import { FaGlasses } from "react-icons/fa";

interface Props {
    contacts: Array<Contact>,
    setContacts: Dispatch<SetStateAction<Contact[]>>,
    setOnEdit: Dispatch<SetStateAction<Contact | undefined>>
}

export default function Grid({ contacts, setContacts, setOnEdit }: Props) {
    const [nameOrEmailFilter, setNameOrEmailFilter] = useState<string>('');

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLocaleLowerCase().includes(nameOrEmailFilter.toLocaleLowerCase())
        || contact.email.toLocaleLowerCase().includes(nameOrEmailFilter.toLocaleLowerCase())
    )

    console.log(filteredContacts);

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
        <div className="w-full mt-5">
            <h1 className="mb-8 text-xl md:text-2xl">
                Lista de Contatos
            </h1>
            <div className="relative flex flex-1 flex-shrink-0">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    type="search"
                    value={nameOrEmailFilter}
                    onChange={(e) => setNameOrEmailFilter(e.target.value)} />
                
                <FaGlasses className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    type="date"
                    value={undefined}
                    onChange={undefined} />
            </div>

            <table className="hidden min-w-full rounded-md text-gray-900 md:table mt-5">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-3 py-5 font-medium">Nome</th>
                        <th scope="col" className="px-3 py-5 font-medium">Email</th>
                        <th scope="col" className="px-3 py-5 font-medium">Data de Registro</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                    {filteredContacts.map((item) => (
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