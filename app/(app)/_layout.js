import {View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';
import CreateGroupHeader from '../../components/CreateGroupHeader';

export default function _layout(){
    return(
        <Stack>
            <Stack.Screen
                name="home"
                options={{
                    header: ()=> <HomeHeader />
                }}
            />
        </Stack>
    )
}