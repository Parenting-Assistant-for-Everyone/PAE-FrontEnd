import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemDetailScreen({ route, navigation }) {
    const { item } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.category}>{item.category}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ItemEditScreen', { item })}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.itemImagePlaceholder} />
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.userInfo}>
                    <View style={styles.userImagePlaceholder} />
                    <View>
                        <Text style={styles.userName}>승아맘</Text>
                        <Text style={styles.userLocation}>부산 대연1동</Text>
                    </View>
                    <Text style={styles.date}>2024.06.11</Text>
                </View>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDescription}>6개월 이하 아기들이 사용하기 좋은 쿠션입니다. 너무 귀여워요.</Text>
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
                    <Text style={styles.price}>50,000원</Text>
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
    userImagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#D3D3D3',
        marginRight: 10,
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
