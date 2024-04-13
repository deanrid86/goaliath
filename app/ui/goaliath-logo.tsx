import Image from 'next/image';

export default function Goaliath_Logo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black-500"> 
      <div className="h-20 w-20 relative">
        <Image
          src='/modellogos/GoaliathLogoG.png'
          layout="fill"
          objectFit="contain"
          alt='The Goaliath Logo'
        />
      </div>
      <p className="text-[44px] text-center">Goaliath</p>
    </div>
  );
}