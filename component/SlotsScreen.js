import React from 'react'
import { StyleSheet, Button, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import {MapView, Notifications } from 'expo';
import { StackNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';
import MapHome from './MapHome'
import Slot from './Slot'


export default class SlotsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      user_id: 2,
      spot: {
        spot_id: 1,
        label: 'spot1',
        occupied: true,
        accessible: false,
        spot_information: "this is spot 1"
      }
    }
  }
  showSlot(slot, user_id) {
      this.setState({showModal: true, user_id: user_id, spot: slot})
    }
  render() {
    var {params} = this.props.navigation.state;
    const currentDate = new Date();
    const startTime = new Date(currentDate.getTime() + (30 * 60 * 1000)).toLocaleString();
    const endTime = new Date(currentDate.getTime() + (60 * 60 * 1000)).toLocaleString();


    const slotList = params.slots.map((slots, index) => {
       return (
        <View>
          <Slot key={index} slot={slots} user_id={params.user_id} showSlot={this.showSlot.bind(this)} />
        </View>)
     })

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       {slotList}
       <Modal  visible={this.state.showModal} onRequestClose={()=>console.log('modal')}>
        <View style={styles.modalView}>
          <Text>{this.state.spot.label}</Text>
          <Text>{this.state.spot.spot_information}</Text>
          <Text>Start Time </Text>
          <Text>{startTime}</Text>
          <Text>End time </Text>
          <Text>{endTime}</Text>
          <TouchableOpacity onPress={()=>this.setState({showModal: false})}><Text style={styles.reserveButton}>Reserve</Text></TouchableOpacity>
        </View>
       </Modal>
      </View>
      )
  }
}
const styles = StyleSheet.create({
  modalView: {
    backgroundColor:'#aaa',
    height: 250,
    justifyContent:'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: 400,
  },
  reserveButton: {
    backgroundColor: '#333',
    color: '#bbb',
    padding: 5,
    margin: 20
  },
  full: {
    borderWidth:3,
    borderColor: 'white',
    backgroundColor: 'red',
    borderRadius: 15,
    width:30,
    height:30,
    justifyContent: 'center',
    alignItems:'center'
  },
  reserved:{
    borderWidth:3,
    borderColor: 'white',
    backgroundColor: 'green',
    borderRadius: 15,
    width:30,
    height:30,
    justifyContent: 'center',
    alignItems:'center'
  },
  radius: {
    backgroundColor: '#fff',
  },
  marker: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
});
