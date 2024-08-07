import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BoardItem from './BoardTemplate';

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
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <BoardItem
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
