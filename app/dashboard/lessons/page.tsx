"use client";

import Pagination from '@/app/ui/lessons/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/lessons/table';
import { CreateLesson } from '@/app/ui/lessons/buttons';
import { Suspense } from 'react';
import { fetchLessonsPages } from '@/app/lib/data';


 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || ''; {/*query is eith whatever query has been entered or a blank string if nothing has been entered*/}
  const currentPage = Number(searchParams?.page) || 1; {/*page number is the one you are curretnly on. If no page number is returned then programme assumes it is 1*/}

  const totalPages = await fetchLessonsPages(query); {/*fetchInvoicesPages returns the total number of pages based on the search query. For example, if there are 12 invoices that match the search query, and each page displays 6 invoices, then the total number of pages would be 2.*/}


  return (
    <div className="w-full"> {/*Div with a full width container*/}
      <div className="flex w-full items-center justify-between p-2"> {/* div element with a combination of flex and width settings, aligning its children in the center and justifying the space between them.*/}
        <h1 className="text-2xl text-white ">Lessons</h1>
      </div>
      <div>
        <h2 className='text-white text-xl bg-black-300 rounded-xl p-2'>Search for a lesson you have learned from a book or other resource</h2>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 p-2">
        <Search placeholder="Search lessons..." />
        <CreateLesson />
      </div>
      <div>
        <h2 className='text-white text-xl bg-black-300 rounded-xl p-2'>My Lesson List</h2>
      </div>
        <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
        </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> {/*Sets the total pages attribute of the pagination component to equal the result from fetchInvoicePages*/}
      </div>
    </div>
  );
}