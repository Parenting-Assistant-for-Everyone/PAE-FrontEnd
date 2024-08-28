import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
    { label: '전체', value: 'ALL' },
    { label: '의류', value: 'CLOTHES' },
    { label: '음식', value: 'FOODS' },
    { label: '생활용품', value: 'DAILY_ITEM' },
    { label: '장난감', value: 'TOY' },
];

export default function ItemListScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            let url = 'http://52.79.128.176:8080/api/v1/goods';
            if (selectedCategory !== 'ALL') {
                url += `?category=${selectedCategory}`;
            }

            try {
                const response = await fetch(url);
                const result = await response.json();

                if (result.httpStatusCode === 200 && result.code === '1000') {
                    const fetchedItems = result.data.content;
                    setItems(fetchedItems);
                } else {
                    console.error('Failed to fetch items:', result.message);
                }
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };

        fetchItems();
    }, [selectedCategory]);

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
                        key={category.value}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.value && styles.selectedCategoryButton
                        ]}
                        onPress={() => setSelectedCategory(category.value)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category.value && styles.selectedCategoryText
                            ]}
                        >
                            {category.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={items}
                keyExtractor={item => item.boardId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ItemDetailScreen', { item })}>
                        <View style={styles.itemContainer}>
                            <Image
                                source={{ uri: item.thumbnailUrl }}
                                style={styles.itemImage}
                                resizeMode="cover"
                            />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.title}</Text>
                                <Text style={styles.itemPrice}>{item.price}</Text>
                                <Text style={styles.itemInfo}>{item.address ? item.address : '위치 정보 없음'} - {item.daysAgo}</Text>
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
        padding: '4%',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: '20%',
        fontWeight: 'bold',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '2.5%',
        backgroundColor: '#FFFFFF',
        paddingVertical: '2.5%',
        paddingHorizontal: '1.25%',
    },
    categoryButton: {
        paddingVertical: '1.5%',
        paddingHorizontal: '3%',
        borderRadius: '10%',
        backgroundColor: '#F8F8F8',
    },
    selectedCategoryButton: {
        backgroundColor: '#FFEB3B',
    },
    categoryText: {
        fontSize: '15%',
        color: '#000',
    },
    selectedCategoryText: {
        color: '#000',
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: '4%',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        backgroundColor: '#FFFFFF',
    },
    itemImage: {
        width: '15%',
        height: undefined,
        aspectRatio: 1,
        marginRight: '4%',
        borderRadius: '2.5%',
        backgroundColor: '#D3D3D3',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: '16%',
        fontWeight: 'bold',
    },
    itemPrice: {
        color: '#FF8C00',
        marginTop: '1.25%',
    },
    itemInfo: {
        color: '#888',
        marginTop: '1.25%',
    },
    floatingButton: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        backgroundColor: '#FFEB3B',
        width: '12.5%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: '0.5%' },
        shadowOpacity: 0.8,
        shadowRadius: '0.5%',
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        padding: '2.5%',
        borderTopLeftRadius: '2.5%',
        borderTopRightRadius: '2.5%',
    },
    modalButton: {
        paddingVertical: '3.75%',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    modalButtonText: {
        fontSize: '17%',
        textAlign: 'center',
    },
});
