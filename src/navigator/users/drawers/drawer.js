import React from 'react';
import CustomDraw from './customDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNav from '../tab';
import COLORS from '../../../constants/colors';
import Myprofile from '../../../screens/user/myprofile';
import Settings from '../../../screens/user/settings';

const Draw = createDrawerNavigator();

export default function Drawernavigator({route}) {
  console.log(route.params.userid,'Drawer params')
  return (
    <Draw.Navigator
      drawerContent={props => <CustomDraw {...props}/>}
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
          backgroundColor: COLORS.BUTTONCOLOR,
          height: 60,
          // borderBottomLeftRadius: 30,
          // borderBottomRightRadius: 30,
        },
      })}>
      <Draw.Screen
        name="Tab"
        component={TabNav}
        options={{headerShown: false}}
      />  
       <Draw.Screen
        name="Myprofile"
        initialParams={{ userid: route.params.userid }}
        component={Myprofile}
        options={{headerShown: false}}
      />
       <Draw.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Draw.Navigator>
  );
}
