import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import Home from './screens/Home';
import LiveValues from './screens/LiveValues';

export default function App() {
  const Stack = createStackNavigator();
  function DetailsScreen() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="LiveValues"
          component={LiveValues}
          options={{title: 'Live Values'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
