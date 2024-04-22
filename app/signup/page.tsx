import React from "react";
import { SignupForm } from "../ui/signupform";
import Goaliath_Logo from '../ui/goaliath-logo';

export default function Page () {
    return (
        <main className="flex flex-col items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col items-center justify-center p-4 md:-mt-32">
          <div className="flex h-20 w-full items-center justify-center rounded-lg bg-black-500 p-3 md:h-36 overflow-hidden">
            <div className="text-white">
              <Goaliath_Logo />
            </div>
          </div>
          <div className="w-full">
                <SignupForm />
            </div>
            
        </div>
        </main>
    );

}