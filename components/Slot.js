import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons'

export default function Slot ({spot, user_id, showSlot}) {
  return (
    <TouchableOpacity style={styles.spotStyleContainer} onPress={() => showSlot(spot, user_id)}>
      <Image style={styles.image} source={require('../assets/evubc-car.jpg')} />
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={styles.label}>{spot.label}</Text>
        <Text style={styles.information}>{spot.spot_information}</Text>
      </View>
      <View>
        {spot.accessible &&
          <MaterialIcons style={styles.accessibleIconStyle} name='accessible' size={30} color='gray'/>
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  spotStyleContainer: {
    alignContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3
  },
  accessibleIconStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 18,
    color: '#15AEBC',
    flex: 1,
    paddingLeft: 5
  },
  information: {
    color: 'gray',
    flex: 1,
    paddingLeft: 5
  }
})
