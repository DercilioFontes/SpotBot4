import React from 'react'
import { StyleSheet, Button, Text, View, Image, TouchableHighlight, ActivityIndicator, AlertIOS } from 'react-native'
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

// Main Screen
class HomeScreen extends React.Component {
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


  render() {
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      
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
          onPress={() => this.props.navigation.navigate('Login', {
            spotId: 4,
            spotLabel: 'UBC01',
          })}
        />
        <Button
          title="Sign up"
          onPress={() => this.props.navigation.navigate('SignUp', {
            spotId: 4,
            spotLabel: 'UBC01',
          })}
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

  constructor() {
    super()
    this.state = {
      showProgress: false
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

  // async _onValueChange(item, selectedValue) {
  //   try {
  //     await AsyncStorage.setItem(item, selectedValue);
  //   } catch (error) {
  //     console.log('AsyncStorage error: ' + error.message);
  //   }
  // }

  _userSignup() {
    let value = this.refs.form.getValue();


    // REMOVE THIS!!!!!!
    console.log(value)

    // REMOVE THIS!!!!!!!!!!
    console.log(
    JSON.stringify({
      name: value.name, 
      license_plate: value.licensePlate, 
      email: value.email,
      password: value.password,
      password_confirmation: value.passwordConfirmation, 
    }))
    if (value) { // if validation fails, value will be null

      this.setState({showProgress: true})

      fetch("https://spot-bot-server.herokuapp.com/users", {
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: value.name, 
          license_plate: value.licensePlate, 
          email: value.email,
          password: value.password,
          password_confirmation: value.passwordConfirmation, 
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
      this.setState({ success: true })
      // this._onValueChange(STORAGE_KEY, responseData.id_token),
      // AlertIOS
    })
    .catch((err) => {
      this.setState(err)
      console.log(err)
    })
    .finally(() => {
      this.setState({showProgress: false})
    })
    }
  }

  
  // call getValue() to get the values of the form
  // onPress() {
  //   var value = this.refs.form.getValue();
  //   if (value) { // if validation fails, value will be null

  //     // Active ActivityIndicator 
  //     this.setState({showProgress: true})

  //     console.log(
  //     JSON.stringify({
  //       user: {
  //         name: value.name,
  //         license_plate: value.licensePlate,
  //         email: value.email,
  //         password: value.password,
  //         password_confirmation: value.passwordConfirmation
  //       }
  //     }))

  //     // fetch('https://spot-bot-server.herokuapp.com/users', {
  //     //   method: 'Post',
  //     //   headers: {
  //     //     'Accept': 'application/json',
  //     //     'Content-Type': 'aplication/json',
  //     //   },
  //     //   body: JSON.stringify({
  //     //     user: {
  //     //       name: value.name,
  //     //       license_plate: value.licensePlate,
  //     //       email: value.email,
  //     //       password: value.password,
  //     //       password_confirmation: value.passwordConfirmation
  //     //     }
  //     //   })
  //     // })
  //     // .then((response) => {
  //     //   if(response.status >= 200 && response.status < 300) {
  //     //     return response
  //     //   }
  //     //   throw {
  //     //     badCredentials: response.status == 401,
  //     //     unknownError: response.status != 401
  //     //   }
  //     // })
  //     // .then((response) => {
  //     //   return response.json()
  //     // })
  //     // .then((responseData) => {
  //     //   console.log(responseData)
  //     // })
  //     // .catch((err) => {
  //     //   this.setState(err)
  //     //   console.log(err)
  //     // })
  //     // .finally(() => {
  //     //   this.setState({showProgress: false})
  //     // })
  //   }
  // }

  render() {
    const { params } = this.props.navigation.state;


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
        <Button
          title="Home"
          onPress={() => this.props.navigation.goBack()}
        />
        <ActivityIndicator
        animating={this.state.showProgress}
        size='large'
        style={styles.loader}/>
      </View>
    );
  }
}

class LoginScreen extends React.Component {
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
        {/* <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        /> */}
        {/* <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({spotLabel: 'Updated!'})}
        /> */}
        <Button
          title="Home"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
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