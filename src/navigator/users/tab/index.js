import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../../../screens/user/home';
import Leaderboard from '../../../screens/user/leaderboard';
import COLORS from '../../../constants/colors';

const Tab = createBottomTabNavigator();

export default function Tabnavigator() {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route, navigation}) => ({
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: '#004169',
          headerStyle: {
            backgroundColor: '#004169',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            height: 60,
          },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: 'white',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: 'Nunito-Regular',
          },
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                size={40}
                color="white"
                style={{marginLeft: 20}}
                onPress={() => navigation.openDrawer()}
              />
            );
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;

           if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Leaderboard') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: COLORS.WHITE,
          tabBarInactiveTintColor: 'gray',
        })}>
       
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
      </Tab.Navigator>
    </View>
  );
}
