import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons'


export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 5 * 1
    }
  }

  getSeconds() {
    return('0' + this.state.secondsElapsed % 60).slice(-2);
  }
  getMinutes() {
    return ('0' + Math.floor(this.state.secondsElapsed / 60));
  }

  componentDidMount() {
    setInterval(() => {
      if(this.state.secondsElapsed <= 0) {
        clearInterval(this.state.interval);
        return;
      }

      interval = this.setState({
                secondsElapsed: this.state.secondsElapsed - 1
              })
    }, 1000)
  }

  render() {
    return (
      <View>
          <Text style={styles.timer}>
            {this.getMinutes()}:{this.getSeconds()}
          </Text>
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
