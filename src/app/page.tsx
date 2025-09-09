'use client';

import { useCivicInfo } from '@/context/civic-info-provider';
import { Header } from '@/components/layout/header';
import { AddressForm } from '@/components/address-form';
import { Dashboard } from '@/components/dashboard/dashboard';
import { Skeleton } from '@/components/ui/skeleton';

function FullPageLoader() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Skeleton className="h-40 w-full" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const { civicInfo, loading } = useCivicInfo();

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {civicInfo ? <Dashboard data={civicInfo} /> : <AddressForm />}
      </main>
    </div>
  );
}
