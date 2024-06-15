import { View, Text, Platform } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image'
import { blurhash } from '../utils/common'
import { useAuth } from '../context/authContext'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNavigation } from "@react-navigation/native";

const andriod = Platform.OS == 'android';
export default function HomeHeader() {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();
    const router = useRouter();
    const navigation = useNavigation();
    const handleProfile = () => {
        navigation.navigate("profile")
    }
    const handleCreateGroup = () => {
        navigation.navigate("CreateGroup")
    }
    const handleLogout = async () => {
        //await logout();
        router.replace('signin')
    }
    const handleAddFriend = () => {
        //router.replace('AddFriend')
        navigation.navigate("AddFriendScreen");
    }
    return (
        <View style={{ paddingTop: andriod ? top : top + 10 }} className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow">
            <View>
                <Text style={{ fontSize: hp(3) }} className="font-medium text-white">Chats</Text>
            </View>

            <View>
                <Menu>
                    <MenuTrigger customStytles={{
                        triggerWrapper: {
                            // trigger wrapper styles
                        }
                    }}>
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source="https://picsum.photos/seed/696/3000/2000"
                            // source={user?.profileUrl}
                            placeholder={blurhash}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyle={{
                            optionsContainer: {
                                borderRadius: 10,
                                borderCurve: 'continuous',
                                marginTop: 40,
                                marginLeft: -30,
                                backgroundColor: 'white',
                                shadowOpacity: 0.2,
                                shadowOffset: { sidth: 0, height: 0 },
                                width: 160
                            }
                        }}
                    >
                        <MenuItem
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
                        />
                        <Devider />
                        <MenuItem
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
                        />
                        <Devider />
                        <MenuItem
                            text="Add Friend"
                            action={handleAddFriend}
                            value={null}
                            icon={<MaterialIcons name="people-outline" size={hp(2.5)} color="#737373" />}
                        />
                        <Devider />
                        <MenuItem
                            text="CreateGroup"
                            action={handleCreateGroup}
                            value={null}
                            icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
                        />
                    </MenuOptions>
                </Menu>

            </View>
        </View>
    )
}

const Devider = () => {
    return (
        <View className="p-[1px] w-full bg-neutral-200" />
    )
}
