import {  Stack, router } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import React, { useEffect } from 'react';

export default function AuthLayout() {
  const {session, loading} = useAuth();

  useEffect(() => {
    if (!loading && session) {
      router.replace('/');
    }
  }, [session, loading]);

  if (loading) return null;
  if (session) return null;

  return <Stack />;
};