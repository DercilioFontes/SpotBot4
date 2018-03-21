import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React, {Component} from 'react'
import { Notifications, Permissions, Constants } from 'expo'
import {FontAwesome} from '@expo/vector-icons'
import Timer from './Timer'

export default class ReserveSpot extends React.Component {
  cancelSpot () {
    fetch(`http://127.0.0.1:3000/spots/${this.props.spot.id}/reservations`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reservation: {
          user_id: this.props.user_id,
          reservation_status: 'empty'
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
        this.props.cancelClick(responseData, this.props.spot)
      })
      .catch((err) => {
        this.setState(err)
        console.log(err)
      })
      .finally(() => {
        // this.setState({showProgress: false})
      })
  }

  arrivalButton () {
    this.props.activateClick(this.props.spot)
  }

  render () {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flexDirection: 'column'}}>
          <Image style={styles.image} source={require('../assets/vancouver.jpg')} />
          <Text style={styles.text}>{this.props.spot.label}</Text>
          <Timer style={styles.text} cancelClick={this.props.cancelClick} spot={this.props.spot} showTimer={true} />
          <Text style={styles.information}>{this.props.spot.spot_information}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity style={styles.reserveButton} onPress={this.arrivalButton.bind(this)}>
            <Text style={styles.reserveText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={this.cancelSpot.bind(this)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 100,
    backgroundColor: '#15AEBC',
    borderStyle: 'solid',
    height: 50

  },
  image: {
    height: 60,
    opacity: 0.3,
    width: 370
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
  },
  cancelText: {
    color: '#15AEBC',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  cancel: {
    borderWidth: 2,
    borderColor: '#15AEBC',
    padding: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 100,
    backgroundColor: 'white',
    borderStyle: 'solid',
    height: 50

  }
})
