'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SupabaseAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/?login=1');
  }, [router]);

  return null;
}
