import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import HomeScreen from '../screens/homes/HomeScreen';
import AddNewTask from '../screens/tasks/AddNewTask';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../auth/LoginScreen';
import auth from '@react-native-firebase/auth';
import RegisterScreen from '../auth/RegisterScreen';
import TaskDetailSreen from '../screens/tasks/TaskDetailSreen';
import ListFullTaskComponent from '../components/ListFullTaskComponent';

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);

  const Stack = createNativeStackNavigator();
  const MainNavigator = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
      <Stack.Screen name="TaskDetail" component={TaskDetailSreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name='ListFullTask' component={ListFullTaskComponent}/>
    </Stack.Navigator>
  );
  const AuthNavigator = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  return isLogin ? MainNavigator : AuthNavigator;
  // return MainNavigator
};

export default Router;
