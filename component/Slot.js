import { StyleSheet, Text, View } from 'react-native';
import React, {Component} from 'react';
function Slot({label, occupied, accessible, spot_information}) {
  return (
    <View>
     <Text>{label}</Text>
     <Text>{occupied}</Text>
     <Text>{accessible}</Text>
     <Text>{spot_information}</Text>
    </View>
  )
}
export default Slot;