import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostRegisterScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handlePost = async () => {
        // Post data object
        const postData = {
            title: title,
            content: content,
        };

        try {
            // API 호출하여 데이터 전송
            const response = await fetch('https://your-api.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                console.log('Post created successfully');
                navigation.goBack();  // 성공 시 이전 화면으로 돌아감
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
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
        padding: '4%',
    },
    headerTitle: {
        fontSize: '18%',
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#FFEB3B',
        paddingHorizontal: '4%',
        paddingVertical: '2%',
        borderRadius: '10%',
    },
    doneButtonText: {
        fontSize: '15%',
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer: {
        paddingHorizontal: '4%',
        paddingTop: '5%',
    },
    titleInput: {
        fontSize: '20%',
        fontWeight: '500',
        marginBottom: '4%',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        color: '#000',
    },
    contentInput: {
        fontSize: '17%',
        color: '#000',
        height: '60%',
        textAlignVertical: 'top',
    },
    footer: {
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: '7.5%',
    },
    footerText: {
        fontSize: '13%',
        color: '#C7C7CD',
    },
});
