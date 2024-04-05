import { fetchMentalModelPages } from "@/app/lib/data";
import Pagination from "@/app/ui/goals/pagination";
import MentalModelsTable from "@/app/ui/mentalmodels/table";
import Search from "@/app/ui/search";

export default async function Page ({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

    const query = searchParams?.query || ''; {/*query is eith whatever query has been entered or a blank string if nothing has been entered*/}
  const currentPage = Number(searchParams?.page) || 1; {/*page number is the one you are curretnly on. If no page number is returned then programme assumes it is 1*/}

  const totalPages = await fetchMentalModelPages(query); {/*fetchInvoicesPages returns the total number of pages based on the search query. For example, if there are 12 invoices that match the search query, and each page displays 6 invoices, then the total number of pages would be 2.*/}
    return (
        <div>
            <div className="mx-auto max-w-4xl p-4">
                <h1 className="text-3xl font-bold text-center">Your Goals</h1>
                <p className="mt-4 text-lg text-gray-600">
                On this page, you will find a comprehensive table displaying all of your goals. Each entry is not just a statement of intent but a 
                gateway to deeper insights. By clicking on  goal details, you will be able to explore the specific steps that have been created to 
                achieve it, alongside relevant metrics that track your progress. This functionality is designed to provide you with a clear overview 
                and actionable insights, making your journey towards your goals as informed and supported as possible.
                </p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search for mental models..." />
            </div>
                {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>*/}
                <MentalModelsTable query={query} currentPage={currentPage} />
               {/*</Suspense>*/}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} /> {/*Sets the total pages attribute of the pagination component to equal the result from fetchInvoicePages*/}
            </div>
        </div>
    );
}