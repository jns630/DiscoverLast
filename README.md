
# Last.fm Uncharted Tracks

## Overview

Last.fm Uncharted Tracks is a Next.js web application designed to help music enthusiasts discover new songs they've likely never heard before. By leveraging a user's Last.fm listening history (scrobbles) and/or manually inputted favorite artists/tracks, the application uses AI (powered by Google's Gemini model via Genkit) to curate a personalized playlist of "uncharted" songs. Users can then log in with their Spotify account to save this discovered playlist directly to their Spotify library.

## Features

*   **Personalized Music Discovery**: Generates playlists based on user's Last.fm scrobbles or manually entered favorite tracks.
*   **AI-Powered Curation**: Uses Genkit and Google's Gemini model to intelligently select tracks the user might like but hasn't heard.
*   **Last.fm Integration**:
    *   Fetches recent scrobbles for a given Last.fm username.
    *   Uses Last.fm API (via a Genkit tool) to find tracks similar to the user's taste as seeds for the AI.
*   **Spotify Integration**:
    *   Allows users to log in with their Spotify account (OAuth 2.0 Implicit Grant Flow).
    *   Saves the generated "Uncharted Playlist" to the user's Spotify account.
    *   Searches for tracks on Spotify to match songs from the AI-generated list.
*   **Responsive UI**: Built with ShadCN UI components and Tailwind CSS for a modern and clean user experience.

## Tech Stack

*   **Frontend**: Next.js (App Router), React, TypeScript
*   **Styling**: Tailwind CSS, ShadCN UI
*   **AI/Generative**: Genkit, Google Gemini
*   **APIs**:
    *   Last.fm API (for fetching similar tracks and user scrobbles)
    *   Spotify Web API (for user authentication, track searching, and playlist creation)
*   **Deployment**: Configured for Netlify (but adaptable to other Next.js hosting platforms)

## Getting Started

Follow these instructions to get the project set up and running on your local machine.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Environment Setup

The application requires several API keys and configuration settings. Create a `.env` file in the root of your project by copying the example or creating a new one:

```
# .env

# Google API Key (for Genkit/Gemini)
# - Go to Google AI Studio or Google Cloud Console to get your API key.
# - Ensure the Generative Language API (or Vertex AI API if using Vertex) is enabled for your project.
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE

# Last.fm API Key
# - Go to https://www.last.fm/api/account/create to create an API account.
LASTFM_API_KEY=YOUR_LASTFM_API_KEY_HERE

# Spotify Credentials
# - Go to the Spotify Developer Dashboard: https://developer.spotify.com/dashboard/
# - Create an app or use an existing one.
# - You'll find your Client ID and Client Secret there.
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID_HERE
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET_HERE # Note: Secret is not used by current Implicit Grant flow but good to have for future.

# Spotify Redirect URI (for local development)
# This MUST match one of the Redirect URIs you set in your Spotify Developer Dashboard.
# If your local dev server runs on port 3000:
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
# If your local dev server runs on port 9002 (as per package.json dev script):
# NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:9002/callback
```

**Replace placeholders like `YOUR_GOOGLE_API_KEY_HERE` with your actual keys.**

### 3. Spotify Application Setup (Developer Dashboard)

For Spotify login to work, you need to configure Redirect URIs in your Spotify application settings on the Spotify Developer Dashboard:

1.  Go to [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/).
2.  Select your application.
3.  Go to "Edit Settings".
4.  Under "Redirect URIs", add the URI you are using for local development. For example:
    *   `http://localhost:3000/callback` (if your app runs on port 3000)
    *   `http://localhost:9002/callback` (if your app runs on port 9002, matching the `npm run dev` script in `package.json`)
5.  You can add multiple Redirect URIs. You will also need to add your deployed application's callback URI here once it's live (see Deployment section).

### 4. Install Dependencies

```bash
npm install
# or
yarn install
```

### 5. Run the Development Server

```bash
npm run dev
```
This command (from `package.json`) typically starts the Next.js app on `http://localhost:9002` and the Genkit development server.
Open your browser and navigate to the specified local URL (e.g., `http://localhost:9002`).

## Deployment

This application is configured for deployment to Netlify.

### Deploying to Netlify

1.  **Push your code to a Git provider** (GitHub, GitLab, Bitbucket).
2.  **Sign up or Log in to Netlify**.
3.  **Connect your Git repository to Netlify**:
    *   On your Netlify dashboard, click on "Add new site" (or "Sites" then "Add new site") > "Import an existing project".
    *   Choose your Git provider and select your repository.
4.  **Configure Build Settings**:
    *   Netlify should auto-detect that this is a Next.js project. The `netlify.toml` file in this repository provides the basic build configuration.
    *   **Build command**: `npm run build` (This should be automatically picked up from `netlify.toml` or auto-detected).
    *   **Publish directory**: `.next` (This should be automatically picked up from `netlify.toml` or auto-detected).
    *   Ensure the "Next.js Runtime" (plugin: `@netlify/plugin-nextjs`) is active. It usually gets installed automatically.
5.  **Set Environment Variables on Netlify**:
    *   Before you click "Deploy site" (or after, by going to your site's settings), navigate to: Site settings > Build & deploy > Environment.
    *   Click "Edit variables" and add the following:
        *   `GOOGLE_API_KEY`: Your Google API key for Gemini.
        *   `LASTFM_API_KEY`: Your Last.fm API key.
        *   `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`: Your Spotify Client ID.
        *   `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret.
        *   `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI`: **CRITICAL!** Once Netlify gives your site its primary URL (e.g., `https://your-site-name.netlify.app`), you **must** set this variable to `https://your-site-name.netlify.app/callback`.
6.  **Update Spotify Developer Dashboard for Deployed App**:
    *   Go to your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
    *   Select your application.
    *   In the settings, add your new Netlify redirect URI (e.g., `https://your-site-name.netlify.app/callback`) to the list of allowed "Redirect URIs". **Your Spotify login will not work on the deployed site without this step.** You can have multiple redirect URIs listed, so you can keep your local development URI as well.
7.  **Deploy**:
    *   Click "Deploy site" (or trigger a deploy if you've already set up the site).

Netlify will build and deploy your application. The `@netlify/plugin-nextjs` (specified in `netlify.toml`) will handle the necessary configurations for Next.js features like server-side rendering, API routes, and image optimization. Check the deploy logs on Netlify if you encounter any issues.

## Project Structure

A brief overview of key directories:

*   `src/app/`: Contains the main application pages (using Next.js App Router).
    *   `page.tsx`: The main discover playlist page.
    *   `callback/page.tsx`: Handles Spotify OAuth callback.
    *   `layout.tsx`: Root layout.
    *   `globals.css`: Global styles and Tailwind CSS theme.
*   `src/ai/`: Contains AI-related logic using Genkit.
    *   `genkit.ts`: Genkit initialization.
    *   `flows/`: Genkit flows (e.g., `discover-playlist-flow.ts`).
    *   `tools/`: Genkit tools (e.g., `lastfm-tool.ts`).
*   `src/components/`: Reusable React components.
    *   `ui/`: ShadCN UI components.
*   `src/hooks/`: Custom React hooks (e.g., `use-toast.ts`).
*   `src/lib/`: Utility functions and services.
    *   `spotify-service.ts`: Functions for interacting with the Spotify API.
    *   `utils.ts`: General utility functions.
*   `public/`: Static assets.
*   `.env`: Environment variables (API keys, configuration). Not committed to Git.
*   `netlify.toml`: Netlify deployment configuration.
*   `next.config.ts`: Next.js configuration.

## How It Works

1.  **User Input**: The user provides their Last.fm username (optional) and/or a list of favorite artists/tracks.
2.  **Fetch Recent Scrobbles (Optional)**: If a Last.fm username is provided, the app fetches the user's 3 most recent scrobbles using a Genkit tool that calls the Last.fm API.
3.  **AI Playlist Generation**:
    *   The combined user input (manual entries + recent scrobbles) is sent to the `discoverPlaylistFlow` Genkit flow.
    *   This flow uses the Gemini model and the `getLastFmSimilarTracks` tool.
    *   The AI is prompted to select seed tracks, fetch similar tracks from Last.fm, filter out known songs, and generate a playlist of a specified number of "uncharted" songs with reasons for recommendation.
4.  **Display Playlist**: The generated playlist is displayed to the user.
5.  **Spotify Login & Save (Optional)**:
    *   The user can log in with Spotify. This uses an OAuth Implicit Grant flow, redirecting to Spotify and then back to the app's `/callback` page to retrieve an access token.
    *   Once logged in, the user can click "Save to Spotify".
    *   The `spotify-service.ts` functions are used to:
        *   Get the user's Spotify ID.
        *   Create a new playlist in the user's Spotify account.
        *   Search for each song from the "Uncharted Playlist" on Spotify to find its URI.
        *   Add the found Spotify tracks to the newly created playlist.
    *   A toast notification confirms the playlist save.

---

This README was generated with assistance from Firebase Studio.
If you are using Firebase Studio, remember that changes to your application code are made via specific XML-formatted responses from the AI.
```