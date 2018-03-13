import React from 'react'
import { StyleSheet, Button, Text, View, Image } from 'react-native'
import {MapView, Notifications } from 'expo';
import { StackNavigator } from 'react-navigation'



export default class MapHome extends React.Component {


  static navigationOptions = {
    headerTitle: 'SpotBot',
  }
  onMapPress(e) {
    const { navigate } = this.props.navigation;
    const parkingArea = this.props.parking_areas.filter(
      marker => marker.coordinates.latitude === e.nativeEvent.coordinate.latitude
      && marker.coordinates.longitude === e.nativeEvent.coordinate.longitude )
    navigate('Slots', {slots: parkingArea[0].slots, user_id: this.props.user_id})
  }

  render() {
    function checkStatusParkingArea (status) {
      if (status === 'full') {
        return <View style={styles.full} />
      }
      else {
        return <View style={styles.reserved} />
      }
    }
    return (
      <MapView
        style={styles.map}
        initialRegion={this.props.mapRegion}

        >

      {this.props.parking_areas.map((marker, index) => (
        <MapView.Marker key={index}
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
  full: {
    borderWidth:3,
    borderColor: 'white',
    backgroundColor: 'red',
    borderRadius: 15,
    width:30,
    height:30,
    justifyContent: 'center',
    alignItems:'center'
  },
  reserved:{
    borderWidth:3,
    borderColor: 'white',
    backgroundColor: 'green',
    borderRadius: 15,
    width:30,
    height:30,
    justifyContent: 'center',
    alignItems:'center'
  },
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
    flex: 1,
  },
});
