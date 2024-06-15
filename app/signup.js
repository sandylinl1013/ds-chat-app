/*
import { View, Text } from 'react-native'
import React from 'react'

export default function signup() {
  return (
    <View>
      <Text>signup</Text>
    </View>
  )
}
*/
/*
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://172.29.148.167:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "600" }}>
            Register
          </Text>
          {/*
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Register To your Account
          </Text>
        </View>

        <View style={{ marginTop: 0 }}>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="enter Your Email"
            />
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Passowrd"
            />
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Image
            </Text>

            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Image"
            />
          </View>

          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginTop: 30,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already Have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default signup;

const styles = StyleSheet.create({});

*/

import { View, Text, Image, TextInput, Pressable, StyleSheet, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading'
import CostomKeyBordView from '../components/CostomKeyBordView';
import { useAuth } from '../context/authContext';



export default function signUp() {

  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileRef = useRef("");

  // register user on db
  const registerUser = async (uid, email, name, profileURL) => {
    try {
      const response = await fetch('http://172.29.148.167:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          email: email,
          name: name,
          image: profileURL,
        }),
      });

      const data = await response.json();
      console.log('Register API response:', data);
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Sign In', "Please fill all the fields!");
      return;
    }

    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    console.log("uid = ", response.data.uid)
    console.log("email = ", response.data.email)
    console.log("name = ", usernameRef.current)
    console.log("profileRef = ", profileRef.current)
    registerUser(response.data.uid, response.data.email, usernameRef.current, profileRef.current);
    setLoading(false);

    console.log('got result: ', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
    //Login Process

  }

  return (
    <CostomKeyBordView>
      <View className="flex-1">
        <StatusBar style="dark" />
        <View style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
          <View className="items-center">
            <Image style={{ height: hp(15) }} resizeMode='contain' source={require('../assets/images/kafChatLogo.png')} />
            <Text style={{ fontSize: hp(5) }} className=" font-bold text-center text-bp-4 ">Sign Up</Text>
          </View>
          <View className="gap-8">
            <View className="gap-4">
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-hbp-1 items-center allign-l rounded-xl" >
                <View style={{ width: wp(7) }} className="flex-2   items-center " >
                  <Feather name="user" size={wp(7)} color="#8177bb" />
                </View>
                <TextInput
                  onChangeText={value => usernameRef.current = value}
                  style={{ fontSize: hp(2.7) }}
                  className="flex-1 font-semibold text-bp-4"
                  placeholder='User Name'
                  placeholderTextColor={'#a3a0b9'}
                />
              </View>
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-hbp-1  items-center rounded-xl" >
                <View style={{ width: wp(7) }} className="flex-2  items-center" >
                  <Octicons name="mail" size={wp(7)} color="#8177bb" />
                </View>
                <TextInput
                  onChangeText={value => emailRef.current = value}
                  style={{ fontSize: hp(2.7) }}
                  className="flex-1 font-semibold text-bp-4"
                  placeholder='Email address'
                  placeholderTextColor={'#a3a0b9'}
                />
              </View>
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-hbp-1  items-center rounded-xl" >
                <View style={{ width: wp(7) }} className="flex-2  items-center" >
                  <Octicons name="lock" size={wp(7)} color="#8177bb" />
                </View>
                <TextInput
                  onChangeText={value => passwordRef.current = value}
                  style={{ fontSize: hp(2.7) }}
                  className="flex-1 font-semibold text-bp-4"
                  placeholder='Password'
                  secureTextEntry
                  placeholderTextColor={'#a3a0b9'}
                />
              </View>
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-hbp-1  items-center rounded-xl" >
                <View style={{ width: wp(7) }} className="flex-2  items-center" >
                  <Feather name="image" size={wp(7)} color="#8177bb" />
                </View>
                <TextInput
                  onChangeText={value => profileRef.current = value}
                  style={{ fontSize: hp(2.7) }}
                  className="flex-1 font-semibold text-bp-4"
                  placeholder='Profile url'
                  placeholderTextColor={'#a3a0b9'}
                />
              </View>
            </View>
            <View className="gap-3">
              {/* submit button */}
              <View>
                {
                  loading ? (
                    <View className="flex-row justify-center" >
                      <Loading size={hp(7)} />
                    </View>

                  ) : (
                    <TouchableOpacity style={{ backgroundColor: '#584e90', borderRadius: 10 }} underlayColor="#4d4385" onPress={handleRegister} >
                      <View style={{ height: hp(6) }} className="justify-center items-center tracking-wider">
                        <Text style={{ fontSize: hp(3) }} className="text-bp-1 font-bold " >
                          Sign Up
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              </View>
              <View className=" flex-row justify-center">
                <Text style={{ fontSize: hp(2) }} className="font-semibold  text-hbp-3 " >Already Have an Account? </Text>
                <Pressable
                  children={({ pressed }) => (
                    <Text style={{ fontSize: hp(2), color: pressed ? '#413776' : '#584e90' }} className="font-bold" >
                      Sign In!!
                    </Text>
                  )} onPress={() => router.push('signin')} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </CostomKeyBordView>
  )
}