

import Pagination from '@/app/ui/lessons/pagination';
import Search from '@/app/ui/lessons/search';
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
      <div className="mx-auto max-w-4xl p-4">
                <h1 className="text-3xl font-bold text-center">Your Life Lessons</h1>
                <p className="mt-4 text-lg text-gray-600">
                Lessons learned from our experiences, readings, and the wisdom of others form an invaluable part of
                 our personal and professional growth. On this page, you can catalog and revisit the key lessons youve 
                 gathered from a variety of sources like books, podcasts, seminars, and life experiences. Each entry serves 
                 as a building block for your understanding and decision-making processes. By integrating these lessons 
                 into your daily actions, you reinforce and apply your knowledge consistently, turning insight into habitual wisdom. 
                 Whether youre reflecting on past lessons or planning future endeavors, this repository is designed to keep your 
                 valuable learnings accessible and top of mind.
                </p>
            </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 p-2">
        <Search placeholder="Search lessons..." />
        <CreateLesson />
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