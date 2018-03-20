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

      <Image style={styles.image} source={require('../assets/vancouver.jpg')} />
      <Text style={styles.text}>{this.props.spot.label}</Text>

         <Timer style={styles.text} cancelClick={this.props.cancelClick} spot={this.props.spot} showTimer={true} />

      <Text style={styles.information}>{this.props.spot.spot_information}</Text>
      <TouchableOpacity style={styles.reserveButton} onPress={this.cancelSpot.bind(this)}><Text style={styles.reserveText}>Cancel</Text></TouchableOpacity>
        <TouchableOpacity style={styles.reserveButton} onPress={this.arrivalTimer.bind(this)}><Text style={styles.reserveText}>Arival</Text></TouchableOpacity>
    </View>
  )}
}



const styles = StyleSheet.create({
  reserveModal:{
    backgroundColor: '#fff',
  },
  reserveButton: {
    alignSelf: 'center',
    borderWidth:2,
    borderColor: 'white',
    padding: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width:200,
    backgroundColor: '#15AEBC',
    borderStyle: 'solid',
    margin: 15,
  },
  image: {
    height: 60,
    opacity: 0.3,
    width: 365,
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

