'use client';

import type { Official } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare } from 'lucide-react';
import { ContactOfficialDialog } from './contact-official-dialog';
import { RepresentativeSummarySheet } from './representative-summary-sheet';

interface RepresentativeCardProps {
  official: Official;
}

export function RepresentativeCard({ official }: RepresentativeCardProps) {
    const [isContactOpen, setContactOpen] = useState(false);
    const [isSummaryOpen, setSummaryOpen] = useState(false);

    const getPartyColor = (party: string) => {
        if (party.toLowerCase().includes('blue')) return 'bg-blue-500 hover:bg-blue-600';
        if (party.toLowerCase().includes('sunrise')) return 'bg-yellow-500 hover:bg-yellow-600';
        return 'bg-gray-500 hover:bg-gray-600';
    }

  return (
    <>
      <Card className="flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={official.photoUrl} alt={official.name} data-ai-hint="person portrait" />
            <AvatarFallback>{official.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl font-headline">{official.name}</CardTitle>
            <p className="text-muted-foreground">{official.title}</p>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
          <div className="flex justify-between items-center">
             <Badge variant="secondary" className="capitalize">{official.level}</Badge>
             <Badge className={getPartyColor(official.party)}>{official.party}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
            <Button variant="outline" className="w-full" onClick={() => setSummaryOpen(true)}>
                <Bot /> AI Summary
            </Button>
            <Button className="w-full" onClick={() => setContactOpen(true)}>
                <MessageSquare /> Contact
            </Button>
        </CardFooter>
      </Card>
      
      <ContactOfficialDialog open={isContactOpen} onOpenChange={setContactOpen} official={official} />
      <RepresentativeSummarySheet open={isSummaryOpen} onOpenChange={setSummaryOpen} official={official} />
    </>
  );
}
