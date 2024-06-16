import { View, Text, Image, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, useRouter } from 'expo-router';
import Loading from '../../components/Loading';
import CostomKeyBordView from '../../components/CostomKeyBordView';
import { useAuth } from '../../context/authContext';
import { ModalPickerGroup } from '../../components/ModalPickerGroup';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import CreateGroupHeader from '../../components/CreateGroupHeader';

const OPTIONS = [
  require('../../assets/images/GroupImage/1.png'),
  require('../../assets/images/GroupImage/2.png'),
  require('../../assets/images/GroupImage/3.png'),
  require('../../assets/images/GroupImage/4.png'),
  require('../../assets/images/GroupImage/5.png'),
  require('../../assets/images/GroupImage/6.png'),
  require('../../assets/images/GroupImage/7.png'),
  require('../../assets/images/GroupImage/8.png'),
  require('../../assets/images/GroupImage/9.png'),
  require('../../assets/images/GroupImage/10.png'),
  
];

export default function createGroupScreen() {
  const [imagePlaceHolder, setImagePlace] = useState(require('../../assets/images/GroupImage/1.png'));
  const [isModalVis, setModalVis] = useState(false);
  const ChangeModalVis = (bool) => {
    setModalVis(bool);
  }
  const groupImageRef = useRef();

  const handleSelect = (option, index) => {
    groupImageRef.current = index + 1;
    console.log('group Image Index', groupImageRef.current);
    setImagePlace(OPTIONS[index]);
  };

  return (
    
    <View className="items-center">
      <CreateGroupHeader router={router} />
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
  )
}