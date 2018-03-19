import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons'

export default function Slot ({spot, user_id, showSlot}) {
  return (
      <TouchableOpacity style={styles.spotStyleContainer} onPress={() => showSlot(spot, user_id)}>
        <Image style={styles.image} source={require('../assets/evubc-car.jpg')} />
        <Text style={styles.label}>{spot.label}</Text>
        <Text style={styles.information}>{spot.spot_information}</Text>
        <Text>
          {spot.accessible &&
            <MaterialIcons style={styles.accessibleIconStyle} name='accessible' size={30} color='gray'/>
          }
        </Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  spotStyleContainer: {
    alignContent: 'space-around',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3
  },
  accessibleIconStyle:{
    justifyContent: 'flex-end',
    flex: 1,
  },
  label: {
    fontSize: 18,
    color: '#F26101',
    flex: 1,
    paddingLeft: 5
  },
  information:{
    color: 'gray',
    flex: 2

  }

})
