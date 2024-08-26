import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ItemRegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [method, setMethod] = useState('무료나눔');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("memberId", "1");
        formData.append("title", name);
        formData.append("price", price ? parseInt(price, 10).toString() : "0");
        formData.append("goodsCategory", category === '의류' ? 'CLOTHING' :
            category === '장난감' ? 'TOYS' :
                category === '교육' ? 'EDUCATION' :
                    category === '생활용품' ? 'SUPPLIES' : 'OTHER');
        formData.append("saleType", method === '무료나눔' ? 'FREE' : 'SALE');
        formData.append("description", description);

        if (image) {
            const fileName = image.uri.split('/').pop();
            const fileType = image.uri.split('.').pop();

            formData.append("file", {
                name: fileName,
                type: `image/${fileType}`,
                uri: image.uri,
            });
        }

        try {
            const response = await fetch('http://52.79.128.176:8080/api/v1/goods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            console.log('HTTP Status Code:', response.status);

            const responseData = await response.json();

            console.log('Response Data:', responseData);

            if (response.ok && responseData.httpStatusCode === 200) {
                console.log('요청에 성공하였습니다:', responseData.message);
                navigation.goBack();
            } else {
                console.error('요청 실패:', responseData.message);
            }
        } catch (error) {
            console.error('데이터 전송 오류:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>게시글 등록하기</Text>
                </View>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {image ? (
                            <Image source={{ uri: image.uri }} style={styles.itemImage} />
                        ) : (
                            <Ionicons name="camera" size={40} color="#888" />
                        )}
                    </TouchableOpacity>
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
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    imagePicker: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
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
