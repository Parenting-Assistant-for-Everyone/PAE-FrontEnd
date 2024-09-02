import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ItemRegisterScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [method, setMethod] = useState('무료나눔');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log('result', result);

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
        console.log(image);
    };

    const handleSave = async () => {
        if (!name || !category || (method === '판매' && !price)) {
            Alert.alert('모든 필드를 입력해주세요');
            return;
        }
    
        let formData = new FormData();
    
        const registDto = {
            memberId: "1",
            title: name,
            price: price ? parseInt(price, 10).toString() : "0",
            goodsCategory: category === '의류' ? 'CLOTHES' :
                category === '장난감' ? 'TOY' :
                    category === '음식' ? 'FOODS' :
                        category === '생활용품' ? 'DAILY_ITEM' : 'OTHER',
            saleType: method === '무료나눔' ? 'SHARING' : 'SALE',
            description: description,
        };
    
        // JSON 데이터를 단순히 문자열로 추가
        formData.append('registDto', JSON.stringify(registDto));
    
        if (image) {
            formData.append('images', {
                uri: image.uri,
                type: 'image/jpeg', // 이미지 파일의 MIME 타입 지정
                name: image.uri.split('/').pop(), // 파일명 추출
            });
        }
    
        try {
            const response = await fetch('http://52.79.128.176:8080/api/v1/goods', {
                method: 'POST',
                body: formData,  // Content-Type을 설정하지 마세요. 자동으로 설정됩니다.
            });
    
            const result = await response.json();
            if (response.ok) {
                Alert.alert('등록 성공', '게시글이 성공적으로 등록되었습니다.', [
                    { text: '확인', onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert('등록 실패', result.message || '서버 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('등록 실패', '서버와의 연결에 실패했습니다.');
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
                    {['의류', '장난감', '음식', '생활용품'].map((cat) => (
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
