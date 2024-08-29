import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostDetailScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.headerTitle}>정보게시판</Text>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <Text style={styles.postTitle}>수면 교육 방법</Text>
                    <View style={styles.authorContainer}>
                        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.authorImage} />
                        <View>
                            <Text style={styles.authorName}>닉네임</Text>
                            <Text style={styles.postDate}>24.06.24 23:19</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.postContent}>
                    1. 일관된 수면 루틴 확립{'\n'}
                    정해진 시간에 잠들기: 매일 같은 시간에 잠자리에 들도록 합니다.{'\n'}
                    이는 아기의 생체 리듬을 안정화시키는 데 도움이 됩니다.{'\n'}
                    잠들기 전 루틴 만들기: 목욕, 책 읽기, 조용한 음악 듣기와 같은 일관된 활동을 매일 반복하여 아기에게 잠잘 시간임을 알려줍니다.{'\n'}
                    {'\n'}
                    2. 수면 환경 조성{'\n'}
                    조용한 환경: 아기가 잠들기 전에 집 안의 소음을 최소화하고, 조용하고 평온한 환경을 만들어줍니다.{'\n'}
                    적절한 온도와 조명: 방 안의 온도를 적절하게 유지하고, 밤에는 어둡게 하여 아기가 밤과 낮을 구분할 수 있도록 합니다.{'\n'}
                    편안한 잠자리: 아기가 편안하게 잘 수 있도록 침대나 유모차의 잠자리를 잘 정리합니다.{'\n'}
                    {'\n'}
                    3. 자기 진정 능력 기르기{'\n'}
                    스스로 잠들기 훈련: 아기가 스스로 잠들 수 있도록, 졸릴 때 침대에 눕히고 바로 잠들게 하지 않는 연습을 합니다. {'\n'} 이 과정에서 아기가 울더라도 잠시 기다려보는 것도 필요합니다.{'\n'}
                    점진적 퇴장법: 부모가 옆에서 천천히 멀어지는 방법으로, 아기가 잠들 때까지 가까이 있다가 점차 멀어지며 혼자 잠드는 연습을 도와줍니다.{'\n'}

                </Text>
            </View>
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
        justifyContent: 'flex-start',  // Align items to the left
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FFEB3B',
        borderRadius: 20,
        marginRight: 8,  // Add margin between the buttons
    },
    actionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
});
