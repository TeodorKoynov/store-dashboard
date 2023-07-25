import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { BillboardClient } from './components/client';
import { BillboardColumn } from './components/columns';

type BillboardsPageProps = {
  params: { storeId: string };
};

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
