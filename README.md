SagnirV2 is a modern web application built with Next.js, designed to provide users with a rich experience of Icelandic folklore stories. It leverages server-side rendering for better performance and SEO, along with a seamless user interface.

Features
Server-side rendering with Next.js for fast and optimized performance.
Responsive layout that adapts to all screen sizes.
Real-time fetching of Icelandic folklore data via custom API routes.
Built-in caching for improved data fetching performance.
Search functionality for finding stories by name.
Tech Stack
Frontend: Next.js, React, Tailwind CSS
Backend: Next.js API routes for handling server-side logic
Database: No database required (fetches stories directly from an external API)
Styling: Tailwind CSS for responsive and customizable UI components
Getting Started
To get started with the project, clone this repository and follow the instructions below:

Prerequisites
Ensure you have the following installed:

Node.js (version 14.x or higher)
npm or yarn
Installation
Clone the repository:

bash

git clone https://github.com/your-username/sagnir-v2.git
Navigate into the project directory:

bash

cd sagnir-v2
Install dependencies:

If you're using npm:

bash

npm install
Or if you're using yarn:

bash

yarn install
Run the development server:

bash
Copier
Modifier
npm run dev
Or with yarn:

bash
Copier
Modifier
yarn dev
Open your browser and go to http://localhost:3000 to see the app in action.

API Routes
The app has several API routes for fetching data from an external folklore API.

/api/[category]: Fetches all stories for a specific category (e.g., "troll", "draug").
/api/[category]/[story]: Fetches data for a specific story within a category.
Deployment
Vercel Deployment
The project is optimized for deployment on Vercel. To deploy on Vercel:

Push your code to a GitHub repository.
Link the repository to your Vercel account.
Vercel will automatically build and deploy the project.
License
This project is licensed under the MIT License - see the LICENSE file for details.
