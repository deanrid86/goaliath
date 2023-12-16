import Form from '@/app/ui/goals/create-form';
import Breadcrumbs from '@/app/ui/goals/breadcrumbs';
import { fetchGoals } from '@/app/lib/data';

 
export default async function Page() {
  const goals = await fetchGoals();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Goals', href: '/dashboard/goals' },
          {
            label: 'Create Goal',
            href: '/dashboard//create',
            active: true,
          },
        ]}
      />
      <Form goals = {goals} />
    </main>
  );
}