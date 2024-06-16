import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const OPTIONS = [
  require('../assets/images/GroupImage/1.png'),
  require('../assets/images/GroupImage/2.png'),
  require('../assets/images/GroupImage/3.png'),
  require('../assets/images/GroupImage/4.png'),
  require('../assets/images/GroupImage/5.png'),
  require('../assets/images/GroupImage/6.png'),
  require('../assets/images/GroupImage/7.png'),
  require('../assets/images/GroupImage/8.png'),
  require('../assets/images/GroupImage/9.png'),
  require('../assets/images/GroupImage/10.png')
];

const ModalPickerGroup = (props) => {

  const onPressItem = (option, index) => {
    console.log("Selected option: ", option, "at index: ", index);
    props.onSelect( option, index);
    props.ChangeModalVis(false);
  };

  const renderOptions = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item, index)}
      >
        <Image
          style={styles.image}
          source={item}
        />
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => props.ChangeModalVis(false)}
      style={styles.container}
    >
      <View style={[styles.modal, { width: wp(80), height: hp(60) }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.optionsContainer}>
            {renderOptions}
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    width: '30%',
    marginVertical: wp(1),
    alignItems: 'center',
  },
  image: {
    height: wp(23),
    width: wp(23),
  },
});

export { ModalPickerGroup };
