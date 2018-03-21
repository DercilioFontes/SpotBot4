import React, {Component} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'

import Timer from './Timer'

export default class ActiveReservationModal extends React.Component {
  endSession () {
    fetch(`http://127.0.0.1:3000/spots/${this.props.activatedSpot.id}/reservations`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reservation: {
          user_id: this.props.user_id,
          reservation_status: 'ended'
        }
      })
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
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
        this.props.endSessionClick(responseData)
      })
      .catch((err) => {
        this.setState(err)
        console.log(err)
      })
      .finally(() => {
      // this.setState({showProgress: false})
      })
  }

  render () {
    return (
      <View>
        <Timer showTimer={true} spot={this.props.activatedSpot}/>
        <Text> Your reservation is active </Text>
        <TouchableOpacity onPress={this.endSession.bind(this)}><Text>End Session</Text></TouchableOpacity>
      </View>
    )
  }
}
