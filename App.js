import React from 'react'
import { StyleSheet, Button, Text, View, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./src/evubc-car.jpg')}
        style={{ width: 380, height: 38 }}
      />
    );
  }
}

// class LogoEVCar extends React.Component {
//   render() {
//     return (
//       <Image
//         source={require('./src/evubc-logo.png')}
//         style={{ width: 90, height: 78, marginTop: 400 }}
//       />
//     );
//   }
// }

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      <Button
        title="Login / Sign up"
        onPress={() => this.props.navigation.navigate('Details', {
          spotId: 4,
          spotLabel: 'UBC01',
        })}
      />
      {/* <LogoEVCar/> */}
    </View>
    )
  }
}

class DetailsScreen extends React.Component {
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
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}