import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionPostDetailScreen({ route, navigation }) {
    const { post } = route.params;

    const [comments, setComments] = useState([
        { id: '1', author: '닉네임2', content: '저도 궁금해요!', likes: 2 },
    ]);

    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentData = {
                id: (comments.length + 1).toString(),
                author: '닉네임',
                content: newComment,
                likes: 0,
            };
            setComments([...comments, newCommentData]);
            setNewComment('');

            // DB에 댓글 저장 (예시 로그)
            console.log('New comment added:', newCommentData);
        }
    };

    const handleReport = () => {
        Alert.alert(
            "신고하기",
            "이 게시글을 신고하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                {
                    text: "신고", onPress: () => {
                        console.log("Reported post:", post.id);
                        // DB에 신고 저장 (예시 로그)
                        alert("신고가 접수되었습니다.");
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>질문게시판</Text>
                <TouchableOpacity onPress={handleReport}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <View style={styles.userImagePlaceholder} />
                </View>
                <Text style={styles.postDetails}>{post.author}  {post.date}  {post.time}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
                <View style={styles.postStatsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>조회수 {post.views}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>스크랩 {post.scraps}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>좋아요 {post.likes}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>댓글 {comments.length}</Text>
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <View style={styles.commentHeader}>
                                <View style={styles.userImagePlaceholder} />
                                <View>
                                    <Text style={styles.commentAuthor}>{item.author}</Text>
                                    <Text style={styles.commentContent}>{item.content}</Text>
                                    <View style={styles.commentActionsContainer}>
                                        <Text style={styles.commentAction}>좋아요 {item.likes}</Text>
                                        <Text style={styles.commentAction}>답글쓰기</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>

            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="댓글을 입력하세요."
                />
                <TouchableOpacity onPress={handleAddComment}>
                    <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    postContainer: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    postHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    postTitle: { fontSize: 20, fontWeight: 'bold' },
    userImagePlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#D3D3D3' },
    postDetails: { fontSize: 14, color: '#888', marginBottom: 16 },
    postContent: { fontSize: 16, marginBottom: 16 },
    postStatsContainer: { flexDirection: 'row', alignItems: 'center' },
    statBox: { backgroundColor: '#FFEB3B', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 },
    statText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
    commentsSection: { padding: 16, borderTopWidth: 1, borderTopColor: '#EEE' },
    commentsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    commentContainer: { marginBottom: 16 },
    commentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    commentAuthor: { fontSize: 14, fontWeight: 'bold' },
    commentContent: { fontSize: 14, color: '#555', marginBottom: 8 },
    commentActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 100 },
    commentAction: { fontSize: 12, color: '#888' },
    commentInputContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, borderTopWidth: 1, borderTopColor: '#EEE', position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF' },
    commentInput: { flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 10 },
});
