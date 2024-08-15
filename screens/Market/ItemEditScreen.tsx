import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemEditScreen({ route, navigation }) {
    const { item } = route.params;

    const [name, setName] = useState(item.name);
    const [category, setCategory] = useState(item.category);
    const [status, setStatus] = useState('예약'); // 초기값 예시
    const [method, setMethod] = useState('무료나눔'); // 초기값 예시
    const [price, setPrice] = useState(item.price);
    const [description, setDescription] = useState(item.description);

    const handleSave = () => {
        // 저장 로직을 여기에 추가, 이후 DB에 저장할 수 있도록
        console.log({
            name,
            category,
            status,
            method,
            price,
            description,
        });
        navigation.goBack();
    };

    const handleDelete = () => {
        Alert.alert(
            "삭제 확인",
            "이 게시글을 삭제하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                { text: "삭제", style: "destructive", onPress: () => navigation.goBack() } // 삭제 로직 추가 필요
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
                    <Text style={styles.saveButtonText}>등록하기</Text>
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
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        marginLeft: 10,
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        fontSize: 16,
        color: '#FF3B30',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    itemImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#D3D3D3',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#F8F8F8',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 8,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#F8F8F8',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 8,
        marginBottom: 8,
    },
    selectedButton: {
        backgroundColor: '#FFEB3B',
        borderColor: '#FFEB3B',
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
    },
    selectedButtonText: {
        fontWeight: 'bold',
    },
    textArea: {
        height: 100,
    },
    saveButton: {
        backgroundColor: '#FFEB3B',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
