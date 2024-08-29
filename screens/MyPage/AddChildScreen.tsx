import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddChildScreen({ navigation, route }) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('공주님');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [introduction, setIntroduction] = useState('');
    const [notes, setNotes] = useState('');

    const handleRegister = () => {
        const newChild = {
            id: Date.now().toString(),
            name,
            gender,
            birthDate: birthDate.toLocaleDateString(),
            introduction,
            notes,
            avatar: 'https://example.com/default_avatar.png', // Placeholder avatar URL
        };

        // Pass the new child back to MyPageScreen to update the list
        if (route.params && route.params.addChild) {
            route.params.addChild(newChild);
        }

        // Save the data to your backend database here
        // Example: using fetch
        // fetch('https://yourapi.com/addChild', { method: 'POST', body: JSON.stringify(newChild) });

        navigation.goBack(); // Go back to MyPageScreen
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>아이 추가하기</Text>
                </View>

                <View style={styles.profileSection}>
                    <Image source={{ uri: 'https://example.com/default_avatar.png' }} style={styles.avatar} />
                    <TextInput
                        style={styles.nameInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="이름을 입력하세요"
                    />
                    <TouchableOpacity style={styles.cameraButton}>
                        <Ionicons name="camera-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>한줄 소개</Text>
                <TextInput
                    style={styles.input}
                    placeholder="아이를 소개해봐요 (최대 00자)"
                    value={introduction}
                    onChangeText={setIntroduction}
                />

                <Text style={styles.label}>주의 사항</Text>
                <TextInput
                    style={styles.input}
                    placeholder="육아도우미분이 주의할게 있나요?"
                    value={notes}
                    onChangeText={setNotes}
                />

                <Text style={styles.label}>성별</Text>
                <View style={styles.genderSection}>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === '공주님' && styles.genderButtonSelected]}
                        onPress={() => setGender('공주님')}
                    >
                        <Text style={[styles.genderButtonText, gender === '공주님' && styles.genderButtonTextSelected]}>공주님</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === '왕자님' && styles.genderButtonSelected]}
                        onPress={() => setGender('왕자님')}
                    >
                        <Text style={[styles.genderButtonText, gender === '왕자님' && styles.genderButtonTextSelected]}>왕자님</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>생년월일</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateInputText}>
                        {birthDate.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || birthDate;
                            setShowDatePicker(false);
                            setBirthDate(currentDate);
                        }}
                    />
                )}
            </ScrollView>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>등록하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EFEFEF',
    },
    nameInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: '40%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
    },
    genderSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    genderButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#FFEB3B',
        borderRadius: 10,
        alignItems: 'center',
    },
    genderButtonSelected: {
        backgroundColor: '#FFEB3B',
    },
    genderButtonText: {
        fontSize: 16,
    },
    genderButtonTextSelected: {
        color: '#000',
        fontWeight: 'bold',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    dateInputText: {
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    registerButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
