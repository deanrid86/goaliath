import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';

import { fetchFilteredMentalModels } from '@/app/lib/data';
import { MentalModelDetail } from './buttons';

export default async function MentalModelsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const mentalmodels = await fetchFilteredMentalModels(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {mentalmodels?.map((model) => (
              <div
                key={model.modelid}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src= {model.imageurl}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${model.modelname}'s profile picture`}
            />
                      <p>{model.modelname}</p>
                    </div>
                    <p className="text-sm text-gray-500">{model.category}</p>
                  </div>
                  <p>{model.subcategory}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                    {model.situationsused}
                    </p>
                    <p>{model.skilllevel}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <MentalModelDetail id={model.modelid}/>
                    {/*<UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />*/}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Subcategory
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Situation Used
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Skill Level
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {mentalmodels?.map((model) => (
                <tr
                  key={model.modelid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src= {model.imageurl}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt="An alternative table"
              />
                      <p>{model.modelname}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {model.category}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {model.subcategory}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {model.situationsused}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {model.skilllevel}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <MentalModelDetail id={model.modelid}/>
                      {/*<UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />*/}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
