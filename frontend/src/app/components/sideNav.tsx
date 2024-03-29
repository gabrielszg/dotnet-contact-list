import Link from 'next/link';
import { FaGlobe } from 'react-icons/fa';
import NavLinks from './navLinks';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <FaGlobe className="h-12 w-12 rotate-[15deg]" />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />

                <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block"></div>
            </div>
        </div>
    );
}