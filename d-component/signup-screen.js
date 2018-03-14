import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight, 
  ActivityIndicator, AlertIOS, AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons, Feather } from '@expo/vector-icons'

// to use in the forms
import t from 'tcomb-form-native'
const Form = t.form.Form

// Config of the form data and options
const User = t.struct({
  name: t.String,
  licensePlate: t.String,
  email: t.String,
  password: t.String,
  passwordConfirmation: t.String
})

// Options of the form data
const options = {
  fields: {
    name: {

    },
    licensePlate: {

    },
    email: {
      keyboardType: 'email-address'
    },
    password: { 
      secureTextEntry: true
    },
    passwordConfirmation: {
      secureTextEntry: true
      // hasError: true,
      // error: (value) => {
      //   if(value.password !== value.passwordConfirmation) {
      //     return "Passowords doesn't macth!"
      //   }
      // }
    }
  }
}

class SignUpScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showProgress: false
    }
  }


  // async _onValueChange(item, selectedValue) {
  //   try {
  //     await AsyncStorage.setItem(item, selectedValue)
  //   } catch (error) {
  //     // console.log('AsyncStorage error: ' + error.message)
  //   }
  // }

  _userSignup() {
    let value = this.refs.form.getValue()

    // REMOVE THIS!!!!!!
    console.log(value)

    if (value) {

      // Active ActivityIndicator 
      this.setState({showProgress: true})

      fetch("https://spot-bot-server.herokuapp.com/users", {
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            name: value.name, 
            license_plate: value.licensePlate, 
            email: value.email,
            password: value.password,
            password_confirmation: value.passwordConfirmation
          }
        })
      })
      .then((response) => {
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
      console.log(responseData)
      //  this.setState({ success: true })
      // this._onValueChange(STORAGE_KEY, responseData.id_token)
      // AlertIOS
    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      this.setState({showProgress: false})

      // REMOVE THIS ???????????
      // console.log(STORAGE_KEY)
    })
    }
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
      },
      title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
      loader: {
        marginTop: 20
      }
    });
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Form
          ref="form"
          type={User}
          options={options}
        />
         <TouchableHighlight style={styles.button} onPress={this._userSignup.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        
        <ActivityIndicator
        animating={this.state.showProgress}
        size='large'
        style={styles.loader}/>
      </View>
    );
  }
}

export default SignUpScreen