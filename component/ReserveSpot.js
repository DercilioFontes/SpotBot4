import { StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

export default class ReserveSpot extends React.Component {
  reserveSpot() {
    alert(this.props.user_id)
    fetch(`http://127.0.0.1:3000/:${this.props.spot_id}/reservations`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reservation: {
            user_id: this.props.user_id,
            reservation_status: 'reserved'
          }
        })
      })
      .then((response) => {
        console.log(response);
      if(response.status >= 200 && response.status < 300) {
        return response
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      console.log(responseData)
      //  this.setState({ success: true })
      // this._onValueChange(STORAGE_KEY, responseData.id_token)
      // AlertIOS
    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      this.setState({showProgress: false})

      // REMOVE THIS ???????????
      // console.log(STORAGE_KEY)
    })
    }
  render () {
    return(
    <View style={styles.reserveModal}>
      <Text>{this.props.spot.label}</Text>
      <Text>{this.props.spot.spot_information}</Text>
      <TouchableOpacity onPress={this.reserveSpot.bind(this)}><Text >Reserve</Text></TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  reserveButton: {
    backgroundColor: '#aaa',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 500
  },
  reserveModal: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: '#bbb'

  }

})

