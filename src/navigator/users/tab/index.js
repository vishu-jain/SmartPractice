import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../../../screens/user/home';
import Dashboard from '../../../screens/user/dashboard';

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
          // tabBarIcon: ({focused, size, color}) => {
          //   let iconName;

          //   if (route.name === 'Calendar') {
          //     iconName = focused
          //       ? Images.calender_outlineicon
          //       : Images.calendericon;
          //   } else if (route.name === 'Forum') {
          //     iconName = focused ? Images.forum_outlineicon : Images.forumicon;
          //   } else if (route.name === 'Home') {
          //     iconName = focused ? Images.home_outlineicon : Images.homeicon;
          //   } else if (route.name === 'Chat') {
          //     iconName = focused ? Images.chat_outlineicon : Images.chaticon;
          //   } else if (route.name === 'MyPortfolio') {
          //     iconName = focused
          //       ? Images.portfolio_outlineicon
          //       : Images.portfolioicon;
          //   }

          //   // You can return any component that you like here!
          //   return <Image source={iconName} resizeMode="contain" />;
          // },
        })}>
       
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
      </Tab.Navigator>
    </View>
  );
}
