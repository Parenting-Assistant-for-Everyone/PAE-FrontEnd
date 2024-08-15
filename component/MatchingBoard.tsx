import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoardList from './Board/BoardList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationAssistant from './Board/LocationAssistant';

function MatchingBoard() {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigation = useNavigation();

  const fetchData = async (keyword = '') => {
    try {
      let url = `http://192.168.0.7:8080/board/matchingBoardList?page=1`;

      if (selected === '구인') {
        url = `http://192.168.0.7:8080/board/matchingBoardList/jobOpening?page=1`;
        } else if (selected === '구직') {
        url = `http://192.168.0.7:8080/board/matchingBoardList/jobSearch?page=1`;
      } else if (keyword) {
        url = `http://192.168.0.7:8080/board/search?keyword=${keyword}&page=1`;
      }

      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = response.data.data.boardList;
      setData(result);
      console.log("결과:", result);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
      AsyncStorage.setItem('memberId','1');
    }, [selected])
  );

  const handlePress = (type: string) => {
    setSelected(selected === type ? '' : type);
  };

  const handleCreateBoard = () => {
    navigation.navigate('CreateMatchingBoard');
  };

  const handleSearch = () => {
    fetchData(searchKeyword);
  };
  const search = () =>{
    if(isSearchVisible){
      fetchData(searchKeyword);
    }
    setSearchVisible(!isSearchVisible);
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Icon onPress={() => navigation.goBack()} style={styles.icon} name='arrow-back-ios' />
        {!isSearchVisible ? (
          <Text style={styles.text}>육아도우미 게시판</Text>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChangeText={setSearchKeyword}
            />
          </View>
        )}
        <Icon onPress={() => search()} style={styles.icon} name='search' />
        <Icon onPress={() => navigation.navigate('LocationAssistant')} style={styles.icon} name='map' />

      </View>

      <View style={styles.gridButton}>
        <TouchableOpacity
          style={[
            styles.button,
            selected === '구인' ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handlePress('구인')}
        >
          <Text style={styles.btnText}>구인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selected === '구직' ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handlePress('구직')}
        >
          <Text style={styles.btnText}>구직</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.boardList}>
        <BoardList items={data} />
      </SafeAreaView>

      <TouchableOpacity style={styles.fab} onPress={handleCreateBoard}>
        <Icon name="add" style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  boardList: {
    marginTop: 10,
    paddingBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  gridButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    height: 40,
    marginTop: 25,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 8,
  },
  selectedButton: {
    backgroundColor: '#FFD700',
  },
  unselectedButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '500',
  },
  icon: {
    fontSize: 26,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    width: 60,
    height: 60,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 30,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 28,
    color: '#FFD700',
    marginLeft: 10,
  },
});

export default MatchingBoard;
