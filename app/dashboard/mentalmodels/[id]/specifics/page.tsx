import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/mentalmodels/breadcrumbs';
import { fetchMentalModelById} from '@/app/lib/data';
import ViewMentalModelForm from '@/app/ui/mentalmodels/specifics-form';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [mentalmodel] = await Promise.all([
        fetchMentalModelById(id),
       
      ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Mental Models', href: '/dashboard/mentalmodels' },
          {
            label: 'Model Specifics',
            href: `/dashboard/mentalmodels/${id}/specifics`,
            active: true,
          },
        ]}
      />
      <div>
        <div className='mb-2'>
          <h1><strong>{mentalmodel.modelname}</strong></h1>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Category</h3>
        <div>
          <p>{mentalmodel.category}</p>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Subcategory</h3>
        <div>
          <p>{mentalmodel.subcategory}</p>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Description</h3>
        <div>
          <pre>{mentalmodel.bigdescription}</pre>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Situations Used</h3>
        <div>
          <p>{mentalmodel.situationsused}</p>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Real World Examples</h3>
        <div>
          <pre>{mentalmodel.realexamples}</pre>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Tips</h3>
        <div>
          <p>{mentalmodel.tips}</p>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Related Models</h3>
        <div>
          <p>{mentalmodel.relatedmodels}</p>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Skill Level Required</h3>
        <div>
          <p>{mentalmodel.skilllevel}</p>
        </div>
        </div>
        <div className='border border-black p-2 mt-2 mb-2'>
          <h3>Further References</h3>
        <div>
          <p>{mentalmodel.sourcesreferences}</p>
        </div>
        </div>
        <div>
          
        </div>
        
        
      </div>
      <ViewMentalModelForm mentalmodel={mentalmodel} />
    </main>
  );
}