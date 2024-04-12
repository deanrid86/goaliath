import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  LessonDetail,
  Income,
  Expenditure,
  LessonForm,
  GoalDetail,
  GoalPlannerDetail,
  GoalPlannerStep,
  GoalInputForm,
  HighLevelDetail,
  AssistantType,
  MentalModelsTable,
  CombinedPlannerStep,
  CombinedGoalandHighLevelDetail,
  

} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';

export async function fetchRevenue() {
  noStore();
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
  const data = await sql<LatestInvoiceRaw>` 
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

      {/*LatestInvoiceRaw is an object in defitions that shows how it wants the properties of the invoice to be displayed. i.e. name "string", email: "string". The SQL then has to return that data in that format*/}

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

const MODELS_PER_PAGE = 6;
export async function fetchFilteredMentalModels(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * MODELS_PER_PAGE;

  try {
    const mentalmodels = await sql<MentalModelsTable>`
      SELECT
      mentalmodels.modelid,
      mentalmodels.modelname,
      mentalmodels.description,
      mentalmodels.category,
      mentalmodels.subcategory,
      mentalmodels.skilllevel ,
      mentalmodels.situationsused,
      mentalmodels.imageurl  

      
      FROM mentalmodels
      WHERE
      mentalmodels.modelname ILIKE ${`%${query}%`} OR
      mentalmodels.description ILIKE ${`%${query}%`} OR
      mentalmodels.category ILIKE ${`%${query}%`} OR
      mentalmodels.subcategory ILIKE ${`%${query}%`} OR
      mentalmodels.situationsused ILIKE ${`%${query}%`} OR
      mentalmodels.skilllevel ILIKE ${`%${query}%`}
      ORDER BY mentalmodels.category DESC
      LIMIT ${MODELS_PER_PAGE} OFFSET ${offset}
    `;

    return mentalmodels.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch mental models.');
  }
}

const GOALS_PER_PAGE = 6;

export async function fetchFilteredGoals(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * GOALS_PER_PAGE;

  try {
    const goalplan = await sql<GoalPlannerDetail>`
      SELECT
        goalplanner.usergoal,
        goalplanner.usertimeline::text,  
        goalplanner.userhours::text,     
        goalplanner.chattime,
        goalplanner.uniqueid
      FROM goalplanner
      WHERE
        goalplanner.usergoal ILIKE ${`%${query}%`} OR
        goalplanner.usertimeline::text ILIKE ${`%${query}%`} OR
        goalplanner.userhours::text ILIKE ${`%${query}%`}
      ORDER BY goalplanner.chattime DESC
      LIMIT ${GOALS_PER_PAGE} OFFSET ${offset}
    `;

    return goalplan.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goals.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchMentalModelPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM mentalmodels
    WHERE
      mentalmodels.modelname ILIKE ${`%${query}%`} OR
      mentalmodels.description ILIKE ${`%${query}%`} OR
      mentalmodels.category ILIKE ${`%${query}%`} OR
      mentalmodels.subcategory ILIKE ${`%${query}%`} OR
      mentalmodels.skilllevel ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of mental models.');
  }
}


export async function fetchGoalPages(query: string) {
  noStore();
  try {
    // Adjust your query to correctly handle different data types
    const count = await sql`SELECT COUNT(*)
    FROM goalplanner
    WHERE
      goalplanner.usergoal ILIKE ${`%${query}%`} OR
      goalplanner.usertimeline::text ILIKE ${`%${query}%`} OR
      goalplanner.userhours::text ILIKE ${`%${query}%`} OR
      goalplanner.goalresult::text ILIKE ${`%${query}%`}  
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / GOALS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of goals.');
  }
}


export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchMentalModelById(id: string) {
  noStore();
  try {
    const data = await sql<MentalModelsTable>`
      SELECT
        mentalmodels.modelid,
        mentalmodels.modelname,
        mentalmodels.description,
        mentalmodels.category,
        mentalmodels.subcategory,
        mentalmodels.skilllevel,
        mentalmodels.bigdescription,
        mentalmodels.realexamples,
        mentalmodels.situationsused,
        mentalmodels.tips,
        mentalmodels.relatedmodels,
        mentalmodels.sourcesreferences,
        mentalmodels.imageurl
      FROM mentalmodels
      WHERE mentalmodels.modelid = ${id};
    `;

    const mentalmodel = data.rows.map((model) => ({
      ...model,
      
    }));

    return mentalmodel[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch mental model.');
  }
}

export async function fetchGoalsById(id: string) {
  noStore();
  try {
    const data = await sql<HighLevelDetail>`
      SELECT

        highlevelsteps.id,
        highlevelsteps.stepdescription,
        highlevelsteps.timeframe,
        highlevelsteps.statuscomplete,
        highlevelsteps.statusadd
      FROM highlevelsteps
      WHERE highlevelsteps.goalid = ${id};
    `;

    // Here, we're returning the entire array of steps rather than just the first one.
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch specific goal.');
  }
}

export async function fetchSpecificGoalStepsById(stepid: string) {
  noStore();
  try {
    const data = await sql<GoalPlannerStep>`
      SELECT
      goalplannerspecific.id
      goalplannerspecific.specificgoalresult
      goalplannerspecific.specificchatid
      goalplannerspecific.specificchattime
      goalplannerspecific.specificparsedresult
      goalplannerspecific.statuscomplete
      goalplannerspecific.statusadd
      goalplannerspecific.highlevelid
      goalplannerspecific.timeframe
      FROM goalplannerspecific
      WHERE goalplannerspecific.highlevelid = ${stepid};
    `;

    // Here, we're returning the entire array of steps rather than just the first one.
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch specific goal step.');
  }
}

export async function fetchAllGoalStepsById(id: string) {
  noStore();
  try {
    const data = await sql<CombinedPlannerStep>`
      SELECT
        highlevelsteps.id,
        highlevelsteps.goalid,
        highlevelsteps.stepdescription,
        highlevelsteps.timeframe as highlevel_timeframe,
        highlevelsteps.statuscomplete as highlevel_statuscomplete,
        highlevelsteps.statusadd as highlevel_statusadd,
        goalplannerspecific.id as specific_id,
        goalplannerspecific.specificgoalresult,
        goalplannerspecific.specificchatid,
        goalplannerspecific.specificchattime,
        goalplannerspecific.specificparsedresult,
        goalplannerspecific.statuscomplete as specific_statuscomplete,
        goalplannerspecific.statusadd as specific_statusadd,
        goalplannerspecific.highlevelid,
        goalplannerspecific.timeframe as specific_timeframe
      FROM highlevelsteps
      LEFT JOIN goalplannerspecific ON highlevelsteps.id = goalplannerspecific.highlevelid
      WHERE highlevelsteps.goalid = ${id};
    `;

    // Returning the combined array of steps
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal steps.');
  }
}


export async function fetchGoalStepCompletion(id: string) {
  noStore();
  try {
    // Assuming `sql` is a function from a library that supports parameterized queries,
    // and it automatically handles promise rejection.
    const data = await sql`
      SELECT
        goalid,
        COUNT(*) FILTER (WHERE statuscomplete = 'Yes') * 100.0 / COUNT(*) AS completion_percentage
      FROM
        highlevelsteps
      WHERE
        goalid = ${id}  // Use parameterized query for safety
      GROUP BY
        goalid;
    `;

    // Assuming `data.rows` contains the result set.
    // This logic assumes there's only one or zero rows returned.
    if (data.rows.length > 0) {
      const completionData = data.rows[0];
      return {
        goalId: completionData.goalid,
        completionPercentage: completionData.completion_percentage
      };
    } else {
      // Handle the case where no data is found
      return null;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal step completion percentage.');
  }
}


export async function fetchMentalModelsByAddStatus() {
  noStore(); 
  try {
    const data = await sql<MentalModelsTable>`
      SELECT
      mentalmodels.modelid,
      mentalmodels.modelname,
      mentalmodels.description,
      mentalmodels.category,
      mentalmodels.subcategory,
      mentalmodels.skilllevel,
      mentalmodels.bigdescription,
      mentalmodels.realexamples,
      mentalmodels.situationsused,
      mentalmodels.tips,
      mentalmodels.relatedmodels,
      mentalmodels.sourcesreferences,
      mentalmodels.imageurl,
      mentalmodels.addstatus
      FROM mentalmodels
      WHERE addstatus = 'yes';
    `;

    // Convert the data into a more friendly structure if needed
    const mentalmodels = data.rows.map((model) => ({
      ...model,
      // You can add any additional transformations here if necessary
    }));

    return mentalmodels; // Returns an array of all mental models with addstatus 'yes'
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch mental models.');
  }
}

export async function fetchLessonById(id: string) {
  noStore();
  if (id === undefined || id === 'undefined') {
    throw new Error('Invalid lesson ID');
  }
  try {
    const data = await sql<LessonForm>`
    SELECT 
      lessonfields.id, 
      lessonfields.lessonauthor, 
      lessonfields.lesson, 
      lessonfields.lessontype, 
      lessonfields.lessonuse
    FROM lessonfields
    WHERE lessonfields.id = ${id};
    `;

    const lesson = data.rows.map((lesson) => ({
      ...lesson,
    }));

    return lesson[0];
  } catch (error: any) {
    console.error('Database Error:', error);
    console.error('Failed SQL Query:', error.query); // Add this line to log the failed query
    throw new Error('Failed to fetch lesson.');
  }
}

export async function fetchGoalById(id: string) {
  noStore();
  if (id === undefined || id === 'undefined') {
    throw new Error('Invalid goal ID');
  }
  try {
    const data = await sql<GoalDetail>`
    SELECT 
      goals.id, 
      goals.goaltype, 
      goals.goal, 
      goals.goalnotes, 
      goals.goaltimeline,
      goals.goalurgency,
      goals.goalrealisation,
      goals.goalreminder,
      goals.goalachieved
    FROM goals
    WHERE goals.id = ${id};
    `;

    const goal = data.rows.map((goal) => ({
      ...goal,
    }));

    return goal[0];
  } catch (error: any) {
    console.error('Database Error:', error);
    console.error('Failed SQL Query:', error.query); // Add this line to log the failed query
    throw new Error('Failed to fetch goal.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchLessons() {
  noStore();
  try {
  const data = await sql<LessonDetail>` 
      SELECT lessonfields.id, lessonfields.lessonauthor, lessonfields.lesson, lessonfields.lessontype, lessonfields.lessonuse, 
      FROM lessonfields
      ORDER BY lessonfields.lessondate DESC
      `;

      const EditLessons = data.rows.map((lesson) => ({
        ...lesson,
      }));
      return EditLessons;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the lessons.');
    }
  }

  export async function fetchGoals() {
    noStore();
    try {
    const data = await sql<GoalDetail>` 
        SELECT goals.id, goals.goaltype, goals.goal, goals.goalnotes, goals.goaltimeline, goals.goalurgency, goals.goalrealisation, goals.goalreminder, goals.goalachieved
        FROM goals
        ORDER BY goals.goaldate DESC
        `;
  
        const EditGoals = data.rows.map((goal) => ({
          ...goal,
        }));
        return EditGoals;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the goals.');
      }
    }


export const createAssistant = async () => {
  try {
    const response = await axios.post('https://api.openai.com/v1/beta/assistants', {
      name: "Goal Assistant",
      instructions: "You are my personal life coach and goal scheduler.",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-4-1106-preview"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating goal assistant:", error);
  }
};


export async function fetchLatestLessons() {
  noStore();
  try {
  const data = await sql<LessonDetail>` 
      SELECT lessonfields.lesson, lessonfields.lessonnotes
      FROM lessonfields
      ORDER BY lessonfields.lessondate DESC
      LIMIT 12`;

      const latestLessons = data.rows.map((lesson) => ({
        ...lesson,
      }));
      return latestLessons;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest lessons.');
    }

  }
  export async function fetchLatestGoals() {
    noStore();
    try {
      const data = await sql<GoalPlannerDetail>`
        SELECT goalplanner.uniqueid, goalplanner.usergoal, goalplanner.usertimeline, goalplanner.userhours, goalplanner.chatid, goalplanner.chattime
        FROM goalplanner
        ORDER BY goalplanner.chattime DESC
        LIMIT 4`;
  
      // Log the raw data response from the query
      console.log("Raw data response:", data);
  
      const latestGoals = data.rows.map((goal) => ({
        ...goal,
      }));
  
      // Log the processed data that will be returned
      console.log("Processed latestGoals:", latestGoals);
  
      return latestGoals;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest goals.');
    }
  }

  export async function fetchAllLatestGoals() {
    noStore();
    try {
      const data = await sql<GoalPlannerDetail>`
        SELECT goalplanner.uniqueid, goalplanner.usergoal, goalplanner.usertimeline, goalplanner.userhours, goalplanner.chatid, goalplanner.chattime
        FROM goalplanner
        ORDER BY goalplanner.chattime DESC`;
  
      // Log the raw data response from the query
      console.log("Raw data response:", data);
  
      const latestGoals = data.rows.map((goal) => ({
        ...goal,
      }));
  
      // Log the processed data that will be returned
      console.log("Processed all latestGoals:", latestGoals);
  
      return latestGoals;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch all the latest goals.');
    }
  }
  
  export async function fetchAllLatestGoalsAndHighSteps() {
    noStore();
    try {
      const data = await sql <CombinedGoalandHighLevelDetail>`
        SELECT
         goalplanner.uniqueid AS parent_id, 
         goalplanner.usergoal,
          goalplanner.usertimeline, 
          goalplanner.userhours, 
          goalplanner.chatid, 
          goalplanner.chattime,
        highlevelsteps.id AS child_id,
          highlevelsteps.stepdescription,
          highlevelsteps.timeframe,
          highlevelsteps.statuscomplete AS parent_statuscomplete,
          highlevelsteps.statusadd AS parent_statusadd
        FROM goalplanner
        JOIN 
        highlevelsteps ON highlevelsteps.goalid = goalplanner.uniqueid
        ORDER BY goalplanner.chattime DESC`;
  
      // Log the raw data response from the query
      console.log("Raw data response:", data);
  
      const latestGoals = data.rows.map((goal) => ({
        ...goal,
      }));
  
      // Log the processed data that will be returned
      console.log("Processed all latestGoals:", latestGoals);
  
      return latestGoals;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch all the latest goals.');
    }
  }

  export async function fetchHighLevelSteps() {
    noStore();
    try {
      const data = await sql<HighLevelDetail>`
        SELECT highlevelsteps.id, highlevelsteps.goalid, highlevelsteps.stepdescription, highlevelsteps.timeframe, highlevelsteps.statuscomplete, highlevelsteps.statusadd, highlevelsteps.orderindex
        FROM highlevelsteps
        WHERE highlevelsteps.statusadd = 'Yes'`;
  
      // Log the raw data response from the query
      console.log("Raw data response:", data);
  
      const latestHighLevel = data.rows.map((high) => ({
        ...high,
      }));
  
      // Log the processed data that will be returned
      console.log("Processed latestGoals:", latestHighLevel);
  
      return latestHighLevel;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest high level goals.');
    }
  }

 

  export async function fetchSpecificLevelStepsAdd() {
    noStore();
    try {
      const data = await sql`
        SELECT 
          goalplannerspecific.id AS specific_id,
          goalplannerspecific.highlevelid,
          goalplannerspecific.specificchattime,
          goalplannerspecific.specificparsedresult,
          goalplannerspecific.statuscomplete,
          goalplannerspecific.statusadd,
          highlevelsteps.id AS parent_id,
          highlevelsteps.stepdescription,
          highlevelsteps.timeframe,
          highlevelsteps.statuscomplete AS parent_statuscomplete,
          highlevelsteps.statusadd AS parent_statusadd
        FROM 
          goalplannerspecific
        JOIN 
          highlevelsteps ON goalplannerspecific.highlevelid = highlevelsteps.id
        WHERE 
          goalplannerspecific.statusadd = 'Yes'`;
  
      // Log the raw data response from the query
      console.log("Raw data response:", data);
  
      const latestSpecific = data.rows.map(spec => ({
        ...spec,
        // Any additional processing or renaming of fields can be done here
      }));
  
      // Log the processed data that will be returned
      console.log("Processed latestSpecific:", latestSpecific);
  
      return latestSpecific;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest specific goals.');
    }
  }

  export async function fetchSpecificLevelStepsComplete() {
    noStore();
    try {
      const data = await sql<CombinedPlannerStep>`
        SELECT 
          goalplannerspecific.id AS specific_id,
          goalplannerspecific.highlevelid,
          goalplannerspecific.specificchattime,
          goalplannerspecific.specificparsedresult,
          goalplannerspecific.statuscomplete,
          goalplannerspecific.statusadd,
          highlevelsteps.id AS parent_id,
          highlevelsteps.stepdescription,
          highlevelsteps.timeframe,
          highlevelsteps.statuscomplete AS parent_statuscomplete,
          highlevelsteps.statusadd AS parent_statusadd
        FROM 
          goalplannerspecific
        JOIN 
          highlevelsteps ON goalplannerspecific.highlevelid = highlevelsteps.id
        WHERE 
          goalplannerspecific.statuscomplete  = 'Yes'`;
  
      // Log the raw data response from the query
      console.log("Raw data response:", data);
  
      const latestSpecific = data.rows.map(spec => ({
        ...spec,
        // Any additional processing or renaming of fields can be done here
      }));
  
      // Log the processed data that will be returned
      console.log("Processed latestSpecific:", latestSpecific);
  
      return latestSpecific;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest specific goals.');
    }
  }

  export async function fetchLatestGoalStep() {
    noStore();
    try {
        const data = await sql<GoalPlannerStep>`
            SELECT goalplannerspecific.id, goalplannerspecific.specificparsedresult, goalplannerspecific.specificparsedresult, goalplannerspecific.statuscomplete, goalplannerspecific.statusadd
            FROM goalplannerspecific
            ORDER BY goalplannerspecific.specificchattime DESC
            LIMIT 1`;

        // Log the raw data response from the query
        console.log("Raw data responses:", data);

        const latestGoalStep = data.rows.map((step) => {
            // Initialize a variable to hold the parsed result
            let parsedResult;
            try {
                // Attempt to parse specificparsedresult into an object
                parsedResult = JSON.parse(step.specificparsedresult);
            } catch (error) {
                console.error('Error parsing specificparsedresult:', error);
                // Handle the error or set parsedResult to a default value
                parsedResult = {}; // Setting to an empty object as an example
            }

            return {
                ...step,
                specificparsedresult: parsedResult,
            };
        });

        // Log the processed data that will be returned
        console.log("Processed latestGoalStep:", latestGoalStep);

        return latestGoalStep;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest goal step.');
    }
}

export async function fetchGoalStepById(id: string) {
  noStore();
  console.log('Fetching goal step by ID:', id); // Logging for debugging
  try {
    const data = await sql<GoalPlannerStep>`
      SELECT
      goalplannerspecific.id, 
      goalplannerspecific.specificparsedresult
      FROM goalplannerspecific
      WHERE goalplannerspecific.id = ${id};
    `;

    const goalstep = data.rows.map((goalstep) => ({
      ...goalstep,
     
    }));

    return goalstep[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goalstep.');
  }
}


  export async function fetchGoalStepInput() {
    noStore();
    try {
      const data = await sql<GoalInputForm>`
        SELECT goalstepinput.id, goalstepinput.date, goalstepinput.goalstep, goalstepinput.stephours, goalstepinput.statuscomplete, goalstepinput.statusadd
        FROM goalstepinput
        LIMIT 5`;
  
     
  
      const goalStepInput = data.rows.map((step) => ({
        ...step,
      }));
  
  
      return goalStepInput;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest goal step.');
    }
  }

  export async function fetchLessonsPages(query: string) {
    noStore();
    console.log('Database URL:', process.env.POSTGRES_URL);
    try {
      const count = await sql`SELECT COUNT(*)
      FROM lessonfields
      WHERE
      lessonfields.lesson ILIKE ${`%${query}%`} OR
      lessonfields.lessonnotes ILIKE ${`%${query}%`} OR
      lessonfields.lessontype ILIKE ${`%${query}%`} OR
      lessonfields.lessonuse ILIKE ${`%${query}%`} OR
      lessonfields.lessonsource ILIKE ${`%${query}%`} OR
      lessonfields.lessonauthor ILIKE ${`%${query}%`} OR
      lessonfields.lessondate::text ILIKE ${`%${query}%`}
      `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE_LES);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of lessons.');
    }
  }

 

  const ITEMS_PER_PAGE_LES = 6;
export async function fetchFilteredLessons(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE_LES;

  try {
    const lessons = await sql<LessonDetail>`
      SELECT
        lessonfields.id,
        lessonfields.lessonauthor,
        lessonfields.lesson,
        lessonfields.lessontype,
        lessonfields.lessonuse,
        lessonfields.lessonnotes
      FROM lessonfields
      WHERE
      lessonfields.lessonauthor ILIKE ${`%${query}%`} OR
      lessonfields.lessontype ILIKE ${`%${query}%`} OR
      lessonfields.lesson ILIKE ${`%${query}%`} OR
      lessonfields.lessonuse ILIKE ${`%${query}%`} OR
      lessonfields.lessonnotes ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE_LES} OFFSET ${offset}
    `;

    return lessons.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lessons.');
  }
}


export async function fetchIncome() {
  noStore();
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Income>`SELECT * FROM income`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch income data.');
  }
}

export async function fetchExpenditure() {
  noStore();
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Expenditure>`SELECT * FROM expenditure`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expenditure data.');
  }
}



export async function fetchCardDataFinance() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const lessonCountPromise = sql `SELECT COUNT(DISTINCT lesson) FROM lessonfields`;
    const totalExpenditurePromise = sql`SELECT exp, SUM(cost) as total_cost
    FROM expenditure
    GROUP BY exp;`;

    const data = await Promise.all([
      lessonCountPromise,
      totalExpenditurePromise,
    ]);

    const numberOfLessons = Number(data[0].rows[0].count ?? '0');
    const totalMonthlyExpenditure = data[1].rows.reduce(
      (total, row) => total + Number(row.total_cost),
      0
    );
    
      const bufferExpenditure = totalMonthlyExpenditure * 1.3;

      const minimumDailyEarnings = bufferExpenditure / 30;
    

    return {
      bufferExpenditure,
      numberOfLessons,
      totalMonthlyExpenditure,
      minimumDailyEarnings
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchGoalInputById(id: string) {
  noStore();
  console.log('Fetching goal input by ID:', id); // Logging for debugging
  try {
    const data = await sql<GoalInputForm>`
      SELECT
        goalstepinput.id,
        goalstepinput.date,
        goalstepinput.goalstep,
        goalstepinput.stephours,
        goalstepinput.statuscomplete,
        goalstepinput.statusadd
      FROM goalstepinput
      WHERE goalstepinput.id = ${id};
    `;

    const goalstepinput = data.rows.map((goalstep) => ({
      ...goalstep,
     
    }));

    return goalstepinput[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goalstep.');
  }
}

export async function fetchAssistantInfo() {
  noStore();
  try {
    const data = await sql<AssistantType>`
      SELECT
      assistants.threadid,
      assistants.name
      assistants.type
      FROM assistants
    `;

    const assistantinfo = data.rows.map((assistant) => ({
      ...assistant,
     
    }));
``
    return assistantinfo;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch assistant info.');
  }
}