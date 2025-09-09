import type { Official } from '@/types';
import { RepresentativeCard } from './representative-card';
import { Landmark } from 'lucide-react';

interface RepresentativesSectionProps {
  officials: Official[];
}

export function RepresentativesSection({ officials }: RepresentativesSectionProps) {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-headline flex items-center justify-center gap-3">
            <Landmark className="text-primary h-8 w-8"/>
            Your Elected Officials
        </h2>
        <p className="text-muted-foreground mt-2">
          Contact your representatives about issues that matter to you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officials.map(official => (
          <RepresentativeCard key={official.name} official={official} />
        ))}
      </div>
    </section>
  );
}
