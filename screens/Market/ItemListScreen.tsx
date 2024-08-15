import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = ['전체', '의류', '장난감', '교육', '생활용품', '휴가'];

const initialItems = [
    { id: '1', category: '장난감', name: '아기 쿠션', price: '50,000원', location: '부산 대연1동', date: '3일 전' },
    { id: '2', category: '장난감', name: '물놀이 장난감', price: '무료나눔', location: '부산 대연1동', date: '3일 전' },
    { id: '3', category: '의류', name: '아기 정장', price: '8,000원', location: '부산 대연1동', date: '3일 전' },
    { id: '4', category: '장난감', name: '유아용 장난감', price: '10,000원', location: '부산 대연1동', date: '3일 전' },
];

export default function ItemListScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [modalVisible, setModalVisible] = useState(false);

    const filteredItems = selectedCategory === '전체'
        ? initialItems
        : initialItems.filter(item => item.category === selectedCategory);

    const handleFloatingButtonPress = () => {
        setModalVisible(true);
    };

    const handleMenuPress = (screenName) => {
        setModalVisible(false);
        navigation.navigate(screenName);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>우리 함께 나누어요</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
                {categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.selectedCategoryButton
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category && styles.selectedCategoryText
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ItemDetailScreen', { item })}>
                        <View style={styles.itemContainer}>
                            <View style={styles.itemImagePlaceholder} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>{item.price}</Text>
                                <Text style={styles.itemInfo}>{item.location} - {item.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButtonPress}>
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
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleMenuPress('ItemRegisterScreen')}>
                            <Text style={styles.modalButtonText}>게시글 등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleMenuPress('MyItemsScreen')}>
                            <Text style={styles.modalButtonText}>내 물건</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleMenuPress('FavoriteItemsScreen')}>
                            <Text style={styles.modalButtonText}>찜한 물건</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    categoryButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#F8F8F8',
    },
    selectedCategoryButton: {
        backgroundColor: '#FFEB3B',
    },
    categoryText: {
        fontSize: 14,
        color: '#000',
    },
    selectedCategoryText: {
        color: '#000',
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        backgroundColor: '#FFFFFF',
    },
    itemImagePlaceholder: {
        width: 60,
        height: 60,
        marginRight: 16,
        borderRadius: 10,
        backgroundColor: '#D3D3D3',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        color: '#FF8C00',
        marginTop: 5,
    },
    itemInfo: {
        color: '#888',
        marginTop: 5,
    },
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalButton: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    modalButtonText: {
        fontSize: 18,
        textAlign: 'center',
    },
});
