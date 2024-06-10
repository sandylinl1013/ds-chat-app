import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'
import { MeniProvider, MenuProvider } from 'react-native-popup-menu';
import { SQLiteProvider } from "expo-sqlite/next";
import { UserContext } from '../context/UserContext'; // Update the path accordingly
import { NavigationContainer } from '@react-navigation/native';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        //check if user auth or not
        if (typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0] == '(app)';
        if (isAuthenticated && !inApp) {
            //redirect to home
            router.replace('home')

        } else if (isAuthenticated == false) {
            //redirect to signIn
            router.replace('signin')
        }
    }, [isAuthenticated])

    return <Slot />
}
export default function RootLayout() {
    return (
        <UserContext>

            <React.Suspense fallback={<Text>Loading...</Text>}>
                <SQLiteProvider databaseName="test.db" useSuspense={true}>
                    <MenuProvider>
                        <AuthContextProvider>
                            <MainLayout />
                        </AuthContextProvider>
                    </MenuProvider>
                </SQLiteProvider>
            </React.Suspense>

        </UserContext>
    );
}
/*
export default function RootLayout(){
  return(
      <MenuProvider>
          <AuthContextProvider>
              <MainLayout />
          </AuthContextProvider>
      </MenuProvider>
  )
}*/