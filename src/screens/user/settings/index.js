import { View, Text, StyleSheet, TouchableOpacity, Image, Linking,Alert } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import Commonheader from '../../../components/common/commonheader'
import { Actions, Bubble, GiftedChat } from 'react-native-gifted-chat'
import Evilicons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Video from 'react-native-video'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Settings({ navigation }) {

  const [messages, setMessages] = useState([]);

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

  function checkLocationPermission() {
    check((Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION))
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request((Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION))
              .then((result) => {
                switch (result) {
                  case RESULTS.GRANTED:
                    onSendLocation()
                    break;
                  case RESULTS.DENIED:
                    break;
                }
              })
            break;
          case RESULTS.GRANTED:
            onSendLocation()
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

  const selectVideo = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((res) => {
      onSend([
        {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          video: res.path,
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
          name: 'Tarun',
          avatar: 'https://media.licdn.com/dms/image/D4D03AQGxBiiWbnf8yw/profile-displayphoto-shrink_800_800/0/1672235668486?e=2147483647&v=beta&t=MO8TW5lEt2jiw1xgysb40G6fSpNkCxLx3XrQ43hStYg',
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
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <Commonheader heading='Settings' iconName='chevron-back' onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            isKeyboardInternallyHandled = {false}
            renderActions={() => (
              <>
                <TouchableOpacity style={styles.cameraButton} onPress={checkCameraPermission}>
                  <Evilicons name='camera' size={30} color='black' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationButton} onPress={selectVideo}>
                  <Feather name='video' size={20} color='black' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationButton} onPress={checkLocationPermission}>
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
            renderMessageVideo={(props) => {
              return (
                <View style={{ borderRadius: 10 }}>
                  <Video
                    source={{ uri: props.currentMessage.video }}
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

            renderBubble={props => {
              const { currentMessage } = props
              if (currentMessage.location) {
                return <View style={{ height: 200, width: 200, marginVertical: 15, borderWidth: 1 }}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => Linking.openURL(`google.navigation:q=${props.currentMessage.location.latitude}+${props.currentMessage.location.longitude}`)}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      initialRegion={{
                        latitude: props.currentMessage.location.latitude,
                        longitude: props.currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      mapType={'standard'}
                      style={{ flex: 1 }}
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
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  cameraButton: {
    marginLeft: 4,
    alignSelf: 'center',
  },
  locationButton: {
    alignSelf: 'center',
  },
});