import React, { Component, useEffect, useState } from 'react'
import { Text, View, Image,TextInput,TouchableOpacity,Alert } from 'react-native'
import CommonButton from '../../../components/common/commonButton'
import CommonTextInput from '../../../components/common/commonTextInput'
import LinearGradient from 'react-native-linear-gradient'
import Images from '../../../assets'
import Icon from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native'
import { Dropdown } from 'react-native-element-dropdown'
import styles from './style'
import axios from 'axios'
import { emailValidation, letterValidation,passwordValidation } from '../../../utils/validations'
import COLORS from '../../../constants/colors'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

export default function Register({ navigation }) {

  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [country, setCountry] = useState('');
  const [listCountry, setlistCountry] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [gender, setGender] = useState('');

  const [radio, setRadio] = useState([
    {
      label: 'Male'
    },
    {
      label: 'Female'
    }
  ])
  useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
      .then(function (response) {
        console.log(response.data[0].name)
       for(var i=0;i<response.data.length;i++){
        list = response.data[i].name
        // setlistCountry(list);
        console.log(list) 
      }
      })
      .catch(function (error) {
        console.log(error);
      });
  })

  // useEffect(() => {
  //   setlistCountry(list);
  // }, [list]);

  const onRegister = () => {
    let params = {
      name: userName,
      email: email,
      password: password,
      // country: country,
      gender: gender.label,
    };
    if (!userName) {
      Alert.alert('Please enter name');
    } else if (letterValidation(userName)) {
      Alert.alert('Invalid Name');
    } else if (userName.length < 3) {
      Alert.alert('Name too short');
    } else if (!emailValidation(email)) {
      Alert.alert('Please enter valid email');
    } else if (!password) {
      Alert.alert('Please enter password');
    } else if (!passwordValidation(password)) {
      Alert.alert('Invalid password');
    } else {
      // dispatch(AppActions.register(params, navigation));
      auth().createUserWithEmailAndPassword(email,password)
  .then(() => {
    console.log('User account created & signed in!');
    const newReference = database().ref('/register').push();
      newReference
      .set({
        params
      })
      .then(() => console.log('Data updated.'));
      navigation.navigate('Login')
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.error(error);
  })
    }
  };

  function handleEmail(text) {
    let mail = text.toLowerCase();
    mail = mail.trim();
    setEmail(mail);
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#7eafe0', '#adcded', '#c7dbf0']} style={{ flex: 1 }}>
        <Icon name="chevron-back" size={40}
          color="blue"
          style={{ marginTop: 20 }}
          onPress={() => navigation.goBack()} />
        <Image source={Images.logo2} resizeMode='stretch' style={{ height: 120, width: 280, alignSelf: 'center' }} />
        <CommonTextInput
          placeholder="Enter name"
          label="Name"
          value={userName}
          onChangeText={data => setuserName(data)} />
        <CommonTextInput 
        placeholder="Enter email"
        label="Email"
        onChangeText={data => handleEmail(data)}
        autoCaps={'none'}
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
        <Text style={styles.stateLabel}> Country </Text>
        <Dropdown style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listCountry}
          search
          maxHeight={300}
          labelField="state"
          placeholder="Select state"
          searchPlaceholder="Search..."
          value=""
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCountry(item.state);
            setIsFocus(false);
          }}
        />
        <Text style={styles.stateLabel}> Gender </Text>
        <RadioButtonRN
          data={radio}
          selectedBtn={(e) => setGender(e)}
          box={false}
          style={{ flexDirection: 'row', marginLeft: 20 }}
          textStyle={{ fontSize: 20, marginLeft: 10, }}
          boxStyle={{ width: 180 }}
          deactiveColor='#f7f7f7'
        />
        {/* <CommonTextInput label='University' /> */}
        <CommonButton 
        title='Register' 
        onPress={()=>onRegister()}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account?</Text>
          </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}
