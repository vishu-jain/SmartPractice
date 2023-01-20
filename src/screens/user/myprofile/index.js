import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Commonheader from '../../../components/common/commonheader'
import { getUserDetails } from '../../../utils/database'

export default function Myprofile({navigation,route}) {

  const [name,setName] = useState('')
  let id=route.params.userid
  
  useEffect(()=>{
    getid()
  },[])

  const getid =async()=>{
    let v = await getUserDetails(id);
    setName(v._data.username)
    console.log(v._data,'user details')
  }

  return (
    <View>
        <Commonheader heading='My profile' iconName='chevron-back' onPress={()=>navigation.goBack()} />
      <Text>This page is under Maintainence {name}</Text>
    </View>
  )
}