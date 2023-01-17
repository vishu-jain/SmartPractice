import React from 'react';
import CustomDraw from './customDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNav from '../tab'

const Draw = createDrawerNavigator();

export default function Drawernavigator() {
  return (
    <Draw.Navigator
      drawerContent={props => <CustomDraw {...props} />}
      initialRouteName="Tab"
      screenOptions={({route, navigation}) => ({
        headerTintColor: 'white',
        headerLeft: () => {
          return (
            <Icon
              name="chevron-back"
              size={40}
              color="white"
              style={{marginLeft: 20}}
              onPress={() => navigation.goBack()}
            />
          );
        },
        drawerLabelStyle: {fontSize: 20},
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 25,
        },
        headerStyle: {
          backgroundColor: '#004169',
          height: 60,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
      })}>
      <Draw.Screen
        name="Tab"
        component={TabNav}
        options={{headerShown: false}}
      />
    </Draw.Navigator>
  );
}
