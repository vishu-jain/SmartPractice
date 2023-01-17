import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
// import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';
// const {FONTS, COLORS} = GLOBALS;

export default function CommonButton({title, onPress, style,textstyle}) {
  return (
    <View>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.font,textstyle]}> {title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BUTTONCOLOR,
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom:10
  },
  font: {
    fontSize: 30,
    // fontWeight: 'bold',
    // fontFamily: FONTS.REGULAR,
    fontStyle: 'normal',
    color: COLORS.BLACK,
  },
});
