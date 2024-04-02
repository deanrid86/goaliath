'use client';

import { MentalModelsTable } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateMentalModelStatus } from '@/app/lib/actions';

export default function ViewMentalModelForm({ mentalmodel}: {mentalmodel: MentalModelsTable;}) {
  const updateMentalModelStatusWithId = updateMentalModelStatus.bind(null, mentalmodel.modelid);
  return (
    


    <form action={updateMentalModelStatusWithId}>
      <div>
        {/* Add Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Add mental model to daily actions?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="addstatus"
                  name="addstatus"
                  type="radio"
                  value="no"
                  defaultChecked={mentalmodel.addstatus === 'no'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="no"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  No <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="yes"
                  name="addstatus"
                  type="radio"
                  value="yes"
                  defaultChecked={mentalmodel.addstatus === 'yes'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Yes <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/mentalmodels"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add to Daily Actions</Button>
      </div>
    </form>
  );
}
