'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  RocketLaunchIcon,

} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Lessons', href: '/dashboard/lessons', icon: AcademicCapIcon },
  { name: 'Daily Lessons Script', href: '/dashboard/lessons', icon: AcademicCapIcon },
  { name: 'Goals', href: '/dashboard/goals', icon: RocketLaunchIcon },
  { name: 'Goal Planner', href: '/dashboard/goal-planner', icon: UserGroupIcon },
  { name: 'Todays Actions', href: '/dashboard/todaysactions', icon: RocketLaunchIcon},
  { name: 'Extreme Practice', href: '/dashboard/practice', icon: UserGroupIcon },
  { name: 'Finances', href: '/dashboard/finances', icon: UserGroupIcon },
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
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md text-white bg-black-500 p-3 text-sm font-medium hover:bg-black-600 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
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
