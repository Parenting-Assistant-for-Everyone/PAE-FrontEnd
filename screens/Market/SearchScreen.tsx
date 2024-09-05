import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
    const [searchText, setSearchText] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const handleSearchSubmit = () => {
        if (searchText.trim()) {
            setRecentSearches([searchText.trim(), ...recentSearches]);
            setSearchText('');
        }
    };

    const handleDeleteSearch = (item: string) => {
        setRecentSearches(recentSearches.filter(search => search !== item));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="검색어를 입력하세요"
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearchSubmit}
                />
                <TouchableOpacity onPress={handleSearchSubmit}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.searchTitle}>최근 검색어</Text>
            <FlatList
                data={recentSearches}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={styles.searchItem}>
                        <Text style={styles.searchText}>{item}</Text>
                        <TouchableOpacity onPress={() => handleDeleteSearch(item)}>
                            <Ionicons name="close" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    searchTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8C00',
        marginBottom: 10,
    },
    searchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    searchText: {
        fontSize: 16,
        color: '#000',
    },
});
