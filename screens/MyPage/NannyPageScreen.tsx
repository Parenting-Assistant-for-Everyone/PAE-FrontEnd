import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NannyPageScreen({ navigation }) {
    const handleSwitchBack = () => {
        navigation.goBack(); // MyPageScreen으로 돌아갑니다
    };

    const handleProfileEdit = () => {
        navigation.navigate('NannyProfileEditScreen', {
            name: '육아도우미1',
            updateProfile: (updatedProfile) => {
                // Handle profile update here, possibly update the state or pass data back to this screen
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
            </View>

            <View style={styles.header}>
                <Image source={{ uri: 'https://example.com/nanny_avatar.png' }} style={styles.avatar} />
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>육아도우미1</Text>
                    <Text style={styles.description}>한줄소개~~~~~</Text>
                </View>
                <TouchableOpacity style={styles.profileButton} onPress={handleProfileEdit}>
                    <Text style={styles.profileButtonText}>프로필 보기</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.switchButton} onPress={handleSwitchBack}>
                <Text style={styles.switchButtonText}>일반 사용자로 전환</Text>
            </TouchableOpacity>

            <View style={styles.reviewSection}>
                <Text style={styles.sectionTitle}>내 리뷰</Text>
                <View style={styles.reviewList}>
                    {Array(4).fill(0).map((_, index) => (
                        <View key={index} style={styles.reviewItem}>
                            <Ionicons name="person-outline" size={30} color="#888" />
                            <Text style={styles.reviewRating}>4.5 / 5</Text>
                            <Text style={styles.reviewerName}>금쪽엄마</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.activitySection}>
                <Text style={styles.sectionTitle}>나의 활동</Text>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.activityItem}>
                    <Ionicons name="pencil-outline" size={20} color="#000" />
                    <Text style={styles.activityItemText}>내가 쓴 글</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityItem}>
                    <Ionicons name="heart-outline" size={20} color="#000" />
                    <Text style={styles.activityItemText}>좋아요 한 글</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityItem}>
                    <Ionicons name="chatbubble-outline" size={20} color="#000" />
                    <Text style={styles.activityItemText}>육아 기록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityItem}>
                    <Ionicons name="chatbubble-outline" size={20} color="#000" />
                    <Text style={styles.activityItemText}>댓글 남긴 글</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15,
    },
    icon: {
        marginLeft: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: '#D3D3D3',
    },
    headerInfo: {
        flex: 3,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#888',
    },
    profileButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
    },
    profileButtonText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    switchButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    switchButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    reviewSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewItem: {
        alignItems: 'center',
    },
    reviewRating: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    reviewerName: {
        fontSize: 12,
        color: '#888',
    },
    activitySection: {
        marginTop: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#DDD',
        marginVertical: 20,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    activityItemText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#000',
    },
});
