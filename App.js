import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight, ActivityIndicator, AlertIOS, AsyncStorage, TouchableOpacity, ImageBackground} from 'react-native'
import { MapView, Notifications } from 'expo'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

// Our components
import SignUpComponent from './components/SignupScreen'
import LoginComponent from './components/LoginScreen'
import MapHome from './components/MapHome'
import Slot from './components/Slot'
import SlotsScreen from './components/SlotsScreen'
import Drawer from './components/Drawer'


const DrawerExample = DrawerNavigator (
  {
    Login: {
      screen: Drawer
    }
  },
  {
      initialRouteName: 'Login',
      drawerPosition: 'lefts'
  }
)



const STORAGE_KEY = {}

// Main Screen
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
            title: 'Marker1',
            parkingAreaStatus: 'full',
            description: 'Description about spot1',
            coordinates: {
              latitude: 49.269966,
              longitude: -123.251043,
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
              accessible: true,
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
          color={params.headerTintColor}
        /> )
    }
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
    var newParkingStatus = [...this.state.parking_areas]
    newParkingStatus.forEach(
      (parkingArea, index) => {
      const totalSlot = parkingArea.slots.length;
      const occupied = parkingArea.slots.filter(slot => slot.occupied === true)
            parkingArea.description = `Total slots: ${totalSlot}`
        if(occupied.length === totalSlot) {
            parkingArea.parkingAreaStatus = 'full',
            parkingArea.description = `Total slots: ${totalSlot} Status:Full`
        }
      }
    )
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
          <MaterialIcons  name='filter-list' size={30}/>
             <Button
                onPress={this.closeSlot.bind(this)}
                title="Close"
                color="#841584"
              />
              <SlotsScreen user_id={this.state.user_id} slots={this.state.currentArea.slots} />
            </View>
        }

      </View>
    )
  }
}

// Modal of the headers button
class ModalScreen extends React.Component {

  render() {
    const pic = require('./assets/vancouver.jpg')

    return (
      <ImageBackground source= {pic} style={{ opacity: .7,  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.main_header }>SpotBot</Text>
        <Text
          style={styles.buttonOutline}
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        >LOGIN</Text>
        <Text
          style={styles.buttonFilledIn}
          title="Sign up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        >SIGNUP</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </ImageBackground>
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
        backgroundColor: 'green',
      },
      headerTintColor: 'orange',
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
    mode: 'drawer',
    headerMode: 'none',
  }
);

const styles = StyleSheet.create({
  buttonOutline: {
    borderWidth:2,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    paddingHorizontal: 30,
    fontSize: 20,
    // backgroundColor: 'red',
    borderStyle: 'solid',
    // borderRadius: 10,
    width:200,
    textAlign: 'center',
    margin: 15
  },
  buttonFilledIn: {
    borderWidth:2,
    borderColor: 'white',
    color: 'grey',
    padding: 10,
    paddingHorizontal: 30,
    fontSize: 20,
    width:200,
    textAlign: 'center',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 15
  },
  main_header: {
    fontSize: 50,
    color: 'black',
    marginBottom: 200

  }
});
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}