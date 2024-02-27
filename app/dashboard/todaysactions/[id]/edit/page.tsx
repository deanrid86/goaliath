import EditGoalAIForm from '@/app/ui/todaysactions/edit-form-chat';
import Breadcrumbs from '@/app/ui/todaysactions/breadcrumbs';
import { fetchGoalStepById} from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    console.log ("PARAMS", id);
    const [goalstep] = await Promise.all ([fetchGoalStepById (id)]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Todays Actions', href: '/dashboard/todaysactions' },
          {
            label: 'Edit Todays Actions',
            href: `/dashboard/todaysactions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditGoalAIForm goalstep = {goalstep} />
    </main>
  );
}
