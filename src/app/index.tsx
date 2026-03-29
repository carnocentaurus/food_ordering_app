import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import Button from './components/Button';
import { Link } from 'expo-router';
import { useAuth } from './providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const {session, loading, isAdmin} = useAuth();

  if (loading) return <ActivityIndicator/>

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      {session && (
        <>
          <Link href={'/(user)'} asChild>
            <Button text="User" />
          </Link>

          <Link href={'/(admin)'} asChild>
            <Button text="Admin" />
          </Link>

          <Button onPress={() => supabase.auth.signOut()} text='Sign Out' />
        </>
      )}

      {!session && (
        <Link href={'/sign-in'} asChild>
          <Button text='Sign In'/>
        </Link>
      )}
    </View>
  );
};

export default index;