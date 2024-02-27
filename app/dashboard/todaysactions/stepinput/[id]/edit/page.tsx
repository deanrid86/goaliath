import EditGoalInputForm from '@/app/ui/todaysactions/edit-form';
import Breadcrumbs from '@/app/ui/todaysactions/breadcrumbs';
import { fetchGoalInputById} from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [goalInput] = await Promise.all ([fetchGoalInputById (id)]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Todays Actions', href: '/dashboard/todaysactions/stepinput' },
          {
            label: 'Edit Todays Actions',
            href: `/dashboard/todaysactions/stepinput/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditGoalInputForm goalInput = {goalInput} />
    </main>
  );
}
