import type { CivicInfo, Official } from '@/types';

const mockOfficials: Official[] = [
  {
    name: 'Eleanor Vance',
    title: 'U.S. Senator',
    party: 'Independent',
    photoUrl: 'https://picsum.photos/seed/vance/400/400',
    phone: '202-224-3121',
    website: 'https://example.com',
    level: 'federal',
    biography: 'Eleanor Vance has served in the Senate for over a decade, focusing on fiscal policy and international relations. She is known for her bipartisan approach and has championed several key pieces of legislation on campaign finance reform.',
    policyPositions: 'Supports renewable energy initiatives, universal healthcare, and advocates for stricter environmental regulations. Believes in a strong national defense and is a proponent of free trade agreements.',
    recentActivities: 'Recently co-sponsored a bill to expand internet access in rural areas and held town halls to discuss economic development. She has been vocal about the need for infrastructure investment.',
  },
  {
    name: 'Marcus Thorne',
    title: 'U.S. Representative',
    party: 'Blue Wave Party',
    photoUrl: 'https://picsum.photos/seed/thorne/400/400',
    phone: '202-225-3121',
    website: 'https://example.com',
    level: 'federal',
    biography: 'A former prosecutor, Marcus Thorne is in his third term. His work in the House centers on criminal justice reform and consumer protection. He serves on the Judiciary and Financial Services committees.',
    policyPositions: 'Advocates for criminal justice reform, including ending mandatory minimum sentences. Supports increased funding for public education and is a proponent of affordable housing initiatives.',
    recentActivities: 'Introduced legislation aimed at protecting consumers from predatory lending. Recently visited local schools to promote literacy programs.',
  },
  {
    name: 'Isabella Rossi',
    title: 'Governor',
    party: 'Sunrise Party',
    photoUrl: 'https://picsum.photos/seed/rossi/400/400',
    phone: '555-555-5555',
    website: 'https://example.com',
    level: 'state',
    biography: 'Governor Rossi, a former entrepreneur, is focused on boosting the state\'s economy through technology and innovation. She is the first woman to hold the state\'s highest office.',
    policyPositions: 'Prioritizes job growth through tax incentives for small businesses. Supports investment in public transportation and infrastructure. Advocates for expanding access to early childhood education.',
    recentActivities: 'Launched a statewide initiative to promote tourism. Signed a bill into law that provides grants for tech startups.',
  },
  {
    name: 'Javier Morales',
    title: 'State Senator',
    party: 'Blue Wave Party',
    photoUrl: 'https://picsum.photos/seed/morales/400/400',
    phone: '555-555-5556',
    website: 'https://example.com',
    level: 'state',
    biography: 'Javier Morales is a lifelong educator who brings a passion for public service to the state senate. He chairs the Education Committee and is a strong advocate for teachers and students.',
    policyPositions: 'Fights for increased teacher salaries and smaller class sizes. Supports universal pre-K programs. Works to make higher education more affordable.',
    recentActivities: 'Secured funding for new school construction projects. Regularly visits classrooms across the district to connect with educators and students.',
  },
  {
    name: 'Samantha Chen',
    title: 'Mayor',
    party: 'Independent',
    photoUrl: 'https://picsum.photos/seed/chen/400/400',
    phone: '555-555-5557',
    website: 'https://example.com',
    level: 'local',
    biography: 'Mayor Chen is a community organizer who was elected on a platform of government transparency and neighborhood empowerment. She is known for her hands-on approach to city governance.',
    policyPositions: 'Focuses on improving local parks and public spaces. Supports community policing initiatives and is working to create more bike lanes and pedestrian-friendly streets.',
    recentActivities: 'Hosted a series of community meetings to gather feedback on the city budget. Launched a program to support local artists and cultural events.',
  },
  {
    name: 'David Kim',
    title: 'City Council Member',
    party: 'Sunrise Party',
    photoUrl: 'https://picsum.photos/seed/kim/400/400',
    phone: '555-555-5558',
    website: 'https://example.com',
    level: 'local',
    biography: 'David Kim is a small business owner representing District 3. He is focused on revitalizing the downtown area and supporting local entrepreneurs.',
    policyPositions: 'Advocates for reducing red tape for new businesses. Supports mixed-use development projects. Works to improve waste management and recycling programs in the city.',
    recentActivities: 'Successfully passed an ordinance to simplify the permitting process for restaurants. Organized a "shop local" campaign to support neighborhood businesses.',
  },
];


export async function getCivicInfo(address: string): Promise<CivicInfo> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  if (address.toLowerCase().includes('fail')) {
    throw new Error('Could not find information for this address.');
  }

  const mockData: CivicInfo = {
    address,
    election: {
      name: 'General Midterm Election',
      date: 'November 5, 2024',
      registrationDeadline: 'October 15, 2024',
      url: 'https://example.com/vote',
    },
    pollingPlace: {
      name: 'Central City Public Library',
      address: '123 Main Street, Anytown, USA 12345',
      hours: '7:00 AM - 8:00 PM',
    },
    officials: mockOfficials,
  };

  return mockData;
}
