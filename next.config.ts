
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      { // Added for Last.fm album art
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        port: '',
        pathname: '/**',
      }
    ],
  },
  devIndicators: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1750119743842.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
