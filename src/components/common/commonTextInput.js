import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
// import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';
// const {FONTS, COLORS} = GLOBALS;

export default function CommonTextInput({
  placeholder,
  label,
  onChange,
  onChangeText,
  value,
  secureTextEntry,
  autoCaps,
  editable,
  keyboardType,
  maxLength,
  editablestyle,
  type,
  textInputStyle,
}) {
  return (
    <View style={styles.mainstyle}>
      <Text style={styles.labelstyle}>{label} </Text>
      <TextInput
        style={[styles.inputstyle, textInputStyle, editablestyle]}
        placeholder={placeholder}
        onChange={onChange}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCaps}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainstyle: {
    marginHorizontal: 20,
  },
  inputstyle: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    height: 40,
    borderRadius: 8,
    paddingLeft: 8,
    fontSize: 16,
  },
  labelstyle: {
    color: COLORS.LIGHTGREY,
    fontSize: 20,
    // fontFamily: FONTS.REGULAR,
    marginTop: 15,
    fontWeight: '400',
    fontStyle: 'normal',
  },
});
