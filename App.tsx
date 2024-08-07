import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors } from './src/constants/colors';
import HomeScreen from './src/screens/homes/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routers/Router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StarRating from './src/components/StarRating';

const App = () => {
  return (
    <>
      <GestureHandlerRootView>
          <StatusBar barStyle="light-content" backgroundColor={colors.bgColor} />
          <NavigationContainer>
            <Router />
          </NavigationContainer>
      </GestureHandlerRootView>
      {/* <StarRating/> */}
    </>
  );
};

export default App;
