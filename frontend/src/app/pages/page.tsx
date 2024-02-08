import Contacts from "./contacts";

export default function Page() {
    return (
        <div>
            <div className="border-b-2 mb-5" >
                <h1>Cadastro de Contato</h1>
            </div>

            <Contacts />;
        </div>
    );
}