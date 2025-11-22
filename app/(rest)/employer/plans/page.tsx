import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EmployerPricing from '@/features/employer/components/pricing-component';
import { withEmployerAuth } from '@/lib/auth/withEmployerAuth';

export default async function EmployerPlansPage() {
  await withEmployerAuth();

  return (
    <div className='flex flex-col gap-4 px-6 py-4 md:gap-6 md:py-6'>
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plans</CardTitle>
          <CardDescription>
            Choose the plan that fits your hiring needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployerPricing />
        </CardContent>
      </Card>
    </div>
  );
}
