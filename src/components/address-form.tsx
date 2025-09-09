'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';
import { Loader2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCivicInfo } from '@/context/civic-info-provider';
import { getCivicInfo } from '@/lib/civic-api';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  address: z.string().min(5, {
    message: 'Please enter a valid address.',
  }),
});

export function AddressForm() {
  const [isPending, startTransition] = useTransition();
  const { setCivicInfo } = useCivicInfo();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const info = await getCivicInfo(values.address);
        setCivicInfo(info);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      }
    });
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Find Your Civic Info</CardTitle>
          <CardDescription className="text-lg">
            Enter your address to find your polling place, upcoming elections, and elected officials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Address</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1600 Pennsylvania Ave NW, Washington, DC 20500" {...field} className="h-12 text-lg"/>
                    </FormControl>
                    <FormDescription>
                      Your address is used only to find your civic information and is not stored on our servers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full h-12 text-lg" size="lg">
                {isPending ? <Loader2 className="animate-spin" /> : <Search />}
                Find My Info
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
