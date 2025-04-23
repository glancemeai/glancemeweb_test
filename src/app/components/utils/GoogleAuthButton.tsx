"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/app/redux/utils/message';
import Apis from '@/app/service/hooks/ApiSlugs';
import { FcGoogle } from 'react-icons/fc';
import styles from './GoogleAuthButton.module.css';

interface GoogleAuthButtonProps {
  mode: 'login' | 'signup';
  onSuccess?: (data: any) => void;
}

export default function GoogleAuthButton({ mode, onSuccess }: GoogleAuthButtonProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const apis = Apis();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => initializeGoogleSignIn();

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (typeof window === 'undefined' || !window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: mode === 'login' ? 'signin_with' : 'signup_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: buttonRef.current.clientWidth,
    });
  };

  const handleGoogleResponse = async (response: any) => {
    try {
      const decoded = decodeJwtResponse(response.credential);
      console.log('Google user info:', decoded);

      // Use different API methods based on mode
      if (mode === 'login') {
        // Login flow
        const result = await apis.GoogleLogin(decoded);
        
        if (result.status === 200) {
          let cookie = `authorization=${result?.data?.token}; `;
          cookie += "path=/; ";
          cookie += `max-age=${60 * 60 * 24 * 365}; `;
          cookie += "SameSite=None; Secure;";
          document.cookie = cookie;
          
          if (result?.data?.user?.name) {
            localStorage.setItem('userName', result.data.user.name);
          }
          if (result?.data?.user?.image) {
            localStorage.setItem('userProfileImage', result.data.user.image);
          }
          if (result?.data?.token) {
            localStorage.setItem('token', result.data.token);
          }
          
          dispatch(setAlert({
            data: {
              message: 'Login successful! Redirecting to dashboard...',
              show: true,
              type: 'success'
            }
          }));

          if (onSuccess) {
            onSuccess(result.data);
          }

          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
        } else {
          dispatch(setAlert({
            data: {
              message: result.message || 'Google login failed',
              show: true,
              type: 'error'
            }
          }));
        }
      } else {
        // Signup flow
        const result = await apis.GoogleSignup(decoded);
        
        if (result.status === 200) {
          dispatch(setAlert({
            data: {
              message: 'Signup successful! Please login now',
              show: true,
              type: 'success'
            }
          }));

          if (onSuccess) {
            onSuccess(result.data);
          }

          setTimeout(() => {
            router.push('/login');
          }, 500);
        } else {
          dispatch(setAlert({
            data: {
              message: result.message || 'Google signup failed',
              show: true,
              type: 'error'
            }
          }));
        }
      }
    } catch (error: any) {
      console.error(`Error during Google ${mode}:`, error);
      dispatch(setAlert({
        data: {
          message: error.message || `An error occurred during Google ${mode}`,
          show: true,
          type: 'error'
        }
      }));
    }
  };

  const handleManualGoogleClick = () => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('Google Sign-In popup could not be displayed');
          dispatch(setAlert({
            data: {
              message: 'Google Sign-In is not available at the moment. Please try again later or use email login.',
              show: true,
              type: 'error'
            }
          }));
        }
      });
    } else {
      dispatch(setAlert({
        data: {
          message: 'Google Sign-In is not available. Please try again later or use email login.',
          show: true,
          type: 'error'
        }
      }));
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

  return (
    <>
      <div className={styles.googleButtonContainer}>
        <div ref={buttonRef} className={styles.googleButton}></div>
        <button 
          onClick={handleManualGoogleClick} 
          className={styles.fallbackButton}
        >
          <FcGoogle className={styles.googleIcon} />
          {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
        </button>
      </div>
    </>
  );
} 