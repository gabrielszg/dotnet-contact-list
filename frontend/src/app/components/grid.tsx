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
    const [nameFilter, setNameFilter] = useState<string>('');
    const [emailFilter, setEmailFilter] = useState<string>('');
    const [registrationDateFilter, setRegistrationDateFilter] = useState<string>('');

    const filteredContacts = contacts.filter(contact => {
        const nomeFilterLowerCase = nameFilter.toLowerCase();
        const emailFilterLowerCase = emailFilter.toLocaleLowerCase();

        if ((nameFilter
            && !contact.name
                .toLowerCase()
                .includes(nomeFilterLowerCase))) {
            return false;
        }

        if ((emailFilter
            && !contact.email
                .toLowerCase()
                .includes(emailFilterLowerCase))) {
            return false;
        }

        if (registrationDateFilter) {
            const dataFiltroObjeto = new Date(registrationDateFilter);
            const registrationDate = new Date(contact.registrationDate);
            if (
                registrationDate.getDate() !== dataFiltroObjeto.getDate() + 1
                || registrationDate.getMonth() !== dataFiltroObjeto.getMonth()
                || registrationDate.getFullYear() !== dataFiltroObjeto.getFullYear()
            ) {
                return false;
            }
        }
        return true;
    });

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
            <div className="border-b-2 mb-5">
                <h1 className="mb-2 text-xl md:text-2xl">
                    Lista de Contatos
                </h1>
            </div>
            <div className="relative flex flex-1 flex-shrink-0">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    type="search"
                    value={nameFilter}
                    placeholder="Filtrar por nome"
                    onChange={(e) => setNameFilter(e.target.value)} />

                <FaGlasses className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    type="search"
                    value={emailFilter}
                    placeholder="Filtrar por email"
                    onChange={(e) => setEmailFilter(e.target.value)} />

                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                    type="date"
                    pattern="[0-9]{4}/[0-9]{2}/[0-9]{2}"
                    value={registrationDateFilter}
                    onChange={(e) => setRegistrationDateFilter(e.target.value)} />
            </div>

            <table className="hidden min-w-full rounded-md text-gray-900 md:table mt-5">
                <thead className="rounded-md bg-gray-100 text-left text-sm font-normal">
                    <tr>
                        <th
                            scope="col"
                            className="px-3 py-5 font-medium">
                            Nome
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-5 font-medium">
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-5 font-medium">
                            Data de Registro
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                    {filteredContacts.map((item) => (
                        <tr
                            key={item.id}
                            className="group">
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                {item.name}
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                {item.email}
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                {convertDate(item.registrationDate)}
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                <div className="flex flex-row justify-around">
                                    <FaPencil
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleEdit(item)} />

                                    <FaTrash
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDelete(item.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}