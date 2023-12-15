# Ticketmaster Event Search App

This README provides instructions on how to set up and run the Ticketmaster Event Search application. The app allows users to search for events based on start and end times and a specific country. It utilizes the Ticketmaster API for fetching event data.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have a stable version of Node.js installed (recommended v20 or newer).
- You have npm installed.
- You have a basic understanding of React and Next.js.

## Installation

To install the Next.js Event Search app, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the necessary dependencies by running:
   ```bash
   npm install
   ```

## Setting Up Environment Variables

1. Obtain a Ticketmaster API key from the [Ticketmaster Developer Portal](https://developer.ticketmaster.com/).
2. Create a `.env.local` file in the root of your project.
3. Add the following line to the file, replacing `YOUR_API_KEY` with your actual API key:
   ```
   NEXT_PUBLIC_TICKETMASTER_API_KEY=YOUR_API_KEY
   ```

## Running the Application

To run the application in development mode, execute:

```bash
npm run dev
```

This starts the application on `http://localhost:3000`. Open this URL in your browser to interact with the app.

## App Structure

- `EventItem`: A React component that displays individual event details.
- `SearchEvents`: The main component that handles event searching, form submission, and rendering of search results.

## Features

- Search for events using start and end times, and country code.
- Display a list of events matching the search criteria.
- Navigate to event details via provided links.