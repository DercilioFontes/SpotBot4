import React from 'react'
import { StyleSheet, Button, Text, View, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons, Feather } from '@expo/vector-icons'


class HomeScreen extends React.Component {
  static navigationOptions = {
  headerTitle: (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={{ marginLeft: 20}}>
                    <Ionicons name='md-menu' size={28} color='black' />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 26 }} >SpotBot</Text>
                  </View>
                  <View style={{ justifyContent: 'flex-end', marginRight:20 } }>
                    <Feather name='filter' size={28} color='black'/>
                  </View>
                </View>)
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
        backgroundColor: '#d3d3d3',
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