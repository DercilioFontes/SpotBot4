import React, {Component} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'

import EndTimer from './endTimer'

export default class CancelReservationMessage extends React.Component {
  closeNotification() {
    this.props.closeNotification()
  }

  render () {
    return (
      <View>
        <View style={styles.header}>
         <Image style={styles.cancelImage} source={require('../images/cancel.png')} />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}> {this.props.activatedSpot.label} </Text>
          <Text style={styles.textContent}> Your reservation has been cancelled </Text>
          <TouchableOpacity style={styles.endSessionButtom}  onPress={this.closeNotification.bind(this)}><Text style={styles.endSessionnText}>Close</Text></TouchableOpacity>
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
  },
  cancelImage: {
    position: 'absolute',
    top: 5,
    left: '45%',
    width: 80,
    height: 80

  }
  })
