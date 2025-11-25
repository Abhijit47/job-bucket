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
  IconSend,
  IconUserCircle,
  IconUserCog,
  IconUsers,
  IconUserStar,
} from '@tabler/icons-react';
import type { Route } from 'next';
export const roleEnum = ['candidate', 'employer'] as const;

type RootNavItem<T extends string = string> = {
  id: string;
  href: T;
  label: string;
};

// Navigation links array to be used in both desktop and mobile menus
export const navigationLinks: RootNavItem<Route>[] = [
  // { href: '/', label: 'Home' },
  // { href: '#', label: 'Features' },
  // { href: '#', label: 'Pricing' },
  // { href: '#', label: 'About' },
  {
    id: crypto.randomUUID(),
    label: 'Explore Jobs',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    label: 'Company',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    label: 'Blog',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    label: 'Contact',
    href: '#',
  },
];

type FooterLinkItem<T extends string = string> = {
  company: { id: string; label: string; href: T }[];
  features: { id: string; label: string; href: T }[];
  resources: { id: string; label: string; href: T }[];
};

export const footerLinks: FooterLinkItem<Route> = {
  company: [
    {
      id: crypto.randomUUID(),
      label: 'Our Mission',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Our Vision',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Our Story',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Meet Our Team',
      href: '#',
    },
  ],
  features: [
    {
      id: crypto.randomUUID(),
      label: 'Job Search',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Browse Industries',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Career Resources',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Job Alerts',
      href: '#',
    },
  ],
  resources: [
    {
      id: crypto.randomUUID(),
      label: 'Blog',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Case Studies',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'Whitepapers',
      href: '#',
    },
    {
      id: crypto.randomUUID(),
      label: 'eBooks',
      href: '#',
    },
  ],
};

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
      url: '/admin/manage-users',
      icon: IconUsers,
    },
    {
      title: 'Manage Applicants',
      url: '/admin/manage-applicants',
      icon: IconUserStar,
    },
    {
      title: 'Manage Jobs',
      url: '/admin/manage-jobs',
      icon: IconBriefcase,
    },
    {
      title: 'Manage Companies',
      url: '/admin/manage-companies',
      icon: IconBuilding,
    },
    {
      title: 'Reports',
      url: '/admin/reports',
      icon: IconReport,
    },
    {
      title: 'Settings',
      url: '/admin/settings',
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
      url: '/candidate/profile',
      icon: IconUserCircle,
    },
    {
      title: 'My Applications',
      url: '/candidate/applied',
      icon: IconSend,
    },
    {
      title: 'Saved Jobs',
      url: '/candidate/saved-jobs',
      icon: IconBookmarkPlus,
    },
    {
      title: 'Plans & Billing',
      url: '/candidate/plans',
      icon: IconCoinRupee,
    },
    {
      title: 'Settings',
      url: '/candidate/settings',
      icon: IconUserCog,
    },
  ],
};
