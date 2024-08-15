import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';


type InfoBoardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InfoBoardScreen'>;

type Props = {
    navigation: InfoBoardScreenNavigationProp;
};

const data = [
    { id: '1', title: '정보 1', content: '유익한 정보~~', author: '닉네임', date: '24.06.13', likes: 10, comments: 2 },
    { id: '2', title: '정보 2', content: '유익한 정보~~', author: '닉네임', date: '24.06.13', likes: 12, comments: 4 },
];

export default function InfoBoardScreen({ navigation }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>정보게시판</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="search" size={24} color="black" style={styles.icon} />
                    <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.categoryButton, styles.selectedCategory]}>
                    <Text style={styles.categoryButtonText}>인기순</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>최신순</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>추천</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('InfoPostDetailScreen', { post: item })}
                    >
                        <View style={styles.itemContainer}>
                            <View style={styles.itemContent}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDetails}>{item.author} | {item.date}</Text>
                                <Text style={styles.itemText}>{item.content}</Text>
                                <View style={styles.itemFooter}>
                                    <Ionicons name="heart-outline" size={16} color="gray" />
                                    <Text style={styles.itemFooterText}>{item.likes}</Text>
                                    <Ionicons name="chatbubble-outline" size={16} color="gray" />
                                    <Text style={styles.itemFooterText}>{item.comments}</Text>
                                </View>
                            </View>
                            <View style={styles.itemImagePlaceholder} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('InfoRegister');
                        }}>
                            <Text style={styles.modalButtonText}>게시글 등록</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    title: { fontSize: 20, fontWeight: 'bold' },
    headerIcons: { flexDirection: 'row' },
    icon: { marginLeft: 16 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, paddingVertical: 10, paddingHorizontal: 5 },
    categoryButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#F8F8F8', marginRight: 10 },
    selectedCategory: { backgroundColor: '#FFEB3B' },
    categoryButtonText: { fontSize: 14, color: '#000' },
    itemContainer: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE', backgroundColor: '#FFFFFF' },
    itemContent: { flex: 1 },
    itemTitle: { fontSize: 16, fontWeight: 'bold' },
    itemDetails: { fontSize: 12, color: '#888' },
    itemText: { marginVertical: 8, fontSize: 14, color: '#555' },
    itemFooter: { flexDirection: 'row', alignItems: 'center' },
    itemFooterText: { marginHorizontal: 4, fontSize: 12, color: '#888' },
    itemImagePlaceholder: { width: 60, height: 60, marginLeft: 16, borderRadius: 10, backgroundColor: '#D3D3D3' },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FFEB3B',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 200,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFEB3B',
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
