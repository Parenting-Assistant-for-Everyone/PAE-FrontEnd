import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemDetailScreen({ route, navigation }) {
    const { item } = route.params;
    const [itemData, setItemData] = useState(item); // 초기 데이터는 route로 전달된 데이터를 사용
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/goods/${item.boardId}`);
                const result = await response.json();

                if (result.httpStatusCode === 200 && result.code === '1000') {
                    const fetchedItem = result.data.content[0];
                    setItemData(fetchedItem);
                } else {
                    console.error('Failed to fetch item data:', result.message);
                }
            } catch (error) {
                console.error('Failed to fetch item data:', error);
            }
        };

        fetchItemData();
    }, [item.boardId]);

    const toggleFavorite = async () => {
        const updatedFavorite = !isFavorite;
        setIsFavorite(updatedFavorite);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/goods/${item.boardId}/favorite`, {
                method: updatedFavorite ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update favorite status');
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
            setIsFavorite(!updatedFavorite); // 실패 시 상태를 원래대로 되돌림
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.category}>{itemData.saleStatus}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ItemEditScreen', { item: itemData })}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {itemData.thumbnailUrl ? (
                    <Image source={{ uri: itemData.thumbnailUrl }} style={styles.itemImage} />
                ) : (
                    <View style={styles.itemImagePlaceholder} />
                )}
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.userInfo}>
                    <View>
                        <Text style={styles.userName}>{itemData.writer || '작성자 없음'}</Text>
                        <Text style={styles.userLocation}>{itemData.address || '위치 정보 없음'}</Text>
                    </View>
                    <Text style={styles.date}>{itemData.daysAgo || '날짜 정보 없음'}</Text>
                </View>
                <Text style={styles.itemTitle}>{itemData.title}</Text>
                <Text style={styles.itemDescription}>{itemData.description || '내용이 없습니다.'}</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    <TouchableOpacity onPress={toggleFavorite}>
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={30}
                            color={isFavorite ? "red" : "black"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.price}>{itemData.price || '가격 정보 없음'}</Text>
                </View>
                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>채팅하기</Text>
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    category: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    itemImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#D3D3D3',
    },
    itemImagePlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#D3D3D3',
    },
    detailsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userLocation: {
        fontSize: 14,
        color: '#888',
    },
    date: {
        marginLeft: 'auto',
        fontSize: 12,
        color: '#888',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 16,
        color: '#555',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8C00',
        marginLeft: 16,
    },
    contactButton: {
        backgroundColor: '#FFEB3B',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    contactButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
