import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostDetailScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.headerTitle}>정보게시판</Text>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        <Text style={styles.postTitle}>발달 단계별 놀이법</Text>
                        <View style={styles.authorContainer}>
                            <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.authorImage} />
                            <View>
                                <Text style={styles.authorName}>닉네임</Text>
                                <Text style={styles.postDate}>24.06.24 23:19</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.postContent}>
                        1. 신생아기 (0-3개월){'\n'}
                        놀이방법:{'\n'}
                        얼굴 보고 웃기: 아기에게 웃는 얼굴을 보여주고, 표정을 따라하게 도와줍니다.{'\n'}
                        소리 탐색: 부드러운 음악을 들려주거나 딸랑이를 흔들어 아기의 반응을 관찰합니다.{'\n'}
                        장난감 추천:{'\n'}
                        부드러운 딸랑이: 손에 쥘 수 있는 크기의 딸랑이는 아기의 청각 발달을 자극합니다.{'\n'}
                        거울 장난감: 아기가 자신의 얼굴을 볼 수 있는 안전한 아기 거울은 시각적 자극을 줍니다.{'\n'}
                        {'\n'}
                        2. 영아기 (4-6개월){'\n'}
                        놀이 방법:{'\n'}
                        엎드려서 놀기: 아기를 배 위로 눕혀 손발을 사용해 몸을 움직이는 것을 도와줍니다.{'\n'}
                        물건 쥐기 연습: 손에 잡을 수 있는 장난감을 주고, 손으로 쥐어보게 유도합니다.{'\n'}
                        장난감 추천:{'\n'}
                        헝겊책: 부드러운 소재로 만들어진 책은 아기가 입에 넣어도 안전하며, 촉감을 발달시키는 데 도움이 됩니다.{'\n'}
                        손잡이 링: 다양한 질감의 손잡이 링은 아기가 손을 사용해 물건을 쥐고 흔드는 연습을 도와줍니다.{'\n'}
                        {'\n'}
                        3. 이유기 (7-9개월){'\n'}
                        놀이 방법:{'\n'}
                        장난감 쌓기: 작은 블록이나 컵을 쌓고, 무너뜨리는 놀이로 손과 눈의 협응력을 키웁니다.{'\n'}
                        숨바꼭질: 물건을 천으로 덮고, 아기에게 찾아보게 하는 간단한 숨바꼭질 놀이를 합니다.{'\n'}
                        장난감 추천:{'\n'}
                        쌓기 블록: 손으로 잡고 쌓을 수 있는 큰 블록은 손의 근육 발달에 도움을 줍니다.{'\n'}
                        소리 나는 공: 아기가 손으로 굴리거나 흔들면 소리가 나는 공은 운동 능력과 청각 발달에 좋습니다.{'\n'}
                        {'\n'}
                        4. 걸음마기 (10-12개월){'\n'}
                        놀이 방법:{'\n'}
                        물건 밀기: 걸음마를 배우는 아기에게 밀고 다닐 수 있는 장난감을 주어 균형 감각을 키웁니다.{'\n'}
                        따라 하기 놀이: 간단한 동작을 보여주고 아기가 따라 하도록 유도합니다.{'\n'}
                        장난감 추천:{'\n'}
                        밀대 장난감: 아기가 서서 밀고 다니면서 균형을 잡는 연습을 할 수 있는 장난감.{'\n'}
                        활동 센터: 다양한 버튼을 눌러 소리나 빛을 만들어내는 장난감은 손동작을 연습하는 데 유용합니다.{'\n'}
                        {'\n'}
                        5. 유아기 (12-18개월){'\n'}
                        놀이 방법:{'\n'}
                        모래놀이: 모래를 만지고 옮기며 감각을 자극하는 놀이를 합니다.{'\n'}
                        그림책 읽기: 간단한 그림책을 함께 보며, 아기의 단어 인식을 돕습니다.{'\n'}
                        장난감 추천:{'\n'}
                        모래놀이 세트: 삽과 양동이 등으로 구성된 모래놀이 세트는 감각 발달에 좋습니다.{'\n'}
                        간단한 퍼즐: 큰 조각으로 이루어진 퍼즐은 문제 해결 능력과 손의 협응력을 키워줍니다.{'\n'}
                    </Text>
                </View>
            </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        paddingBottom: 16,
    },
    postContainer: {
        padding: 16,
    },
    postHeader: {
        marginBottom: 16,
    },
    postTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    authorName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    postDate: {
        fontSize: 12,
        color: '#888',
    },
    postContent: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FFEB3B',
        borderRadius: 20,
        marginRight: 8,
    },
    actionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
});
