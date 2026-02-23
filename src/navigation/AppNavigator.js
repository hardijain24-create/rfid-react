import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import TeacherHomeScreen from '../screens/TeacherHomeScreen';
import RfidScreen from '../screens/RfidScreen';
import AdminStudentsScreen from '../screens/AdminStudentsScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import DeviceSettingsScreen from '../screens/DeviceSettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AdminHome" 
          component={AdminHomeScreen} 
          options={{ title: 'Admin Dashboard' }}
        />
        <Stack.Screen 
          name="TeacherHome" 
          component={TeacherHomeScreen} 
          options={{ title: 'Teacher Dashboard' }}
        />
        <Stack.Screen 
          name="RfidScreen" 
          component={RfidScreen} 
          options={{ title: 'RFID Linking' }}
        />
        <Stack.Screen 
          name="AdminStudents" 
          component={AdminStudentsScreen} 
          options={{ title: 'Manage Students' }}
        />
        <Stack.Screen 
          name="AddStudent" 
          component={AddStudentScreen} 
          options={{ title: 'Add Student' }}
        />
        <Stack.Screen 
          name="DeviceSettings" 
          component={DeviceSettingsScreen} 
          options={{ title: 'Device Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
