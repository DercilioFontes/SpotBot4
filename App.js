import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight, ActivityIndicator, AlertIOS, AsyncStorage, TouchableOpacity, ImageBackground, Modal} from 'react-native'
import { MapView, Notifications } from 'expo'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Ionicons, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons'

// Our components
import SignUpComponent from './components/Signup'
import LoginComponent from './components/Login'
import MapHome from './components/MapHome'
import Slot from './components/Slot'
import SlotsScreen from './components/SlotsScreen'
import SearchSpot from './components/SearchSpot'
import { typography } from 'react-native-material-design-styles';
const typographyStyle = StyleSheet.create(typography);
import parkingAreasDB from './db/database'


// Main Screen
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchSpotStatus: false,
        showSlotsDetails: false,
        annotations: [],
        mapRegion: {
          latitude: 49.26,
          longitude: -123.25,
          latitudeDelta: 0.004,
          longitudeDelta: 0.024,
          title: "UBC parking slot"
        },
        users: {
          user_id: 2,
          name: 'empty'
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
        parking_areas: parkingAreasDB
        };
    }





  static navigationOptions = ({ navigation }) => {
    function searchSpot() {
      alert('uou');

    }
    const params = navigation.state.params || {}

    return {
      headerTitleStyle: {
        fontFamily: 'American Typewriter'
      },
      headerTitle: `SPOTBOT`,
      headerRight: (
        <Button
          onPress={searchSpot}
          title='Filter'
          color="#fff"
        /> ),
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title={'\u2630'}
          color="#FFF"
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




  transformRaw(pa) {
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


  availability(parkingAreas) {
    console.log("availPAs", parkingAreas);
    return parkingAreas.map((parkingArea) => {
      console.log("I am a parking area, you should park in me:", parkingArea);
      const totalSlot = parkingArea.slots.length;
      const unavailable_spots = parkingArea.slots.filter(slot => slot.availability === false)
      parkingArea.description = `Total slots: ${totalSlot}`
      if (unavailable_spots.length === totalSlot) {
          parkingArea.parkingAreaStatus = 'full',
          parkingArea.description = `Total slots: ${totalSlot} Status:Full`
      }

      return parkingArea;
    });
  }





    componentDidMount() {



      const that = this;
      fetch('http://127.0.0.1:3000/')
        .then(res => res.json())
        .then(this.transformRaw)
        .then(this.availability)
        .then(newParkingStatus =>
          {

            that.setState({parking_areas: newParkingStatus})
        })
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

    homePage(newParkingArea) {
      const transformRawParking = this.transformRaw(newParkingArea);
      this.setState({
        showSlotsDetails: false,
        parking_areas: this.availability(transformRawParking)
      })
     console.log("parking area",this.state.parking_areas);

    }


  render() {
    return (
      <View>
        <SearchSpot spots= {this.state.currentArea.slots} status={true}/>
        <View style={{ height: this.state.showSlotsDetails ? '50%' : '100%', backgroundColor: '#d0e7a6'}}>
          <MapHome onMapPress={this.onMapPress.bind(this)} parking_areas={this.state.parking_areas} user_id={this.state.users.user_id} mapRegion={this.state.mapRegion}  navigation={this.props.navigation}>
          </MapHome>
        </View>
        { this.state.showSlotsDetails &&
          <View style={{height: '50%', backgroundColor: '#049588'}}>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons onPress={this.filterAccessibility.bind(this)} color='white' name='filter-list' size={30}/>
                <Text style={{color: 'white', fontSize: 25, paddingTop: 20, paddingLeft: 50}}>{this.state.currentArea.title}</Text>
               <FontAwesome style={{position:'absolute', top: 3, right: 5}} color='white' name='close' size={30}
                  onPress={this.closeSlot.bind(this)}
                />
            </View>
              <SlotsScreen homePage={this.homePage.bind(this)} key={1} user_id={this.state.user_id} slots={this.state.currentArea.slots} />
            </View>
        }

      </View>
    )
  }
}


class ModalScreen extends React.Component {
  state = {
    visibleModal: null,
  }




  render() {
    const pic = require('./assets/vancouver.jpg')

    return (
      <ImageBackground transparent = {true} source= {pic} style={{ opacity: .7,  flex: 1, alignItems: 'center', justifyContent: 'center' }}>

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


    return ( <SignUpComponent navigation={this.props.navigation}/>)
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

    return ( <LoginComponent navigation={this.props.navigation}/>)
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
        backgroundColor: '#333',
      },
      headerTintColor: '#245FD4',
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