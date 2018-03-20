import { StyleSheet, Text, View, Modal, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import { Notifications, Permissions, Constants } from 'expo';
import {FontAwesome} from '@expo/vector-icons'
import Timer from './Timer'



export default class ReserveSpot extends React.Component {

  cancelSpot() {
    fetch(`http://127.0.0.1:3000/spots/${this.props.spot.id}/reservations`, {
        method: "POST",
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
        // console.log("reserve response from database",response);
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
      // console.log("cancel spot",  responseData)
       this.props.cancelClick(responseData, this.props.spot);

    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      //this.setState({showProgress: false})

    })

    }

    arrivalTimer() {
      <Timer showTimer={true}/>
    }
  render () {
    return(
    <View>
      <Text style={styles.text}>{this.props.spot.label}</Text>
      <Text style={styles.information}>{this.props.spot.spot_information}</Text>
      <TouchableOpacity style={styles.reserveButton} onPress={this.cancelSpot.bind(this)}><Text style={styles.reserveText}>Cancel</Text></TouchableOpacity>
        <TouchableOpacity style={styles.reserveButton} onPress={this.arrivalTimer.bind(this)}><Text style={styles.reserveText}>Arival</Text></TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  reserveModal:{
    backgroundColor: 'white',
    borderWidth: 1,
  },
  reserveButton: {
    backgroundColor: '#d0e7a6',
    height: 30,
    alignItems: 'center',
    width: 100,
    margin: 10,
    marginLeft: 125,
    color: 'white',
    padding: 5,

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
    top: 15,
  },
  reserveText: {
    color: 'white',
    fontWeight: 'bold'
  }

})

