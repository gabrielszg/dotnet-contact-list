'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { Contact } from "../lib/contact";
import { Dispatch, SetStateAction, useEffect } from "react";
import { contactsApiUrl } from "../api/contactsApi";

interface Props {
    onEdit: Contact | undefined,
    setOnEdit: Dispatch<SetStateAction<Contact | undefined>>,
    getContacts: any
}

export default function Form({ onEdit, setOnEdit, getContacts }: Props) {
    const { register, handleSubmit, setValue, getValues, reset } = useForm<Contact>();

    const onSubmit: SubmitHandler<Contact> = async (data) => {
        if (onEdit) {
            await fetch(`${contactsApiUrl}/${onEdit.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: getValues().name,
                    email: getValues().email,
                    registrationDate: onEdit.registrationDate
                }),
            })
                .then((response) => response.json)
                .then(() => alert('Contato atualizado com sucesso!'))
                .catch((error) => alert('Erro ao atualizar contato!'));

            setOnEdit(undefined);
            getContacts();
            reset();
        } else {
            await fetch(contactsApiUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json)
                .then(() => alert('Contato cadastrado com sucesso!'))
                .catch((error) => alert('Erro ao cadastrar contato!'));

            setOnEdit(undefined);
            getContacts();
            reset();
        }
    };

    useEffect(() => {
        if (onEdit) {
            setValue('name', onEdit.name);
            setValue('email', onEdit.email);
        }
    }, [onEdit]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <div className="mb-4">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            required
                            className="peer block w-100 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            {...register("name", {
                                required: true
                            })}
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            className="peer block w-100 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            {...register("email", {
                                required: "Email é requerido.",
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "Email não está correto."
                                }
                            })}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded">
                            {onEdit ? 'Atualizar Contato'  : 'Adicionar Contato'} 
                        </button>

                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded">
                            Limpar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}