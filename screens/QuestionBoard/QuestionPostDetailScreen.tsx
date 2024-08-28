import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Comment {
    id: string;
    author: string;
    content: string;
    likes: number;
    created_at: string;
}

export default function QuestionPostDetailScreen({ route, navigation }) {
    const { post } = route.params;

    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://your-api.com/posts/${post.id}/comments`);
                const result = await response.json();
                setComments(result);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        fetchComments();
    }, [post.id]);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            const newCommentData: Comment = {
                id: '', // 서버에서 생성된 ID를 받을 것이므로 초기에는 빈 값
                author: '닉네임', // 실제로는 로그인한 사용자의 이름을 사용
                content: newComment,
                likes: 0,
                created_at: new Date().toISOString(),
            };

            try {
                const response = await fetch(`https://your-api.com/posts/${post.id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCommentData),
                });

                if (response.ok) {
                    const savedComment = await response.json(); // 서버에서 저장된 댓글을 반환받음
                    setComments([...comments, savedComment]);
                    setNewComment('');
                } else {
                    console.error('Failed to post comment');
                }
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    const handleReport = async () => {
        Alert.alert(
            "신고하기",
            "이 게시글을 신고하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                {
                    text: "신고", onPress: async () => {
                        try {
                            const response = await fetch(`https://your-api.com/posts/${post.id}/report`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            if (response.ok) {
                                alert("신고가 접수되었습니다.");
                            } else {
                                console.error('Failed to report post');
                            }
                        } catch (error) {
                            console.error('Error reporting post:', error);
                        }
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
                <Text style={styles.postDetails}>{post.writer} | {post.date}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
                <View style={styles.postStatsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>조회수 {post.view_count}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>스크랩 {post.save}</Text>
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
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '4%', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: '19%', fontWeight: 'bold' },
    postContainer: { padding: '4%', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    postHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    postTitle: { fontSize: '19%', fontWeight: 'bold' },
    userImagePlaceholder: { width: '13%', height: undefined, aspectRatio: 1, borderRadius: '50%', backgroundColor: '#D3D3D3' },
    postDetails: { fontSize: '10%', color: '#888', marginBottom: '4%' },
    postContent: { fontSize: '14%', marginBottom: '4%' },
    postStatsContainer: { flexDirection: 'row', alignItems: 'center' },
    statBox: { backgroundColor: '#FFEB3B', borderRadius: '10%', paddingVertical: '2%', paddingHorizontal: '4%', marginRight: '2%' },
    statText: { fontSize: '13%', fontWeight: 'bold', color: '#000' },
    commentsSection: { padding: '4%', borderTopWidth: 1, borderTopColor: '#EEE' },
    commentsTitle: { fontSize: '17%', fontWeight: 'bold', marginBottom: '4%' },
    commentContainer: { marginBottom: '4%' },
    commentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: '2%' },
    commentAuthor: { fontSize: '10%', fontWeight: 'bold' },
    commentContent: { fontSize: '10%', color: '#555', marginBottom: '2%' },
    commentActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '25%' },
    commentAction: { fontSize: '10%', color: '#888' },
    commentInputContainer: { flexDirection: 'row', alignItems: 'center', padding: '4%', borderTopWidth: 1, borderTopColor: '#EEE', position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF' },
    commentInput: { flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: '8%', paddingHorizontal: '3%', paddingVertical: '2%', marginRight: '2.5%' },
});

