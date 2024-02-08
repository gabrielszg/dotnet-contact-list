'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaGlasses } from 'react-icons/fa6';
import { useDebouncedCallback } from 'use-debounce';
import { Contact } from '../lib/contact';
import { contactsApiUrl } from '../api/contactsApi';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setContacts: Dispatch<SetStateAction<Contact[]>>
}

export default function Search({ setContacts }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string, input: string) => {
    const params = new URLSearchParams(searchParams);

    let nameFilter;
    let emailFilter;
    let registrationDateFilter;
    
    if (term && input === 'name') {
      nameFilter = term;
      params.set('name', term);
    } else if (term && input === 'email') {
      emailFilter = term;
      params.set('email', term);
    } else if (term && input === 'registrationDate') {
      registrationDateFilter = term;
      params.set('registrationDate', term);
    } else {
      params.delete('name');
      params.delete('email');
      params.delete('registrationDate');
    }
    replace(`${pathname}?${params.toString()}`);

    // TODO: chamar funcao handleFilter 
  }, 300);

  const handleFilter = async (name: string, email: string, registrationDate: string) => {
    const urlFilter = `${contactsApiUrl}/filter?name=${name}&email=${email}&registrationDate=${registrationDate}`
    const response = await fetch(urlFilter);
    const data: Contact[] = await response.json();
    setContacts(data);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Nome"
        onChange={(e) => {
          handleSearch(e.target.value, 'name');
        }}
        defaultValue={searchParams.get('name')?.toString()}
      />
      
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Email"
        onChange={(e) => {
          handleSearch(e.target.value, 'email');
        }}
        defaultValue={searchParams.get('email')?.toString()}
      />

      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Data de Cadastro"
        onChange={(e) => {
          handleSearch(e.target.value, 'registrationDate');
        }}
        defaultValue={searchParams.get('registrationDate')?.toString()}
      />
      <FaGlasses className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
