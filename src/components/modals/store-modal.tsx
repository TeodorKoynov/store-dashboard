'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

const formSchema = z.object({
  name: z.string().min(1),
});

export type StoreModalProps = unknown;

export const StoreModal: React.FC<StoreModalProps> = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // todo Create Store
    console.log(values);
  };

  return (
    <Modal
      title={'Create store'}
      description={'Add a new store to manage products and categories'}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={'E-Commerce'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={'name'}
              />
              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button variant={'outline'} onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button type={'submit'}>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
