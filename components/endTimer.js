import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons'

function Clock({ countdown }) {
  return (
    <View>
    {countdown > 0 &&
      <Text> {Math.floor(countdown / 60)}:
        {(countdown % 60).toString().padStart(2, "0")}
      </Text>
    }
    </View>
  );
}
export default class EndTimer extends React.Component {
  state = {
    showClock: true,
    start: new Date(),
    duration: 20 };
  updateCountdown = () => {
    this.setState({
      duration: Math.floor(10 - (new Date() - this.state.start) / 1000)
    });
  };

  endSpot() {
    console.log('reservespot',this.props)
    fetch(`https://spot-bot-server.herokuapp.com/spots/${this.props.spot.id}/reservations`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reservation: {
            user_id: this.props.user_id,
            reservation_status: 'inactive'
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
      this.props.endSessionClick(responseData, this.props.spot);
    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      //this.setState({showProgress: false})
    })
  }

  render() {
    const clockSection = this.state.showClock && (
      <Clock countdown={this.state.duration} />
    );
    const countdownTimer = this.state.duration > 0 && (
      <Timer listener={this.updateCountdown} />
    );
    console.log('props in timer component', this.props)
    return (
      <View>
      {this.props.showTimer &&
        <View>
          {clockSection}
          {countdownTimer}
          {this.state.duration <= 0 &&
          <View>
            {this.endSpot()}
          </View>
          }
        </View>
      }
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