import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import { Keyboard } from 'react-native';
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
  likedByUser: boolean; // 새로운 필드: 사용자가 이미 좋아요를 눌렀는지 여부
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
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await fetch(`http://192.168.0.7:8080/board/view/${id}`);
        const result = await response.json();
        if (result.httpStatusCode === 200) {
          setData(result.data);
          setCommentsList(result.data.comment.comments);
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
  }, [commentUpdate]);

  useEffect(() => {
    const checkIfLiked = async () => {
      const memberId = await AsyncStorage.getItem('memberId');
      console.log("아이디는 이거다 : ",memberId);
      if (memberId) {
        const response = await fetch(`http://192.168.0.7:8080/like/checkLike?id=${id}&memberId=${memberId}`);
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

  const handleSubmitComment = async () => {
    if (comment.trim()) {
      const memberId = await AsyncStorage.getItem('memberId');
      if (!memberId) {
        console.error('Member ID not found.');
        return;
      }

      const newComment = {
        parentId: null,
        boardId: id,
        comment: comment,
        memberId: parseInt(memberId, 10),
      };

      try {
        const response = await fetch('http://192.168.0.7:8080/comment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });

        if (response.ok) {
          const result = await response.json();
          setCommentsList([...commentsList, { id: result.data.id, ParentId: null, comment: comment, writer: 'Current User' }]);
          setComment('');
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
    if(!liked){
    try {
      const response = await fetch('http://192.168.0.7:8080/like/createLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likeData),
      });

      if (response.ok) {
        setLiked(!liked);
        setData((prevData) => prevData ? { ...prevData, likes: prevData.likes + 1 } : prevData);
      } else {
        console.error('Failed to submit like.');
      }
    } catch (error) {
      console.error('Error submitting like:', error);
    }}
    else{
      try {
        const response = await fetch(`http://192.168.0.7:8080/like/delete/${memberId}/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLiked(false);
          setData((prevData) => prevData ? { ...prevData, likes: prevData.likes - 1 } : prevData);
        } else {
          console.error('Failed to delete like.');
        }
      } catch (error) {
        console.error('Error deleting like:', error);
      }
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentWriter}>{item.writer}:</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
    </View>
  );

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

        <FlatList
          data={commentsList}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          style={styles.commentsList}
        />
      </ScrollView>

      <View style={styles.commentSection}>
        <TextInput
          style={styles.textInput}
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChangeText={handleCommentChange}
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
    marginRight: 20
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  scrollViewContent: {
    padding:15,
    paddingBottom: 70, // 댓글 입력창과 겹치지 않게 하단 여백 추가
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
    marginRight: 280
  },
  icon2: {
    fontSize: 18
  },
  grid: {
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    marginBottom: 20,
    borderBottomWidth: 1, // 밑줄 추가
    borderBottomColor: '#e0e0e0', // 밑줄 색상
  },
  commentsList: {
    flex: 1,
    borderTopWidth: 1,
    marginTop: 20,
    borderTopColor: '#e0e0e0',
  },
  commentSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth:1,
    borderColor :"#ddd",
    paddingTop:3,
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  commentWriter: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MatchingBoardDetail;
