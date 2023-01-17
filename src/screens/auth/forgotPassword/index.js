import React, { Component } from 'react'
import { Text, View,Image, TouchableOpacity } from 'react-native'
import CommonButton from '../../../components/common/commonButton'
import CommonTextInput from '../../../components/common/commonTextInput'
import LinearGradient from 'react-native-linear-gradient'
import Images from '../../../assets'
import styles from './style'

export default function ForgotPassword({navigation}){
    return (
      <View style={styles.container}>
      <LinearGradient colors={['#7eafe0', '#adcded', '#c7dbf0']} style={{flex:1}}>
        <Image source={Images.logo} style={styles.logo}/>
        <CommonTextInput label='Email id'/>
        <View style={styles.buttonView}>
        <CommonButton title='Reset' style={styles.button1}/>
        <CommonButton title='Cancel' style={styles.button2} onPress={()=>{navigation.goBack()}}/>
        </View>
      </LinearGradient>
      </View>
    )
  }