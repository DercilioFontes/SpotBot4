import React, {Component} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'

import EndTimer from './endTimer'

export default class ActiveReservationModal extends React.Component {
  endSession() {
     fetch(`http://127.0.0.1:3000/spots/${this.props.activatedSpot.id}/reservations`, {
        method: "POST",
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
        <View style={styles.header}>
        <EndTimer showTimer={true} spot={this.props.activatedSpot} endSessionClick={this.props.endSessionClick}/>
        </View>
        <View style={styles.content}>
        <Text style={styles.label}> {this.props.activatedSpot.label} </Text>
        <Text style={styles.textContent}> Your reservation is active </Text>
        <TouchableOpacity style={styles.endSessionButtom}  onPress={this.endSession.bind(this)}><Text style={styles.endSessionnText}>End Session</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    padding: 20,
    height: '40%',
    backgroundColor: '#3fc59c'
  },
  content: {
    backgroundColor: 'white',
    height: '60%',
  },
  textContent: {
    textAlign: 'center',
    fontSize: 16
  },
  label:{
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  endSessionnText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 8
  },
  endSessionButtom:{
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    width: 100,
    backgroundColor: '#e2747e',
    borderStyle: 'solid',
    height: 40,
    borderRadius: 10
  }
  })
