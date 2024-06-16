import {View, Text, Platform} from 'react-native'
import {
    Menu,
    MenuOption,
  } from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


export const MenuItem = ({ text, action, value, icon }) => {
    return (
      <MenuOption onSelect={() => action(value)}>
        <View style={{ height:hp(5), width:wp(40)}} className="px-3 flex-row items-center gap-5">
          
          <View style={{width:hp(4)}} className="items-center justify-center">
          {icon}
          </View>
          <Text style={{fontSize: hp(2.5) }} className="font-semibold text-bp-3">
            {text}
          </Text>
        </View>
      </MenuOption>
    );
  };