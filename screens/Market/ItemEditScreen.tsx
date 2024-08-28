import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemEditScreen({ route, navigation }) {
    const { item } = route.params;

    const [name, setName] = useState(item.name);
    const [category, setCategory] = useState(item.category);
    const [status, setStatus] = useState(item.status);
    const [method, setMethod] = useState(item.method);
    const [price, setPrice] = useState(item.price);
    const [description, setDescription] = useState(item.description);
    const [deleteImageIdList, setDeleteImageIdList] = useState([]);

    const handleSave = async () => {
        const updatedData = {
            memberId: 1,
            title: name,
            goodsCategory: category === '의류' ? 'CLOTHES' :
                category === '장난감' ? 'TOYS' :
                    category === '교육' ? 'EDUCATION' :
                        category === '생활용품' ? 'SUPPLIES' : 'OTHER',
            saleType: method === '무료나눔' ? 'SHARING' : 'SALE',
            saleStatus: status === '예약' ? 'RESERVED' : status === '판매중' ? 'ON_SALE' : 'DONE',
            price: parseInt(price, 10),
            description: description,
            deleteImageIdList: deleteImageIdList,
        };

        try {
            const response = await fetch(`http://52.79.128.176:8080/api/v1/goods/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();

            if (response.ok && result.httpStatusCode === 200) {
                console.log('Item updated successfully:', result.message);
                navigation.goBack();
            } else {
                console.error('Failed to update item:', result.message);
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            "삭제 확인",
            "이 게시글을 삭제하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                {
                    text: "삭제",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://52.79.128.176:8080/api/v1/goods/${item.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            const result = await response.json();

                            if (response.ok && result.httpStatusCode === 200) {
                                console.log('Item deleted successfully:', result.message);
                                navigation.goBack();
                            } else {
                                console.error('Failed to delete item:', result.message);
                            }
                        } catch (error) {
                            console.error('Error deleting item:', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>게시글 수정하기</Text>
                    <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>삭제하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    {/* 이미지 플레이스홀더는 실제 구현에서는 이미지 추가/삭제 기능을 제공할 수 있음 */}
                    <View style={styles.itemImagePlaceholder} />
                    <View style={styles.itemImagePlaceholder} />
                    <View style={styles.itemImagePlaceholder} />
                </View>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="용품 이름"
                />
                <Text style={styles.label}>카테고리</Text>
                <View style={styles.buttonGroup}>
                    {['의류', '장난감', '교육', '생활용품'].map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.categoryButton, category === cat && styles.selectedButton]}
                            onPress={() => setCategory(cat)}
                        >
                            <Text style={[styles.buttonText, category === cat && styles.selectedButtonText]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.label}>거래 상태</Text>
                <View style={styles.buttonGroup}>
                    {['예약', '판매중', '판매완료'].map((stat) => (
                        <TouchableOpacity
                            key={stat}
                            style={[styles.categoryButton, status === stat && styles.selectedButton]}
                            onPress={() => setStatus(stat)}
                        >
                            <Text style={[styles.buttonText, status === stat && styles.selectedButtonText]}>{stat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.label}>거래 방식</Text>
                <View style={styles.buttonGroup}>
                    {['무료나눔', '판매'].map((met) => (
                        <TouchableOpacity
                            key={met}
                            style={[styles.categoryButton, method === met && styles.selectedButton]}
                            onPress={() => setMethod(met)}
                        >
                            <Text style={[styles.buttonText, method === met && styles.selectedButtonText]}>{met}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    placeholder="가격"
                    keyboardType="numeric"
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="상품 설명"
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>수정하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        paddingBottom: '5%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4%',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: '20%',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        marginLeft: '2.5%',
    },
    deleteButton: {
        padding: '2%',
    },
    deleteButtonText: {
        fontSize: '14%',
        color: '#FF3B30',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: '4%',
        paddingHorizontal: '4%',
    },
    itemImagePlaceholder: {
        width: '25%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: '2.5%',
        backgroundColor: '#D3D3D3',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: '2%',
        padding: '3%',
        marginHorizontal: '4%',
        marginBottom: '4%',
        fontSize: '14%',
        backgroundColor: '#F8F8F8',
    },
    label: {
        fontSize: '16%',
        fontWeight: 'bold',
        marginLeft: '4%',
        marginBottom: '2%',
        marginTop: '2%',
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: '4%',
        paddingHorizontal: '4%',
    },
    categoryButton: {
        paddingVertical: '2.5%',
        paddingHorizontal: '4%',
        borderRadius: '5%',
        backgroundColor: '#F8F8F8',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: '2%',
        marginBottom: '2%',
    },
    selectedButton: {
        backgroundColor: '#FFEB3B',
        borderColor: '#FFEB3B',
    },
    buttonText: {
        fontSize: '14%',
        color: '#000',
    },
    selectedButtonText: {
        fontWeight: 'bold',
    },
    textArea: {
        height: '10%',
    },
    saveButton: {
        backgroundColor: '#FFEB3B',
        borderRadius: '2.5%',
        paddingVertical: '3.75%',
        paddingHorizontal: '5%',
        marginHorizontal: '4%',
        alignItems: 'center',
        marginBottom: '4%',
    },
    saveButtonText: {
        fontSize: '15%',
        fontWeight: 'bold',
        color: '#000',
    },
});