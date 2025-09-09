import type { PollingPlace } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PollingPlaceCardProps {
  pollingPlace: PollingPlace;
}

export function PollingPlaceCard({ pollingPlace }: PollingPlaceCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pollingPlace.address)}`;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-headline">
          <Vote className="text-primary" />
          Your Polling Place
        </CardTitle>
        <CardDescription>{pollingPlace.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-lg">{pollingPlace.address}</p>
            <p className="text-muted-foreground">Address</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-md">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-lg">{pollingPlace.hours}</p>
            <p className="text-muted-foreground">Polling Hours</p>
          </div>
        </div>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            Get Directions
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
