import React from 'react'
import { StyleSheet, Button, Text, View, Image } from 'react-native'
import {MapView, Notifications } from 'expo';
import { StackNavigator } from 'react-navigation'
import Timer from './Timer'
import SearchSpot from './SearchSpot'

export default class MapHome extends React.Component {

  static navigationOptions = {
    headerTitle: 'SpotBot',
  }

  onMapPress(e) {
    // navigate('Slots', {spots: parkingArea[0].spots, user_id: this.props.user_id})
    const parkingArea = this.props.parking_areas.filter(
      marker => marker.coordinates.latitude === e.nativeEvent.coordinate.latitude
      && marker.coordinates.longitude === e.nativeEvent.coordinate.longitude )
    this.props.onMapPress(parkingArea[0]);
  }

  render() {
    function checkStatusParkingArea (status) {
      if (status === 'full') {
        return  <Image style={styles.image} source={require('../images/redmarkerPNG.png')} />
      }
      else {
        return <Image style={styles.imageGreen} source={require('../images/greenmarkerPNG2.png')} />
      }
    }

    return (
      <MapView
        style={styles.map}
        initialRegion={this.props.mapRegion}
        mapType={'hybrid'}
      >
      {this.props.parking_areas.map((marker, index) => (
        <MapView.Marker key={index}
          zIndex={9999}
          title = {marker.title}
          coordinate = {marker.coordinates}
          description = {marker.description}
          onPress={this.onMapPress.bind(this)}
          >
            {checkStatusParkingArea(marker.parkingAreaStatus)}
          </MapView.Marker>
        ))}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  radius: {
    backgroundColor: '#fff',
  },
  marker: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1
  },
  image: {
    width: 35,
    height:50
  },
  imageGreen: {
    width: 35,
    height:50
  },
  timer: {
    position: 'absolute',
    bottom: 100,
    left: 200
  }
});
