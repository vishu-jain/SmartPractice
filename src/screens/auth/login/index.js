import React, { Component, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  NativeModules,
  Modal,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import CommonButton from '../../../components/common/commonButton';
import CommonTextInput from '../../../components/common/commonTextInput';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import COLORS from '../../../constants/colors';
import { emailValidation, passwordValidation } from '../../../utils/validations';
import auth from '@react-native-firebase/auth';
import { signIn } from '../../../utils/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PushNotification from 'react-native-push-notification';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import call from 'react-native-phone-call'
import Sound from 'react-native-sound';
import SendSMS from 'react-native-sms'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('vishujain605@gmail.com');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('Vishu@123');
  const [seePassword, setSeePassword] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onLogin = () => {
    let params = {
      email: email,
      password: password,
    };
    if (!emailValidation(email)) {
      Alert.alert('Please enter email');
    } else if (!password) {
      Alert.alert('Please enter password');
    } else if (!passwordValidation(password)) {
      Alert.alert('Invalid password');
    } else {
      signIn(params.email, params.password, navigation);
    }
  };

  function handleEmail(text) {
    let mail = text.toLowerCase();
    mail = mail.trim();
    setEmail(mail);
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const AlarmModule = NativeModules.AlarmModule

  let sound = null;

  function playSound() {
    console.log('Ring')
    sound = new Sound('ringtone_1.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          sound.reset();
        }
      });
    });
  }

  const senss = () => {
    SendSMS.send({
      body: 'Hii Vishu! welcome to the react native ',
      recipients: ['7011417695'],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {

      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

    });
  }

  const handleConfirm = datetime => {
    PushNotification.localNotificationSchedule({
      title: 'SmartPractice',
      date: datetime,
      message: 'Welcome to SmartPractice',
      allowWhileIdle: false,
      playSound: true,
      soundName: 'default',
      actions: '["Close"]',
      channelId: "123456",
    });
    AlarmModule.setAlarm(Date.now() + 5000)
    hideDatePicker();
  };

  PushNotification.createChannel(
    {
      channelId: "123456", // (required)
      channelName: "SmartPractice", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    }
  )

  PushNotification.configure({
    onNotification: function (notification) {
      if (notification.foreground) {
        playSound();
      } else {
        sound.stop();
        sound.release();
      }
    }
  });

  const makeCall = () => {
    const args = {
      number: phoneNumber,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  // const makeCall = (phoneNumber) => {
  //   const url = `tel:${phoneNumber}`;
  //   Linking.canOpenURL(url).then(supported => {
  //     if (!supported) {
  //       console.log("Can't handle phone call: " + url);
  //     } else {
  //       return Linking.openURL(url);
  //     }
  //   }).catch(err => console.error('An error occurred while making the phone call: ', err));
  // };



  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7eafe0', '#adcded', '#c7dbf0']}
        style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <Image
            source={Images.mainlogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <CommonTextInput
            placeholder="Enter email"
            label="Email"
            onChangeText={data => handleEmail(data)}
            autoCaps={'none'}
            value={email}
          />
          <Text style={styles.passwordLabel}>Password</Text>
          <View style={styles.passwordView}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Enter password"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={seePassword}
              autoCaps={false}
            />
            <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
              <Icon
                name={seePassword ? 'eye-off' : 'eye'}
                size={25}
                color={COLORS.PLACEHOLDER}
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.forgotview}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}>
              <Text style={styles.forgtext}> Forgot password ? </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.forgtext}> New User ? </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.calendarView}
              onPress={showDatePicker}>
              <View style={styles.calendarInput}>
                <Fontisto name="date" size={16} color={'grey'} />
              </View>
              <DateTimePickerModal
                mode='datetime'
                isVisible={isDatePickerVisible}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display={'inline'}
              />
            </TouchableOpacity>
          </View>
          <CommonTextInput
            label='Phone number'
            placeholder="Enter phone number"
            keyboardType='numeric'
            maxLength={10}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.textArea}
            placeholder="Enter your address"
            value={address}
            onChangeText={text => setAddress(text)}
          />
          <CommonButton title='Call' onPress={() => makeCall()} />
          <CommonButton title='SMS' onPress={() => senss()} />
          <CommonButton title="Log in" onPress={() => onLogin()} />
          <CommonButton title='MAP' onPress={() => Linking.openURL('google.navigation:q=100+101')} />
          <CommonButton title='modal' onPress={() => setModalVisible(true)} />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
                <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
              <View style={{flex: 1,justifyContent:'center',backgroundColor:'black'}}>
                <View style={{height:360}}>
                  <View style={{backgroundColor:'white',height:50,justifyContent:'center'}}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'black',marginLeft:20}}>Profile</Text>
                  </View>
                  <Image source={Images.logo} resizeMode='stretch' style={{width:'100%',height:'86%'}}/>
                </View>
              </View>
              </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
}
