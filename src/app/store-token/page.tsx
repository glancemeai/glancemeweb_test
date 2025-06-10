'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function StoreTokenwithParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem('google_access_token', token);
      router.push('/meetingScheduler');
    } else {
      router.push('/?error=missing_token');
    }
  }, [token]);

  return <p>Setting up token and redirecting...</p>;
}

export default function StoreToken() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <StoreTokenwithParams />
    </Suspense>
  )
}
