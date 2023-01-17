import React, { Component, useState } from 'react'
import { Text, View, Image, TouchableOpacity,TextInput,Alert } from 'react-native'
import CommonButton from '../../../components/common/commonButton'
import CommonTextInput from '../../../components/common/commonTextInput'
import LinearGradient from 'react-native-linear-gradient'
import Images from '../../../assets'
import  Icon from 'react-native-vector-icons/Ionicons'
import styles from './style'
import COLORS from '../../../constants/colors'
import { emailValidation , passwordValidation } from '../../../utils/validations'
import auth from '@react-native-firebase/auth'

export default function Login({ navigation }) {

  const [email, setEmail] = useState('anmol@gmail.com');
  const [password, setPassword] = useState('Anmol@123');
  const [seePassword, setSeePassword] = useState(true);

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
      auth().signInWithEmailAndPassword(email,password)
      .then(() => {
        console.log('signed in!');
        if(email == 'admin@gmail.com'){
          navigation.reset({index: 1, routes: [{name: 'AdminDrawer'}]});
        }else{
          navigation.reset({index: 1, routes: [{name: 'UserDrawer'}]});
        }
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Email id is not correct');
        }
    
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Incorrect password');
        }
        console.log(error);
      })
      
    }
  };

  function handleEmail(text) {
    let mail = text.toLowerCase();
    mail = mail.trim();
    setEmail(mail);
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7eafe0', '#adcded', '#c7dbf0']} style={{ flex: 1 }}>
        <Image source={Images.logo} style={styles.logo} />
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
          <TouchableOpacity onPress={() => { navigation.navigate("ForgotPassword") }}>
            <Text style={styles.forgtext}> Forgot password ? </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
            <Text style={styles.forgtext}> New User ? </Text>
          </TouchableOpacity>
        </View>
        <CommonButton 
        title='Log in' 
        onPress={()=>onLogin()}
        />
      </LinearGradient>
    </View>
  )
}
