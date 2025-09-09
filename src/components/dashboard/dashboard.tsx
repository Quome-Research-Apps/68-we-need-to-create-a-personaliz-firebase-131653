import type { CivicInfo } from '@/types';
import { ElectionInfoCard } from './election-info-card';
import { PollingPlaceCard } from './polling-place-card';
import { RepresentativesSection } from './representatives-section';

interface DashboardProps {
  data: CivicInfo;
}

export function Dashboard({ data }: DashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-muted-foreground">Showing information for:</p>
          <h2 className="text-2xl font-semibold font-headline">{data.address}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            <ElectionInfoCard election={data.election} />
            <PollingPlaceCard pollingPlace={data.pollingPlace} />
        </div>
        
        <RepresentativesSection officials={data.officials} />

      </div>
    </div>
  );
}
