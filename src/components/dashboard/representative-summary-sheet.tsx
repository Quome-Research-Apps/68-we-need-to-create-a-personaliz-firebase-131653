'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { summarizeRepresentativeInfo } from '@/ai/flows/summarize-representative-info';
import type { Official } from '@/types';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface RepresentativeSummarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  official: Official;
}

export function RepresentativeSummarySheet({ open, onOpenChange, official }: RepresentativeSummarySheetProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && !summary && !loading) {
      const fetchSummary = async () => {
        setLoading(true);
        try {
          const result = await summarizeRepresentativeInfo({
            name: official.name,
            party: official.party,
            biography: official.biography,
            contactInformation: `Phone: ${official.phone}, Website: ${official.website}`,
            policyPositions: official.policyPositions,
            recentActivities: official.recentActivities,
          });
          setSummary(result.summary);
        } catch (error) {
          console.error(error);
          toast({
            variant: 'destructive',
            title: 'Summary Failed',
            description: 'Could not generate a summary for this representative.',
          });
          onOpenChange(false); // Close sheet on error
        } finally {
          setLoading(false);
        }
      };
      fetchSummary();
    }
    
    if(!open) {
        // Reset summary when sheet is closed for next time
        setSummary(null);
    }
  }, [open, official, toast, onOpenChange, summary, loading]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">AI Summary: {official.name}</SheetTitle>
          <SheetDescription>
            An AI-generated summary of the representative's positions and activities.
            <div className="flex gap-2 pt-2">
                <Badge variant="secondary" className="capitalize">{official.level}</Badge>
                <Badge>{official.party}</Badge>
            </div>
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4"/>
        <div className="space-y-4 py-4">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          ) : (
            <p className="whitespace-pre-wrap font-body leading-relaxed">{summary}</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
