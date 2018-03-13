import React from 'react'
import { StyleSheet, Button, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import {MapView, Notifications } from 'expo';
import { StackNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';
import MapHome from './component/MapHome'
import Slot from './component/Slot'
import SlotsScreen from './component/SlotsScreen'


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./src/evubc-car.jpg')}
        style={{ width: 380, height: 38 }}
      />
    );
  }
}


class HomeScreen extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            annotations: [],
            mapRegion: {
              latitude: 49.269966,
              longitude: -123.251043,
              latitudeDelta: 0.004,
              longitudeDelta: 0.04,
              title: "UBC parking slot"
            },
            users: {
              user_id: 2,
              name: 'prerana'
            },
            currentArea: 0,
            parking_areas: [{
                title: 'Marker1',
                parkingAreaStatus: 'full',
                description: 'Description about spot1',
                coordinates: {
                  latitude: 49.269966,
                  longitude: -123.251043
                },
                slots: [{
                  spot_id: 1,
                  label: 'spot1',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'spot2',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'spot3',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                }]
              },
              {
                title: 'Marker2',
                description: 'Description about spot2',
                parkingAreaStatus: 'reserved',
                coordinates: {
                  latitude: 49.264554,
                  longitude: -123.255521
                },
                slots: [{
                  spot_id: 1,
                  label: 'alpha',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'bravo',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'charlie',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                }]
              },
              {
                title: 'Marker3',
                description: 'Description about spot3',
                parkingAreaStatus: 'reserved',
                coordinates: {
                  latitude: 49.261811,
                  longitude: -123.243056
                },
                slots: [{
                  spot_id: 1,
                  label: 'raspberry',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'kiwi',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'oranges',
                  occupied: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                }]
              },
              ]
            };
        }


  static navigationOptions = {
    headerTitle: 'SpotBot',
  }

    onMapPress(parkingArea) {
      alert(parkingArea.title)
      this.setState({
        currentArea: parkingArea,
        isFirstLoad: true
      })
    }

  render() {
    // return (
    //   <MapHome parking_areas={this.state.parking_areas} user_id={this.state.users.user_id} mapRegion={this.state.mapRegion} navigation={this.props.navigation}>
    //   </MapHome>
    // )

    const drawerVisible = true;
    return (
      <View>
        <View style={{ height: drawerVisible ? '80%' : '100%', backgroundColor: '#f00'}}>
          <MapHome onMapPress={this.onMapPress.bind(this)} parking_areas={this.state.parking_areas} user_id={this.state.users.user_id} mapRegion={this.state.mapRegion} navigation={this.props.navigation}>
          </MapHome>
        </View>
        {
          drawerVisible &&
          <View style={{ height: '20%', backgroundColor: '#0f0'}}>
          {/*<SlotsScreen slots={this.state.parkingArea[this.state.currentArea].slots, user_id: this.props.user_id} /)*/}
        </View>
        }

      </View>
    )
  }
}



class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.spotLabel : 'A Nested Details Screen',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    }
  }

  render() {

    const { params } = this.props.navigation.state;
    const spotId = params ? params.spotId : null;
    const spotLabel = params ? params.spotLabel : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>Login / Sign up</Text>
        <Text>Spot picked: {spotLabel}</Text>
        {/* <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        /> */}
        {/* <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({spotLabel: 'Updated!'})}
        /> */}
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
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

// export default StackNavigator({
//     Home: { screen: HomeScreen },
//     Slots: { screen: SlotsScreen },

//   }, {
//     mode: 'modal'
//   });
