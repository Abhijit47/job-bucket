import { IconBriefcase } from '@tabler/icons-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
// import { NavDocuments } from '@/features/dashboard/components/nav-documents';
// import { NavMain } from '@/features/dashboard/components/nav-main';
import { NavSecondary } from '@/features/dashboard/components/nav-secondary';
import { NavUser } from '@/features/dashboard/components/nav-user';
// import { authClient } from '@/lib/auth/client';
import { NavCandidate } from '@/features/candidate/components/nav-candidate';
import {
  checkAdminPermissions,
  checkCandidatePermissions,
  checkEmployerPermissions,
} from '@/lib/auth/checkPermissions';
import { requireAuth } from '@/lib/auth/requireAuth';
import Link from 'next/link';
import { NavAdmin } from './nav-admin';
import { NavEmployer } from './nav-employer';

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = await requireAuth();

  const canApplyJob = await checkCandidatePermissions(user.id);

  const canCreateJob = await checkEmployerPermissions(user.id);

  const canManageUsers = await checkAdminPermissions(user.id);

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:p-1.5!'>
              <Link href='/'>
                <IconBriefcase className='size-5!' />
                <span className='text-base font-semibold'>Job Bucket</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {canManageUsers.success ? <NavAdmin /> : null}
        {canCreateJob.success ? <NavEmployer /> : null}
        {canApplyJob.success ? <NavCandidate /> : null}
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
