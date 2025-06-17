# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying to Netlify

To deploy this Next.js application to Netlify:

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
        *   `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret. (Note: The current Implicit Grant flow doesn't use this directly on Netlify, but it's good practice if you ever switch to a flow that needs it).
        *   `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI`: **CRITICAL!** Once Netlify gives your site its primary URL (e.g., `https://your-site-name.netlify.app`), you **must** set this variable to `https://your-site-name.netlify.app/callback`.
6.  **Update Spotify Developer Dashboard**:
    *   Go to your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
    *   Select your application.
    *   In the settings, add your new Netlify redirect URI (e.g., `https://your-site-name.netlify.app/callback`) to the list of allowed "Redirect URIs". **Your Spotify login will not work on the deployed site without this step.** You can have multiple redirect URIs listed, so you can keep your `http://localhost:3000/callback` or `http://localhost:9002/callback` for local development.
7.  **Deploy**:
    *   Click "Deploy site" (or trigger a deploy if you've already set up the site).

Netlify will build and deploy your application. The `@netlify/plugin-nextjs` (specified in `netlify.toml`) will handle the necessary configurations for Next.js features like server-side rendering, API routes, and image optimization. Check the deploy logs on Netlify if you encounter any issues.
