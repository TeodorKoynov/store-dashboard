'use client';

import { useState } from 'react';
import { useStoreModal } from '@/hooks/use-store-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/stores', values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
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
                      <Input disabled={loading} placeholder={'E-Commerce'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={'name'}
              />
              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button disabled={loading} variant={'outline'} onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type={'submit'}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
