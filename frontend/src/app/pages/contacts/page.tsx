import Contacts from "./contacts";

export default function Page() {
    return (
        <div>
            <div className="border-b-2 mb-5">
                <h1 className="mb-2 text-xl md:text-2xl">Cadastro de Contato</h1>
            </div>

            <Contacts />
        </div>
    );
}