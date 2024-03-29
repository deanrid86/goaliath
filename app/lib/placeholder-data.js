// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Apr', revenue: 0 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
  { month: 'Jul', revenue: 0 },
  { month: 'Aug', revenue: 0 },
  { month: 'Sep', revenue: 700 },
  { month: 'Oct', revenue: 1400 },
  { month: 'Nov', revenue: 1100 },
  { month: 'Dec', revenue: 0 },
];

const income = [
  { month: 'Jan', income: 0 },
  { month: 'Feb', income: 0 },
  { month: 'Mar', income: 0 },
  { month: 'Apr', income: 0 },
  { month: 'May', income: 0 },
  { month: 'Jun', income: 0 },
  { month: 'Jul', income: 0 },
  { month: 'Aug', income: 0 },
  { month: 'Sep', income: 700 },
  { month: 'Oct', income: 1400 },
  { month: 'Nov', income: 1100 },
  { month: 'Dec', income: 0 },
];

const expenditure = [
  { exp: 'Loan', cost: 270 },
  { exp: 'Rent', cost: 200 },
  { exp: 'Mobile', cost: 40 },
  { exp: 'Electricity', cost: 45 },
  { exp: 'Gas', cost: 10 },
  { exp: 'Spotify', cost: 10 },
  { exp: 'Audible', cost: 10 },
  { exp: 'Internet', cost: 40 },
  { exp: 'Council Tax', cost: 75 },
  { exp: 'Food', cost: 200 },
  { exp: 'Travel', cost: 120 },
  { exp: 'Credit Card', cost: 60 },
  
];

function getTotalCost(expenditureArray) {
  return expenditureArray.reduce((total, item) => total + item.cost, 0);
}

const totalCost = getTotalCost(expenditure);
console.log('Total Expenditure:', totalCost);

const lessonfields = [
{
  id: "79d7fbdf-3fa1-4263-8072-4f7444319028",
  lesson: 'Stand up straight with your shoulders back.',
  lessonnotes: 'Peterson emphasizes the importance of adopting a posture of confidence and assertiveness. According to Peterson, body language not only influences how others perceive us but also affects our self-perception. Standing tall and maintaining good posture signals strength and resilience, both to the external world and to oneself. This rule encourages individuals to face lifes challenges with courage, embodying a metaphorical readiness to confront adversity. By physically presenting oneself confidently, individuals may find it easier to navigate the complexities of existence and build a foundation for personal growth and success.',
  lessontype: 'Physical Improvement',
  lessonuse: "Social Situations",
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},  
{
  id: "02e9e141-9daa-446b-bba7-7ba0d0153e37",
  lesson: 'Treat yourself like someone you are responsible for helping.',
  lessonnotes: 'Peterson advocates for self-compassion, encouraging individuals to care for themselves as they would for others. Recognizing ones worth and addressing personal needs fosters a positive, nurturing mindset.',
  lessontype: 'Self-Compassion',
  lessonuse: 'Personal Development',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "4f3c4e05-2762-4e07-9486-cdb4ac479e76",
  lesson: 'Make friends with people who want the best for you.',
  lessonnotes: 'Building supportive connections is crucial. Peterson advises seeking relationships where mutual growth and well-being are prioritized, promoting a positive and constructive social environment.',
  lessontype: 'Social Relationships',
  lessonuse: 'Friendship',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "9490a9fb-e095-4a00-a55c-65d29605c5ab",
  lesson: 'Compare yourself to who you were yesterday, not to who someone else is today.',
  lessonnotes: 'Focusing on personal progress rather than external benchmarks cultivates self-improvement. Peterson encourages individuals to set realistic goals and measure success relative to their unique journeys.',
  lessontype: 'Self-Reflection',
  lessonuse: 'Goal Setting',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "adb4f27d-f7f9-4251-9e59-be4dc006bb4c",
  lesson: 'Do not let your children do anything that makes you dislike them.',
  lessonnotes: 'Parenting advice from Peterson emphasizes the importance of instilling discipline and values in children. Building a positive relationship requires setting boundaries and guiding with love.',
  lessontype: 'Parenting',
  lessonuse: 'Child Development',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "c0d0a8ba-1620-459c-ae0d-98c8c97eb1cf",
  lesson:'Set your house in perfect order before you criticize the world.',
  lessonnotes: 'Before addressing external issues, Peterson suggests addressing personal challenges. Organizing ones life creates a stable foundation for making meaningful contributions to the broader community.',
  lessontype: 'Personal Development',
  lessonuse: 'Self-Improvement',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "2bd8398a-2a43-4668-823e-f137fffc4797",
  lesson: 'Pursue what is meaningful not what is expedient.',
  lessonnotes: 'Choosing meaningful pursuits over quick gains contributes to a fulfilling life. Peterson encourages aligning actions with long-term values, fostering a sense of purpose.',
  lessontype: 'Life Purpose',
  lessonuse: 'Decision-Making',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "a0a7531e-9e67-4469-ab76-28ad6b4cbdab",
  lesson: 'Tell the truth, or at least dont lie.',
  lessonnotes: 'Honesty, according to Peterson, is fundamental for personal integrity. Being truthful, even in challenging situations, builds trust and authentic connections.',
  lessontype: 'Integrity',
  lessonuse: 'Communication',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "dedd4aa8-a50a-4b9d-bc67-8a7dc9f90041",
  lesson: 'Assume that the person you are listening to might know something you dont.',
  lessonnotes: 'Encouraging open-mindedness, Peterson advises active listening. Being receptive to others perspectives fosters continuous learning and understanding.',
  lessontype: 'Communication',
  lessonuse: 'Empathy',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "1cbfbb8f-b63a-4190-98c1-f91156c757dc",
  lesson: 'Be precise in your speech.',
  lessonnotes: 'Clarity in communication is essential for effective expression. Peterson emphasizes the importance of articulating thoughts accurately to avoid misunderstandings.',
  lessontype: 'Communication',
  lessonuse: 'Effective Expression',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "794b8c93-ab11-4006-9931-18e9be91865d",
  lesson: 'Do not bother children when they are skateboarding.',
  lessonnotes: 'Acknowledging the importance of risk-taking and exploration in youth, Peterson suggests allowing children to engage in activities that promote independence and resilience.',
  lessontype: 'Parenting',
  lessonuse: 'Child Development',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_url: '/lesson_images/JordanPeterson.png',
},
{
  id: "0d8651ee-f170-4235-9747-f24c5ffd11d1",
  lesson: 'Pet a cat when you encounter one on the street.',
  lessonnotes: 'Encouraging small, positive actions in daily life, Peterson uses this rule metaphorically to highlight the significance of finding joy in simple moments.',
  lessontype: 'Life Satisfaction',
  lessonuse: 'Mindfulness',
  lessonsource: '12 Rules for Life: An Antidote to Chaos',
  lessonauthor: "Jordon Peterson",
  lessondate: "28/11/2023",
  lessonimage_URL: '/lesson_images/JordanPeterson.png',
}
];

const goaldata = [
{
  id: "eb0d0313-19c0-4b9c-9041-54c35b22860e",
  goaltype: "Having",
  goal: "A black Ferrari",
  goalnotes: "Must be no older than 2015 and have less than 100k miles on the clock",
  goaldate: "15/12/2023",
  goaltimeline: 6, //Months//
  goalurgency: 5, //Out of 5//
  goalrealisation: "I will know I have achieved this when the Ferrari is on my drive",
  goalreminder: "yes",
  goalachieved: "no",
},
{
  id: "e7dbc86e-fe2b-4128-ab31-1d6ba8c4b745",
  goaltype: "Doing",
  goal: "Travelling around Japan for a month",
  goalnotes: "Visit Tokyo for a week then see the rest o the country for 3 weeks",
  goaldate: "15/12/2023",
  goaltimeline: 3,  //Months//
  goalurgency: 3,  //Out of 5//
  goalrealisation: "When I have a photo album to look back on of all my adventures in Japan",
  goalreminder: "no",
  goalachieved: "yes",
},
{
  id: "51cf5f12-4c8b-4909-a0d7-d2f20bcc5ec7",
  goaltype: "Being",
  goal: "An excellent chef",
  goalnotes: "Master 7 dishes from a Michellin Star Cookbook",
  goaldate: "15/12/2023",
  goaltimeline: 1,  //Months//
  goalurgency: 4,  //Out of 5//
  goalrealisation: "When my family have rated every dish I have cooked for a week as delicious",
  goalreminder: "yes",
  goalachieved: "no",
}
]


module.exports = {
  users,
  customers,
  invoices,
  revenue,
  income,
  lessonfields,
  expenditure,
  goaldata,
  

};




















