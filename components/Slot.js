import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {MaterialIcons} from '@expo/vector-icons'

export default function Slot ({spot, user_id, showSlot}) {
  return (
    <View >
      <View style={styles.spotSyleContainer}>
        <TouchableOpacity style={{width: 320, height: 50}} onPress={() => showSlot(spot, user_id)}>
          <Text style={styles.label}>{spot.label}</Text>
          <Text style={styles.information}>{spot.spot_information}</Text>
        </TouchableOpacity>
        <Text>{spot.accessible &&
            <MaterialIcons style={styles.accessibleIconStyle} name='accessible' size={30} color='gray'/>
        }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  spotSyleContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    padding: 5
  },
  accessibleIconStyle: {
    textAlign: 'right'
  },
  label: {
    fontSize: 18
  },
  information: {
    color: 'gray'
  }

})
