import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
    ProfileScreen: { name: string; updateProfile: (updatedProfile: { name: string }) => void; children?: Child[] };
    ProfileEditScreen: { name: string; updateProfile: (updatedProfile: { name: string }) => void };
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

interface ProfileScreenProps {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
}

interface Child {
    id: string;
    name: string;
    age: string;
    message: string;
    avatar: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
    const { name, updateProfile, children = [] } = route.params; // Default to an empty array if undefined
    const [editButtonPressed, setEditButtonPressed] = useState(false);
    const [saveButtonPressed, setSaveButtonPressed] = useState(false);

    const handleEditProfile = () => {
        setEditButtonPressed(true);
        setTimeout(() => {
            setEditButtonPressed(false);
            navigation.navigate('ProfileEditScreen', { name, updateProfile });
        }, 200); // To simulate a button press effect
    };

    const handleSaveProfile = () => {
        setSaveButtonPressed(true);
        setTimeout(() => {
            setSaveButtonPressed(false);
            const updatedProfile = { name: 'Updated Name' }; // This should be dynamic
            updateProfile(updatedProfile);
            navigation.goBack();
        }, 200); // To simulate a button press effect
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
            </View>

            <View style={styles.header}>
                <Image source={{ uri: 'https://example.com/avatar.png' }} style={styles.avatar} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.greeting}>안녕하세요!</Text>
            </View>

            <View style={styles.childrenSection}>
                {children.map((child) => (
                    <View key={child.id} style={styles.childItem}>
                        <Image source={{ uri: child.avatar }} style={styles.childAvatar} />
                        <View style={styles.childInfo}>
                            <Text style={styles.childName}>{child.name} {child.age}</Text>
                            <Text style={styles.childMessage}>{child.message}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[
                        styles.editButton,
                        { backgroundColor: editButtonPressed ? '#FFEB3B' : '#FFF' }
                    ]}
                    onPress={handleEditProfile}
                >
                    <Text style={[styles.editButtonText, { color: editButtonPressed ? '#000' : '#FFEB3B' }]}>
                        수정하기
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.saveButton,
                        { backgroundColor: saveButtonPressed ? '#FFEB3B' : '#FFF' }
                    ]}
                    onPress={handleSaveProfile}
                >
                    <Text style={[styles.saveButtonText, { color: saveButtonPressed ? '#000' : '#FFEB3B' }]}>
                        저장
                    </Text>
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
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: '#D3D3D3',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 18,
        color: '#888',
    },
    childrenSection: {
        marginVertical: 20,
    },
    childItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    childAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: '#D3D3D3',
    },
    childInfo: {
        flex: 1,
    },
    childName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    childMessage: {
        fontSize: 14,
        color: '#888',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    editButton: {
        borderColor: '#FFEB3B',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        borderColor: '#FFEB3B',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
