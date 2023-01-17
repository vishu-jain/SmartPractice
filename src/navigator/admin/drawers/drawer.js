import React from 'react';
import CustomDraw from './customDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../../screens/admin/home';
import Createquiz from '../../../screens/admin/createquiz';
import Addquestion from '../../../screens/admin/addquestion/addquestion';
const Draw = createDrawerNavigator();

export default function Drawernavigatoradmin() {
  return (
    <Draw.Navigator
      drawerContent={props => <CustomDraw {...props} />}
      initialRouteName="Home"
      >
      <Draw.Screen
        name="Home"
        component={Home}
        // options={{headerShown: false}}
      />
    </Draw.Navigator>
  );
}
