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

export type GoalInputForm = {
  id: string;
  date: string;
  goalstep: string;
  stephours: string;
  statuscomplete: 'not complete' | 'complete';
  statusadd: 'dont add to list' | 'add to list';
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

export type GoalPlannerDetail = {
  uniqueid: string;
  chatid: string;
  chattime: string;
  usergoal: string;
  usertimeline: number;
  userhours: number;
  stepcount: number;
};

export type HighLevelDetail = {
  id: string;
  goalid: string;
  stepdescription: string;
  timeframe: number;
  statuscomplete: 'No' | 'Yes';
  statusadd: 'No' | 'Yes';
  orderindex: number;
};

export type CombinedGoalandHighLevelDetail = {
  uniqueid: string;
  chatid: string;
  chattime: string;
  usergoal: string;
  usertimeline: number;
  userhours: number;
  stepcount: number;
  id: string;
  goalid: string;
  stepdescription: string;
  timeframe: number;
  parent_statuscomplete: 'No' | 'Yes';
  parent_statusadd: 'No' | 'Yes';
  orderindex: number;
};

export type GoalPlannerStep = {
  id: string;
  specificgoalresult: string;
  specificchatid: string;
  specificchattime: Date;
  specificparsedresult: string;
  statuscomplete: 'No' | 'Yes';
  statusadd: 'No' | 'Yes';
  highlevelid: string;
  timeframe: number;
  

};

export type CombinedPlannerStep = {
  id: string;
  specificgoalresult: string;
  specificchatid: string;
  specificchattime: Date;
  specificparsedresult: string;
  highlevel_statuscomplete: 'No' | 'Yes';
  highlevel_statusadd: 'No' | 'Yes';
  highlevelid: string;
  highlevel_timeframe: number;
  specific_timeframe: number;
  specific_statuscomplete: string;
  specific_statusadd: string;
  goalid: string;
  stepdescription: string;
  orderindex: number;
  specific_id: string;
  
  

};
export type CombinedPlannerStep2 = {
  id: string;
  specificgoalresult: string;
  specificchatid: string;
  specificchattime: string;
  specificparsedresult: string;
  highlevel_statuscomplete: 'No' | 'Yes';
  highlevel_statusadd: 'No' | 'Yes';
  highlevelid: string;
  highlevel_timeframe: number;
  specific_timeframe: number;
  specific_statuscomplete: string;
  specific_statusadd: string;
  goalid: string;
  stepdescription: string;
  orderindex: number;
  specific_id: string;
  
  

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
  addstatus: 'no' | 'yes';

};

export type GoalDetail = {

  id: string;
  goaltype: string;
  goal: string;
  goalnotes: string;
  goaltimeline: string;
  goalurgency: string;
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
  goaltimeline: string;
  goalurgency: string;
  goalrealisation: string;
  goaldate: string;
  goalreminder: 'yes' | 'no';
  goalachieved: 'yes' | 'no';


};

export type GoalStepForm = {

  id: string;
  date: string;
  goalstep: string;
  stephours: string;
  


};


export type AssistantType = {
  threadid: string;
  name: string;
  type: string;
};

export type MentalModelsTable = {
  modelid: string;
  modelname: string;
  description: string;
  category: string;
  subcategory: string;
  situationsused: string;
  skilllevel: 'beginner' | 'intermediate' | 'advanced';
  addstatus: 'no' | 'yes';
  imageurl: string;
  tips: string;
  relatedmodels: string;
  bigdescription: string;
  sourcesreferences: string;
  realexamples: string;



};