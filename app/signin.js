import { View, Text, Image, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
//import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons'
import { AuthContextProvider, useAuth } from '../context/authContext'
import { useRouter } from 'expo-router'
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

export default function SignIn() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    /*
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    //navigation.replace("./(app)/home");
                    router.replace('home')
                } else {
                    // token not found , show the login screen itself
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        checkLoginStatus();
    }, []);*/
    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };
        console.log(user)
        axios            
            .post("http://172.29.148.167:8000/login", user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);

                //navigation.replace("./(app)/home");
                router.replace('home')
            })
            .catch((error) => {
                Alert.alert("Login Error", "Invalid email or password");
                console.log("Login Error", error);
            });
    };

    return (
        <View className="flex-1">
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(15), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <View className="items-center">
                    <Image style={{ height: hp(20) }} resizeMode='contain' source={require('../assets/images/kafChatLogo.png')} />
                    <Text style={{ fontSize: hp(5) }} className="font-bold tracking-wider text-center text-bp-4 ">Sign In</Text>
                </View>

                <View className="gap-8">

                    <View className="gap-4">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-hbp-1 items-center allign-l rounded-xl" >
                            <View style={{ width: wp(7) }} className="flex-2   items-center " >
                                <Octicons name="mail" size={wp(7)} color="#8177bb" />
                            </View>
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={{ fontSize: hp(2.7) }}
                                className="flex-1 font-semibold text-bp-2"
                                placeholder='Email address'
                                placeholderTextColor={'#a3a0b9'}
                            />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-hbp-1  items-center rounded-xl" >
                            <View style={{ width: wp(7) }} className="flex-2  items-center" >
                                <Octicons name="lock" size={wp(7)} color="#8177bb" />
                            </View>
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                style={{ fontSize: hp(2.7) }}
                                className="flex-1 font-semibold text-bp-2"
                                placeholder='Password'
                                placeholderTextColor={'#a3a0b9'}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ height: hp(7), backgroundColor: '#8177bb', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                            onPress={handleLogin}>
                            <Text style={{ fontSize: hp(2.7), color: '#fff', fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate("signup")}
                        style={{ marginTop: 15 }}
                    >
                        <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                            Dont't have an account? Sign Up
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}