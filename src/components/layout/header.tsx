'use client';

import { useCivicInfo } from '@/context/civic-info-provider';
import { Button } from '@/components/ui/button';
import { Landmark } from 'lucide-react';

export function Header() {
  const { civicInfo, clearCivicInfo } = useCivicInfo();

  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Landmark className="text-primary h-7 w-7" />
            <h1 className="text-2xl font-headline font-bold text-foreground">
              MyGov Home
            </h1>
          </div>
          {civicInfo && (
            <Button variant="outline" onClick={clearCivicInfo}>
              Change Address
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
