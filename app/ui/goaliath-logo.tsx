import Image from 'next/image';

export default function Goaliath_Logo () {
return (
    <div> 
        <Image className="h-20 w-20 rotate-[15deg] bg-white"
        src= '/Goaliath_Logo.png'
        height = {240}
        width = {240}
        alt = 'The Goaliath Logo'/>
        <p className="text-[44px]">Goaliath</p>
    </div>
    
       
    
);
}