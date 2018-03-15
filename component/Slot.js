import { StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons'


export default function Slot({slot, user_id, showSlot}) {
  //Database connection

  return (
    <View>
      {!slot.occupied &&
        <View>
      <TouchableOpacity onPress={() => showSlot(slot, user_id)}><Text>{slot.label}</Text></TouchableOpacity>
      <Text>{slot.accessible &&
        <MaterialIcons name='accessible' size={30}/>
      }</Text>
      <Text>{slot.spot_information}</Text>
      </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#aaa',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 500
  }
})
