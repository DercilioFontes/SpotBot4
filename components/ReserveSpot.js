import { StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

export default class ReserveSpot extends React.Component {
  render () {
    return(
    <View style={styles.reserveModal}>
      <Text>{this.props.spot.label}</Text>
      <Text>{this.props.spot.spot_information}</Text>
      <TouchableOpacity onReserveButtonPress={() => this.setState({showModal: false})}><Text >Reserve</Text></TouchableOpacity>
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
