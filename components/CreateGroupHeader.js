import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Ionicons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function createGroupHeader() {
    return (
        <Stack.Screen
            options={{
                title: 'Create Group',
                headerShadowVisible: false,
                
                headerLeft: () => (
                    <View className="flex-row  gap-5 px-5 pb-6 items-center">
                        <TouchableOpacity onPress={() => { router.back() }} className="gap-8">
                            <Ionicons size={hp(3)} name="chevron-back-outline" color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}