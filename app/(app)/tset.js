import { View, Text, Image, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import Loading from '../../components/Loading';
import CostomKeyBordView from '../../components/CostomKeyBordView';
import { useAuth } from '../../context/authContext';
import { ModalPickerGroup } from '../../components/ModalPickerGroup';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import CreateGroupHeader from '../../components/CreateGroupHeader';
//import images from '../../components/GroupImage';

export default function CreateGroup() { // Changed to start with a capital letter

    const router = useRouter();
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const groupName = useRef("");
    const groupImage = useRef("");
    const userId = user.userId;
    const [imagePlaceHolder, setImagePlace] = useState(require('../../assets/images/GroupImage/1.png'));


    const handleSelect = (index) => {
        groupImage.current = index + 1;
        //setImagePlace(images[index]);
    };

    const handleCreate = async () => {
        setLoading(true);
        if (!groupImage.current) {
            groupImage.current = 1;
        }

        if (!groupName.current || !groupImage.current) {
            Alert.alert('Create Group', "Please fill all the fields!");
            setLoading(false);
            return;
        }

        if (!userId) {
            await logout();
        }

        // Create Group Function
        console.log('Create Group!!!');

        setLoading(false);
    }

    const [isModalVis, setModalVis] = useState(false);
    const ChangeModalVis = (bool) => {
        setModalVis(bool);
    }

    return (
        <CostomKeyBordView>
            <View className="flex-1">
                <StatusBar style="dark" />
                <CreateGroupHeader router = {router}/>
                <View style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                    <View className="items-center">
                        <View>
                            <Image style={{ height: hp(20), width: hp(20), borderRadius: hp(10), borderWidth: 4, borderColor: '#4d4385' }} resizeMode='contain' source={imagePlaceHolder} />
                            <TouchableOpacity onPress={() => ChangeModalVis(true)}>
                                <View style={{ position: 'absolute', height: hp(5), width: hp(5), borderRadius: hp(2.5), bottom: 0, right: 0, borderWidth: 2, borderColor: '#8177bb' }} className="justify-center items-center bg-hbp-1">
                                    <MaterialCommunityIcons name="pencil" size={hp(3.5)} style={{ color: '#8177bb' }} />
                                </View>
                            </TouchableOpacity>
                            <Modal
                                transparent={true}
                                animationType='fade'
                                visible={isModalVis}
                                onRequestClose={() => ChangeModalVis(false)}
                            >
                                <ModalPickerGroup
                                    ChangeModalVis={ChangeModalVis}
                                    onSelect={handleSelect}
                                />
                            </Modal>
                        </View>
                    </View>
                    <View className="gap-12">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-hbp-1 items-center rounded-xl" >
                            <View style={{ width: wp(7) }} className="items-center">
                                <FontAwesome6 name="user-group" size={hp(3)} color="#8177bb" />
                            </View>
                            <TextInput
                                onChangeText={value => groupName.current = value}
                                style={{ fontSize: hp(2.7) }}
                                className="flex-1 font-semibold text-bp-4"
                                placeholder='Group Name'
                                placeholderTextColor={'#a3a0b9'}
                            />
                        </View>
                        <View>
                            {loading ? (
                                <View className="flex-row justify-center">
                                    <Loading size={hp(7)} />
                                </View>
                            ) : (
                                <TouchableOpacity style={{ backgroundColor: '#584e90', borderRadius: 10 }} underlayColor="#4d4385" onPress={handleCreate}>
                                    <View style={{ height: hp(6) }} className="justify-center items-center tracking-wider">
                                        <Text style={{ fontSize: hp(3) }} className="text-bp-1 font-bold">
                                            Create Group
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </CostomKeyBordView>
    );
}
