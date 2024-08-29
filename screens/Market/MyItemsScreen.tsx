import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyItemsScreen({ navigation }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            let url = 'http://52.79.128.176:8080/api/v1/goods/my';

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
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>내 물건</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={items}
                keyExtractor={item => item.boardId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('MyItemDetailScreen', { item })}>
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
    itemContainer: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        backgroundColor: '#FFFFFF',
    },
    itemImage: {
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
});
