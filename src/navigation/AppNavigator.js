import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReelsFeedScreen from '../screen/ReelsFeedScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ReelsFeed">
      <Stack.Screen name="ReelsFeed" component={ReelsFeedScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
