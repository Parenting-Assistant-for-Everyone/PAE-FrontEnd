import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ChildSignup: React.FC = () => {
  const [selectedChildren, setSelectedChildren] = useState<number | null>(null);
  const [childrenDates, setChildrenDates] = useState([{ year: '', month: '', day: '' }]); // Dynamic list of children dates
  const navigator = useNavigation();

  const handleChildrenSelect = (num: number) => {
    setSelectedChildren(num);
    if (num === 1) {
      setChildrenDates([{ year: '', month: '', day: '' }]); // 1 child input by default
    } else if (num === 2) {
      setChildrenDates([
        { year: '', month: '', day: '' },
        { year: '', month: '', day: '' },
      ]); // 2 child inputs by default
    } else if (num === 3) {
      setChildrenDates([
        { year: '', month: '', day: '' },
        { year: '', month: '', day: '' },
        { year: '', month: '', day: '' },
      ]); // 3 child inputs by default
    }
  };

  const handleAddChild = () => {
    // Add a new child to the list
    setChildrenDates([...childrenDates, { year: '', month: '', day: '' }]);
  };

  const handleDateChange = (index: number, field: string, value: string) => {
    const updatedChildren = [...childrenDates];
    updatedChildren[index][field] = value;
    setChildrenDates(updatedChildren);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Selected Children:', selectedChildren);
    childrenDates.forEach((child, index) => {
      console.log(`Child ${index + 1} DOB:`, child);
    });
    navigator.navigate('LocationSignup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>몇 명의 아이를 돌봐 드릴까요?</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.optionButton, selectedChildren === 1 ? styles.selectedButton : null]}
          onPress={() => handleChildrenSelect(1)}
        >
          <Text style={styles.optionText}>1명</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedChildren === 2 ? styles.selectedButton : null]}
          onPress={() => handleChildrenSelect(2)}
        >
          <Text style={styles.optionText}>2명</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedChildren === 3 ? styles.selectedButton : null]}
          onPress={() => handleChildrenSelect(3)}
        >
          <Text style={styles.optionText}>3명 이상</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>아이의 생년월일을 입력해 주세요.</Text>
      <Text style={styles.subtitleSmall}>출산 예정 시, 예정 날짜를 입력해 주세요.</Text>

      {/* Scrollable area for child inputs */}
      <ScrollView style={styles.scrollContainer}>
        {childrenDates.map((child, index) => (
          <View key={index} style={styles.dateInputRow}>
            <Text style={styles.dateLabel}>아이 {index + 1}</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="년"
              keyboardType="numeric"
              value={child.year}
              onChangeText={(text) => handleDateChange(index, 'year', text)}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="월"
              keyboardType="numeric"
              value={child.month}
              onChangeText={(text) => handleDateChange(index, 'month', text)}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="일"
              keyboardType="numeric"
              value={child.day}
              onChangeText={(text) => handleDateChange(index, 'day', text)}
            />
          </View>
        ))}
      </ScrollView>

      {selectedChildren === 3 && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddChild}>
          <Text style={styles.addButtonText}>+ 아이 추가</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: '15%',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#FFE082',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888888',
    marginBottom: 8,
  },
  subtitleSmall: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888888',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 300, // Adjust height as needed to allow scrolling
    marginBottom: 16,
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateInput: {
    width: 60,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FFE082',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#FDCB58',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ChildSignup;
