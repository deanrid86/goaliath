import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Goaliath_Logo from '../goaliath-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-black-500">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-black-600 p-4 md:h-40"
        href="/"
      >
        <div className=" w-32 text-white md:w-40">
          <Goaliath_Logo/>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-black-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-white bg-black-50 p-3 text-sm font-medium hover:bg-black-600 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
