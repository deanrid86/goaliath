'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'; {/*usePathname and useRouter take the result of params to update the URL*/ }
import { useDebouncedCallback } from 'use-debounce';
 
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); {/*useSearchParams reads the current URLs query string (anything after the question mark. Key:value pair that is used as a parameter for the search). For example ?time=morning*/}
  const pathname = usePathname(); {/*Reads the current URL pathname*/}
  const { replace } = useRouter(); {/*Allows you to programmatically change a clients URL routes*/}

  
    const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams); {/*New object called params that createsd a new URL parameters using the usesearch params information. If the term is typd in i.e "dean", then this sets query=dean. If nothing is typed in the search, then the program deletes the query*/}
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`); {/*replace becomes the current URL of the page and adds the param that you typed into the search (i.e dean)*/}
  }, 300);

 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-purple-700 focus:outline-none focus:ring focus:ring-purple-700"
        placeholder={placeholder} /*This takes the argument inside the search function as the placeholder for the input tag*/
        onChange={(e) => {
          handleSearch(e.target.value); {/*e for event meansx that whenever there is an event i.e a key pressed, the onChange function records the event that took place, where it took place(target (i.e. input box)) and it's value (the thing you started typing or clicked etc).*/}
        }}
        defaultValue={searchParams.get('query')?.toString()} /*Sets he defualy value of the input box to be what searchParams has as its default.*/
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}