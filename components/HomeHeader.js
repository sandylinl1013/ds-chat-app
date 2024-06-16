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
import { Feather, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNavigation } from "@react-navigation/native";
import images from './photoStickers'

const andriod = Platform.OS == 'android';


export default function HomeHeader() {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();
    console.log('Header profile: ', user.profileURL);
    const router = useRouter();

    const imagePath = images[user.profileURL];

    const handleProfile = () => {
        navigation.navigate("profile")
    }
    const handleLogout = async () => {
        await logout();
    }
    const handleAddFriend = () => {
        //router.replace('AddFriend')
        //router.push({pathname: '/CreateGroup',params: user})
        navigation.navigate("AddFriendScreen")
    }
    const handleCreateGroup = () => {
        navigation.navigate("createGroupScreen")
    }

    return (
        <View style={{ paddingTop: andriod ? top : top + 10 }} className="flex-row  justify-between px-5 bg-bp-3 pb-6 rounded-b-3xl shadow">
            <View>
                <Text style={{ fontSize: hp(3) }} className="font-medium text-white ">Chats</Text>
            </View>

            <View>
                <Menu >
                    <MenuTrigger>
                        <Image
                            style={{ height: hp(5), aspectRatio: 1, borderRadius: 100, borderColor: '#faf9ff', borderWidth: 2 }}
                            source={imagePath}
                            placeholder={blurhash}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                borderColor: '#c6c1e3',
                                borderWidth: 2,
                                borderCurve: 'continuous',
                                marginTop: 40,
                                marginLeft: -30,
                                backgroundColor: 'white',
                                shadowOpacity: 0.1,
                                shadowOffset: { sidth: 0, height: 0 },
                            }
                        }}
                    >
                        <MenuItem
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Ionicons name="person-circle" size={hp(4)} color='#8177bb' />}
                        />
                        <Devider />
                        <MenuItem
                            text="Add Friend"
                            action={handleAddFriend}
                            value={null}
                            icon={<Ionicons name="person-add" size={hp(3.5)} color='#8177bb' />}
                        />
                        <Devider />
                        <MenuItem
                            text="Create Group"
                            action={handleCreateGroup}
                            value={null}
                            icon={<MaterialIcons name="groups-2" size={hp(4)} color='#8177bb' />}
                        />
                        <Devider />
                        <MenuItem
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name="logout" size={hp(3.5)} color='#8177bb' />}
                        />

                    </MenuOptions>
                </Menu>

            </View>
        </View>
    )
}

const Devider = () => {
    return (
        <View className="p-[1px] w-full bg-bp-2" />
    )
}