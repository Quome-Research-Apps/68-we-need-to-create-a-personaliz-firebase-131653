import type { Election } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ElectionInfoCardProps {
  election: Election;
}

export function ElectionInfoCard({ election }: ElectionInfoCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-headline">
          <CalendarDays className="text-primary" />
          Upcoming Election
        </CardTitle>
        <CardDescription>{election.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-lg">{election.date}</p>
            <p className="text-muted-foreground">Election Day</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-lg">{election.registrationDeadline}</p>
            <p className="text-muted-foreground">Voter Registration Deadline</p>
          </div>
        </div>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={election.url} target="_blank" rel="noopener noreferrer">
            Official Election Resources
            <ArrowRight className="ml-2"/>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
