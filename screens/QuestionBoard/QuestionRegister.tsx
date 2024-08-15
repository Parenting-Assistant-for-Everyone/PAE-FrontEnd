import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionRegister({ navigation }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handlePost = () => {
        console.log('Title:', title);
        console.log('Content:', content);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>글 쓰기</Text>
                <TouchableOpacity style={styles.doneButton} onPress={handlePost}>
                    <Text style={styles.doneButtonText}>완료</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.titleInput}
                    placeholder="제목"
                    placeholderTextColor="#C7C7CD"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.contentInput}
                    placeholder="내용을 입력하세요"
                    placeholderTextColor="#C7C7CD"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />
            </View>
            <TouchableOpacity style={styles.footer}>
                <Text style={styles.footerText}>커뮤니티 이용수칙 전체보기> </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#FFEB3B',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    doneButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    titleInput: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        color: '#000',
    },
    contentInput: {
        fontSize: 18,
        color: '#000',
        height: '60%',
        textAlignVertical: 'top',
    },
    footer: {
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: 30,
    },
    footerText: {
        fontSize: 16,
        color: '#C7C7CD',
    },
});
