import React, {Component, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import CommonButton from '../../../components/common/commonButton';
import CommonTextInput from '../../../components/common/commonTextInput';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../../assets';
import styles from './style';
import {emailValidation} from '../../../utils/validations';
import {ResetPassword} from '../../../utils/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');

  const onPressReset = () => {
    if (!emailValidation(email)) {
      Alert.alert('Please enter valid email');
    } else {
      ResetPassword(email, navigation);
      setEmail('');
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7eafe0', '#adcded', '#c7dbf0']}
        style={{flex: 1}}>
        <KeyboardAwareScrollView>
          <Image source={Images.logo} style={styles.logo} />
          <CommonTextInput
            label="Email id"
            value={email}
            onChangeText={data => setEmail(data)}
          />
          <View style={styles.buttonView}>
            <CommonButton
              title="Reset"
              style={styles.button1}
              onPress={() => onPressReset()}
            />
            <CommonButton
              title="Cancel"
              style={styles.button2}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
}
