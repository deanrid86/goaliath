// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type Income = {
  month: string;
  income: number;

};

export type Expenditure = {
  exp: string;
  cost: number;

};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type LessonDetail = {
  id: string;
  lesson: string;
  lessonnotes: string;
  lessontype: string;
  lessonuse: string;
  lessonsource: string;
  lessonauthor: string;
  lessondate: string;
  lessonimage_url: string;
  lessonstatus: 'use' | 'dont use';
};

export type LessonForm = {

  id: string;
  lesson: string;
  lessonnotes: string;
  lessontype: string;
  lessonuse: string;
  lessonsource: string;
  lessonauthor: string;
  lessondate: string;

};

export type GoalDetail = {

  id: string;
  goaltype: string;
  goal: string;
  goalnotes: string;
  goaltimeline: number;
  goalurgency: number;
  goalrealisation: string;
  goaldate: string;
  goalreminder: 'yes' | 'no';
  goalachieved: 'yes' | 'no';


};

export type GoalForm = {

  id: string;
  goaltype: string;
  goal: string;
  goalnotes: string;
  goaltimeline: number;
  goalurgency: number;
  goalrealisation: string;
  goaldate: string;
  goalreminder: 'yes' | 'no';
  goalachieved: 'yes' | 'no';


};
