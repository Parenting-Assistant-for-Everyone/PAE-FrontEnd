import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider'; // Import the community slider
import { useNavigation } from '@react-navigation/native';

const ParentSignup: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<number>(27); // Default value in the middle
  const navigation = useNavigation();

  const options = [
    { label: '실내놀이', image: require('../../assets/play.png') },  // Replace with actual paths to images
    { label: '등하원 돕기', image: require('../../assets/student.png') },
    { label: '책읽기', image: require('../../assets/book.png') },
    { label: '야외활동', image: require('../../assets/playground.png') },
    { label: '영어놀이', image: require('../../assets/english.png') },
    { label: '학습지도', image: require('../../assets/study.png') },
    { label: '간단한 청소', image: require('../../assets/clean.png') },
    { label: '식사 보조', image: require('../../assets/eat.png') },
    { label: '음악 놀이', image: require('../../assets/music.png') },
    { label: '단기 입주', image: require('../../assets/move.png') },
    { label: '장기 입주', image: require('../../assets/move1.png') },
  ];

  const handleOptionSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Selected Options:', selectedOptions);
    console.log('Selected Age Range:', ageRange);
    navigation.navigate('ChildSignup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>어떤 돌봄을 원하시나요?</Text>
        <Text style={styles.subtitle}>최대 3개 선택 가능</Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.optionButton,
                selectedOptions.includes(option.label) ? styles.optionSelected : null,
              ]}
              onPress={() => handleOptionSelect(option.label)}
            >
              <Image source={option.image} style={styles.optionImage} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ageQuestion}>어느 나이대의 도우미를 찾으시나요?</Text>
        <Slider
          style={styles.slider}
          minimumValue={20}
          maximumValue={60}
          step={1}
          value={ageRange}
          onValueChange={setAgeRange}
          minimumTrackTintColor="#FDCB58"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#FDCB58"
        />
        <Text style={styles.ageLabel}>{ageRange}세</Text>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>다음</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 65,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888888',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  optionButton: {
    width: 70,  // Reduced width
    height: 90,  // Reduced height
    backgroundColor: '#F8F8F8',
    borderRadius: 40,  // Adjusted for smaller button size
    paddingVertical: 8,
    paddingHorizontal: 8,
    margin: 8,  // Reduced margin to adjust layout
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: '#FDD835',
  },
  optionImage: {
    width: 35,  // Reduced image size
    height: 35,
    marginBottom: 6,  // Adjusted spacing between image and text
  },
  optionText: {
    fontSize: 12,  // Reduced font size
    color: '#333333',
    textAlign: 'center',
  },
  ageQuestion: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 8,
  },
  ageLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#FDD835',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ParentSignup;
