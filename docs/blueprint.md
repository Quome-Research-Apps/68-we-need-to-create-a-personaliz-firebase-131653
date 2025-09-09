# **App Name**: MyGov Home

## Core Features:

- Location Finder: Asks the user to enter their address. This information is geocoded into latitude and longitude for use in API calls to the Civic Information API.
- Civic Information API Integration: Connects to the Google Civic Information API to fetch election details, polling locations, and representative information based on the user's location.
- Election Information Display: Shows upcoming election dates, voter registration deadlines, and links to official election resources.
- Representative Display: Lists the user's elected officials at various levels of government, including names, contact information, and links to official websites. May incorporate a tool to identify officials and contact them with personalized messages generated from a users own viewpoint and values, using the data on those officials made available via the API.
- Polling Place Finder: Displays the user's polling place address and hours of operation.
- Local Storage Persistence: Stores the user's address and fetched civic information in the browser's local storage to provide a persistent, personalized experience without requiring a user account or backend server.
- Information Tool: Offers summaries and contextual data on representatives derived using a generative AI tool.

## Style Guidelines:

- Primary color: Deep Blue (#3F51B5) to convey trust and authority.
- Background color: Light Gray (#F0F2F5) for a clean, neutral backdrop.
- Accent color: Teal (#009688) for interactive elements and calls to action.
- Body font: 'PT Sans', a humanist sans-serif for clear readability.
- Headline font: 'Space Grotesk', a sans-serif, giving a modern edge when paired with PT Sans for body.
- Use simple, recognizable icons from a library like FontAwesome to represent different levels of government and types of information.
- Design a clean and responsive layout with a clear hierarchy of information. Prioritize key information like election dates and polling place locations.