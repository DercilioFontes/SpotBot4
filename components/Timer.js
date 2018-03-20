import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons'


export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 10 * 1,
      showTimer: false

    }
  }


  getSeconds() {
    if(this.state.secondsElapsed >= 0) {
      return('0' + this.state.secondsElapsed % 60).slice(-2);
    }
  }
  getMinutes() {
    if(this.state.secondsElpased >= 0) {
      // return ('0' + Math.floor(this.state.secondsElapsed / 60) + ':');
    }
  }
  cancelSpot() {
    console.log('reservespot',this.props)
    fetch(`http://127.0.0.1:3000/spots/${this.props.spot.id}/reservations`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reservation: {
            user_id: this.props.user_id,
            reservation_status: 'cancel'
          }
        })
      })
      .then((response) => {
        // console.log("reserve response from database",response);
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
      console.log("cancel spot",  responseData)
       this.props.cancelClick(responseData, this.props.spot);

    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      //this.setState({showProgress: false})

    })


  }

  startTimer() {
    if(this.props.showTimer) {
      // let interval = setInterval(() => {
      //       this.setState({
      //               secondsElapsed: this.state.secondsElapsed - 1
      //             })
      //   }, 1000)
      setTimeout(() => {
        clearInterval(this.interval)
        this.cancelSpot();
      }, 10000)
    }
  }




  render() {
  console.log('timer', this.props.showTimer)
    return (

      <View>
      {this.startTimer()}
      {this.props.showTimer &&
          <Text style={styles.timer}>

            {this.getMinutes()} {this.getSeconds()}
          </Text>
        }
      </View>
      )
  }
}


const styles = StyleSheet.create({
  timer: {
    color: 'white',
    position: 'absolute',
    fontWeight: 'bold',
    top: 400,
    left: 110,
    fontSize: 60
  }
})
