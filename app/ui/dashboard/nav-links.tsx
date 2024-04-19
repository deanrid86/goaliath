'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  AdjustmentsVerticalIcon,
  ShareIcon,
  PencilSquareIcon,
  BoltIcon,
  CalendarDaysIcon,
  FingerPrintIcon,
  InboxArrowDownIcon,
  BookOpenIcon

} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Goal Planner', href: '/dashboard/goal-planner', icon: PencilSquareIcon },
  { name: 'Goals', href: '/dashboard/goals', icon: BoltIcon },
  { name: 'Mental Models', href: '/dashboard/mentalmodels', icon: ShareIcon },
  { name: 'Lessons', href: '/dashboard/lessons', icon: AcademicCapIcon },
  { name: 'Todays Actions', href: '/dashboard/todaysactions', icon: CalendarDaysIcon},
  { name: 'Assistants', href: '/dashboard/assistants', icon: AdjustmentsVerticalIcon },
  { name: 'Growth Literature', href: '/dashboard/growth_literature', icon: BookOpenIcon },
  { name: 'About', href: '/dashboard/about', icon: FingerPrintIcon },
  { name: 'Contact Us', href: '/dashboard/contactus', icon: InboxArrowDownIcon },

  
];


export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md text-white bg-black-500 p-3 text-sm font-medium hover:bg-black-600 hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-black-600 text-blue': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
