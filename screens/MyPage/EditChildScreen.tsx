import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditChildScreen({ navigation, route }) {
    const { child, updateChild } = route.params;
    const [name, setName] = useState(child.name);
    const [introduction, setIntroduction] = useState(child.message);
    const [notes, setNotes] = useState('');
    const [gender, setGender] = useState(child.gender || '공주님');
    const [birthDate, setBirthDate] = useState(new Date(child.birthDate || Date.now()));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };

    const handleSave = () => {
        const updatedChild = {
            ...child,
            name,
            message: introduction,
            notes,
            gender,
            birthDate: birthDate.toISOString().split('T')[0], // Save date as YYYY-MM-DD
        };

        updateChild(updatedChild); // Update the child in the parent component

        // Optionally: Send the updated data to your database here

        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>아이 정보 수정하기</Text>

                <View style={styles.profileSection}>
                    <Image source={{ uri: child.avatar }} style={styles.avatar} />
                    <TextInput
                        style={styles.nameInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="아이 이름을 입력하세요"
                    />
                    <TouchableOpacity style={styles.cameraButton}>
                        <Ionicons name="camera-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>한줄 소개</Text>
                <TextInput
                    style={styles.input}
                    placeholder="아이를 소개해봐요 (최대 OO자)"
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
                        onChange={onDateChange}
                    />
                )}
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        padding: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    genderSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    genderButton: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#FFEB3B',
        borderRadius: 10,
        marginHorizontal: 5,
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
    saveButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
