import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight, ActivityIndicator, AlertIOS, AsyncStorage, TouchableOpacity } from 'react-native'
import { MapView, Notifications } from 'expo'
import { StackNavigator } from 'react-navigation'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

// Our components
import SignUpComponent from './components/SignupScreen'
import LoginComponent from './components/LoginScreen'
import MapHome from './components/MapHome'
import Slot from './components/Slot'
import SlotsScreen from './components/SlotsScreen'

// Main Screen
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        user: {},
        token: '',
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
        parking_areas: [{
            title: 'Marker1',
            parkingAreaStatus: 'reserved',
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
              occupied: false,
              accessible: true,
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
              accessible: true,
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
              accessible: true,
              spot_information: "this is spot 1"
              },
              {
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
              accessible: true,
              spot_information: "this is spot 1"
              },
              {
              spot_id: 1,
              label: 'kiwi',
              occupied: true,
              accessible: true,
              spot_information: "this is spot 1"
              },
              {
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
              accessible: true,
              spot_information: "this is spot 1"
            }]
          },
          ]
        };
    }


  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      headerTitle: 'SpotBot',
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title='Filter'
          color="#fff"
        /> ),
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title={'\u2630'}
          color="#fff"
        /> )
    }
  }

  onMapPress(parkingArea) {
    this.setState({
      currentArea: parkingArea,
       showSlotsDetails: true
    })
  }

  closeSlot() {
    this.setState({
       showSlotsDetails: false
    })
  }

  async componentWillMount() {
    var token
    try {
      await AsyncStorage.multiGet(['token', 'user']).then((data) => {
        if(data[0][1]) {
          token = data[0][1] || null
          return data[1][1] // I can pass a function here to make a fetch (GET request with route users/id) to get the user or other data
        }
      }).then((user) => {
        if(user) {
          return user.json()
        } else {
          return null
        }
      }).then((user) => {
        this.setState({
          user: user,
          token: token
        })
      }) 
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message)
    }
  }

  componentDidMount() {
    var newParkingStatus = [...this.state.parking_areas]
    newParkingStatus.forEach(
      (parkingArea, index) => {
      const totalSlot = parkingArea.slots.length;
      const occupied = parkingArea.slots.filter(slot => slot.occupied === true)
            parkingArea.description = `Total slots: ${totalSlot}`
        if(occupied.length === totalSlot) {
            parkingArea.parkingAreaStatus = 'full'
        }
      }
    )
    this.setState({parking_areas: newParkingStatus});
  }


  render() {

    return (
      <View>
        <View style={{ height: this.state.showSlotsDetails ? '50%' : '100%', backgroundColor: '#f00'}}>
          <MapHome onMapPress={this.onMapPress.bind(this)} parking_areas={this.state.parking_areas} user_id={this.state.users.user_id} mapRegion={this.state.mapRegion} navigation={this.props.navigation}>
          </MapHome>
        </View>
        { this.state.showSlotsDetails &&
          <View style={{ height: '50%', backgroundColor: '#0f0'}}>
          <MaterialIcons name='filter-list' size={30}/>

             <Button
                onPress={this.closeSlot.bind(this)}
                title="Close"
                color="#841584"
              />
              <SlotsScreen slots={this.state.currentArea.slots} />
            </View>
        }
      </View>
    )
  }
}

// Modal of the headers button
class ModalScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>SpotBot App</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Sign up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

class SignUpScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      navigationOptions: this.navigationOptions
    } 
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    
    return {
      title: 'Sign Up',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    }
  }

  render() {
    return ( <SignUpComponent navigation={this.state.navigationOptions}/>)
  }  
}

class LoginScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      navigationOptions: this.navigationOptions
    }
  }

  
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    
    return {
      title: 'Login',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    }
  }

  render() {

    return ( <LoginComponent navigation={this.state.navigationOptions}/>)
  }
}

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    SignUp: {
      screen: SignUpScreen
    },
    Login: {
      screen: LoginScreen
    }
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#d3d3d3',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}