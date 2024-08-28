import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function WhendayPage({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.questionText}>언제 돌봐드릴까요?</Text>

            <TouchableOpacity
                style={styles.regularButton}
                onPress={() => navigation.navigate('RegularPageScreen')}
            >
                <Text style={styles.buttonText}>정기적으로 돌봐주세요</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.specificButton}
                onPress={() => navigation.navigate('SpecificScreen')}
            >
                <Text style={styles.buttonText}>특정 날짜를 지정할게요</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
    },
    questionText: {
        fontSize: '20%',
        fontWeight: 'bold',
        marginBottom: '5%',
        color: '#000',
    },
    regularButton: {
        backgroundColor: '#FFEB3B',
        paddingVertical: '8%',
        paddingHorizontal: '20%',
        borderRadius: '4%',
        marginBottom: '2.5%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: '0.25%' },
        shadowOpacity: 0.3,
        shadowRadius: '2%',
        elevation: 5,
    },
    specificButton: {
        backgroundColor: '#F5F5DC',
        paddingVertical: '8%',
        paddingHorizontal: '20%',
        borderRadius: '4%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: '0.25%' },
        shadowOpacity: 0.3,
        shadowRadius: '2%',
        elevation: 5,
    },
    buttonText: {
        fontSize: '17%',
        fontWeight: 'bold',
        color: '#000',
    },
});