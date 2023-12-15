import Form from '@/app/ui/goals/create-form';
import Breadcrumbs from '@/app/ui/goals/breadcrumbs';

 
export default async function Page() {
  
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lessons', href: '/dashboard/lessons' },
          {
            label: 'Create Lesson',
            href: '/dashboard/lessons/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}