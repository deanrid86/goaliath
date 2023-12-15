import Form from '@/app/ui/lessons/edit-form';
import Breadcrumbs from '@/app/ui/lessons/breadcrumbs';
import {fetchLessonById} from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    console.log('Page ID:', id);
    const [lesson] = await Promise.all([
      fetchLessonById(id)
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lessons', href: '/dashboard/lessons' },
          {
            label: 'Edit Lessons',
            href: `/dashboard/lessons/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form lesson={lesson}/>
    </main>
  );
}