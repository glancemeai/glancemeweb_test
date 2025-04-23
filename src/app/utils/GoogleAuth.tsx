"use client";

import { useEffect } from 'react';

// This function initializes the Google OAuth client
export const initGoogleAuth = (callback: (userInfo: any) => void) => {
  // Check if the Google API is already loaded
  if (typeof window !== 'undefined' && window.google) {
    return;
  }

  // Load the Google API script
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    if (typeof window !== 'undefined' && window.google) {
      console.log('Google API loaded');
    }
  };
};

// This function handles Google sign-in
export const handleGoogleSignIn = (callback: (userInfo: any) => void) => {
  if (typeof window === 'undefined' || !window.google) {
    console.error('Google API not loaded');
    return;
  }

  try {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (response: any) => {
        // Decode the JWT token to get user info
        const decodedToken = decodeJwtResponse(response.credential);
        callback(decodedToken);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.log('Google Sign-In popup was not displayed or was skipped', notification);
        // You can implement fallback or alternative sign-in options here
      }
    });
  } catch (error) {
    console.error('Error initializing Google Sign-In:', error);
  }
};

// Decode the JWT token from Google
function decodeJwtResponse(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// Declare global window interface to include Google API
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback: (notification: any) => void) => void;
          renderButton: (element: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

export default {
  initGoogleAuth,
  handleGoogleSignIn,
}; 