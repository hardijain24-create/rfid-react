import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import TeacherHomeScreen from '../screens/TeacherHomeScreen';
import RfidScreen from '../screens/RfidScreen';
import AdminStudentsScreen from '../screens/AdminStudentsScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import DeviceSettingsScreen from '../screens/DeviceSettingsScreen';
import AddTeacherScreen from '../screens/AddTeacherScreen';
import ManageTeachersScreen from '../screens/ManageTeachersScreen';

const Stack = createNativeStackNavigator();


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
        <Stack.Screen 
          name="AddTeacher" 
          component={AddTeacherScreen} 
          options={{ title: 'Add Teacher' }}
        />
        <Stack.Screen 
          name="ManageTeachers" 
          component={ManageTeachersScreen} 
          options={{ title: 'Manage Teachers' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
