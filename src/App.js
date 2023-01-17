import React, { Component } from 'react'
import { Text, View,Image } from 'react-native'
import AuthStackNavigator from './navigator/authstack'
import Drawernavigator from './navigator/users/drawers/drawer'
import Drawernavigatoradmin from './navigator/admin/drawers/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Quizstack from './navigator/admin/quizstack'
import Assessmentstack from './navigator/users/assessment'
export default function App(){
   
const Stack = createNativeStackNavigator()

    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <NavigationContainer>
      <Stack.Navigator  options={{headerShown: false}}>
      <Stack.Screen
        name="AuthStack"
        component={AuthStackNavigator}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="UserDrawer"
        component={Drawernavigator}
        options={{headerShown: false}}
        />
         <Stack.Screen
        name="AdminDrawer"
        component={Drawernavigatoradmin}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="Quizstack"
        component={Quizstack}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="Assessmentstack"
        component={Assessmentstack}
        options={{headerShown:false}}
        />
     </Stack.Navigator>
     
        </NavigationContainer>
        </SafeAreaView>
    )
  }
