

import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight, ActivityIndicator, AlertIOS, AsyncStorage, TouchableOpacity, ImageBackground} from 'react-native'
import { MapView, Notifications } from 'expo'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

export default class Drawer extends React.Component {

    render() {
      const pic = require('../assets/vancouver.jpg')

      return (
        <ImageBackground source= {pic} style={{ width:200, opacity: .7,  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.main_header }>SpotBot</Text>
          <Text
            style={styles.buttonOutline}
            title="Login"
            // onPress={() => this.props.navigation.navigate('Login')}
          >LOGIN</Text>
          <Text
            style={styles.buttonFilledIn}
            title="Sign up"
            // onPress={() => this.props.navigation.navigate('SignUp')}
          >SIGNUP</Text>
          <Button
            // onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </ImageBackground>
      );
    }
  }

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