import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight, ActivityIndicator, AlertIOS, AsyncStorage, TouchableOpacity, ImageBackground, Modal} from 'react-native'
import { MapView, Notifications } from 'expo'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Ionicons, Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

// Our components
import SignUpComponent from './components/Signup'
import LoginComponent from './components/Login'
import MapHome from './components/MapHome'
import Slot from './components/Slot'
import SlotsScreen from './components/SlotsScreen'
import SearchSpot from './components/SearchSpot'
import Timer from './components/Timer'
import { typography } from 'react-native-material-design-styles';
const typographyStyle = StyleSheet.create(typography);

import parkingAreasDB from './db/database'
import CancelSpot from './components/CancelSpot'
import ActiveReservationModal from './components/ActiveReservationModal'


// Main Screen
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activatedSpot:[],
      cancelNotification: false,
      reserveStatus: false,
      statusAccesibilityButton: true,
      showTimer: false,
      searchSpotStatus: false,
        showSlotsDetails: false,
        annotations: [],
        reserveSpot: [],
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
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 30
      },
      headerTitle: `SpotBot`,
      // headerRight: (
      //   <Button
      //     onPress={searchSpot}
      //     title='Filter'
      //     color="#fff"
      //   /> ),
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
         showSlotsDetails: true,
         statusAccesibilityButton: true
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

    return parkingAreas.map((parkingArea) => {

      const totalSlot = parkingArea.slots.length;
      const unavailable_spots = parkingArea.slots.filter(slot => slot.availability === false)
      const available_spots = parkingArea.slots.filter(slot => slot.availability === true)

      parkingArea.description = `   Total available spots  ${available_spots.length} `
      if (unavailable_spots.length === totalSlot) {
          parkingArea.parkingAreaStatus = 'full',
          parkingArea.description = `Total spots ${totalSlot} Status Full`
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
      if(this.state.statusAccesibilityButton)
        {
          const accessibles = this.state.currentArea.slots.filter(slot => slot.accessible === true && slot.availability === true);

          this.setState({
            tempCurrentArea: this.state.currentArea,
            currentArea: {title: this.state.currentArea.title, slots: accessibles},
            showSlotsDetails: true,
            statusAccesibilityButton: false
          })

        } else {
           this.setState({
            currentArea: this.state.tempCurrentArea,
            showSlotsDetails: true,
            statusAccesibilityButton: true
          })
        }
    }

    homePage(newParkingArea, reserveSpot) {
      const transformRawParking = this.transformRaw(newParkingArea);
      this.setState({
        showTimer: true,
        showSlotsDetails: false,
        parking_areas: this.availability(transformRawParking),
        reserveStatus: 'reserved' ,
        reserveSpot: reserveSpot
      })
    }

    cancelClick(newParkingArea, reserveSpot) {
      const transformRawParking = this.transformRaw(newParkingArea);
      this.setState({
        showTimer: false,
        showSlotsDetails: false,
        parking_areas: this.availability(transformRawParking),
        reserveStatus: 'empty' ,
        reserveSpot: reserveSpot,
        cancelNotification: true
      })

    }

    activateClick(responseData, activatedSpot) {

      this.setState({
      showTimer: true,
      reserveStatus: 'active',
      cancelNotification: false,
      activatedSpot: activatedSpot
      })
    }

    endSessionClick(responseData){
      const transformRawParking = this.transformRaw(responseData);
      this.setState({
        showTimer: false,
        parking_areas: this.availability(transformRawParking),
        reserveStatus: 'empty' ,
        cancelNotification: true
      })
    }


  render() {

    return (
      <View  >

        <View style={{ height: this.state.showSlotsDetails ? '50%' : this.state.reserveStatus ? '70%' : this.state.cancelNotification ? '90%' : '100%', backgroundColor: '#d0e7a6'}}>
          <MapHome cancelClick={this.cancelClick.bind(this)} spot={this.state.reserveSpot} showTimer={this.state.showTimer} onMapPress={this.onMapPress.bind(this)} parking_areas={this.state.parking_areas} user_id={this.state.users.user_id} mapRegion={this.state.mapRegion}  navigation={this.props.navigation} />
        </View>
        { this.state.showSlotsDetails &&
              <View style={{height: '60%', backgroundColor: '#545454'}}>
                <View style={styles.parkingArea}>
                  <MaterialCommunityIcons onPress={this.filterAccessibility.bind(this)} color='white' name='filter-outline' size={30} style={styles.accessibleIcon}/>
                    <Text style={{ color: 'white', fontSize: 25, width: 250 }}>{this.state.currentArea.title}</Text>
                    <FontAwesome  color='white' name='angle-down' size={30}
                onPress={this.closeSlot.bind(this)}/>
                </View>
                  <SlotsScreen homePage={this.homePage.bind(this)} user_id={this.state.user_id} slots={this.state.currentArea.slots} />
              </View>
        }
        { this.state.reserveStatus === 'reserved' &&
          <View style={{height: '30%', backgroundColor: '#049588'}}>
          <CancelSpot cancelClick={this.cancelClick.bind(this)} activateClick={this.activateClick.bind(this)} spot={this.state.reserveSpot}/>
         </View>
        }
        { this.state.reserveStatus === 'empty' &&
          <View style={{height: '50%', backgroundColor: '#049588'}}>
            <Text> Your reservation has been cancelled </Text>
          </View>

        }

        { this.state.reserveStatus === 'active' &&
          <View style={{height: '50%', backgroundColor: '#049588'}}>
            <ActiveReservationModal activatedSpot={this.state.reserveSpot} endSessionClick={this.endSessionClick.bind(this)}/>
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
      <ImageBackground transparent = {true} source= {pic} style={{ flexDirection:'column' ,opacity: .7,  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Image source={require('./assets/logo.png')} style={{width: 250, height: 75, alignSelf:'center', paddingBottom:60}}  />
        </View>
        <View>
          <Text
            style={styles.buttonOutline}
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
          >LOGIN</Text>
          <Text
            style={styles.buttonFilledIn}
            title="Sign up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          >SIGNUP
          </Text>
        </View>

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
    navigationOptions.headerLeft =  (
      <Button
        style= {{fontSize: 1000}}
        onPress={() => navigation.navigate('MyModal')}
        title={"\u276E"}
        color="#0F303F"
      /> )
      navigationOptions.headerRight =  (
        <Button
          style= {{fontSize: 1000}}
          onPress={() => navigation.navigate('Home')}
          title={"\u2715"}
          color="#0F303F"
        /> )
    return {
      title: 'Sign Up',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
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
    navigationOptions.headerLeft =  (
      <Button
        style= {{fontSize: 1000}}
        onPress={() => navigation.navigate('MyModal')}
        title={"\u276E"}
        color="#005A5C"
      /> )
      navigationOptions.headerRight =  (
        <Button
          style= {{fontSize: 1000}}
          onPress={() => navigation.navigate('Home')}
          title={"\u2715"}
          color="#005A5C"
        /> )
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
    /* HEADER CONFIG - MAIN NAV BAR */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#545454',
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
    marginTop: 410,
    paddingHorizontal: 30,
    fontSize: 20,
    // backgroundColor: 'red',
    borderStyle: 'solid',
    // borderRadius: 10,
    width:200,
    textAlign: 'center',
    margin: 15,
    fontFamily: 'Apple SD Gothic Neo',
    // fontWeight: 'bold',

  },
  buttonFilledIn: {
    borderWidth:2,
    borderColor: 'white',
    color: '#15AEBC',
    // fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 30,
    fontSize: 20,
    width:200,
    textAlign: 'center',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 15,
    fontFamily: 'Apple SD Gothic Neo'

  },
  main_header: {
    fontSize: 50,
    color: '#fff',
    marginBottom: 300,
    fontFamily: 'Apple SD Gothic Neo'

  },
  parkingArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#545454',
    justifyContent:'space-around'
  },
  accessibleIcon: {
    paddingTop: 5
  }
});
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}