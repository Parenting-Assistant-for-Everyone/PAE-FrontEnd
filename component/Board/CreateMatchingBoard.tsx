import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

function CreateMatchingBoard() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardType, setBoardType] = useState<'OFFER' | 'SEARCH' | null>(null); // 구인, 구직 선택 상태

  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Handle the captured image
        console.log(result.uri);
      }
    } else {
      alert('Camera permission is required!');
    }
  };

  const handleCompletePress = async () => {
    if (!boardType) {
      alert('구인 또는 구직을 선택하세요.');
      return;
    }

    const requestBody = {
      memberId: 1, // 이 부분은 실제 로그인한 사용자 ID로 교체 필요
      title: title,
      content: content,
      baseStatus: 'ACTIVATE',
      boardType: boardType,
    };

    try {
      const response = await fetch('http://192.168.0.7:8080/board/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('게시판 생성 성공:', result);
        navigation.goBack(); // Navigate back to the previous screen after completion
      } else {
        console.error('게시판 생성 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>글쓰기</Text>
        <TouchableOpacity style={styles.complete} onPress={handleCompletePress}>
          <Text style={styles.completeButton}>완료</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.inputTitle}
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.inputContent}
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            boardType === 'OFFER' ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => setBoardType('OFFER')}
        >
          <Text style={styles.buttonText}>구인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            boardType === 'SEARCH' ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => setBoardType('SEARCH')}
        >
          <Text style={styles.buttonText}>구직</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
        <Icon name="camera-alt" style={styles.cameraIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 28,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  completeButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  complete: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 60,
    height: 35,
    justifyContent: 'center', // Centers text vertically
    alignItems: 'center', // Centers text horizontally
  },
  inputTitle: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    padding: 10,
  },
  inputContent: {
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#FFD700',
  },
  unselectedButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cameraButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 10,
  },
  cameraIcon: {
    fontSize: 32,
    color: '#000',
  },
});

export default CreateMatchingBoard;
