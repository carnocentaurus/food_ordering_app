import React, { useEffect } from 'react';
import { SymbolView } from 'expo-symbols';
import { Tabs, router } from 'expo-router';
import Colors from '@/app/constants/Colors';
import { useColorScheme } from '@/app/components/useColorScheme';
import { useClientOnlyValue } from '@/app/components/useClientOnlyValue';
import { useAuth } from '../providers/AuthProvider';
import { ActivityIndicator } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {session, loading} = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/');
    }
  }, [session, loading]);

  if (loading) return <ActivityIndicator />
  if (!session) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>

      <Tabs.Screen name='index' options={{href:null}}/>

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'fork.knife',
                android: 'restaurant',
                web: 'restaurant',
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'list.bullet',
                android: 'reorder',
                web: 'reorder',
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
