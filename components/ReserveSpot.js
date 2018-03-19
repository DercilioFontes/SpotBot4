import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React, {Component} from 'react'
import { Notifications, Permissions, Constants } from 'expo'
import {FontAwesome} from '@expo/vector-icons'

export default class ReserveSpot extends React.Component {
  async componentDidMount () {
    let result = await
    Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (result.status === 'granted') {
      console.log('Notification permissions granted.')
    } else {
      console.log('Permissions not granted.')
    }
  }

  reserveSpot () {
    fetch(`http://127.0.0.1:3000/spots/${this.props.spot.id}/reservations`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reservation: {
          user_id: this.props.user_id,
          reservation_status: 'reserved'
        }
      })
    })
      .then((response) => {
      // console.log("reserve response from database",response);
        if (response.status >= 200 && response.status < 300) {
          return response
        }
        throw {
          badCredentials: response.status === 401, 
          unknownError: response.status !== 401
        }
      })
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        console.log('parking spot', responseData)
        this.props.reserveClick(responseData)
      })
      .catch((err) => {
        this.setState(err)
        console.log(err)
      })
      .finally(() => {
      })
  }

  render () {
    Notifications.cancelAllScheduledNotificationsAsync()
    const localNotification = {
      title: 'hi ',
      body: 'u have 5 min', // (string) — body text of the notification.
      ios: { // (optional) (object) — notification configuration specific to iOS.
        sound: true // (optional) (boolean) — if true, play a sound. Default: false.
      },
      android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      // icon (optional) (string) — URL of icon to display in notification drawer.
      // color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
    }

    let t = new Date()
    t.setSeconds(t.getSeconds() + 10)
    const schedulingOptions = {
      time: t // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    // repeat: repeat
    }

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)

    return (
      <View style={styles.reserveModal}>
        <Image style={styles.image} source={require('../images/map.jpg')} />
        <FontAwesome name='car' style={styles.carIcon} color='#d0e7a6' size={100}/>
        <Text style={styles.text}>{this.props.spot.label}</Text>
        <Text style={styles.information}>{this.props.spot.spot_information}</Text>
        <TouchableOpacity style={styles.reserveButton} onPress={this.reserveSpot.bind(this)}><Text style={styles.reserveText}>Park Me</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reserveModal: {
    backgroundColor: 'white',
    borderWidth: 1
  },
  reserveButton: {
    backgroundColor: '#d0e7a6',
    height: 30,
    alignItems: 'center',
    width: 100,
    margin: 10,
    marginLeft: 125,
    padding: 5

  },
  image: {
    borderWidth: 1,
    height: 140,
    opacity: 0.3,
    width: 365
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  information: {
    fontSize: 15,
    textAlign: 'center'
  },
  carIcon: {
    position: 'absolute',
    right: 120,
    top: 15
  },
  reserveText: {
    color: 'white',
    fontWeight: 'bold'
  }

})
