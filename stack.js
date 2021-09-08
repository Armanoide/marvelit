import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Characters from './characters';
import CharacterDetail from './character/detail';
import Comics from './comics';
import {StatusBar} from 'react-native';
import {NavigationTheme} from './common/styles/navigation-theme';

const Stack = () => {
  const StackNavigator = createNativeStackNavigator();
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer theme={NavigationTheme}>
        <StackNavigator.Navigator
          screenOptions={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              backgroundColor: NavigationTheme.colors.navPrimaryColor,
            },
          }}
          initialRouteName="Characters">
          <StackNavigator.Screen name="Comics" component={Comics} />
          <StackNavigator.Screen name="Characters" component={Characters} />
          <StackNavigator.Screen
            name="CharacterDetail"
            component={CharacterDetail}
          />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Stack;
