import { View, Text, StyleSheet, TouchableOpacity, Image,Linking } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import Commonheader from '../../../components/common/commonheader'
import { Actions, Bubble, GiftedChat } from 'react-native-gifted-chat'
import Evilicons from 'react-native-vector-icons/EvilIcons'
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export default function Settings({ navigation }) {

  const [messages, setMessages] = useState([]);
  const [photo, setPhoto] = useState('');

  function checkCameraPermission() {
    check((Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA))
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request((Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA))
              .then((result) => {
                switch (result) {
                  case RESULTS.GRANTED:
                    openCamera()
                    break;
                  case RESULTS.DENIED:
                    break;
                }
              })
            break;
          case RESULTS.GRANTED:
            openCamera()
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true
    }).then(res => {
      onSend([
        {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          image: res.path,
        }
      ])
    });
  }


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello Vishu',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const onSendLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        onSend([
          {
            _id: Math.round(Math.random() * 1000000),
            createdAt: new Date(),
            user: {
              _id: 1,
            },
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }
        ])
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Commonheader heading='Settings' iconName='chevron-back' onPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          renderActions={() => (
            <>
              <TouchableOpacity style={styles.cameraButton} onPress={checkCameraPermission}>
                <Evilicons name='camera' size={30} color='black' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.locationButton} onPress={onSendLocation}>
                <Evilicons name='location' size={30} color='black' />
              </TouchableOpacity>
            </>
          )}
          renderMessageImage={(props) => {
            return (
              <View style={{ borderRadius: 10 }}>
                <Image
                  source={{ uri: props.currentMessage.image }}
                  resizeMode='cover'
                  style={{
                    height: 200,
                    width: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
              </View>
            )
          }}


          // renderMessage={message => {
          //   if (message.location) {
          //     return (
          //       <MapView
          //         provider={PROVIDER_GOOGLE}
          //         initialRegion={{
          //           latitude: message.location.latitude,
          //           longitude: message.location.longitude,
          //           latitudeDelta: 0.0922,
          //           longitudeDelta: 0.0421,
          //         }}
          //         mapType={'standard'}
          //         style={{ height:200,width:200 }}
          //         customMapStyle={[]}
          //         showsUserLocation={true}
          //         loadingEnabled={true}
          //       />
          //     )
          //   }
          //   return <GiftedChat.Message {...message} />
          // }}
          renderBubble={props => {
            const {currentMessage} = props
            if (currentMessage.location) {
              return  <View style={{height:200,width:200,marginVertical:15,borderWidth:1}}>
                <TouchableOpacity style={{flex:1}} onPress={() => Linking.openURL(`google.navigation:q=${props.currentMessage.location.latitude}+${props.currentMessage.location.longitude}`)}>
              <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: props.currentMessage.location.latitude,
                  longitude: props.currentMessage.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                mapType={'standard'}
                style={{flex:1}}
                customMapStyle={[]}
                showsUserLocation={true}
                loadingEnabled={true}
                />
                </TouchableOpacity>
              </View>
            }
            return <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#138542'
                }
              }}
            />
          }}
          user={{ _id: 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cameraButton: {
    marginLeft: 4,
    borderRadius: 30,
    alignSelf: 'center',
  },
  locationButton: {
    borderRadius: 30,
    alignSelf: 'center',
  },
});