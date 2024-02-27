import { UpdateStepInput, DeleteStepInput } from "@/app/ui/todaysactions/buttons";
import { fetchGoalStepInput} from "@/app/lib/data";

export default async function GoalInputTable () {

    const goalStepInput = await fetchGoalStepInput ();

    return (
        <div>
                {goalStepInput.map((step) => (
                <div key={step.id} className='text-black text-xl bg-white rounded-xl p-2 m-2'>
                    <p><span>Created:</span> <span className='text-grey-100'>{step.date}</span></p>
                    <p><span>Action:</span> <span className='text-grey-100'>{step.goalstep}</span></p>
                    <p><span>Allocated time:</span> <span className='text-grey-100'>{step.stephours} hours</span></p>
                    <p><span>Added to Daily Step List? :</span> <span className='text-grey-100'>{step.statusadd}</span></p>
                    <p><span>Has Step been Completed? :</span> <span className='text-grey-100'>{step.statuscomplete}</span></p>
                    
                    <div className="flex justify-between">
                    <UpdateStepInput id={step.id}/>
                    <DeleteStepInput id={step.id}/>
                </div>
                </div>
                ))}
        </div>
    );
}