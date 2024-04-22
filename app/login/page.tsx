import Goaliath_Logo from '../ui/goaliath-logo';
import LoginForm from '@/app/ui/login-form';
import Link from 'next/link'; // Import the Link component from next/link

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col items-center justify-center p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-black-500 p-3 md:h-36 overflow-hidden">
          <div className="text-white">
            <Goaliath_Logo />
          </div>
        </div>
        <div className="w-full">
          <LoginForm />
        </div>
        <div className="mt-4 text-center">
          <p>
            Dont have an account with us? {' '}
            <Link className="text-green-300 hover:text-green-400" href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
