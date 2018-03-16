import { StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import { Notifications, Permissions } from 'expo';


export default class ReserveSpot extends React.Component {
  async componentDidMount() {
    let result = await
    Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (result.status === 'granted') {
     console.log('Notification permissions granted.')
    }
  }

  reserveSpot(localNotification, schedulingOptions) {
      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    fetch(`http://127.0.0.1:3000/spots/${this.props.spot.id}/reservations`, {
        method: "POST",
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
        console.log(response);
      if(response.status >= 200 && response.status < 300) {
        return response
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      console.log(responseData)
      //  this.setState({ success: true })
      // this._onValueChange(STORAGE_KEY, responseData.id_token)
      // AlertIOS
    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      this.setState({showProgress: false})

      // REMOVE THIS ???????????
      // console.log(STORAGE_KEY)
    })

    }
  render () {
    const localNotification = {
    title: 'Hi',
    body: 'You have 5 min left', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };


  const schedulingOptions = {
    time: (new Date()).getTime() + 3000
  };

    return(
    <View style={styles.reserveModal}>
      <Text>{this.props.spot.label}</Text>
      <Text>{this.props.spot.spot_information}</Text>
      <TouchableOpacity onPress={this.reserveSpot.bind(this,localNotification, schedulingOptions )}><Text >Reserve</Text></TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  reserveButton: {
    backgroundColor: '#aaa',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 500
  },
  reserveModal: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: '#bbb'

  }

})

