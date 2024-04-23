import { Card } from '@/app/ui/dashboard/cards';
import Image from 'next/image';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import IncomeChart from '@/app/ui/dashboard/income-chart';
import ExpenditureChart from '@/app/ui/dashboard/expenditure-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import LatestGoals from '@/app/ui/dashboard/latest-lessons2';
import {  fetchLatestInvoices, fetchCardData, fetchCardDataFinance, fetchHighLevelSteps, fetchAllLatestGoals, fetchSpecificLevelStepsComplete, fetchCompletionPercentage, fetchSpecificLevelStepsAdd, fetchCountOfYesInStatusAdd, fetchLatestGoals, fetchRandomMentalModel } from '@/app/lib/data';
import LatestGoalCards from '@/app/ui/goalplanner/latest-goals';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import LatestLessons from '@/app/ui/dashboard/latest-lessons';
import DashGoalCard from '@/app/ui/dashboard/goalcard';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  AcademicCapIcon,
  CurrencyPoundIcon,
  ViewfinderCircleIcon,
  CalculatorIcon,
  ArrowUpIcon,
  CalendarDaysIcon,
  BoltIcon,
  HandThumbUpIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';





 
export default async function Page() {

  const complete = await fetchCompletionPercentage ();
  const statusadd = await fetchCountOfYesInStatusAdd ();
  const latestGoals= await fetchLatestGoals ();
  const mentalmodel = await fetchRandomMentalModel ();
  const formattedValue = `${complete.completed_count} (${complete.percentage_complete}%)`;
  
    return (
        <div className="flex flex-col h-screen"> {/* Ensures that the container takes the full height of the viewport */}
            {/* First div, taking 1/5 of the space */}
            <div className="flex flex-row items-center justify-between border border-black bg-black-500 p-4 rounded-lg"> {/* You can replace 'bg-gray-200' with your own class or style */}

              <Card title="Total No. of Goals" value= {complete.total_count} type="goals"/>
              <Card title="Goals Completed (%)" value= {formattedValue} type="goals_complete"/>
              <Card title="No. of Specific Steps Working on" value= {statusadd} type="added_step"/>
              <Card title="Last Completed Step" value= "sean" type="steps_complete"/>
            </div>


            {/* Second section, taking 2/5 of the space, split into two rows */}
            <div className="flex-grow border border-black" style={{ flexBasis: '40%' }}>
                <div className="flex flex-row h-1/2">
                   
                      
                        {/* Goals div split into 2x2 grid */}
          
                        <div className="flex-1 border border-black grid grid-cols-2 grid-rows-2 gap-2 p-2 ">
            {latestGoals.map((content, index) => (
              <div key={index} className="border border-black flex flex-col items-center justify-center p-2 bg-white ">
                <BoltIcon className="h-5 w-5 bg-green-400 rounded-lg "/>
                <h4><strong>Goal: </strong>{content.usergoal}</h4>
                <p><strong>Completion Time (Months):</strong> {content.usertimeline || ''}</p>
                <p><strong>Dedicated Daily Hours:</strong> {content.userhours || ''}</p>
              </div>
            ))}
          </div>
                    <div className="flex-1 border border-black overflow-y-auto"> {/* Right half of the upper 2/5 div */}
                        {/* Additional components or content */}
                        <div className = "p-2">
                        <LatestLessons />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row h-1/2 ">
                    <div className="flex-1 border border-black "> {/* Left half of the lower 2/5 div */}
                        <div className = "flex justify-center bg-white">
                          <h3><strong>Mental Model of the Day</strong> </h3>
                        </div>
                        
                        <div className='mb-2 border border-black rounded-lg bg-white'> {/*Parent Div*/}
        
      <div className="flex "> {/* Top Horizontal Div */}
  <div> {/* Div for Image */}
    <Image
      src={mentalmodel.imageurl}
      className=""
      width={150}
      height={150}
      alt="A abstract interpretation of the mental model"
    />
  </div>

  <div className="flex flex-1"> {/* Remaining DIV to the right of the Image */}
    <div className="flex flex-col flex-1"> {/* Container for Model Name and Skill Level */}
      <div className="flex-1 border border-black p-2"> {/* Div for Model Name */}
        <h3><strong>Model Name</strong></h3>
        <p>{mentalmodel.modelname}</p>
      </div>
      <div className="flex-1 border border-black p-2"> {/* Div for Skill Level */}
        <h3><strong>Skill Level Required</strong></h3>
        <p>{mentalmodel.skilllevel}</p>
      </div>
    </div>

    <div className="flex flex-col flex-1"> {/* Container for Category and Subcategory */}
      <div className="flex-1 border border-black p-2"> {/* Div for Category */}
        <h3><strong>Category</strong></h3>
        <p>{mentalmodel.category}</p>
      </div>
      <div className="flex-1 border border-black p-2"> {/* Div for Subcategory */}
        <h3><strong>Subcategory</strong></h3>
        <p>{mentalmodel.subcategory}</p>
      </div>
    </div>
  </div>
</div>
{/* Div for middle main part */}
<div className="flex">
<div className='border border-black flex-1 p-2'>
          <h3><strong>Description</strong></h3>
        <div>
          <pre>{mentalmodel.bigdescription}</pre>
        </div>
        </div>
        <div className='border border-black flex-1 p-2'>
          <h3><strong>Real World Examples</strong></h3>
        <div>
          <pre>{mentalmodel.realexamples}</pre>
        </div>
        </div>
</div>   

{/* Div for bottom part */}   

<div className="flex">
<div className='border border-black flex-1'>
<div className='border border-black p-2 '>
          <h3><strong>Situations Used</strong></h3>
        <div>
          <p>{mentalmodel.situationsused}</p>
        </div>
        </div>
</div>
<div className='border border-black flex-1'>
<div className='border border-black p-2 '>
          <h3><strong>Tips</strong></h3>
        <div>
          <p>{mentalmodel.tips}</p>
        </div>
        </div>
</div>

</div>

<div className="flex">
<div className='border border-black flex-1'>
<div className='border border-black p-2 '>
          <h3><strong>Related Models</strong></h3>
        <div>
          <p>{mentalmodel.relatedmodels}</p>
        </div>
        </div>
  </div>
  <div className='border border-black flex-1'>
  <div className='border border-black p-2 '>
          <h3><strong>Further References</strong></h3>
        <div>
          <p>{mentalmodel.sourcesreferences}</p>
        </div>
        </div>
  </div>
</div>
</div>
                    </div>
                    <div className="flex-1 border border-black"> {/* Right half of the lower 2/5 div */}
                        {/* Additional components or content */}
                        <h3>Diary</h3>
                    </div>
                </div>
            </div>

            
        </div>
    );
}