import { View, Text, Image, TextInput } from 'react-native';
import Reach from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons'

export default function SignIn() {
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
                                style={{ fontSize: hp(2.7) }}
                                className="flex-1 font-semibold text-bp-2"
                                placeholder='Password'
                                placeholderTextColor={'#a3a0b9'}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}