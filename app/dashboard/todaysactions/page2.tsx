import EditGoalInputForm from '@/app/ui/todaysactions/edit-form';
import Breadcrumbs from '@/app/ui/todaysactions/breadcrumbs';
import { fetchGoalInputById} from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const goalInput = await fetchGoalInputById (id);
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
      <EditGoalInputForm goalInput = {goalInput} />
    </main>
  );
}






