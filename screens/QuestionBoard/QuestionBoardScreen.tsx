import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type QuestionBoardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuestionBoardScreen'>;

type Props = {
    navigation: QuestionBoardScreenNavigationProp;
};

const mockData = [
    { id: '1', title: '질문 1', content: '질문 내용~~', writer: '닉네임', date: '24.06.18', likes: 8, comments: 2 },
    { id: '2', title: '질문 2', content: '질문 내용~~', writer: '닉네임', date: '24.06.13', likes: 5, comments: 1 },
];

export default function QuestionBoardScreen({ navigation }: Props) {
    const [data, setData] = useState(mockData);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'likes' | 'date' | 'recommendation'>('likes');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://your-api.com/questions');
                const textResponse = await response.text();  // 응답을 텍스트로 먼저 받음
                console.log('Raw Response:', textResponse);  // 로그에 출력하여 어떤 데이터인지 확인
                const result = JSON.parse(textResponse);     // JSON 파싱 시도
                setData(result); // 데이터를 받아와서 상태를 업데이트
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setData(mockData); // 에러가 발생하면 모의 데이터를 사용
            }
        };

        fetchData();
    }, []);

    const sortByLikes = () => {
        const sortedData = [...data].sort((a, b) => b.likes - a.likes);
        setData(sortedData);
        setSelectedCategory('likes');
    };

    const sortByDate = () => {
        const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setData(sortedData);
        setSelectedCategory('date');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>질문 게시판</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="search" size={24} color="black" style={styles.icon} />
                    <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'likes' && styles.selectedCategory,
                    ]}
                    onPress={sortByLikes}
                >
                    <Text style={styles.categoryButtonText}>인기순</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'date' && styles.selectedCategory,
                    ]}
                    onPress={sortByDate}
                >
                    <Text style={styles.categoryButtonText}>최신순</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'recommendation' && styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory('recommendation')}
                >
                    <Text style={styles.categoryButtonText}>추천</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('QuestionPostDetailScreen', { post: item })}
                    >
                        <View style={styles.itemContainer}>
                            <View style={styles.itemContent}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDetails}>{`${item.writer} | ${item.date}`}</Text>
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
                            navigation.navigate('QuestionRegister');
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
