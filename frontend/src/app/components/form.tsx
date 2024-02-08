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
                <label htmlFor="name">Nome</label>
                <input type="text" required {...register("name", {
                    required: true
                })} />

                <label htmlFor="email">Email</label>
                <input type="email" required {...register("email", {
                    required: "Email é requerido.",
                    pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Email não está correto."
                    }
                })}
                />
                <button type="submit">Adicionar Contato</button>
            </form>
        </div>
    );
}