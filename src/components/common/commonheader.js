import React, {Component} from 'react';
import {Text, View} from 'react-native';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Commonheader({heading, onPress, iconName}) {
  return (
    <View
      style={{
        backgroundColor: COLORS.BUTTONCOLOR,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View>
        {iconName ? (
          <Icon
            name={iconName}
            size={30}
            color={COLORS.WHITE}
            onPress={onPress}
          />
        ) : null}
      </View>
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 25, color: COLORS.WHITE, fontWeight: 'bold'}}>
          {' '}
          {heading}{' '}
        </Text>
      </View>
    </View>
  );
}
