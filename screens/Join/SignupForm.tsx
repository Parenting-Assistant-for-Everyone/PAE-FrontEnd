import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const SignupForm: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idError, setIdError] = useState(false);
  const navigation = useNavigation();

  const handleSignup = () => {
    if (!nickname || !userId || !password || !confirmPassword) {
      Alert.alert('Error', '모든 정보를 입력해 주세요.');
      return;
    }

    if (userId === 'existingID') {
      setIdError(true);
    } else if (password !== confirmPassword) {
      Alert.alert('Error', '비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setIdError(false);
      Alert.alert('Success', '회원가입 성공!');
      navigation.navigate('MemberType');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>정보 입력</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={[styles.input, idError ? styles.errorInput : null]}
            value={userId}
            onChangeText={setUserId}
          />
          {idError && <Text style={styles.errorText}>중복된 아이디 입니다.</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>비밀번호 재입력</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333333',
  },
  input: {
    height: 48,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  errorInput: {
    borderColor: '#FF5252',
  },
  errorText: {
    color: '#FF5252',
    marginTop: 8,
    fontSize: 12,
  },
  signupButton: {
    backgroundColor: '#FDD835',
    borderRadius: 10,
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
    marginTop: 80,
  },
  signupButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SignupForm;
