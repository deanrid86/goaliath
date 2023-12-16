const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  lessonfields,
  income,
  expenditure,
  goaldata
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function seedIncome(client) {
  try {
    // Create the "income" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS income (
        month VARCHAR(4) NOT NULL UNIQUE,
        income INT NOT NULL
      );
    `;

    console.log(`Created "income" table`);

    // Insert data into the "income" table
    const insertedIncome = await Promise.all(
      income.map(
        (inc) => client.sql`
        INSERT INTO income (month, income)
        VALUES (${inc.month}, ${inc.income})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedIncome.length} income`);

    return {
      createTable,
      income: insertedIncome,
    };
  } catch (error) {
    console.error('Error seeding income:', error);
    throw error;
  }
}

async function seedExpenditure(client) {
  try {
    // Create the "expenditure" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS expenditure (
        exp VARCHAR(15) NOT NULL UNIQUE,
        cost INT NOT NULL
      );
    `;

    console.log(`Created "expenditure" table`);

    // Insert data into the "expenditure" table
    const insertedExpenditure = await Promise.all(
      expenditure.map(
        (exp) => client.sql`
        INSERT INTO expenditure (exp, cost)
        VALUES (${exp.exp}, ${exp.cost})
        ON CONFLICT (exp) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedExpenditure.length} expenditure`);

    return {
      createTable,
      expenditure: insertedExpenditure,
    };
  } catch (error) {
    console.error('Error seeding expenditure:', error);
    throw error;
  }
}
async function seedLessons(client) { {/*Start of Lessons Seed for Database*/}
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;


    // Create the "Lessons" table if it doesn't exist
    const createTable = await client.sql` 
    CREATE TABLE IF NOT EXISTS lessonfields (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      lesson VARCHAR(250) NOT NULL,
      lessonnotes TEXT NOT NULL,
      lessontype VARCHAR(250) NOT NULL,
      lessonuse VARCHAR(250) NOT NULL,
      lessonsource VARCHAR(250) NOT NULL,
      lessonauthor VARCHAR(250) NOT NULL,
      lessondate VARCHAR(250) NOT NULL
    );

    ALTER TABLE lessonfields
      ALTER COLUMN lesson TYPE text,
      ALTER COLUMN lessonnotes TYPE text;
  `;

 


    console.log(`Created "lessons" table`);

    // Insert data into the "lessons" table
    const insertedLessons = await Promise.all(
      lessonfields.map(
        (les) => client.sql`
        INSERT INTO lessonfields (id, lesson, lessonnotes, lessontype, lessonuse, lessonSource, lessonauthor, lessondate)
        VALUES (${les.id}, ${les.lesson}, ${les.lessonnotes}, ${les.lessontype}, ${les.lessonuse}, ${les.lessonsource}, ${les.lessonauthor}, ${les.lessondate} )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedLessons.length} lessons`);

    return {
      createTable,
      lessonfields: insertedLessons,
    };
  } catch (error) {
    console.error('Error seeding lessons:', error);
    throw error;
  }
}

async function seedGoals(client) { {/*Start of Lessons Seed for Database*/}
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;


    // Create the "Goals" table if it doesn't exist
    const createTable = await client.sql` 
    CREATE TABLE IF NOT EXISTS goals (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      goaltype VARCHAR(255) NOT NULL,
      goal TEXT NOT NULL,
      goalnotes TEXT NOT NULL,
      goaltimeline VARCHAR(5) NOT NULL,
      goalurgency VARCHAR(5) NOT NULL,
      goalrealisation TEXT NOT NULL,
      goalreminder VARCHAR(5) NOT NULL,
      goalachieved VARCHAR(5) NOT NULL,
      goaldate VARCHAR(20) NOT NULL
    );
  `;

 


    console.log(`Created "goals" table`);

    // Insert data into the "goals" table
    const insertedGoals = await Promise.all(
      goaldata.map(
        (goa) => client.sql`
        INSERT INTO goals (id, goaltype, goal, goalnotes, goaltimeline, goalurgency, goalrealisation, goalreminder, goalachieved, goaldate)
        VALUES (${goa.id}, ${goa.goaltype}, ${goa.goal}, ${goa.goalnotes}, ${goa.goaltimeline}, ${goa.goalurgency}, ${goa.goalrealisation}, ${goa.goalreminder}, ${goa.goalachieved} , ${goa.goaldate}  )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedGoals.length} goals`);

    return {
      createTable,
      goaldata: insertedGoals,
    };
  } catch (error) {
    console.error('Error seeding goals:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
  await seedIncome(client);
  await seedLessons(client);
  await seedExpenditure(client);
  await seedGoals(client);


  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
