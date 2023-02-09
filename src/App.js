import React, { Component, useEffect } from 'react';
import { Text, View, Image, StatusBar, Alert } from 'react-native';
import AuthStackNavigator from './navigator/authstack';
import Drawernavigator from './navigator/users/drawers/drawer';
import Drawernavigatoradmin from './navigator/admin/drawers/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Quizstack from './navigator/admin/quizstack';
import COLORS from './constants/colors';
import Assessmentstack from './navigator/users/assessment';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import TouchID from 'react-native-touch-id';



export default function App() {
  const Stack = createNativeStackNavigator();
  // const rnBiometrics = new ReactNativeBiometrics()

  // const optionalConfigObject = {
  //   title: 'Authentication Required', // Android
  //   imageColor: '#e00606', // Android
  //   imageErrorColor: '#ff0000', // Android
  //   sensorDescription: 'Touch sensor', // Android
  //   sensorErrorDescription: 'Failed', // Android
  //   cancelText: 'Cancel', // Android
  // };

  useEffect(() => {
    // rnBiometrics.isSensorAvailable()
    //   .then(biometryType => {
    //     if (biometryType === rnBiometrics.TouchID) {
    //       rnBiometrics.simplePrompt({ promptMessage: 'Scan your finger' })
    //         .then(() => {
    //           console.log('Successful biometric authentication');
    //         })
    //         .catch(error => {
    //           console.log('Biometric authentication failed', error);
    //         });
    //     } else if (biometryType === rnBiometrics.FaceID) {
    //       console.log('FaceID is supported');
    //     } else if(biometryType === rnBiometrics.Biometrics){
    //       console.log('Biometrics supported');
    //     }else{
    //       console.log('Biometrics not supported');
    //     }
    //   });


    TouchID.authenticate('to demo this react-native component')
  .then(success => {
    console.log(success,'success')
  })
  .catch(error => {
    console.log(error)
  });
  }, [])

  // PushNotification.localNotificationSchedule({
  //   message: "My Notification Message", // (required)
  //   date: new Date(Date.now() + 60 * 1000), // in 60 secs
  //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  //   repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  // });


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={COLORS.WHITE} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator options={{ headerShown: false }}>
          <Stack.Screen
            name="AuthStack"
            component={AuthStackNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserDrawer"
            component={Drawernavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminDrawer"
            component={Drawernavigatoradmin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Quizstack"
            component={Quizstack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Assessmentstack"
            component={Assessmentstack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
