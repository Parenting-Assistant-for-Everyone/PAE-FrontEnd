import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    MyPage: undefined;
    ProfileScreen: { name: string; updateProfile: (updatedProfile: { name: string }) => void };
    NannyPageScreen: undefined;
    NannyRecordScreen: undefined;
    EditChildScreen: { child: Child; updateChild: (updatedChild: Child) => void };
    AddChildScreen: { addChild: (newChild: Child) => void };
};

type MyPageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyPage'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

interface MyPageScreenProps {
    navigation: MyPageScreenNavigationProp;
}

interface Profile {
    name: string;
    avatar: string;
}

interface Child {
    id: string;
    name: string;
    age: string;
    message: string;
    avatar: string;
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation }) => {
    const [profile, setProfile] = useState<Profile>({
        name: '슬기맘',
        avatar: 'https://example.com/avatar.png',
    });

    const [children, setChildren] = useState<Child[]>([
        { id: '1', name: '한슬기', age: '7살', message: '우리 슬기는 야채를...', avatar: 'https://example.com/child1.png' },
        { id: '2', name: '한지우', age: '5살', message: '우리 지우는 야채를...', avatar: 'https://example.com/child2.png' },
    ]);

    const handleNannySwitch = () => {
        navigation.navigate('NannyPageScreen');
    };

    const addChild = (newChild: Child) => {
        setChildren([...children, newChild]);
    };

    const handleNannyRecord = () => {
        navigation.navigate('NannyRecordScreen');
    };

    const handleProfileEdit = () => {
        navigation.navigate('ProfileScreen', {
            name: profile.name,
            updateProfile: (updatedProfile: { name: string }) => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    ...updatedProfile,
                }));
            },
        });
    };

    const handleEditChild = (child: Child) => {
        navigation.navigate('EditChildScreen', {
            child,
            updateChild: (updatedChild: Child) => {
                setChildren((prevChildren) =>
                    prevChildren.map((c) => (c.id === updatedChild.id ? updatedChild : c))
                );
            },
        });
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            setProfile({
                name: '슬기맘',
                avatar: 'https://example.com/avatar.png',
            });
        };

        const fetchChildrenData = async () => {
            setChildren([
                { id: '1', name: '한슬기', age: '7살', message: '우리 슬기는 야채를...', avatar: 'https://example.com/child1.png' },
                { id: '2', name: '한지우', age: '5살', message: '우리 지우는 야채를...', avatar: 'https://example.com/child2.png' },
            ]);
        };

        fetchProfileData();
        fetchChildrenData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
            </View>
            <View style={styles.header}>
                <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{profile.name}</Text>
                </View>
                <TouchableOpacity style={styles.profileButton} onPress={handleProfileEdit}>
                    <Text style={styles.profileButtonText}>프로필 보기</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.greeting}>안녕하세요!</Text>

            <TouchableOpacity style={styles.nannyButton} onPress={handleNannySwitch}>
                <Text style={styles.nannyButtonText}>육아도우미로 전환</Text>
            </TouchableOpacity>

            <View style={styles.kidsSection}>
                {children.map((child) => (
                    <View key={child.id} style={styles.kidItem}>
                        <Image source={{ uri: child.avatar }} style={styles.kidAvatar} />
                        <View style={styles.kidInfo}>
                            <Text style={styles.kidName}>{child.name} {child.age}</Text>
                            <Text style={styles.kidMessage}>{child.message}</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={() => handleEditChild(child)}>
                            <Text style={styles.editButtonText}>수정</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddChildScreen', { addChild })}>
                    <Text style={styles.addButtonText}>아이 추가하기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.activitySection}>
                <Text style={styles.activityTitle}>나의 활동</Text>
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
                    <Text style={styles.activityItemText}>댓글 남긴 글</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityItem} onPress={handleNannyRecord}>
                    <Ionicons name="person-outline" size={20} color="#000" />
                    <Text style={styles.activityItemText}>육아도우미 기록</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
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
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
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
    greeting: {
        fontSize: 16,
        marginBottom: 20,
    },
    nannyButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    nannyButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    kidsSection: {
        marginBottom: 30,
    },
    kidItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    kidAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#D3D3D3',
    },
    kidInfo: {
        flex: 1,
    },
    kidName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    kidMessage: {
        fontSize: 14,
        color: '#888',
    },
    editButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    addButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    separator: {
        height: 1,
        backgroundColor: '#DDD',
        marginVertical: 20,
    },
    activitySection: {
        marginTop: 20,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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

export default MyPageScreen;
