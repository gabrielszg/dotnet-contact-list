'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { Contact } from "../lib/contact";
import { Dispatch, SetStateAction } from "react";

interface Props {
    onEdit: null,
    setOnEdit: Dispatch<SetStateAction<null>>,
    getContacts: any
}

export default function Form({ onEdit, setOnEdit, getContacts }: Props) {
    const { register, handleSubmit } = useForm<Contact>();

    const onSubmit: SubmitHandler<Contact> = async (data) => {
        if (onEdit) {
            fetch(`http://localhost:5143/api/contacts`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json)
                .then(() => alert('Contato cadastrado com sucesso!'))
                .catch((error) => alert('Erro ao cadastrar contato!'));

            setOnEdit(null);
            getContacts();
        } else {
            fetch('http://localhost:5143/api/contacts', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json)
                .then(() => alert('Contato cadastrado com sucesso!'))
                .catch((error) => alert('Erro ao cadastrar contato!'));

            setOnEdit(null);
            getContacts();
        }


    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Nome</label>
                <input {...register("name")} />

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