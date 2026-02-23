import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const AdminHomeScreen = ({ navigation }) => {
  const menuButton = (title, subtitle, onPress) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.menuContent}>
        <View style={styles.menuText}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {menuButton(
          "Add Teacher",
          "Create new teacher account",
          () => navigation.navigate('AddTeacher')
        )}

        {menuButton(
          "Manage Teachers",
          "View or remove teacher accounts",
          () => navigation.navigate('ManageTeachers')
        )}

        {menuButton(
          "Manage Students",
          "View, edit and delete students",
          () => navigation.navigate('AdminStudents')
        )}

        {menuButton(
          "Device Settings",
          "Change school Wi-Fi remotely",
          () => navigation.navigate('DeviceSettings')
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menuButton: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    fontSize: 24,
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default AdminHomeScreen;
