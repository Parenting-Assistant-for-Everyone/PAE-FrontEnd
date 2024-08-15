import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const chatData = {
    거래: [
        { id: '1', name: 'chan', message: '넵 수고하세요', time: '2주 전', avatar: 'https://example.com/avatar1.png' },
        { id: '2', name: '오지', message: '안녕하세요 답장이 너무 늦었네요 죄송...', time: '1년 전', avatar: 'https://example.com/avatar2.png' },
        { id: '3', name: '누룽지', message: '이람다님이 이모티콘을 보냈어요.', time: '1년 전', avatar: 'https://example.com/avatar3.png' },
    ],
    육아도우미: [
        { id: '4', name: 'kenny', message: '네.', time: '3일 전', avatar: 'https://example.com/avatar4.png' },
        { id: '5', name: '자리보곰', message: '자리보곰님이 이모티콘을 보냈어요.', time: '3일 전', avatar: 'https://example.com/avatar5.png' },
        { id: '6', name: '리빙스턴', message: '리빙스턴님이 이모티콘을 보냈어요.', time: '6일 전', avatar: 'https://example.com/avatar6.png' },
        { id: '7', name: '까꿍이', message: '옷 예쁘네요!', time: '7일 전', avatar: 'https://example.com/avatar7.png' },
    ],
};

export default function ChatListScreen() {
    const [selectedTab, setSelectedTab] = useState('거래');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>채팅</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="search" size={24} color="black" style={styles.icon} />
                    <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
                </View>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        selectedTab === '거래' && styles.activeTabButton
                    ]}
                    onPress={() => setSelectedTab('거래')}
                >
                    <Text
                        style={[
                            styles.tabButtonText,
                            selectedTab === '거래' && styles.activeTabButtonText
                        ]}
                    >
                        거래
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        selectedTab === '육아도우미' && styles.activeTabButton
                    ]}
                    onPress={() => setSelectedTab('육아도우미')}
                >
                    <Text
                        style={[
                            styles.tabButtonText,
                            selectedTab === '육아도우미' && styles.activeTabButtonText
                        ]}
                    >
                        육아 도우미
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={chatData[selectedTab]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.chatItemContainer}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={styles.chatDetails}>
                            <Text style={styles.chatName}>{item.name}</Text>
                            <Text style={styles.chatMessage}>{item.message}</Text>
                        </View>
                        <Text style={styles.chatTime}>{item.time}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    title: { fontSize: 20, fontWeight: 'bold' },
    headerIcons: { flexDirection: 'row' },
    icon: { marginLeft: 16 },
    tabContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, paddingLeft: 16 },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#FFEB3B',
        borderRadius: 20,
        marginRight: 10
    },
    activeTabButton: {
        backgroundColor: '#FFEB3B'
    },
    tabButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    },
    activeTabButtonText: {
        color: '#000'
    },
    chatItemContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
    chatDetails: { flex: 1 },
    chatName: { fontSize: 16, fontWeight: 'bold' },
    chatMessage: { fontSize: 14, color: '#888' },
    chatTime: { fontSize: 12, color: '#888' },
});
