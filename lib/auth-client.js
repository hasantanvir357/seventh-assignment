import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL:
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'https://bazardorapp.netlify.app',
});

export const { signIn, signUp, useSession, signOut } = authClient;
