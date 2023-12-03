import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
 
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

  const totalPages = await fetchInvoicesPages(query); {/*fetchInvoicesPages returns the total number of pages based on the search query. For example, if there are 12 invoices that match the search query, and each page displays 6 invoices, then the total number of pages would be 2.*/}

  return (
    <div className="w-full"> {/*Div with a full width container*/}
      <div className="flex w-full items-center justify-between"> {/* div element with a combination of flex and width settings, aligning its children in the center and justifying the space between them.*/}
        <h1 className="text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
        </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> {/*Sets the total pages attribute of the pagination component to equal the result from fetchInvoicePages*/}
      </div>
    </div>
  );
}