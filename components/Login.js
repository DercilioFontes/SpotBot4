import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight,
  ActivityIndicator, AlertIOS, AsyncStorage, KeyboardAvoidingView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons, Feather } from '@expo/vector-icons'


// to use in the forms
import t from 'tcomb-form-native'
const Form = t.form.Form

// Config of the form data and options
const User = t.struct({
  email: t.String,
  password: t.String,
})

// Options of the form data
const options = {
  fields: {
    email: {
      keyboardType: 'email-address'
    },
    password: {
      secureTextEntry: true
    }
  }
}

class LoginScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showProgress: false
    }
  }

  async _storeToken(responseData) {
    try {
      await AsyncStorage.setItem('token', responseData.jwt)
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message)
    }
  }

//   async _getTokenAndUser() {
//     try {
//       await AsyncStorage.multiGet(['token', 'user']).then((data) => {
//         // if(data[0][1]) {
//         //   token = data[0][1] || null
//           return data
//           // [1][1] // I can pass a function here to make a fetch (GET request with route users/id) to get the user or other data
//         // }
//       }).then((tokenAnduser) => {
//         if(tokenAnduser) {
//           return tokenAnduser.json()
//         } else {
//           return null
//         }
//       console.log('AsyncStorage error: ' + error.message)
//     }).then((tokenAnduserObj) => {
//       console.log(tokenAnduserObj)
//     })
//   } catch(error) {
//     console.log(error.message)
//   }
// }


  _userLogin() {
    let value = this.refs.form.getValue()

    // REMOVE THIS!!!!!!
    console.log(value)

    if (value) {

      // Active ActivityIndicator
      this.setState({showProgress: true})



      fetch("https://spot-bot-server.herokuapp.com/user_token", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth: {
            email: value.email,
            password: value.password,
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

  render() {

    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#fff',
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <View style={{ flex: 1, alignSelf: 'auto', justifyContent: 'center', padding: 20 }}>
          <Form
            ref="form"
            type={User}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this._userLogin.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>

          <ActivityIndicator
          animating={this.state.showProgress}
          size='large'
          style={styles.loader}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen