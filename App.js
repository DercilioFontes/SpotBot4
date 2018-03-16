import React from 'react'
import { StyleSheet, Button, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import {MapView, Notifications } from 'expo';
import { StackNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';
import MapHome from './component/MapHome'
import Slot from './component/Slot'
import SlotsScreen from './component/SlotsScreen'
import {MaterialIcons} from '@expo/vector-icons'


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
            showSlotsDetails: false,
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
            currentArea: {
                title: 'Marker1111',
                parkingAreaStatus: 'full',
                description: 'Description about spot1',
                coordinates: {
                  latitude: 49.269966,
                  longitude: -123.251043,
                },
                slots: [{
                  spot_id: 1,
                  label: 'spot1',
                  availability: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'spot2',
                  availability: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'spot3',
                  availability: true,
                  accessible: true,
                  spot_information: "this is spot 1"
                }]
              },
            parking_areas: [{
                title: 'Marker123',
                parkingAreaStatus: 'reserved',
                description: 'Description about spot1',
                coordinates: {
                  latitude: 49.269966,
                  longitude: -123.251043
                },
                slots: [{
                  spot_id: 1,
                  label: 'spot1',
                  availability: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'spot2',
                  availability: false,
                  accessible: true,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'spot3',
                  availability: true,
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
                  availability: true,
                  accessible: true,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'bravo',
                  availability: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'charlie',
                  availability: true,
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
                  availability: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'kiwi',
                  availability: true,
                  accessible: true,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'raspberry',
                  availability: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'kiwi',
                  availability: true,
                  accessible: true,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'kiwi',
                  availability: true,
                  accessible: true,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'raspberry',
                  availability: true,
                  accessible: false,
                  spot_information: "this is spot 1"
                  },
                  {
                  spot_id: 1,
                  label: 'kiwi',
                  availability: true,
                  accessible: true,
                  spot_information: "this is spot 1"
                }]
              },
              ]
            };
        }


// fetch parking area from database

  // componentWillMount() {
  //   this.fetchParkingArea();
  // }

  // fetchParkingArea = async () => {
  //   const response = await fetch('http://127.0.0.1:3000/');
  //   const parking_areas_obj = await response.json();
  //   const raw_parking_areas = parking_areas_obj.parking_areas;
  //   return raw_parking_areas.map((raw_area) => {
  //     // raw_area.title = raw_area.parking_area_name;
  //     // return raw_area;
  //     return {
  //       parking_area_id: raw_area.parking_area.id,
  //       title: raw_area.parking_area.parking_area_name,
  //       description: raw_area.parking_area.parking_area_name,
  //       parkingAreaStatus: 'full',
  //       coordinates: {
  //         latitude: raw_area.parking_area.latitude,
  //         longitude: raw_area.parking_area.longitude,
  //       },
  //       slots: parking_areas_obj.parking_areas[0].spots
  //     }
  //   })
  //   // this.setState({parking_areas: tidy_parking_areas})
  //   // console.log(this.state.parking_areas);
  // }


  static navigationOptions = {
    headerTitle: 'SpotBot',
  }

    onMapPress(parkingArea) {
      if(parkingArea.parkingAreaStatus !== 'full'){
        this.setState({
          currentArea: parkingArea,
           showSlotsDetails: true
        })
      }
    }

     closeSlot() {
      this.setState({
         showSlotsDetails: false
      })
    }

    componentDidMount() {

      function transformRaw(pa) {
        console.log('pa inside transformRaw', pa)
        return pa.parking_areas.map(raw_area => {
          return {
                parking_area_id: raw_area.parking_area.id,
                title: raw_area.parking_area.parking_area_name,
                description: raw_area.parking_area.parking_area_name,
                parkingAreaStatus:'reserved',
                coordinates: {
                  latitude: raw_area.parking_area.latitude,
                  longitude: raw_area.parking_area.longitude,
                },
                slots: raw_area.spots

              }
        })
      }

      function availability(parkingAreas) {
        return parkingAreas.map((parkingArea) => {
          const totalSlot = parkingArea.slots.length;
          const unavailable_spots = parkingArea.slots.filter(slot => slot.availability === false)
                console.log("green", availability);
                parkingArea.description = `Total slots: ${totalSlot}`
            if(unavailable_spots.length === totalSlot) {
                parkingArea.parkingAreaStatus = 'full',
                parkingArea.description = `Total slots: ${totalSlot} Status:Full`
            }

          return parkingArea;
        });
      }

      const that = this;
      // const parkingAreas = this.fetchParkingArea();
      // console.log("parking check", parkingAreas)
      fetch('http://127.0.0.1:3000/')
        .then(res => res.json())
        .then(transformRaw)
        .then(availability)
        .then(newParkingStatus => that.setState({parking_areas: newParkingStatus}))
        // .then(test => console.log('teeeeeeeeest', test));


      // var newParkingStatus = [...this.state.parking_areas]
      // parkingAreas.forEach(
      //   (parkingArea, index) => {
      //   const totalSlot = parkingArea.slots.length;
      //   const availability = parkingArea.slots.filter(slot => slot.availability === true)
      //         parkingArea.description = `Total slots: ${totalSlot}`
      //     if(availability.length === totalSlot) {
      //         parkingArea.parkingAreaStatus = 'full',
      //         parkingArea.description = `Total slots: ${totalSlot} Status:Full`
      //     }
      //   }
      // )
      // this.setState({parking_areas: newParkingStatus});
    }
    filterAccessibility() {
      var newParking = this.state.currentArea;
      const accessibles = this.state.currentArea.slots.filter(slot => slot.accessible === true && slot.availability === true);
      console.log(accessibles);
      this.setState({
        currentArea:{slots: accessibles},
        showSlotsDetails: true
      })
    }

  render() {
    return (
      <View>
        <View style={{ height: this.state.showSlotsDetails ? '50%' : '100%', backgroundColor: '#f00'}}>
          <MapHome onMapPress={this.onMapPress.bind(this)} parking_areas={this.state.parking_areas} user_id={this.state.users.user_id} mapRegion={this.state.mapRegion}  navigation={this.props.navigation}>
          </MapHome>
        </View>
        { this.state.showSlotsDetails &&
          <View style={{ height: '50%', backgroundColor: '#0f0'}}>
          <MaterialIcons onPress={this.filterAccessibility.bind(this)} name='filter-list' size={30}/>
             <Button
                onPress={this.closeSlot.bind(this)}
                title="Close"
                color="#841584"
              />
              <SlotsScreen key={1} user_id={this.state.user_id} slots={this.state.currentArea.slots} />
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
    height: '100%'
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
