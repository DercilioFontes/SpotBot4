import React from 'react'
import { StyleSheet, Image, Text, View, TouchableHighlight,
  ActivityIndicator, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons, Feather } from '@expo/vector-icons'

// to use in the forms
import t from 'tcomb-form-native'
import _ from 'lodash'
const Form = t.form.Form
const stylesheet = _.cloneDeep(Form.stylesheet)

// Overwrite form styles
stylesheet.textbox.normal.borderRadius = 0
stylesheet.textbox.normal.backgroundColor = '#fff'
stylesheet.controlLabel.normal.color = '#fff'

// Config of the form data and options
const User = t.struct({
  email: t.String,
  password: t.String
})

// Options of the form data
const options = {
  stylesheet: stylesheet,
  fields: {
    name: {
      stylesheet: stylesheet
    },
    email: {
      keyboardType: 'email-address'
    },
    password: {
      secureTextEntry: true
    }
  }
}

class LoginScreen extends React.Component {
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

  _userLogin () {
    let value = this.refs.form.getValue()

    if (value) {
      // Active ActivityIndicator
      this.setState({showProgress: true})

      fetch ('http://127.0.0.1:3000/user_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: {
            email: value.email,
            password: value.password
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
          this._storeToken(responseData)
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
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <Image source={require('../assets/logo.png')} style={{width: 200, height: 60, alignSelf: 'center'}} />
        <View>
          <Form
            ref="form"
            type={User}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this._userLogin.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
        </View>
        <ActivityIndicator
          animating={this.state.showProgress}
          size='large'
          style={styles.loader}/>
        {/* Empty View to adjust form position */}
        <View></View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#545454'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#00B2B0',
    borderColor: '#00B2B0',
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 30
  },
  loader: {
    marginTop: 20
  }
})

export default LoginScreen
