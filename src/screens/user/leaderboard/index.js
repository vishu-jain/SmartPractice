import React, { Component, useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, TextInput } from 'react-native';
import Commonheader from '../../../components/common/commonheader';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

export default function Leaderboard() {

  const [currentlat, setCurrentlat] = useState(null);
  const [currentlon, setCurrentlon] = useState(null);
  const [destination, setDestination] = useState(null);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your device location ' +
            'so that we can show you the nearest location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setCurrentlat(position.coords.latitude);
            setCurrentlon(position.coords.longitude)
          },
          error => {
            console.log(error.code, error.message, 'error');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, [])


  return (
    <View style={{ flex: 1 }}>
      {!currentlat || !currentlon ? (
        <Text>
          Waiting for Location......
        </Text>
      ) : (
        <View style={{ flex: 1 }}>
          <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
        }}
        onChangeText={text => setDestination(text)}
        value={destination}
        placeholder="Enter destination"
      />
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentlat,
            longitude: currentlon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType={'standard'}
          style={{ flex: 1 }}
          customMapStyle={[]}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <Marker coordinate={{
          latitude: currentlat,
          longitude: currentlon,
        }}
          title={'SmartData'}
          description={'SmartData Enterprises Pvt Ltd.'}
        />

          {destination && (
            <MapViewDirections
              origin={{ currentlat, currentlon }}
              destination={destination}
              apikey="AIzaSyCgapj-qqhOAiLIoiSCPeFpptqemMa2mXc"
              strokeWidth={3}
              strokeColor="#1da1f2"
            />
          )}
        </MapView>
        </View>
      )}

    </View>
  )
}
