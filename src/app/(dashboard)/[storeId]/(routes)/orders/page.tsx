import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';

type OrdersPageProps = {
  params: { storeId: string };
};

export default async function OrdersPage({ params }: OrdersPageProps) {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, 'MMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
