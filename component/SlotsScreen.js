import React from 'react'
import { ScrollView, StyleSheet, Button, Text, View, Image, Modal,Icon, TouchableOpacity } from 'react-native'
import {MapView, Notifications } from 'expo';
import { StackNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';
import MapHome from './MapHome'
import Slot from './Slot'
import ReserveSpot from './ReserveSpot'


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

    const slotList = this.props.slots.map((slots, index) => {
       return (
          <View>
            <Slot key={index} slot={slots} showSlot={this.showSlot.bind(this)} />
          </View>
        )
     })

    return (
      <ScrollView>
        <View style={{backgroundColor: '#f00'}}>
         {slotList}
        </View>
        { this.state.showModal &&

            <ReserveSpot spot={this.state.spot} showModal={this.state.showModal}/>

        }
      </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor:'#aaa',
    justifyContent:'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
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

