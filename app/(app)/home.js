import {View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/authContext';


export default function Home(){
    const{logout, user} = useAuth();
    const handleLogout = async ()=>{
        await logout();
    }
    return (
        <View className="flex-1 bg-white">
        </View>
      );
    
    };
    
    const styles = StyleSheet.create({
      noFriendsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      },
      noFriendsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8177bb',
        textAlign: 'center',
      },
    });