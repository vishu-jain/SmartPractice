import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Image } from 'react-native';
import Images from '../../../assets';
import  Icon  from 'react-native-vector-icons/Ionicons';
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
          //   <Image
          //     source={Images.profileicon}
          //     style={{ height: 20, width: 20 }}
          //     resizeMode="contain"
          //   />
          <Icon name='home' size={20}/>
          )}
          label="Home"
          labelStyle={{ fontSize: 20}}
          onPress={() => navigation.navigate('Home')}
        />
        {/* <DrawerItem
          icon={() => (
            <Image
              source={Images.referralicon}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
          )}
          label="Referral"
          labelStyle={{ fontSize: 20}}
          onPress={() => navigation.navigate('Referral')}
        /> */}
        {/* <DrawerItem
          icon={() => (
            <Image
              source={Images.settingsicon}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
          )}
          label="Settings"
          labelStyle={{ fontSize: 20 }}
          onPress={() => navigation.navigate('Settings')}
        /> */}
        <DrawerItem
          icon={() => (
            // <Image
            //   source={Images.logouticon}
            //   style={{ height: 20, width: 20 }}
            //   resizeMode="contain"
            // />
            <Icon name='power' size={20}/>
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