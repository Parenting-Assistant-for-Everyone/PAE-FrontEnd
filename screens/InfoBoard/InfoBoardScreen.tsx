import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type InfoBoardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InfoBoardScreen'>;

type Props = {
    navigation: InfoBoardScreenNavigationProp;
};

const initialData = {
    education: [
        { title: '수면 교육 방법', content: '1. 일관된 수면 루틴 확립', screen: 'EducationPost1' },
        { title: '발달 단계 놀이방법', content: '신생아기(0~3개월) 놀이방법: 얼굴 보고 웃기', screen: 'EducationPost2' },
    ],
    health: [
        { title: '건강 1', content: '건강에 관한 정보~~', screen: 'HealthPost1' },
        { title: '건강 2', content: '건강에 관한 정보~~', screen: 'HealthPost2' },
    ],
    life: [
        { title: '생활 1', content: '생활에 관한 정보~~', screen: 'LifePost1' },
        { title: '생활 2', content: '생활에 관한 정보~~', screen: 'LifePost2' },
    ],
};

export default function InfoBoardScreen({ navigation }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('education');
    const [data] = useState(initialData);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>정보게시판</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="search" size={24} color="black" style={styles.icon} />
                    <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === 'education' && styles.selectedCategory]}
                    onPress={() => setSelectedCategory('education')}
                >
                    <Text style={styles.categoryButtonText}>교육</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === 'health' && styles.selectedCategory]}
                    onPress={() => setSelectedCategory('health')}
                >
                    <Text style={styles.categoryButtonText}>건강</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === 'life' && styles.selectedCategory]}
                    onPress={() => setSelectedCategory('life')}
                >
                    <Text style={styles.categoryButtonText}>생활</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data[selectedCategory]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <View style={styles.itemContainer}>
                            <View style={styles.itemContent}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemText}>{item.content}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
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
    itemContainer: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE', backgroundColor: '#FFFFFF' },
    itemContent: { flex: 1 },
    itemTitle: { fontSize: 16, fontWeight: 'bold' },
    itemText: { marginVertical: 8, fontSize: 14, color: '#555' },
});
