import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface NannyRecord {
    id: string;
    name: string;
    avatar: string;
    startDate: string;
    endDate: string;
    reviewStatus: string;
}

export default function NannyRecordsScreen({ navigation }) {
    const [records, setRecords] = useState<NannyRecord[]>([]);

    // Mock Data for testing
    const generateMockData = (): NannyRecord[] => [
        {
            id: '1',
            name: '육아도우미 1',
            avatar: 'https://example.com/nanny_avatar1.png',
            startDate: '2024-06-01',
            endDate: '2024-06-10',
            reviewStatus: '리뷰 작성 (3일 남음)',
        },
        {
            id: '2',
            name: '육아도우미 2',
            avatar: 'https://example.com/nanny_avatar2.png',
            startDate: '2024-05-01',
            endDate: '2024-05-05',
            reviewStatus: '리뷰 마감',
        },
    ];

    // Fetch records from the API
    const fetchRecords = async () => {
        try {
            const response = await fetch('https://your-api.com/getNannyRecords');
            const data = await response.json();

            // Assuming API returns an array of NannyRecord
            setRecords(data);
        } catch (error) {
            console.error('Failed to fetch records:', error);
            Alert.alert('Error', 'Failed to fetch records. Showing mock data instead.');
            // Use mock data in case of error
            setRecords(generateMockData());
        }
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>육아도우미 기록</Text>
            </View>
            {records.map((record) => (
                <View key={record.id} style={styles.recordItem}>
                    <View style={styles.recordHeader}>
                        <Text style={styles.recordDate}>
                            {record.startDate} - {record.endDate}
                        </Text>
                        <TouchableOpacity style={styles.detailsButton}>
                            <Text style={styles.detailsButtonText}>육아기록 삭제</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recordBody}>
                        <Image source={{ uri: record.avatar }} style={styles.avatar} />
                        <Text style={styles.recordName}>{record.name}</Text>
                        <Text style={styles.reviewStatus}>{record.reviewStatus}</Text>
                    </View>
                </View>
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    recordItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
    },
    recordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    recordDate: {
        fontSize: 16,
        color: '#555',
    },
    detailsButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    recordBody: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: '#EFEFEF',
    },
    recordName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reviewStatus: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
});
