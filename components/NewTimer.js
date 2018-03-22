import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons'

function Clock({ countdown }) {
  return (
    <View>
      <Text> {Math.floor(countdown / 60)}:
      {(countdown % 60).toString().padStart(2, "0")}
    </Text>
    </View>

  );
}
export default class NewTimer extends React.Component {
  state = { showClock: true, start: new Date(), duration: 10 };
  updateCountdown = () => {
    this.setState({
      duration: Math.floor(1800 - (new Date() - this.state.start) / 1000)
    });
  };
  render() {
    const clockSection = this.state.showClock && (
      <Clock countdown={this.state.duration} />
    );
    const countdownTimer = this.state.duration > 0 && (
      <Timer listener={this.updateCountdown} />
    );
    return (
      <View>
        <Text>

        </Text>
        {clockSection}
        {countdownTimer}
      </View>
    );
  }
}

class Timer extends Component {
  componentDidMount() {
    this.intervalId = setInterval(this.props.listener, 250);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    return false;
  }
}