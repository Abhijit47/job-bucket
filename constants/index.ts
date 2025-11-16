import {
  type Icon,
  IconAddressBook,
  IconBookmarkPlus,
  IconBriefcase,
  IconBriefcase2,
  IconBuilding,
  IconBuildingCommunity,
  IconCamera,
  IconChartBar,
  IconCirclePlus,
  IconCoinRupee,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconUserCircle,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react';
import type { Route } from 'next';
export const roleEnum = ['candidate', 'employer'] as const;

type RootNavItem<T extends string = string> = {
  href: T;
  label: string;
};

// Navigation links array to be used in both desktop and mobile menus
export const navigationLinks: RootNavItem<Route>[] = [
  { href: '/', label: 'Home' },
  { href: '#', label: 'Features' },
  { href: '#', label: 'Pricing' },
  { href: '#', label: 'About' },
];

type DashboardNavItem<T extends string = string> = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: {
    title: string;
    url: T;
    icon: Icon;
  }[];
  navClouds: {
    title: string;
    icon: Icon;
    isActive?: boolean;
    url: T;
    items: {
      title: string;
      url: T;
    }[];
  }[];
  navSecondary: {
    title: string;
    url: T;
    icon: Icon;
  }[];
  documents: {
    name: string;
    url: T;
    icon: Icon;
  }[];
  admin: {
    title: string;
    url: T;
    icon: Icon;
  }[];
  employer: {
    title: string;
    url: T;
    icon: Icon;
  }[];
  candidate: {
    title: string;
    url: T;
    icon: Icon;
  }[];
};

export const dashboardLinks: DashboardNavItem<Route> = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: IconListDetails,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: IconChartBar,
    },
    {
      title: 'Projects',
      url: '#',
      icon: IconFolder,
    },
    {
      title: 'Team',
      url: '#',
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase,
    },
    {
      name: 'Reports',
      url: '#',
      icon: IconReport,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: IconFileWord,
    },
  ],

  admin: [
    {
      title: 'Overview',
      url: '/admin',
      icon: IconDashboard,
    },
    {
      title: 'Manage Users',
      url: '#',
      icon: IconUsers,
    },
    {
      title: 'Manage Jobs',
      url: '#',
      icon: IconBriefcase,
    },
    {
      title: 'Manage Companies',
      url: '#',
      icon: IconBuilding,
    },
    {
      title: 'Reports',
      url: '#',
      icon: IconReport,
    },
    {
      title: 'Settings',
      url: '#',
      icon: IconUserCog,
    },
  ],
  employer: [
    {
      title: 'Overview',
      url: '/employer',
      icon: IconDashboard,
    },
    {
      title: 'Employer Profile',
      url: '/employer/profile',
      icon: IconAddressBook,
    },
    {
      title: 'Post a Job',
      url: '/employer/jobs/new',
      icon: IconBriefcase,
    },
    {
      title: 'My Jobs',
      url: '/employer/my-jobs',
      icon: IconBriefcase2,
    },
    {
      title: 'Saved Candidates',
      url: '/employer/saved-candidates',
      icon: IconBookmarkPlus,
    },
    {
      title: 'Plans & Billing',
      url: '/employer/plans',
      icon: IconCoinRupee,
    },
    {
      title: 'All Companies',
      url: '/employer/all-companies',
      icon: IconBuildingCommunity,
    },
    {
      title: 'Settings',
      url: '/employer/settings',
      icon: IconUserCog,
    },
  ],
  candidate: [
    {
      title: 'Overview',
      url: '/candidate',
      icon: IconDashboard,
    },
    {
      title: 'Candidate Profile',
      url: '#',
      icon: IconUserCircle,
    },
    {
      title: 'Search Jobs',
      url: '#',
      icon: IconCirclePlus,
    },
    {
      title: 'My Applications',
      url: '#',
      icon: IconBriefcase,
    },
    {
      title: 'Saved Jobs',
      url: '#',
      icon: IconBookmarkPlus,
    },
    {
      title: 'Plans & Billing',
      url: '#',
      icon: IconCoinRupee,
    },
    {
      title: 'Settings',
      url: '#',
      icon: IconUserCog,
    },
  ],
};
