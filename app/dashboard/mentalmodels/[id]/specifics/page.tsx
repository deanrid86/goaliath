import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/mentalmodels/breadcrumbs';
import { fetchMentalModelById} from '@/app/lib/data';
import ViewMentalModelForm from '@/app/ui/mentalmodels/specifics-form';
import Image from 'next/image';
import { AddMentalModel, RemoveMentalModel } from '@/app/ui/mentalmodels/buttons';
 
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
      <div className='mb-2 border border-black rounded-lg bg-gray-50'> {/*Parent Div*/}
        
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

        
        
        
        
       
        
      
        <div>
          
        </div>
        
        
      </div>
      <div className="flex flex-row p-2">
      <AddMentalModel id={mentalmodel.modelid}/>
      <RemoveMentalModel id={mentalmodel.modelid}/>
      <p className="ml-2">Has this mental model been added to you daily actions: {mentalmodel.addstatus}</p>
      </div>
    </main>
  );
}