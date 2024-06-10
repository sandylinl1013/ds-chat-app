import { StyleSheet, View, Text, ActivityIndicator, Button, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//import ChatList from '../../components/ChatList';
//import axios from 'axios';
//import { useSQLiteContext } from "expo-sqlite/next";
import { UserType } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
//import User from "../../components/User";
import UserChat from "../../components/UserChat";

export default function Home() {
  const { logout, user } = useAuth();
  const [loading, setLoading] = useState(true);

  const { userId, setUserId } = useContext(UserType);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        console.log(userId)
        setUserId(userId);
        const response = await fetch(
          `http://172.29.148.167:8000/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar style="light" />
        {acceptedFriends.length > 0 ? (
          <View>
            {acceptedFriends.map((item, index) => (
              <Pressable key={index} onPress={() => { /* Handle press */ }}>
                {index === acceptedFriends.length - 1 ? (
                  <UserChat item={item} noBorder={true} />
                ) : (
                  <UserChat item={item} noBorder={false} />
                )}
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.noFriendsContainer}>
            {/*
            <View className="flex items-center" style={{ top: '30%' }}>
            <ActivityIndicator size="large" />*/}
            <Text style={styles.noFriendsText}>No friends yet. Please add friends.</Text>
          </View>
        )}

      </ScrollView>
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
