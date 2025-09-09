'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { Copy, Loader2, Bot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { Official } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { generateContactMessage } from '@/ai/flows/generate-contact-message';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  issue: z.string().min(10, {
    message: 'Please describe the issue in at least 10 characters.',
  }),
  viewpoint: z.string().min(10, {
    message: 'Please describe your viewpoint in at least 10 characters.',
  }),
});

interface ContactOfficialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  official: Official;
}

export function ContactOfficialDialog({ open, onOpenChange, official }: ContactOfficialDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [generatedMessage, setGeneratedMessage] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issue: '',
      viewpoint: '',
    },
  });
  
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
        // Reset state when closing
        form.reset();
        setGeneratedMessage('');
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await generateContactMessage({
          officialName: official.name,
          officialDetails: `Title: ${official.title}, Party: ${official.party}`,
          issue: values.issue,
          viewpoint: values.viewpoint,
        });
        setGeneratedMessage(result.message);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Message Generation Failed',
          description: 'Could not generate a message at this time. Please try again later.',
        });
      }
    });
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast({
        title: "Copied to clipboard!",
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Contact {official.name}</DialogTitle>
          <DialogDescription>
            Describe your issue and viewpoint, and our AI assistant will help you draft a personalized message.
          </DialogDescription>
        </DialogHeader>
        {!generatedMessage ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Climate change, healthcare reform, local infrastructure" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="viewpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Viewpoint & Values</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., I believe we need stronger environmental protections because..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                  {isPending ? <Loader2 className="animate-spin" /> : <Bot />}
                  Generate Message
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Generated Message:</h3>
            <Textarea readOnly value={generatedMessage} className="h-48 bg-muted" />
            <Separator />
            <DialogFooter className="gap-2">
                 <Button variant="outline" onClick={() => setGeneratedMessage('')}>Start Over</Button>
                 <Button onClick={copyToClipboard}>
                    <Copy /> Copy Message
                </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
