import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { SizeClient } from './components/client';
import { SizeColumn } from './components/columns';

type SizesPageProps = {
  params: { storeId: string };
};

export default async function SizesPage({ params }: SizesPageProps) {
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}
