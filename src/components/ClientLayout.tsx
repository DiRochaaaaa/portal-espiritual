'use client';

import React from 'react';
import { LanguageProviderWithSuspense } from '../lib/LazyComponents';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProviderWithSuspense>
      {children}
    </LanguageProviderWithSuspense>
  );
} 