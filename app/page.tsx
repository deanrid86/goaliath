import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Goaliath_Logo from './ui/goaliath-logo-main';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-black-500">
      
        <Goaliath_Logo />
      
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-black-500 px-6 py-10 md:w-2/5 md:px-20">
  <p className="text-xl text-green-400 md:text-3xl md:leading-normal ">
    <strong>Welcome to Goaliath</strong> 
  </p>
  <p className="text-xl text-green-400 md:text-3xl md:leading-normal ">Tools to Conquer your Goals</p>
  <Link
    href="/login"
    className="flex items-center gap-5 self-start rounded-lg bg-purple-700 px-6 py-3 text-sm font-medium text-green-400 transition-colors hover:bg-greenblue-400 md:text-base"
  >
    <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
  </Link>
</div>
       
      </div>
    </main>
  );
}
