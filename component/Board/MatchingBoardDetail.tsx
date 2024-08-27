import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, Keyboard, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  MatchingBoardDetail: { id: number };
};

type MatchingBoardDetailRouteProp = RouteProp<RootStackParamList, 'MatchingBoardDetail'>;

interface MatchingBoardDetailProps {
  route: MatchingBoardDetailRouteProp;
}

interface Comment {
  id: number;
  ParentId: number | null;
  comment: string;
  writer: string;
  memberId: number;
  replies: Comment[];
}

interface BoardDetailResponse {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  baseStatus: string;
  boardType: string;
  updatedAt: string;
  writer: string;
  likes: number;
  comments: number;
  likedByUser: boolean;
  comment: {
    comments: Comment[];
    size: number;
  };
}

const MatchingBoardDetail: React.FC<MatchingBoardDetailProps> = () => {
  const route = useRoute<MatchingBoardDetailRouteProp>();
  const { id } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState<BoardDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [replyParentId, setReplyParentId] = useState<number | null>(null);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentWriter, setCurrentWriter] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await fetch(`http://172.30.1.64:8080/board/view/${id}`);
        const result = await response.json();
        setCurrentWriter('지승현');
        if (result.httpStatusCode === 200) {
          setData(result.data);
          setCommentsList(result.data.comment.comments); // 기본값으로 빈 배열 설정
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchBoardDetail();
  }, [id, commentUpdate]); // commentsList 제거
  

  useEffect(() => {
    const fetchWriterInfo = async () => {
      const storedWriter = await AsyncStorage.getItem('writer');
      setCurrentWriter(storedWriter || null);
    };

    fetchWriterInfo();

    const checkIfLiked = async () => {
      const memberId = await AsyncStorage.getItem('memberId');
      if (memberId) {
        const response = await fetch(`http://172.30.1.64:8080/like/checkLike?id=${id}&memberId=${memberId}`);
        const result = await response.json();
        if (result.httpStatusCode === 200) {
          setLiked(result.data);
        }
      }
    };

    checkIfLiked();
  }, [id]);

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handleReplyChange = (text: string) => {
    setReply(text);
  };

  const handleSubmitComment = async () => {
    console.log('테스트:',replyParentId);
    if (comment.trim()) {
      const memberId = await AsyncStorage.getItem('memberId');
      const storedWriter = await AsyncStorage.getItem('writer');
  
      const newComment = {
        parentId: replyParentId,
        boardId: id,
        comment: replyParentId !== null ? reply : comment, // 문자열로 직접 전달
        memberId: parseInt(memberId, 10),
      };
      try {
        const response = await fetch('http://172.30.1.64:8080/comment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });
  
        if (response.ok) {
          console.log('테스트:',replyParentId,'여기');
          const result = await response.json();
          setCommentsList(prevComments => {
            if (replyParentId === null) {
              return [
                ...prevComments,
                { id: result.data.id, ParentId: null, comment: comment, writer: storedWriter, memberId: parseInt(memberId, 10), replies: [] },
              ];
            } else {
              return prevComments.map(comment => {
                if (comment.id === replyParentId) {
                  return {
                    ...comment,
                    replies: [
                      ...comment.replies,
                      { id: result.data.id, ParentId: replyParentId, comment: comment, writer: storedWriter, memberId: parseInt(memberId, 10), replies: [] },
                    ],
                  };
                }
                return comment;
              });
            }
          });
          setComment('');
          setReply('');
          setReplyParentId(null);
          setCommentUpdate(!commentUpdate);
          Keyboard.dismiss();
        } else {
          console.error('Failed to submit comment.');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };
  
  const handleLikePress = async () => {
    const memberId = await AsyncStorage.getItem('memberId');
    if (!memberId) {
      console.error('Member ID not found.');
      return;
    }

    const likeData = {
      id: id,
      memberId: parseInt(memberId, 10),
    };

    if (!liked) {
      try {
        const response = await fetch('http://172.30.1.64:8080/like/createLike', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(likeData),
        });

        if (response.ok) {
          setLiked(!liked);
          setData(prevData => prevData ? { ...prevData, likes: prevData.likes + 1 } : prevData);
        } else {
          console.error('Failed to submit like.');
        }
      } catch (error) {
        console.error('Error submitting like:', error);
      }
    } else {
      try {
        const response = await fetch(`http://172.30.1.64:8080/like/delete/${memberId}/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLiked(false);
          setData(prevData => prevData ? { ...prevData, likes: prevData.likes - 1 } : prevData);
        } else {
          console.error('Failed to delete like.');
        }
      } catch (error) {
        console.error('Error deleting like:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http:// 172.30.1.64:8080/comment/delete/${commentId}`, {
                method: 'DELETE',
              });
  
              if (response.ok) {
                // Update the commentsList state to reflect the deleted comment
                setCommentsList(prevComments => prevComments.filter(comment => comment.id !== commentId));
                setCommentUpdate(!commentUpdate);
              } else {
                console.error('Failed to delete comment. 아이디 값 :', commentId);
              }
            } catch (error) {
              console.error('Error deleting comment:', error);
            }
          },
        },
      ]
    );
  };
  

  const renderReply = (reply: Comment) => (
    <View style={styles.replyItem} key={reply.id}>
      <Image source={{ uri: 'https://via.placeholder.com/30' }} style={styles.replyProfileImage} />
      <View style={styles.replyContent}>
        <Text style={styles.replyWriter}>{reply.writer}</Text>
        <Text style={styles.replyText}>{reply.comment}</Text>
      </View>
    </View>
  );

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem} key={item.id}>
      <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileImage} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentWriter}>{item.writer}</Text>
          {item.writer === currentWriter && (
            <TouchableOpacity onPress={() => handleDeleteComment(item.id)} style={styles.deleteIcon}>
              <Icon name='delete' size={20} color='#888' />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.commentText}>{item.comment}</Text>
        <TouchableOpacity onPress={() => {
          setReplyParentId(item.id); // Set parentId for replies
          console.log(item.id);
        }} style={styles.replyButton}>
          <Text style={styles.replyButtonText}>답글 쓰기</Text>
        </TouchableOpacity>
        <FlatList
          data={item.replies || []}
          renderItem={({ item }) => renderReply(item)}
          keyExtractor={(reply) => reply.id.toString()}
          style={styles.repliesList}
        />
      </View>
    </View>
  );

  // Recursive function to flatten comments for rendering
  const flattenComments = (comments: Comment[]) => {
    const result: Comment[] = [];

    const addComments = (comments: Comment[], parentId: number | null) => {
      comments.forEach(comment => {
        if (comment.ParentId === parentId) {
          result.push(comment);
          addComments(comment.replies || [], comment.id);
        }
      });
    };

    addComments(comments, null);
    return result;
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Icon onPress={() => navigation.goBack()} style={styles.icon} name='arrow-back-ios' />
        <Icon2 style={styles.icon2} name='options-vertical' />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.writer}>{data.writer}</Text>
          <Text style={styles.date}>{data.updatedAt}</Text>
        </View>
        <Text style={styles.content}>{data.content}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Icon name='remove-red-eye' size={20} color='#fff' />
            <Text style={styles.statText}>{data.viewCount}</Text>
          </View>
          <TouchableOpacity onPress={handleLikePress} style={styles.statBox}>
            <Icon2 name='heart' size={20} color={liked ? '#FF0000' : '#fff'} />
            <Text style={styles.statText}>{data.likes}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>댓글 {data.comment.size}</Text>
          <FlatList
            data={flattenComments(commentsList)}
            renderItem={renderComment}
            keyExtractor={(item) => item.id.toString()}
            style={styles.commentsList}
          />
        </View>
      </ScrollView>

      <View style={styles.commentSection}>
        <TextInput
          style={styles.textInput}
          placeholder={replyParentId !== null ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
          value={replyParentId !== null ? reply : comment}
          onChangeText={replyParentId !== null ? handleReplyChange : handleCommentChange}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComment}>
          <Icon name='send' style={styles.submitButtonText} />
        </TouchableOpacity>
      </View>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  writer: {
    fontSize: 14,
    color: '#888',
    marginRight: 20,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 70,
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 20,
    padding: 8,
    marginRight: 30,
    width: 75,
    justifyContent: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
  icon: {
    fontSize: 20,
    marginRight: 280,
  },
  icon2: {
    fontSize: 18,
  },
  grid: {
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  commentsSection: {
    marginTop: 20,
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentsList: {
    flex: 1,
  },
  commentSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 3,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentWriter: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  deleteIcon: {
    marginLeft: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  replyButton: {
    marginTop: 5,
  },
  replyButtonText: {
    fontSize: 14,
    color: '#007BFF',
  },
  replyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 30, // 답글이 기존 댓글보다 들여쓰기 되게
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  replyProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
  },
  replyWriter: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
  },
  replyText: {
    fontSize: 12,
    color: '#333',
  },
});

export default MatchingBoardDetail;
