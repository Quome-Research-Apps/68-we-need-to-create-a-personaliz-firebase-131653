export interface Official {
  name: string;
  title: string;
  party: string;
  photoUrl: string;
  phone: string;
  website: string;
  level: 'federal' | 'state' | 'local';
  biography: string;
  policyPositions: string;
  recentActivities: string;
}

export interface Election {
  name: string;
  date: string;
  registrationDeadline: string;
  url: string;
}

export interface PollingPlace {
  name: string;
  address: string;
  hours: string;
}

export interface CivicInfo {
  address: string;
  election: Election;
  pollingPlace: PollingPlace;
  officials: Official[];
}
