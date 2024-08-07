import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoardList from './Board/BoardList';
import axios from 'axios';

function MatchingBoard() {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        let url = 'http://192.168.0.33:8080/board/matchingBoardList?page=1'; // 기본 URL

        // 선택된 상태에 따라 URL 변경
        if (selected === '구인') {
          url = 'http://192.168.0.33:8080/board/matchingBoardList/jobOpening?page=1';
        } else if (selected === '구직') {
          url = 'http://192.168.0.33:8080/board/matchingBoardList/jobSearch?page=1';
        }

        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = response.data.data.boardList;
        setData(result);
        console.log("결과:", result);
        console.log("됨");
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    // 선택된 값이 변경될 때마다 데이터 가져오기
    fetchData();
  }, [selected]);

  const handlePress = (type: string) => {
    if (selected === type) {
      setSelected(''); // 선택된 버튼과 동일한 버튼 클릭 시 상태를 초기화
    } else {
      setSelected(type);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View>
          <Icon style={styles.icon} name='arrow-back-ios' />
        </View>
        <View>
          <Text style={styles.text}>육아도우미 게시판</Text>
        </View>
        <View>
          <Icon style={styles.icon} name='search' />
        </View>
        <View>
          <Icon style={styles.icon} name='filter-list' />
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  boardList: {
    marginTop: 10,
    paddingBottom: 70
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gridButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    height: 40,
    marginTop: 25,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: 8,
  },
  selectedButton: {
    backgroundColor: '#FFD700', // 찐한 노란색
  },
  unselectedButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)', // 투명 노란색
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
});

export default MatchingBoard;
