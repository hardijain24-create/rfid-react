import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import StudentService from '../services/StudentService';

const RfidScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [rfidUid, setRfidUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await StudentService.fetchStudents();
      setStudents(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load students');
    } finally {
      setStudentsLoading(false);
    }
  };

  const linkRfid = async () => {
    if (!selectedStudentId || !rfidUid.trim()) {
      Alert.alert('Error', 'Select student and enter RFID');
      return;
    }

    setLoading(true);
    try {
      const result = await StudentService.assignRfid(
        selectedStudentId,
        rfidUid.trim()
      );
      
      if (result.success) {
        Alert.alert('Success', 'RFID linked successfully');
        setRfidUid('');
        setSelectedStudentId(null);
        loadStudents();
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to link RFID');
    } finally {
      setLoading(false);
    }
  };

  const renderStudentPicker = () => {
    if (studentsLoading) {
      return <ActivityIndicator size="small" color="#2196F3" />;
    }

    if (students.length === 0) {
      return <Text style={styles.noStudentsText}>No students available</Text>;
    }

    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>
          {selectedStudentId 
            ? students.find(s => s.id === selectedStudentId)?.name || 'Select student'
            : 'Choose student'}
        </Text>
        <ScrollView style={styles.pickerScroll}>
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentOption,
                selectedStudentId === student.id && styles.selectedOption
              ]}
              onPress={() => setSelectedStudentId(student.id)}
            >
              <Text style={[
                styles.studentName,
                selectedStudentId === student.id && styles.selectedText
              ]}>
                {student.name}
              </Text>
              <Text style={styles.studentRfid}>
                {student.uid ? `RFID: ${student.uid}` : 'No RFID'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RFID Linking</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Student</Text>
          {renderStudentPicker()}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RFID UID</Text>
          <TextInput
            style={styles.input}
            placeholder="Scan / Enter RFID UID"
            value={rfidUid}
            onChangeText={setRfidUid}
            multiline={false}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={linkRfid}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Link RFID</Text>
          )}
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Instructions</Text>
          <Text style={styles.infoText}>
            1. Select a student from the list
          </Text>
          <Text style={styles.infoText}>
            2. Scan or enter the RFID UID
          </Text>
          <Text style={styles.infoText}>
            3. Click "Link RFID" to assign the card to the student
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    minHeight: 50,
  },
  pickerLabel: {
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerScroll: {
    maxHeight: 150,
  },
  studentOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
  },
  studentName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  studentRfid: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  noStudentsText: {
    padding: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F57C00',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});

export default RfidScreen;
