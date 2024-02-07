import { Dispatch, SetStateAction } from "react";

interface Props {
    contacts: never[],
    setContacts: Dispatch<SetStateAction<never[]>>,
    setOnEdit: Dispatch<SetStateAction<null>>
}

export default function Grid({ contacts, setContacts, setOnEdit }: Props) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Teste</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}