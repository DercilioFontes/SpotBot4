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
          <Text style={styles.label}> {this.props.activatedSpot.label} </Text>
        </View>
        <View style={styles.content}>
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
    backgroundColor: '#545454'
  },
  content: {
    backgroundColor: 'white',
    height: '60%',
    padding: 10
  },
  textContent: {
    textAlign: 'center',
    fontSize: 16
  },
  label:{
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
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
    backgroundColor: '#15AEbc',
    borderStyle: 'solid',
    height: 40
  },
  cancelImage: {
    position: 'absolute',
    top: 5,
    left: '45%',
    width: 80,
    height: 80

  }
  })
