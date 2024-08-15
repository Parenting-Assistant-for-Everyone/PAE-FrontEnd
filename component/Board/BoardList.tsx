import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BoardItem from './BoardTemplate';
import { useNavigation } from '@react-navigation/native';

interface BoardListProps {
  items: {
    title: string;
    content: string;
    writer: string;
    updatedAt: string;
    likes: number;
    comments: number;
    id: number;
  }[];
}

const BoardList: React.FC<BoardListProps> = ({ items }) => {
    const navigation = useNavigation();

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <BoardItem
          onPress={() => navigation.navigate('MatchingBoardDetail', { id : item.id })}
          title={item.title}
          content={item.content}
          author={item.writer}
          updatedAt={item.updatedAt}
          id={item.id}
          likes={item.likes}
          comments={item.comments}
        />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
});

export default BoardList;
