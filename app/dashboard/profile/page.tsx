
import Link from 'next/link';
import {
    CalendarDaysIcon,
    ChatBubbleBottomCenterTextIcon,
    FaceSmileIcon,
    FilmIcon,
    FingerPrintIcon,
    HeartIcon,
    IdentificationIcon,
    LightBulbIcon,
    LinkIcon,
    MegaphoneIcon,
    TagIcon,
    TrophyIcon,
    UserIcon,
    WrenchIcon
    
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createUserProfile } from '@/app/lib/actions';


export default function Page () {
  return (
<div>
    <h1 className = "flex justify-center p-2 ">
        My Profile
    </h1>
    <form action={createUserProfile}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
       {/* First Name */}
       <div className="mb-4">
          <label htmlFor="firstname" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="firstname"
                name="firstname"
                placeholder="firstname "
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Middle Name */}
       <div className="mb-4">
          <label htmlFor="middlenames" className="mb-2 block text-sm font-medium">
            Middle Names
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="middlenames"
                name="middlenames"
                placeholder="middlenames "
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Surname */}
       <div className="mb-4">
          <label htmlFor="surname" className="mb-2 block text-sm font-medium">
            Surname
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="surname"
                name="surname"
                placeholder="surname "
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="mb-2 block text-sm font-medium">
            Date of Birth
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="date"
                id="dob"
                name="dob"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

         {/* Gender */}
<div className="mb-4">
  <label className="mb-2 block text-sm font-medium">
    Gender
  </label>
  <div className="mt-2">
    <div className="flex items-center mb-2">
      <input
        id="genderMale"
        name="gender"
        type="radio"
        value="Male"
        className="peer mr-2"
      />
      <label htmlFor="genderMale" className="text-sm font-medium">Male</label>
    </div>
    <div className="flex items-center mb-2">
      <input
        id="genderFemale"
        name="gender"
        type="radio"
        value="Female"
        className="peer mr-2"
      />
      <label htmlFor="genderFemale" className="text-sm font-medium">Female</label>
    </div>
    <div className="flex items-center mb-2">
      <input
        id="genderNonBinary"
        name="gender"
        type="radio"
        value="Non-binary"
        className="peer mr-2"
      />
      <label htmlFor="genderNonBinary" className="text-sm font-medium">Non-binary</label>
    </div>
    <div className="flex items-center mb-2">
      <input
        id="genderOther"
        name="gender"
        type="radio"
        value="Other"
        className="peer mr-2"
      />
      <label htmlFor="genderOther" className="text-sm font-medium">Other (please specify)</label>
    </div>
    <div className="flex items-center mb-2">
      <input
        id="genderPreferNotToSay"
        name="gender"
        type="radio"
        value="Prefer not to say"
        className="peer mr-2"
      />
      <label htmlFor="genderPreferNotToSay" className="text-sm font-medium">Prefer not to say</label>
    </div>
  </div>
</div>

        {/* Occupation */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Occupation
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="Occupation"
                name="Occupation"
                placeholder="Enter Occupation Type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <WrenchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

       {/* A little about you */}
<div className="mb-4">
  <label htmlFor="about" className="mb-2 block text-sm font-medium">
    A little about you
  </label>
  <div className="relative mt-2 rounded-md">
    <textarea
      id="about"
      name="about"
      placeholder="Tell us a little about yourself..."
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-2 placeholder:text-gray-500"
       // Defines the number of lines that will be visible without scrolling
      style={{ resize: 'vertical' }}  // Allows the user to resize the textarea vertically
    ></textarea>
    <MegaphoneIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
  </div>
</div>
        {/* Interests and Hobbies */}
        <div className="mb-4">
  <label htmlFor="about" className="mb-2 block text-sm font-medium">
    Interests and Hobbies
  </label>
  <div className="relative mt-2 rounded-md">
    <textarea
      id="interests"
      name="interests"
      placeholder="What are your hobbies and interests"
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-2 placeholder:text-gray-500"
       // Defines the number of lines that will be visible without scrolling
      style={{ resize: 'vertical' }}  // Allows the user to resize the textarea vertically
    ></textarea>
    <HeartIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
  </div>
</div>


         {/* Where/what do you want to be in 5 years? */}
         <div className="mb-4">
  <label htmlFor="about" className="mb-2 block text-sm font-medium">
    Where/what would you like to be in 5 years?
  </label>
  <div className="relative mt-2 rounded-md">
    <textarea
      id="ambition"
      name="ambition"
      placeholder="What are your future ambitions?"
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-2 placeholder:text-gray-500"
       // Defines the number of lines that will be visible without scrolling
      style={{ resize: 'vertical' }}  // Allows the user to resize the textarea vertically
    ></textarea>
    <TrophyIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
  </div>
</div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/profile"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button className="bg-teal-300 text-orange-300 hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-500" type="submit">Submit</Button>
      </div>
    </form>
    </div>
  );
}
