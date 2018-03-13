import { StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';


export default function Slot({slot, user_id, showSlot}) {
  return (
    <View>
      <TouchableOpacity onPress={()=>showSlot(slot, user_id)}><Text>{slot.label}</Text></TouchableOpacity>
      <Text>{slot.occupied}</Text>
      <Text>{slot.accessible}</Text>
      <Text>{slot.spot_information}</Text>
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
