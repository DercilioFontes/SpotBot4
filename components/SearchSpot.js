import React from 'react'
import { StyleSheet, TextInput, Text, View, Image } from 'react-native'
import Modal from 'react-native-modal'
import { SearchBar, Button } from 'react-native-elements'
import {Ionicons} from '@expo/vector-icons'
import ReserveSpot from './ReserveSpot'

export default class SearchSpot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      reserveModal: false,
      searchSpot: []
    }
  }

  reserveClick (newParkingArea, reserveSpot) {
    this.setState({reserveModal: false})
    this.props.homePage(newParkingArea, reserveSpot)
  }
  searchSpot () {
    for (const area of this.props.parkingAreas) {
      for (const spot of area.slots) {
        if (spot.label === this.state.searchText) {
          this.setState({
            reserveModal: true,
            searchText: '',
            searchSpot: spot
          })
        }
      }
    }
  }

  render () {
    return (
      <View>
        <View style={styles.containerStyle}>
          <TextInput placeholder="Search my spot" style={styles.searchTextStyle} value={this.state.searchText} onChangeText={searchText => this.setState({searchText})} />
          <View style={styles.searchButton} >
            <Ionicons name='md-search' onPress={this.searchSpot.bind(this)} color='black' size={25}/>
          </View>
        </View>

        <Modal
          isVisible={this.state.reserveModal}
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
        >
          <ReserveSpot spot={this.state.searchSpot} reserveClick={this.reserveClick.bind(this)}/>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    width: 200,
    padding: 5
  },
  searchTextStyle: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 20
  },
  searchButton: {
  }
})
