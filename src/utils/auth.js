import auth from '@react-native-firebase/auth';
// import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import {Alert, ToastAndroid} from 'react-native';

export const signUp = (name, email, password, country, gender, navigation) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return firestore().collection('users').doc(cred.user.uid).set({
        username: name,
        useremail: email,
        country: country,
        gender: gender,
        createdAt: new Date(),
      });
    })
    .then(() => {
      ToastAndroid.show('Signed up', ToastAndroid.SHORT);
      navigation.navigate('Login');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email already exist');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      console.log(error);
    });
};

export const signIn = (email, password, navigation) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      if (email === 'admin@gmail.com') {
        ToastAndroid.show('Signed In', ToastAndroid.SHORT);
        navigation.reset({index: 1, routes: [{name: 'AdminDrawer'}]});
      } else {
        ToastAndroid.show('Signed In', ToastAndroid.SHORT);
        navigation.reset({index: 1, routes: [{name: 'UserDrawer'}]});
      }
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Alert.alert("User doesn't exist");
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect password');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Too many requests, Please try again later');
      }
      console.log(error);
    });
};

export const ResetPassword = (email, navigation) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert('Success', 'Check your email for the password reset link', [
        {text: 'Ok', onPress: () => navigation.goBack()},
      ]);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
