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
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

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

  export async function fetchLessonsPages(query: string) {
    noStore();
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

  export async function fetchGoalsPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM goals
      WHERE
      goals.goaltype ILIKE ${`%${query}%`} OR
      goals.goal ILIKE ${`%${query}%`} OR
      goals.goalnotes ILIKE ${`%${query}%`} OR
      goals.goaltimeline ILIKE ${`%${query}%`} OR
      goals.goalurgency ILIKE ${`%${query}%`} OR
      goals.goalrealisation ILIKE ${`%${query}%`} OR
      goals.goalreminder ILIKE ${`%${query}%`} OR
      goals.goalachieved ILIKE ${`%${query}%`} OR
      goals.goaldate::text ILIKE ${`%${query}%`}
      `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE_GOA);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of goals.');
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
        lessonfields.lessonuse
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

const ITEMS_PER_PAGE_GOA = 6;
export async function fetchFilteredGoals(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE_GOA;

  try {
    const goals = await sql<GoalDetail>`
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
      WHERE
      goals.goaltype ILIKE ${`%${query}%`} OR
      goals.goal ILIKE ${`%${query}%`} OR
      goals.goalnotes ILIKE ${`%${query}%`} OR
      goals.goaltimeline ILIKE ${`%${query}%`} OR
      goals.goalurgency ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE_GOA} OFFSET ${offset}
    `;

    return goals.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goals.');
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

