import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight,
  ActivityIndicator, AlertIOS, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import { StackNavigator } from 'react-navigation'
// import ReactOnRails from 'react-on-rails'
import { Ionicons, Feather } from '@expo/vector-icons'

// to use in the forms
import t from 'tcomb-form-native'
import _ from 'lodash'
const Form = t.form.Form
const stylesheet = _.cloneDeep(Form.stylesheet)

// Form stylesheet
// stylesheet.textbox.normal.borderWidth = 0;
// stylesheet.textbox.error.borderWidth = 0;
// stylesheet.textbox.normal.marginBottom = 0;
// stylesheet.textbox.error.marginBottom = 0;

// stylesheet.textboxView.normal.borderWidth = 0;
// stylesheet.textboxView.error.borderWidth = 0;
// stylesheet.textboxView.normal.borderRadius = 0;
// stylesheet.textboxView.error.borderRadius = 0;
// stylesheet.textboxView.normal.borderBottomWidth = 1;
// stylesheet.textboxView.error.borderBottomWidth = 1;
// stylesheet.textbox.normal.marginBottom = 5;
// stylesheet.textbox.error.marginBottom = 5;

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
  stylesheet: stylesheet,
  fields: {
    name: {
      stylesheet: stylesheet
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
  constructor (props) {
    super(props)
    this.state = {
      showProgress: false
    }
  }

  async _storeToken (responseData) {
    try {
      await AsyncStorage.setItem('token', responseData.jwt)
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message)
    }
  }

  _userSignup () {
    let value = this.refs.form.getValue()

    // REMOVE THIS!!!!!!
    console.log(value)

    if (value) {
      // Active ActivityIndicator
      this.setState({showProgress: true})

      fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          // 'X-CSRF-Token': 'jkhvadgdjhdkjgadjahsvdgc'
          // 'authencity_token': ReactOnRails.authenticityToken()
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
          if (response.status >= 200 && response.status < 300) {
            return response
          }
          throw {
            badCredentials: response.status === 401,
            unknownError: response.status !== 401
          }
        })
        .then((response) => {
          return response.json()
        })
        .then((responseData) => {
          console.log(responseData)

          // Make a POST request with email and password to set user Token
          fetch('http://127.0.0.1:3000/user_token', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              auth: {
                email: responseData.email,
                password: responseData.password
              }
            })
          })
            .then((response) => {
              if (response.status >= 200 && response.status < 300) {
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
              this._storeToken(responseData)
            })
            .catch((err) => {
              this.setState(err)
              console.log(err)
            })
        })
        .catch((err) => {
          this.setState(err)
          console.log(err)
        })
        .finally(() => {
          this.setState({showProgress: false})
          console.log(this.props.navigation.goBack())
        })
    }
  }

  render () {
    const styles = StyleSheet.create({
      // container: {
      //   justifyContent: 'center',
      //   marginTop: 50,
      //   padding: 20,
      //   backgroundColor: '#ffffff',
      // },
      buttonText: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 5,
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
      loader: {
        marginTop: 20
      }
    })

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
        <View style={{ flex: 1, alignSelf: 'auto', justifyContent: 'center', padding: 20 }}>
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
      </KeyboardAvoidingView>
    )
  }
}

export default SignUpScreen
