import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

export default function EndScreen({ navigation }) {
    const [inputText, setInputText] = useState('');

    const handleSkip = () => {
        navigation.navigate('MainApp', {
            screen: 'Home',
        });
    };

    const handleSubmit = async () => {
        if (inputText.trim() !== '') {
            const dataToSend = {
                additionalInfo: inputText.trim(),
            };

            try {
                const response = await fetch('https://your-backend-api.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (response.ok) {
                    Alert.alert("성공", "데이터가 성공적으로 전송되었습니다.", [
                        {
                            text: "확인", onPress: () => {
                                navigation.navigate('MainApp', {
                                    screen: 'Home', // Home 스택 네비게이터로 이동
                                });
                            }
                        },
                    ]);
                } else {
                    Alert.alert("오류", "데이터 전송에 실패했습니다.");
                }
            } catch (error) {
                console.error('Error submitting data:', error);
                Alert.alert("오류", "데이터 전송 중 문제가 발생했습니다.");
            }
        } else {
            Alert.alert("경고", "텍스트 입력란이 비어 있습니다.");
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>사전에 숙지해야할 사항이 있나요?</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="아이의 성별, 나이 (개월), 성격, 특이사항 등을 작성해주세요"
                    placeholderTextColor="#888"
                    multiline
                    value={inputText}
                    onChangeText={setInputText}
                />

                <Text style={styles.warningText}>
                    신청서 내용에 연락처, 이메일, 카카오톡 ID 등을 작성할 경우 회원 자격이 영구 박탈 됩니다.
                </Text>

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>건너뛰기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>시작하기</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: '5%',
        justifyContent: 'center',
    },
    title: {
        fontSize: '18%',
        fontWeight: 'bold',
        marginBottom: '5%',
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: '#F5F5DC',
        borderRadius: '2.5%',
        padding: '3.75%',
        height: '37.5%',
        textAlignVertical: 'top',
        fontSize: '15%',
        marginBottom: '5%',
    },
    warningText: {
        fontSize: '13%',
        color: '#FF0000',
        marginBottom: '5%',
        textAlign: 'center',
    },
    skipButton: {
        alignItems: 'center',
        marginBottom: '2.5%',
    },
    skipButtonText: {
        fontSize: '13%',
        color: '#888',
    },
    submitButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: '3.75%',
        paddingHorizontal: '10%',
        borderRadius: '7.5%',
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: '15%',
        fontWeight: 'bold',
        color: '#000',
    },
});