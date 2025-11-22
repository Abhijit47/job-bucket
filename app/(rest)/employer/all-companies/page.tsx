import { DataTable } from '@/features/dashboard/components/data-table';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import data from '@/features/dashboard/data/data.json';

export default async function AllCompaniesPage() {
  await withEmployerAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <Card>
        <CardHeader>
          <CardTitle>All Companies</CardTitle>
        </CardHeader>
        <CardContent className={'px-0'}>
          <DataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
