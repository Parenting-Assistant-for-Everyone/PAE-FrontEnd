import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatDetailScreen({ route, navigation }) {
    const { chat } = route.params;
    const [messages, setMessages] = useState([
        { id: '1', sender: chat.name, message: '오', time: '9:41 AM', isSender: false },
        { id: '2', sender: chat.name, message: '안녕', time: '9:41 AM', isSender: false },
        { id: '3', sender: chat.name, message: '구매하고싶어요', time: '9:41 AM', isSender: false },
        { id: '4', sender: '나', message: '안녕하세요 육아도우미 채팅방입니다. 중고거래 가능합니다.', time: '9:41 AM', isSender: true },
        { id: '5', sender: '나', message: '봄!', time: '9:41 AM', isSender: true },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMessageData = {
                id: (messages.length + 1).toString(),
                sender: '나',
                message: newMessage,
                time: '지금',
                isSender: true,
            };
            setMessages([...messages, newMessageData]);
            setNewMessage('');
        }
    };

    const handleDeleteChat = () => {
        Alert.alert('삭제', '이 채팅을 삭제하시겠습니까?', [
            { text: '취소', style: 'cancel' },
            {
                text: '삭제', onPress: () => {
                    navigation.goBack();
                }
            },
        ]);
    };

    const handleBlockUser = () => {
        Alert.alert('차단', '이 사용자를 차단하시겠습니까?', [
            { text: '취소', style: 'cancel' },
            {
                text: '차단', onPress: () => {
                    navigation.goBack();
                }
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>{chat.name}</Text>
                        <Text style={styles.headerSubtitle}>8개월 아기</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.isSender ? styles.myMessage : styles.otherMessage]}>
                        <Text style={styles.messageText}>{item.message}</Text>
                    </View>
                )}
                style={styles.messageList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="메시지를 입력하세요."
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={handleDeleteChat} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>삭제하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleBlockUser} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>차단하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancelButton}>
                            <Text style={styles.modalCancelButtonText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '4%', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    headerTitleContainer: { marginLeft: '2%' },
    headerTitle: { fontSize: '15%', fontWeight: 'bold' },
    headerSubtitle: { fontSize: '13%', color: '#888' },
    messageList: { paddingHorizontal: '6%', paddingVertical: '2%' },
    messageContainer: { padding: '2.5%', borderRadius: 10, marginBottom: '2%', maxWidth: '75%' },
    myMessage: { alignSelf: 'flex-end', backgroundColor: '#FFEB3B' },
    otherMessage: { alignSelf: 'flex-start', backgroundColor: '#F1F1F1' },
    messageText: { fontSize: '15%' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', padding: '4%', borderTopWidth: 1, borderTopColor: '#EEE' },
    input: { flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingHorizontal: '3%', paddingVertical: '2%', marginRight: '2.5%' },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { backgroundColor: 'white', padding: '4%', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    modalButton: { paddingVertical: '4%', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    modalButtonText: { fontSize: '15%', color: 'red' },
    modalCancelButton: { paddingVertical: '8%', alignItems: 'center' },
    modalCancelButtonText: { fontSize: '15%', color: '#888' },
});
