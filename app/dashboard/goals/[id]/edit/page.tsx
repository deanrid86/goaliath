import Form from '@/app/ui/goals/edit-form';
import Breadcrumbs from '@/app/ui/goals/breadcrumbs';
import {fetchGoalById} from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    console.log('Page ID:', id);
    const [goals] = await Promise.all([
      fetchGoalById(id)
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Goals', href: '/dashboard/goals' },
          {
            label: 'Edit Goals',
            href: `/dashboard/goals/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form goals={goals}/>
    </main>
  );
}