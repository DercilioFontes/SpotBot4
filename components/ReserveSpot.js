import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React, {Component} from 'react'
import { Notifications, Permissions, Constants } from 'expo'
import {FontAwesome, Ionicons} from '@expo/vector-icons'

export default class ReserveSpot extends React.Component {
  reserveSpot () {
    fetch (`https://spot-bot-server.herokuapp.com/spots/${this.props.spot.id}/reservations`, {
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
    return (
      <View style={styles.reserveModal}>
        <Image style={styles.image} source={require('../assets/vancouver.jpg')} />
        <Text style={styles.text}>{this.props.spot.label}</Text>
        <Text style={styles.information}>{this.props.spot.spot_information}</Text>
        <TouchableOpacity style={styles.reserveButton} onPress={this.reserveSpot.bind(this)}><Text style={styles.reserveText}>RESERVE SPOT</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reserveModal: {
    backgroundColor: '#fff'
  },
  reserveButton: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: 200,
    backgroundColor: '#15AEBC',
    borderStyle: 'solid',
    margin: 15
  },
  image: {
    height: 60,
    opacity: 0.3,
    width: 365
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: '#0F303F'
  },
  information: {
    fontSize: 15,
    textAlign: 'center',
    color: '#545454'
  },
  reserveText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})
