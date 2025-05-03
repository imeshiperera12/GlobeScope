# Country Explorer

A React application that provides information about countries around the world using the REST Countries API. This project was created as part of the SE3040 Application Frameworks assignment.

## Features

- View a list of all countries with basic information
- Search for countries by name
- Filter countries by region
- Filter countries by language
- Add to Favorite
- View detailed information about a specific country
- Display special events images about a specific country
- Responsive design that works on mobile and desktop
- User authentication (simulated)

## Live Demo

[Link to the deployed application](https://country-explorer-se3040.netlify.app)

## Technologies Used

- React (Functional Components)
- React Router for navigation
- Context API for state management
- REST Countries API for data
- Bootstrap CSS for styling
- Jest and React Testing Library for testing

## API Endpoints Used

- GET /all - To get all countries
- GET /name/{name} - To search for countries by name
- GET /region/{region} - To filter countries by region
- GET /lang/{language} - To filter countries by language
- GET /alpha/{code} - To get detailed information about a specific country

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/country-explorer.git
cd country-explorer


2. Install dependencies:

npm install


3. Start the development server:

npm start


4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production


npm run build


This will create an optimized production build in the build folder.

## Running Tests

npm test



## Challenges and Solutions

### Challenge 1: Managing Multiple Filters
The application needed to handle multiple filters (search, region, language) that could be applied simultaneously. This was solved by using a combination of useEffect hooks and state management to track filter changes and apply them in the correct order.

### Challenge 2: Optimizing API Calls
To avoid unnecessary API calls, we implemented debouncing for the search functionality and maintained a cache of previously fetched countries. This significantly improved performance when users were quickly switching between filters.

### Challenge 3: Responsive Design
Creating a responsive design that worked well on both mobile and desktop was challenging. We used Bootstrap CSS's responsive utilities and flexbox/grid layouts to ensure the application looks good on all screen sizes.

## Future Improvements

- Add more detailed country information
- Implement favorites functionality
- Add more comprehensive filtering options
- Implement real authentication with JWT

