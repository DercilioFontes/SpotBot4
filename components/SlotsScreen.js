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
      showSpots: true,
      showModal: false,
      user_id: 2,
      spot: {
        spot_id: 1,
        label: 'spot1',
        availability: true,
        accessible: false,
        spot_information: "this is spot 1"
      }
    }
  }
  showSlot(slot, user_id) {
    this.setState({showModal: true, user_id: user_id, spot: slot, showSpots: false})
  }

  reserveClick(newParkingArea, reserveSpot) {
    this.setState({showModal: false})
    this.props.homePage(newParkingArea, this.state.spot);
  }

  render() {
    const slotsAvailable = this.props.slots.filter(slot => slot.availability === true)
    const slotList = slotsAvailable.map((spot, index) => {
       return (
          <View>
          {
            <Slot key={index} spot={spot} user_id={this.state.user_id} showSlot={this.showSlot.bind(this)} />
          }
          </View>
        )
     })
    return (
      <ScrollView>
        { this.state.showSpots &&
          <View style={{marginTop: 30}}>
          {slotList}
         </View>
        }
        { this.state.showModal &&
          <View style={{margin: 5}}>
            <ReserveSpot spot={this.state.spot} reserveClick={this.reserveClick.bind(this)} user_id={this.state.user_id} />
          </View>
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

