import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handlePress = (buttonName: string) => {
        setSelectedButton(buttonName);
        if (buttonName === '중고거래 게시판') {
            navigation.navigate('ItemListScreen');
        } else if (buttonName === '고민게시판') {
            navigation.navigate('ConcernBoardScreen');
        } else if (buttonName === '질문게시판') {
            navigation.navigate('QuestionBoardScreen');
        } else if (buttonName === '정보 게시판') {
            navigation.navigate('InfoBoardScreen');
        } else if (buttonName === '육아도우미 게시판') {
            navigation.navigate('MatchingBoard');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>모두의 육아 도우미</Text>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: selectedButton === '중고거래 게시판' ? '#FFEB3B' : '#FFF9C4' }
                ]}
                onPress={() => handlePress('중고거래 게시판')}
            >
                <Text style={styles.buttonText}>중고거래 게시판</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: selectedButton === '고민게시판' ? '#FFEB3B' : '#F8F8C4' }
                ]}
                onPress={() => handlePress('고민게시판')}
            >
                <Text style={styles.buttonText}>고민게시판</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: selectedButton === '질문게시판' ? '#FFEB3B' : '#F8F8C4' }
                ]}
                onPress={() => handlePress('질문게시판')}
            >
                <Text style={styles.buttonText}>질문게시판</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: selectedButton === '육아도우미 게시판' ? '#FFEB3B' : '#FFF9C4' }
                ]}
                onPress={() => handlePress('육아도우미 게시판')}
            >
                <Text style={styles.buttonText}>육아도우미 게시판</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: selectedButton === '정보 게시판' ? '#FFEB3B' : '#FFF9C4' }
                ]}
                onPress={() => handlePress('정보 게시판')}
            >
                <Text style={styles.buttonText}>정보 게시판</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 40,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
});
