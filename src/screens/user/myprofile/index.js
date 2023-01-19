import { View, Text } from 'react-native'
import React from 'react'
import Commonheader from '../../../components/common/commonheader'

export default function Myprofile({navigation}) {
  return (
    <View>
        <Commonheader heading='My profile' iconName='chevron-back' onPress={()=>navigation.goBack()} />
      <Text>This page is under Maintainence</Text>
    </View>
  )
}