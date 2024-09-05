import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NannyProfileEditScreen({ navigation, route }) {
    const { name, updateProfile } = route.params;
    const [newName, setNewName] = useState(name);
    const [introduction, setIntroduction] = useState('');
    const [job, setJob] = useState('휴학생');
    const [experience, setExperience] = useState([
        { id: 1, period: '23.01~23.07', place: 'OO 어린이집' },
        { id: 2, period: '23.09~23.10', place: '남아 가정집' }
    ]);
    const [cctv, setCctv] = useState('없어요');
    const [notes, setNotes] = useState('');

    const handleSave = () => {
        updateProfile({ name: newName, introduction, job, experience, cctv, notes });
        navigation.goBack();
    };

    const handleDeleteExperience = (id) => {
        setExperience(experience.filter(exp => exp.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>프로필 수정</Text>

                <View style={styles.profileSection}>
                    <Image source={{ uri: 'https://example.com/nanny_avatar.png' }} style={styles.avatar} />
                    <TextInput
                        style={styles.nameInput}
                        value={newName}
                        onChangeText={setNewName}
                        placeholder="이름을 입력하세요"
                    />
                    <TouchableOpacity style={styles.cameraButton}>
                        <Ionicons name="camera-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>한줄 소개</Text>
                <TextInput
                    style={styles.input}
                    placeholder="자신을 소개해봐요 (최대 OO자)"
                    value={introduction}
                    onChangeText={setIntroduction}
                />

                <Text style={styles.label}>나의 직업</Text>
                <TextInput
                    style={styles.input}
                    placeholder="직업을 입력하세요"
                    value={job}
                    onChangeText={setJob}
                />

                <Text style={styles.label}>경력 수정</Text>
                {experience.map(exp => (
                    <View key={exp.id} style={styles.experienceItem}>
                        <Text>{exp.period}  {exp.place}</Text>
                        <View style={styles.experienceActions}>
                            <TouchableOpacity onPress={() => handleDeleteExperience(exp.id)}>
                                <Ionicons name="close-circle-outline" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <Text style={styles.label}>자격증 유무</Text>
                <View style={styles.cctvSection}>
                    <TouchableOpacity
                        style={[styles.cctvButton, cctv === '있어요' && styles.selectedCctv]}
                        onPress={() => setCctv('있어요')}
                    >
                        <Text style={styles.cctvButtonText}>있어요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.cctvButton, cctv === '없어요' && styles.selectedCctv]}
                        onPress={() => setCctv('없어요')}
                    >
                        <Text style={styles.cctvButtonText}>없어요</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>주의 사항</Text>
                <TextInput
                    style={styles.input}
                    placeholder="육아도우미분이 주의할게 있나요?"
                    value={notes}
                    onChangeText={setNotes}
                />
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
    experienceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        padding: 10,
    },
    experienceActions: {
        flexDirection: 'row',
    },
    cctvSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cctvButton: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#FFEB3B',
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    selectedCctv: {
        backgroundColor: '#FFEB3B',
    },
    cctvButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
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
