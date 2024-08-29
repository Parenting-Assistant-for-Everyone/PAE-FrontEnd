import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostDetailScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.headerTitle}>정보게시판</Text>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <Text style={styles.postTitle}>제목1</Text>
                    <View style={styles.authorContainer}>
                        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.authorImage} />
                        <View>
                            <Text style={styles.authorName}>닉네임</Text>
                            <Text style={styles.postDate}>24.06.24 23:19</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.postContent}>
                    내용내용1{'\n'}내용내용1
                </Text>
            </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postContainer: {
        padding: 16,
    },
    postHeader: {
        marginBottom: 16,
    },
    postTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    authorName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    postDate: {
        fontSize: 12,
        color: '#888',
    },
    postContent: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',  // Align items to the left
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FFEB3B',
        borderRadius: 20,
        marginRight: 8,  // Add margin between the buttons
    },
    actionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
});
