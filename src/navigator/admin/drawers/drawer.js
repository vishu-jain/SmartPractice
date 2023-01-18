import React from 'react';
import CustomDraw from './customDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../../screens/admin/home';
import Createquiz from '../../../screens/admin/createquiz';
import Addquestion from '../../../screens/admin/addquestion/addquestion';
import COLORS from '../../../constants/colors';
const Draw = createDrawerNavigator();

export default function Drawernavigatoradmin() {
  return (
    <Draw.Navigator
      drawerContent={props => <CustomDraw {...props} />}
      initialRouteName="Home"
      screenOptions={({navigation})=>({
        headerStyle:{
          backgroundColor: COLORS.BUTTONCOLOR,
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 25,
        },
        headerLeft: () => {
          return (
            <Icon
              name="menu"
              size={30}
              color="white"
              style={{marginLeft: 20}}
              onPress={() => navigation.openDrawer()}
            />
          );
        }
      })}
      >
      <Draw.Screen
        name="Home"
        component={Home}
        // options={{headerShown: false}}
      />
    </Draw.Navigator>
  );
}
