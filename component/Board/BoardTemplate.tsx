import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
interface BoardItemProps {
  title: string;
  content: string;
  author: string;
  updatedAt: string;
  likes: number;
  comments: number;
  id: number;
}

const BoardItem: React.FC<BoardItemProps> = ({ title, content, author, updatedAt, likes, comments }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.footer}>
      </View>
      <View style={styles.stats}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.date}>{updatedAt}</Text>
        <Text style={styles.likes}><Icon2 name='heart' /> {likes}</Text>
        <Text style={styles.comments}><Icon style={styles.icon2} name='comments' />  {comments}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    fontSize: 12,
    color: '#888',
    marginRight: 10
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginRight: 10

  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  likes: {
    fontSize: 12,
    color: '#888',
    marginRight:10

  },
  comments: {
    fontSize: 12,
    color: '#888',
    marginRight:5
  },
  icon2:{
    paddingTop : 10
  }
});

export default BoardItem;
