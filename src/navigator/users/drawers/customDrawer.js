import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Image } from 'react-native';
import Images from '../../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomDraw = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.2,
          backgroundColor: '#004169',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={Images.logo2}
          style={{ height: 250, width: 250 }}
          resizeMode="contain"
        />
      </View>
      <DrawerContentScrollView>
        <DrawerItem
          icon={() => (
            <Icon name='person' size={20} />
          )}
          label="My Profile"
          labelStyle={{ fontSize: 20}}
          onPress={() => navigation.navigate('My Profile')}
        />
        <DrawerItem
          icon={() => (
            <Icon
              name='settings' size={20}
            />
          )}
          label="Settings"
          labelStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate('Settings')}
        />
        <DrawerItem
          icon={() => (
            <Icon name='log-out' size={20}/>
          )}
          label="Logout"
          labelStyle={{ fontSize: 20}}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'AuthStack',
                  state: {
                    routes: [
                      {
                        name: 'Login',
                      },
                    ],
                  },
                },
              ],
            });
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDraw;